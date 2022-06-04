import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { CarLevelInfoScreen } from '../../Screens/Info/CarLevelInfoScreen';
import { UpdateCarLevelScreen } from '../../Screens/Update/UpdateCarLevelScreen';
import { CarLevelDto } from '../../Types/Get/CarLevelDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteCarLevel, getAllCarLevels } from '../../Utils/Controllers/CarLevelController';
import { CarLevelForm } from '../Forms/Create/CarLevelForm';
import { ModalForm } from '../ModalForm';

export const CarLevelTable = () => {
  const [carLevels, setCarLevels] = useState<CarLevelDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateCarLevelVisible, setIsUpdateCarLevelVisible] = useState(false);
  const [isCarLevelInfoVisible, setIsCarLevelInfoVisible] = useState(false);
  const [selectedCarLevelId, setSelectedCarLevelId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedCarLevelId(id);
    setIsUpdateCarLevelVisible(true);
    setIsCreateModalVisible(false);
    setIsCarLevelInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteCarLevel(id);
  };

  const columns: ColumnType<CarLevelDto>[] = [
    {
      title: 'Name',
      dataIndex: nameof<CarLevelDto>((x) => x.name),
      key: nameof<CarLevelDto>((x) => x.name),
      filters: Array.from(new Set(carLevels.map((x) => x.name))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedCarLevelId(record.id);
            setIsUpdateCarLevelVisible(false);
            setIsCreateModalVisible(false);
            setIsCarLevelInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Cars With This Level',
      dataIndex: nameof<CarLevelDto>((x) => x.numberOfCars),
      key: nameof<CarLevelDto>((x) => x.numberOfCars),
      sorter: (a, b) => a.numberOfCars - b.numberOfCars,
    },
    {
      title: 'Created On',
      dataIndex: nameof<CarLevelDto>((x) => x.createdOn),
      key: nameof<CarLevelDto>((x) => x.createdOn),
    },
    {
      title: 'Created By',
      dataIndex: nameof<CarLevelDto>((x) => x.createdBy),
      key: nameof<CarLevelDto>((x) => x.createdBy),
      filters: Array.from(new Set(carLevels.map((x) => x.createdBy))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.createdBy.indexOf(value as string) === 0,
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (value, record) => (
        <Space size="middle">
          {roles.includes('Administrator') && (
            <>
              <Button onClick={() => openUpdateForm(record.id)} type="primary">
                Update
              </Button>
              <Popconfirm
                title="Are you sure. You will delete all cars with that car level"
                onConfirm={() => deleteRow(record.id)}
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllCarLevels().then((data) => setCarLevels(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllCarLevels().then((data) => setCarLevels(data));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {roles.includes('Administrator') && (
        <>
          <Button
            style={{ maxWidth: '15%', margin: '10px' }}
            type="primary"
            onClick={() => setIsCreateModalVisible(true)}
          >
            Create New Level
          </Button>
          <ModalForm
            content={<CarLevelForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Car Level"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedCarLevelId !== 0 && (
        <UpdateCarLevelScreen
          visible={isUpdateCarLevelVisible}
          setIsModalVisible={setIsUpdateCarLevelVisible}
          id={selectedCarLevelId}
        />
      )}
      <CarLevelInfoScreen
        visible={isCarLevelInfoVisible}
        setIsModalVisible={setIsCarLevelInfoVisible}
        id={selectedCarLevelId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<CarLevelDto>((x) => x.id)}
        columns={columns}
        dataSource={carLevels}
      />
    </>
  );
};
