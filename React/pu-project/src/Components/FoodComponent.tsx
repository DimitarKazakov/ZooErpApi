import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Col, Row, Input, DatePicker, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FoodInfoScreen } from '../Screens/Info/FoodInfoScreen';
import { FilterDto } from '../Types/FilterDto';
import { FoodDto } from '../Types/Get/FoodDto';
import { getAllFoods } from '../Utils/Controllers/FoodController';

const { Search } = Input;

export const FoodComponent = () => {
  const [foods, setFoods] = useState<FoodDto[]>();
  const [filter, setFilter] = useState<FilterDto>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(0);
  useEffect(() => {
    getAllFoods(filter).then((data) => setFoods(data));
  }, [filter.createdOnDate, filter.description, filter.lastModifiedOnDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllFoods(filter).then((data) => setFoods(data));
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
        {foods?.map((x) => {
          return (
            <Col className="gutter-row" span={8} key={`col${x.id}`}>
              <Card
                key={`food${x.id}`}
                style={{ width: 300, margin: '20px' }}
                cover={<img alt="food" src={x.imageUrl} />}
                actions={[
                  <EllipsisOutlined
                    onClick={() => {
                      setSelectedFood(x.id);
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
      <FoodInfoScreen
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={selectedFood}
      />
    </>
  );
};
