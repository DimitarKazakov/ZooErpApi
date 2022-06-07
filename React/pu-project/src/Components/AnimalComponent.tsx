import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { AnimalInfoScreen } from '../Screens/Info/AnimalInfoScreen';
import { AnimalDto } from '../Types/Get/AnimalDto';
import { getAllAnimals } from '../Utils/Controllers/AnimalController';

export const AnimalComponent = () => {
  const [animals, setAnimals] = useState<AnimalDto[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(0);
  useEffect(() => {
    getAllAnimals().then((data) => setAnimals(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllAnimals().then((data) => setAnimals(data));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
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
