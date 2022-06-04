import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { FuelTypeInfoScreen } from '../../Screens/Info/FuelTypeInfoScreen';
import { UpdateFuelTypeScreen } from '../../Screens/Update/UpdateFuelTypeScreen';
import { FuelTypeDto } from '../../Types/Get/FuelTypeDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteFuelType, getAllFuelTypes } from '../../Utils/Controllers/FuelTypeController';
import { FuelTypeForm } from '../Forms/Create/FuelTypeForm';
import { ModalForm } from '../ModalForm';

export const FuelTypeTable = () => {
  const [fuelTypes, setFuelTypes] = useState<FuelTypeDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateFuelTypeVisible, setIsUpdateFuelTypeVisible] = useState(false);
  const [isFuelTypeInfoVisible, setIsFuelTypeInfoVisible] = useState(false);
  const [selectedFuelTypeId, setSelectedFuelTypeId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedFuelTypeId(id);
    setIsUpdateFuelTypeVisible(true);
    setIsCreateModalVisible(false);
    setIsFuelTypeInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteFuelType(id);
  };

  const columns: ColumnType<FuelTypeDto>[] = [
    {
      title: 'Fuel',
      dataIndex: nameof<FuelTypeDto>((x) => x.fuel),
      key: nameof<FuelTypeDto>((x) => x.fuel),
      filters: Array.from(new Set(fuelTypes.map((x) => x.fuel))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.fuel.indexOf(value as string) === 0,
      sorter: (a, b) => a.fuel.length - b.fuel.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedFuelTypeId(record.id);
            setIsUpdateFuelTypeVisible(false);
            setIsCreateModalVisible(false);
            setIsFuelTypeInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Current Price',
      dataIndex: nameof<FuelTypeDto>((x) => x.currentPrice),
      key: nameof<FuelTypeDto>((x) => x.currentPrice),
    },
    {
      title: 'Cars With This Fuel',
      dataIndex: nameof<FuelTypeDto>((x) => x.numberOfCars),
      key: nameof<FuelTypeDto>((x) => x.numberOfCars),
      sorter: (a, b) => a.numberOfCars - b.numberOfCars,
    },
    {
      title: 'Created On',
      dataIndex: nameof<FuelTypeDto>((x) => x.createdOn),
      key: nameof<FuelTypeDto>((x) => x.createdOn),
    },
    {
      title: 'Created By',
      dataIndex: nameof<FuelTypeDto>((x) => x.createdBy),
      key: nameof<FuelTypeDto>((x) => x.createdBy),
      filters: Array.from(new Set(fuelTypes.map((x) => x.createdBy))).map(
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
                title="Are you sure. You will delete all cars with that fuel type"
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
    getAllFuelTypes().then((data) => setFuelTypes(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllFuelTypes().then((data) => setFuelTypes(data));
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
            Create New Fuel Type
          </Button>
          <ModalForm
            content={<FuelTypeForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Fuel Type"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedFuelTypeId !== 0 && (
        <UpdateFuelTypeScreen
          visible={isUpdateFuelTypeVisible}
          setIsModalVisible={setIsUpdateFuelTypeVisible}
          id={selectedFuelTypeId}
        />
      )}
      <FuelTypeInfoScreen
        visible={isFuelTypeInfoVisible}
        setIsModalVisible={setIsFuelTypeInfoVisible}
        id={selectedFuelTypeId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<FuelTypeDto>((x) => x.id)}
        columns={columns}
        dataSource={fuelTypes}
      />
    </>
  );
};
