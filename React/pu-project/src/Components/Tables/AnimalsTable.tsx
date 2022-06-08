import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { AnimalInfoScreen } from '../../Screens/Info/AnimalInfoScreen';
import { UpdateAnimalScreen } from '../../Screens/Update/UpdateAnimalScreen';
import { FilterDto } from '../../Types/FilterDto';
import { AnimalDto } from '../../Types/Get/AnimalDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteAnimal, getAllAnimals } from '../../Utils/Controllers/AnimalController';
import { AnimalForm } from '../Forms/Create/AnimalForm';
import { ModalForm } from '../ModalForm';

export const AnimalsTable = () => {
  const [filters, setFilters] = useState<FilterDto>({});
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateAnimalVisible, setIsUpdateAnimalVisible] = useState(false);
  const [isAnimalInfoVisible, setIsAnimalInfoVisible] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedAnimalId(id);
    setIsUpdateAnimalVisible(true);
    setIsCreateModalVisible(false);
    setIsAnimalInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteAnimal(id);
  };

  const columns: ColumnType<AnimalDto>[] = [
    {
      title: 'Name',
      dataIndex: nameof<AnimalDto>((x) => x.name),
      key: nameof<AnimalDto>((x) => x.name),
      filters: Array.from(new Set(animals.map((x) => x.name))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedAnimalId(record.id);
            setIsUpdateAnimalVisible(false);
            setIsCreateModalVisible(false);
            setIsAnimalInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Age',
      dataIndex: nameof<AnimalDto>((x) => x.age),
      key: nameof<AnimalDto>((x) => x.age),
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Animal Kingdom',
      dataIndex: nameof<AnimalDto>((x) => x.kingdomType),
      key: nameof<AnimalDto>((x) => x.kingdomType),
      filters: Array.from(new Set(animals.map((x) => x.kingdomType))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.kingdomType.indexOf(value as string) === 0,
      sorter: (a, b) => a.kingdomType.length - b.kingdomType.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Gender',
      dataIndex: nameof<AnimalDto>((x) => x.gender),
      key: nameof<AnimalDto>((x) => x.gender),
      filters: Array.from(new Set(animals.map((x) => x.gender))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.gender.indexOf(value as string) === 0,
      sorter: (a, b) => a.gender.length - b.gender.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Cage',
      dataIndex: nameof<AnimalDto>((x) => x.cage),
      key: nameof<AnimalDto>((x) => x.cage),
      filters: Array.from(new Set(animals.map((x) => x.cage))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.cage.indexOf(value as string) === 0,
      sorter: (a, b) => a.cage.length - b.cage.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Description',
      dataIndex: nameof<AnimalDto>((x) => x.description),
      key: nameof<AnimalDto>((x) => x.description),
      filters: Array.from(new Set(animals.map((x) => x.description))).map(
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
    getAllAnimals(filters).then((data) => setAnimals(data));
  }, [filters]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllAnimals(filters).then((data) => setAnimals(data));
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
            content={<AnimalForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Animal"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedAnimalId !== 0 && (
        <UpdateAnimalScreen
          visible={isUpdateAnimalVisible}
          setIsModalVisible={setIsUpdateAnimalVisible}
          id={selectedAnimalId}
        />
      )}
      <AnimalInfoScreen
        visible={isAnimalInfoVisible}
        setIsModalVisible={setIsAnimalInfoVisible}
        id={selectedAnimalId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<AnimalDto>((x) => x.id)}
        columns={columns}
        dataSource={animals}
      />
    </>
  );
};
