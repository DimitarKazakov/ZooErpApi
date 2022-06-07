import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { CageInfoScreen } from '../Screens/Info/CageInfoScreen';
import { CageDto } from '../Types/Get/CageDto';
import { getAllCages } from '../Utils/Controllers/CageController';

export const CageComponent = () => {
  const [cages, setCages] = useState<CageDto[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCage, setSelectedCage] = useState(0);
  useEffect(() => {
    getAllCages().then((data) => setCages(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllCages().then((data) => setCages(data));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
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
