import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Col, Pagination, Row, Input, DatePicker, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AnimalInfoScreen } from '../Screens/Info/AnimalInfoScreen';
import { FilterDto } from '../Types/FilterDto';
import { AnimalDto } from '../Types/Get/AnimalDto';
import { getAllAnimals } from '../Utils/Controllers/AnimalController';

const { Search } = Input;

export const AnimalComponent = () => {
  const [animals, setAnimals] = useState<AnimalDto[]>();
  const [filter, setFilter] = useState<FilterDto>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(0);
  useEffect(() => {
    getAllAnimals(filter).then((data) => setAnimals(data));
  }, [filter.createdOnDate, filter.description, filter.lastModifiedOnDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllAnimals(filter).then((data) => setAnimals(data));
    }, 2500);

    return () => clearInterval(interval);
  }, [filter.createdOnDate, filter.description, filter.lastModifiedOnDate]);

  const onSearch = (value: string) => {
    setFilter(Object.assign(filter, { description: value }));
  };

  const onChangeCreated = (date: any, dateString: string) => {
    setFilter(Object.assign(filter, { createdOnDate: moment(dateString).format('DD/MM/yyyy') }));
  };

  const onChangeModified = (date: any, dateString: string) => {
    setFilter(
      Object.assign(filter, { lastModifiedOnDate: moment(dateString).format('DD/MM/yyyy') })
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
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="created on date"
            onChange={onChangeCreated}
          />
        </Col>
        <Col span={6}>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
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
        {animals?.map((x) => {
          return (
            <Col className="gutter-row" span={8} key={`col${x.id}`}>
              <Card
                key={`animal${x.id}`}
                style={{ width: 300, margin: '20px' }}
                cover={<img alt="animal" src={x.imageUrl} />}
                actions={[
                  <EllipsisOutlined
                    onClick={() => {
                      setSelectedAnimal(x.id);
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
      <AnimalInfoScreen
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={selectedAnimal}
      />
    </>
  );
};
