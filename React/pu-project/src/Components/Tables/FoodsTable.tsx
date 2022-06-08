import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { FoodInfoScreen } from '../../Screens/Info/FoodInfoScreen';
import { UpdateFoodScreen } from '../../Screens/Update/UpdateFoodScreen';
import { FilterDto } from '../../Types/FilterDto';
import { FoodDto } from '../../Types/Get/FoodDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteFood, getAllFoods } from '../../Utils/Controllers/FoodController';
import { FoodForm } from '../Forms/Create/FoodForm';
import { ModalForm } from '../ModalForm';

export const FoodsTable = () => {
  const [filters, setFilters] = useState<FilterDto>({});
  const [foods, setFoods] = useState<FoodDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateFoodVisible, setIsUpdateFoodVisible] = useState(false);
  const [isFoodInfoVisible, setIsFoodInfoVisible] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedFoodId(id);
    setIsUpdateFoodVisible(true);
    setIsCreateModalVisible(false);
    setIsFoodInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteFood(id);
  };

  const columns: ColumnType<FoodDto>[] = [
    {
      title: 'Name',
      dataIndex: nameof<FoodDto>((x) => x.name),
      key: nameof<FoodDto>((x) => x.name),
      filters: Array.from(new Set(foods.map((x) => x.name))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedFoodId(record.id);
            setIsUpdateFoodVisible(false);
            setIsCreateModalVisible(false);
            setIsFoodInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Quantity',
      dataIndex: nameof<FoodDto>((x) => x.quantity),
      key: nameof<FoodDto>((x) => x.quantity),
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Type',
      dataIndex: nameof<FoodDto>((x) => x.type),
      key: nameof<FoodDto>((x) => x.type),
      filters: Array.from(new Set(foods.map((x) => x.type))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Usage',
      dataIndex: nameof<FoodDto>((x) => x.usageType),
      key: nameof<FoodDto>((x) => x.usageType),
      filters: Array.from(new Set(foods.map((x) => x.usageType))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.usageType.indexOf(value as string) === 0,
      sorter: (a, b) => a.usageType.length - b.usageType.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Calories',
      dataIndex: nameof<FoodDto>((x) => x.colories),
      key: nameof<FoodDto>((x) => x.colories),
      sorter: (a, b) => a.colories - b.colories,
    },
    {
      title: 'Description',
      dataIndex: nameof<FoodDto>((x) => x.description),
      key: nameof<FoodDto>((x) => x.description),
      filters: Array.from(new Set(foods.map((x) => x.description))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.description.indexOf(value as string) === 0,
      sorter: (a, b) => a.description.length - b.description.length,
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
            </>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllFoods(filters).then((data) => setFoods(data));
  }, [filters]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllFoods(filters).then((data) => setFoods(data));
    }, 5000);

    return () => clearInterval(interval);
  }, [filters]);

  return (
    <>
      {roles.includes('Administrator') && (
        <>
          <Button
            style={{ maxWidth: '15%', margin: '10px' }}
            type="primary"
            onClick={() => setIsCreateModalVisible(true)}
          >
            Create
          </Button>
          <ModalForm
            content={<FoodForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Food"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedFoodId !== 0 && (
        <UpdateFoodScreen
          visible={isUpdateFoodVisible}
          setIsModalVisible={setIsUpdateFoodVisible}
          id={selectedFoodId}
        />
      )}
      <FoodInfoScreen
        visible={isFoodInfoVisible}
        setIsModalVisible={setIsFoodInfoVisible}
        id={selectedFoodId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<FoodDto>((x) => x.id)}
        columns={columns}
        dataSource={foods}
      />
    </>
  );
};
