import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { CarInfoScreen } from '../../Screens/Info/CarInfoScreen';
import { UpdateCarExtrasScreen } from '../../Screens/Update/UpdateCarExtrasScreen';
import { UpdateCarScreen } from '../../Screens/Update/UpdateCarScreen';
import { UpdateCarTunningsScreen } from '../../Screens/Update/UpdateCarTunningsScreen';
import { CarDto } from '../../Types/Get/CarDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteCar, getAllCars } from '../../Utils/Controllers/CarController';
import { CarForm } from '../Forms/Create/CarForm';
import { ModalForm } from '../ModalForm';

export const CarTable = () => {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateCarVisible, setIsUpdateCarVisible] = useState(false);
  const [isUpdateCarExtrasVisible, setIsUpdateCarExtrasVisible] = useState(false);
  const [isUpdateCarTunningsVisible, setIsUpdateCarTunningsVisible] = useState(false);
  const [isCarInfoVisible, setIsCarInfoVisible] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedCarId(id);
    setIsUpdateCarVisible(true);
    setIsCreateModalVisible(false);
    setIsUpdateCarExtrasVisible(false);
    setIsUpdateCarTunningsVisible(false);
    setIsCarInfoVisible(false);
  };

  const openUpdateExtrasForm = (id: number) => {
    setSelectedCarId(id);
    setIsUpdateCarVisible(false);
    setIsCreateModalVisible(false);
    setIsUpdateCarExtrasVisible(true);
    setIsUpdateCarTunningsVisible(false);
    setIsCarInfoVisible(false);
  };

  const openUpdateTunningsForm = (id: number) => {
    setSelectedCarId(id);
    setIsUpdateCarVisible(false);
    setIsCreateModalVisible(false);
    setIsUpdateCarExtrasVisible(false);
    setIsUpdateCarTunningsVisible(true);
    setIsCarInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteCar(id);
  };

  const columns: ColumnType<CarDto>[] = [
    {
      title: 'Model',
      dataIndex: nameof<CarDto>((x) => x.model),
      key: nameof<CarDto>((x) => x.model),
      filters: Array.from(new Set(cars.map((x) => x.model))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.model.indexOf(value as string) === 0,
      sorter: (a, b) => a.model.length - b.model.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedCarId(record.id);
            setIsUpdateCarVisible(false);
            setIsCreateModalVisible(false);
            setIsCarInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Power',
      dataIndex: nameof<CarDto>((x) => x.power),
      key: nameof<CarDto>((x) => x.power),
      sorter: (a, b) => a.power - b.power,
    },
    {
      title: 'Year',
      dataIndex: nameof<CarDto>((x) => x.year),
      key: nameof<CarDto>((x) => x.year),
    },
    {
      title: 'Price',
      dataIndex: nameof<CarDto>((x) => x.price),
      key: nameof<CarDto>((x) => x.price),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Created On',
      dataIndex: nameof<CarDto>((x) => x.createdOn),
      key: nameof<CarDto>((x) => x.createdOn),
    },
    {
      title: 'Created By',
      dataIndex: nameof<CarDto>((x) => x.createdBy),
      key: nameof<CarDto>((x) => x.createdBy),
      filters: Array.from(new Set(cars.map((x) => x.createdBy))).map(
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
              <Popconfirm title="Are you sure." onConfirm={() => deleteRow(record.id)}>
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
              <Button onClick={() => openUpdateExtrasForm(record.id)} type="primary">
                Update Extras
              </Button>
              <Button onClick={() => openUpdateTunningsForm(record.id)} type="primary">
                Update Tunnings
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

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
      {roles.includes('Administrator') && (
        <>
          <Button
            style={{ maxWidth: '15%', margin: '10px' }}
            type="primary"
            onClick={() => setIsCreateModalVisible(true)}
          >
            Create New Car
          </Button>
          <ModalForm
            content={<CarForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Car"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedCarId !== 0 && (
        <>
          <UpdateCarScreen
            visible={isUpdateCarVisible}
            setIsModalVisible={setIsUpdateCarVisible}
            id={selectedCarId}
          />
          <UpdateCarExtrasScreen
            visible={isUpdateCarExtrasVisible}
            setIsModalVisible={setIsUpdateCarExtrasVisible}
            id={selectedCarId}
          />
          <UpdateCarTunningsScreen
            visible={isUpdateCarTunningsVisible}
            setIsModalVisible={setIsUpdateCarTunningsVisible}
            id={selectedCarId}
          />
        </>
      )}
      <CarInfoScreen
        visible={isCarInfoVisible}
        setIsModalVisible={setIsCarInfoVisible}
        id={selectedCarId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<CarDto>((x) => x.id)}
        columns={columns}
        dataSource={cars}
      />
    </>
  );
};
