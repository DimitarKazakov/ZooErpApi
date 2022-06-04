import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { CarInfoScreen } from '../Screens/Info/CarInfoScreen';
import { CarDto } from '../Types/Get/CarDto';
import { getAllCars } from '../Utils/Controllers/CarController';

const style = { background: '#0092ff', padding: '8px 0' };

export const Hello = () => {
  const [cars, setCars] = useState<CarDto[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(0);
  useEffect(() => {
    getAllCars().then((data) => setCars(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllCars().then((data) => setCars(data));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Row gutter={16}>
        {cars?.map((x) => {
          return (
            <Col className="gutter-row" span={8} key={`col${x.id}`}>
              <Card
                key={`car${x.id}`}
                style={{ width: 300, margin: '20px' }}
                cover={<img alt="car" src={x.imageUrl} />}
                actions={[
                  <EllipsisOutlined
                    onClick={() => {
                      setSelectedCar(x.id);
                      setIsModalVisible(true);
                    }}
                    key="ellipsis"
                  />,
                ]}
              >
                <Meta title={x.model} description={`${x.price} lv.`} />
              </Card>
            </Col>
          );
        })}
      </Row>
      <CarInfoScreen
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={selectedCar}
      />
    </>
  );
};
