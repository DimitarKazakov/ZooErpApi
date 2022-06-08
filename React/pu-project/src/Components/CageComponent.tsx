import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Col, Row, Input, DatePicker, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { CageInfoScreen } from '../Screens/Info/CageInfoScreen';
import { FilterDto } from '../Types/FilterDto';
import { CageDto } from '../Types/Get/CageDto';
import { getAllCages } from '../Utils/Controllers/CageController';

const { Search } = Input;

export const CageComponent = () => {
  const [cages, setCages] = useState<CageDto[]>();
  const [filter, setFilter] = useState<FilterDto>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCage, setSelectedCage] = useState(0);
  useEffect(() => {
    getAllCages(filter).then((data) => setCages(data));
  }, [filter.createdOnDate, filter.description, filter.lastModifiedOnDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllCages(filter).then((data) => setCages(data));
    }, 2500);

    return () => clearInterval(interval);
  }, [filter.createdOnDate, filter.description, filter.lastModifiedOnDate]);

  const onSearch = (value: string) => {
    setFilter(Object.assign(filter, { description: value }));
  };

  const onChangeCreated = (date: any, dateString: string) => {
    setFilter(Object.assign(filter, { createdOnDate: moment(dateString).format('d/MM/yyyy') }));
  };

  const onChangeModified = (date: any, dateString: string) => {
    setFilter(
      Object.assign(filter, { lastModifiedOnDate: moment(dateString).format('d/MM/yyyy') })
    );
  };

  return (
    <>
      <Row>
        <Col span={6}>
          <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
        </Col>
        <Col span={6}>
          <DatePicker
            format={'d/MM/yyyy'}
            placeholder="created on date"
            onChange={onChangeCreated}
          />
        </Col>
        <Col span={6}>
          <DatePicker
            format={'d/MM/yyyy'}
            placeholder="last modified on date"
            onChange={onChangeModified}
          />
        </Col>
        <Col span={6}>
          <Button onClick={() => setFilter({})} type="primary">
            Clear Filters
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        {cages?.map((x) => {
          return (
            <Col className="gutter-row" span={8} key={`col${x.id}`}>
              <Card
                key={`cage${x.id}`}
                style={{ width: 300, margin: '20px' }}
                cover={<img alt="cage" src={x.imageUrl} />}
                actions={[
                  <EllipsisOutlined
                    onClick={() => {
                      setSelectedCage(x.id);
                      setIsModalVisible(true);
                    }}
                    key="ellipsis"
                  />,
                ]}
              >
                <Meta title={x.name} description={x.description} />
              </Card>
            </Col>
          );
        })}
      </Row>
      <CageInfoScreen
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={selectedCage}
      />
    </>
  );
};
