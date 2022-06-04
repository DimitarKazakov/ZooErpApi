import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { CarMakeInfoScreen } from '../../Screens/Info/CarMakeInfoScreen';
import { UpdateCarMakeScreen } from '../../Screens/Update/UpdateCarMakeScreen';
import { CarMakeDto } from '../../Types/Get/CarMakeDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteCarMake, getAllCarMakes } from '../../Utils/Controllers/CarMakeController';
import { CarMakeForm } from '../Forms/Create/CarMakeForm';
import { ModalForm } from '../ModalForm';

export const CarMakeTable = () => {
  const [carMakes, setCarMakes] = useState<CarMakeDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateCarMakeVisible, setIsUpdateCarMakeVisible] = useState(false);
  const [isCarMakeInfoVisible, setIsCarMakeInfoVisible] = useState(false);
  const [selectedCarMakeId, setSelectedCarMakeId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedCarMakeId(id);
    setIsUpdateCarMakeVisible(true);
    setIsCreateModalVisible(false);
    setIsCarMakeInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteCarMake(id);
  };

  const columns: ColumnType<CarMakeDto>[] = [
    {
      title: 'Name',
      dataIndex: nameof<CarMakeDto>((x) => x.name),
      key: nameof<CarMakeDto>((x) => x.name),
      filters: Array.from(new Set(carMakes.map((x) => x.name))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedCarMakeId(record.id);
            setIsUpdateCarMakeVisible(false);
            setIsCreateModalVisible(false);
            setIsCarMakeInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Headquarters',
      dataIndex: nameof<CarMakeDto>((x) => x.headquarters),
      key: nameof<CarMakeDto>((x) => x.headquarters),
    },
    {
      title: 'Number Of Cars',
      dataIndex: nameof<CarMakeDto>((x) => x.numberOfCars),
      key: nameof<CarMakeDto>((x) => x.numberOfCars),
      sorter: (a, b) => a.numberOfCars - b.numberOfCars,
    },
    {
      title: 'Created On',
      dataIndex: nameof<CarMakeDto>((x) => x.createdOn),
      key: nameof<CarMakeDto>((x) => x.createdOn),
    },
    {
      title: 'Created By',
      dataIndex: nameof<CarMakeDto>((x) => x.createdBy),
      key: nameof<CarMakeDto>((x) => x.createdBy),
      filters: Array.from(new Set(carMakes.map((x) => x.createdBy))).map(
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
                title="Are you sure. You will delete all cars with that car make"
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
    getAllCarMakes().then((data) => setCarMakes(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllCarMakes().then((data) => setCarMakes(data));
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
            Create New Car Make
          </Button>
          <ModalForm
            content={<CarMakeForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Car Make"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedCarMakeId !== 0 && (
        <UpdateCarMakeScreen
          visible={isUpdateCarMakeVisible}
          setIsModalVisible={setIsUpdateCarMakeVisible}
          id={selectedCarMakeId}
        />
      )}
      <CarMakeInfoScreen
        visible={isCarMakeInfoVisible}
        setIsModalVisible={setIsCarMakeInfoVisible}
        id={selectedCarMakeId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<CarMakeDto>((x) => x.id)}
        columns={columns}
        dataSource={carMakes}
      />
    </>
  );
};
