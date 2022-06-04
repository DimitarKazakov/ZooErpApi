import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { ExtraInfoScreen } from '../../Screens/Info/ExtraInfoScreen';
import { UpdateExtraScreen } from '../../Screens/Update/UpdateExtraScreen';
import { ExtraDto } from '../../Types/Get/ExtraDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteExtra, getAllExtras } from '../../Utils/Controllers/ExtraController';
import { ExtraForm } from '../Forms/Create/ExtraForm';
import { ModalForm } from '../ModalForm';

export const ExtraTable = () => {
  const [extras, setExtras] = useState<ExtraDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateExtraVisible, setIsUpdateExtraVisible] = useState(false);
  const [isExtraInfoVisible, setIsExtraInfoVisible] = useState(false);
  const [selectedExtraId, setSelectedExtraId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedExtraId(id);
    setIsUpdateExtraVisible(true);
    setIsCreateModalVisible(false);
    setIsExtraInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteExtra(id);
  };

  const columns: ColumnType<ExtraDto>[] = [
    {
      title: 'Name',
      dataIndex: nameof<ExtraDto>((x) => x.name),
      key: nameof<ExtraDto>((x) => x.name),
      filters: Array.from(new Set(extras.map((x) => x.name))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedExtraId(record.id);
            setIsUpdateExtraVisible(false);
            setIsCreateModalVisible(false);
            setIsExtraInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Brand',
      dataIndex: nameof<ExtraDto>((x) => x.brand),
      key: nameof<ExtraDto>((x) => x.brand),
      filters: Array.from(new Set(extras.map((x) => x.brand))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.brand.indexOf(value as string) === 0,
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Cars With This Extra',
      dataIndex: nameof<ExtraDto>((x) => x.numberOfCars),
      key: nameof<ExtraDto>((x) => x.numberOfCars),
      sorter: (a, b) => a.numberOfCars - b.numberOfCars,
    },
    {
      title: 'Usual Price',
      dataIndex: nameof<ExtraDto>((x) => x.usualPrice),
      key: nameof<ExtraDto>((x) => x.usualPrice),
      sorter: (a, b) => a.usualPrice - b.usualPrice,
    },
    {
      title: 'Created On',
      dataIndex: nameof<ExtraDto>((x) => x.createdOn),
      key: nameof<ExtraDto>((x) => x.createdOn),
    },
    {
      title: 'Created By',
      dataIndex: nameof<ExtraDto>((x) => x.createdBy),
      key: nameof<ExtraDto>((x) => x.createdBy),
      filters: Array.from(new Set(extras.map((x) => x.createdBy))).map(
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
                title="Are you sure. You will delete that extra from all cars"
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
    getAllExtras().then((data) => setExtras(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllExtras().then((data) => setExtras(data));
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
            Create New Extra
          </Button>
          <ModalForm
            content={<ExtraForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Extra"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedExtraId !== 0 && (
        <UpdateExtraScreen
          visible={isUpdateExtraVisible}
          setIsModalVisible={setIsUpdateExtraVisible}
          id={selectedExtraId}
        />
      )}
      <ExtraInfoScreen
        visible={isExtraInfoVisible}
        setIsModalVisible={setIsExtraInfoVisible}
        id={selectedExtraId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<ExtraDto>((x) => x.id)}
        columns={columns}
        dataSource={extras}
      />
    </>
  );
};
