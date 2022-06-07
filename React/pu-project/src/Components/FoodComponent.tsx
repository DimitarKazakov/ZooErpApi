import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { FoodInfoScreen } from '../Screens/Info/FoodInfoScreen';
import { FoodDto } from '../Types/Get/FoodDto';
import { getAllFoods } from '../Utils/Controllers/FoodController';

export const FoodComponent = () => {
  const [foods, setFoods] = useState<FoodDto[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(0);
  useEffect(() => {
    getAllFoods().then((data) => setFoods(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllFoods().then((data) => setFoods(data));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
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
