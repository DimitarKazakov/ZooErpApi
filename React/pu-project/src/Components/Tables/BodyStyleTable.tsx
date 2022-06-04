import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { BodyStyleInfoScreen } from '../../Screens/Info/BodyStyleInfoScreen';
import { UpdateBodyStyleScreen } from '../../Screens/Update/UpdateVodyStyleScreen';
import { BodyStyleDto } from '../../Types/Get/BodyStyleDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteBodyStyle, getAllBodyStyles } from '../../Utils/Controllers/BodyStyleController';
import { BodyStyleForm } from '../Forms/Create/BodyStyleForm';
import { ModalForm } from '../ModalForm';

export const BodyStyleTable = () => {
  const [bodyStyles, setBodyStyles] = useState<BodyStyleDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateBodyStyleVisible, setIsUpdateBodyStyleVisible] = useState(false);
  const [isBodyStyleInfoVisible, setIsBodyStyleInfoVisible] = useState(false);
  const [selectedBodyStyleId, setSelectedBodyStyleId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedBodyStyleId(id);
    setIsUpdateBodyStyleVisible(true);
    setIsCreateModalVisible(false);
    setIsBodyStyleInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteBodyStyle(id);
  };

  const columns: ColumnType<BodyStyleDto>[] = [
    {
      title: 'Name',
      dataIndex: nameof<BodyStyleDto>((x) => x.name),
      key: nameof<BodyStyleDto>((x) => x.name),
      filters: Array.from(new Set(bodyStyles.map((x) => x.name))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedBodyStyleId(record.id);
            setIsUpdateBodyStyleVisible(false);
            setIsCreateModalVisible(false);
            setIsBodyStyleInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Cars With This Body Style',
      dataIndex: nameof<BodyStyleDto>((x) => x.numberOfCars),
      key: nameof<BodyStyleDto>((x) => x.numberOfCars),
      sorter: (a, b) => a.numberOfCars - b.numberOfCars,
    },
    {
      title: 'Created On',
      dataIndex: nameof<BodyStyleDto>((x) => x.createdOn),
      key: nameof<BodyStyleDto>((x) => x.createdOn),
    },
    {
      title: 'Created By',
      dataIndex: nameof<BodyStyleDto>((x) => x.createdBy),
      key: nameof<BodyStyleDto>((x) => x.createdBy),
      filters: Array.from(new Set(bodyStyles.map((x) => x.createdBy))).map(
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
                title="Are you sure. You will delete all cars with that body style"
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
    getAllBodyStyles().then((data) => setBodyStyles(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllBodyStyles().then((data) => setBodyStyles(data));
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
            Create New Body Style
          </Button>
          <ModalForm
            content={<BodyStyleForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Body Style"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedBodyStyleId !== 0 && (
        <UpdateBodyStyleScreen
          visible={isUpdateBodyStyleVisible}
          setIsModalVisible={setIsUpdateBodyStyleVisible}
          id={selectedBodyStyleId}
        />
      )}
      <BodyStyleInfoScreen
        visible={isBodyStyleInfoVisible}
        setIsModalVisible={setIsBodyStyleInfoVisible}
        id={selectedBodyStyleId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<BodyStyleDto>((x) => x.id)}
        columns={columns}
        dataSource={bodyStyles}
      />
    </>
  );
};
