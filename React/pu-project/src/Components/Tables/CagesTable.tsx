import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { CageInfoScreen } from '../../Screens/Info/CageInfoScreen';
import { UpdateCageScreen } from '../../Screens/Update/UpdateVodyStyleScreen';
import { FilterDto } from '../../Types/FilterDto';
import { CageDto } from '../../Types/Get/CageDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteCage, getAllCages } from '../../Utils/Controllers/CageController';
import { CageForm } from '../Forms/Create/CageForm';
import { ModalForm } from '../ModalForm';

export const CagesTable = () => {
  const [filters, setFilters] = useState<FilterDto>({});
  const [cages, setCages] = useState<CageDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateCageVisible, setIsUpdateCageVisible] = useState(false);
  const [isCageInfoVisible, setIsCageInfoVisible] = useState(false);
  const [selectedCageId, setSelectedCageId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedCageId(id);
    setIsUpdateCageVisible(true);
    setIsCreateModalVisible(false);
    setIsCageInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteCage(id);
  };

  const columns: ColumnType<CageDto>[] = [
    {
      title: 'Name',
      dataIndex: nameof<CageDto>((x) => x.name),
      key: nameof<CageDto>((x) => x.name),
      filters: Array.from(new Set(cages.map((x) => x.name))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedCageId(record.id);
            setIsUpdateCageVisible(false);
            setIsCreateModalVisible(false);
            setIsCageInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Area',
      dataIndex: nameof<CageDto>((x) => x.area),
      key: nameof<CageDto>((x) => x.area),
      sorter: (a, b) => a.area - b.area,
    },
    {
      title: 'Type',
      dataIndex: nameof<CageDto>((x) => x.type),
      key: nameof<CageDto>((x) => x.type),
      filters: Array.from(new Set(cages.map((x) => x.type))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Capacity',
      dataIndex: nameof<CageDto>((x) => x.capacity),
      key: nameof<CageDto>((x) => x.capacity),
      sorter: (a, b) => a.capacity - b.capacity,
    },
    {
      title: 'Location',
      dataIndex: nameof<CageDto>((x) => x.location),
      key: nameof<CageDto>((x) => x.location),
      filters: Array.from(new Set(cages.map((x) => x.location))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.location.indexOf(value as string) === 0,
      sorter: (a, b) => a.location.length - b.location.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Rating',
      dataIndex: nameof<CageDto>((x) => x.rating),
      key: nameof<CageDto>((x) => x.rating),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Description',
      dataIndex: nameof<CageDto>((x) => x.description),
      key: nameof<CageDto>((x) => x.description),
      filters: Array.from(new Set(cages.map((x) => x.description))).map(
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
    getAllCages(filters).then((data) => setCages(data));
  }, [filters]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllCages(filters).then((data) => setCages(data));
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
            content={<CageForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Cage"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedCageId !== 0 && (
        <UpdateCageScreen
          visible={isUpdateCageVisible}
          setIsModalVisible={setIsUpdateCageVisible}
          id={selectedCageId}
        />
      )}
      <CageInfoScreen
        visible={isCageInfoVisible}
        setIsModalVisible={setIsCageInfoVisible}
        id={selectedCageId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<CageDto>((x) => x.id)}
        columns={columns}
        dataSource={cages}
      />
    </>
  );
};
