import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { ConditionInfoScreen } from '../../Screens/Info/ConditionInfoScreen';
import { UpdateConditionScreen } from '../../Screens/Update/UpdateConditionScreen';
import { ConditionDto } from '../../Types/Get/ConditionDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteCondition, getAllConditions } from '../../Utils/Controllers/ConditionController';
import { ConditionForm } from '../Forms/Create/ConditionForm';
import { ModalForm } from '../ModalForm';

export const ConditionTable = () => {
  const [conditions, setConditions] = useState<ConditionDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateConditionVisible, setIsUpdateConditionVisible] = useState(false);
  const [isConditionInfoVisible, setIsConditionInfoVisible] = useState(false);
  const [selectedConditionId, setSelectedConditionId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedConditionId(id);
    setIsUpdateConditionVisible(true);
    setIsCreateModalVisible(false);
    setIsConditionInfoVisible(true);
  };

  const deleteRow = async (id: number) => {
    await deleteCondition(id);
  };

  const columns: ColumnType<ConditionDto>[] = [
    {
      title: 'Name',
      dataIndex: nameof<ConditionDto>((x) => x.name),
      key: nameof<ConditionDto>((x) => x.name),
      filters: Array.from(new Set(conditions.map((x) => x.name))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedConditionId(record.id);
            setIsUpdateConditionVisible(false);
            setIsCreateModalVisible(false);
            setIsConditionInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Cars With This Level',
      dataIndex: nameof<ConditionDto>((x) => x.numberOfCars),
      key: nameof<ConditionDto>((x) => x.numberOfCars),
      sorter: (a, b) => a.numberOfCars - b.numberOfCars,
    },
    {
      title: 'Reason',
      dataIndex: nameof<ConditionDto>((x) => x.reason),
      key: nameof<ConditionDto>((x) => x.reason),
    },
    {
      title: 'Created On',
      dataIndex: nameof<ConditionDto>((x) => x.createdOn),
      key: nameof<ConditionDto>((x) => x.createdOn),
    },
    {
      title: 'Created By',
      dataIndex: nameof<ConditionDto>((x) => x.createdBy),
      key: nameof<ConditionDto>((x) => x.createdBy),
      filters: Array.from(new Set(conditions.map((x) => x.createdBy))).map(
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
                title="Are you sure. You will delete all cars with that condition"
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
    getAllConditions().then((data) => setConditions(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllConditions().then((data) => setConditions(data));
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
            Create New Condition
          </Button>
          <ModalForm
            content={<ConditionForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Condition"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedConditionId !== 0 && (
        <UpdateConditionScreen
          visible={isUpdateConditionVisible}
          setIsModalVisible={setIsUpdateConditionVisible}
          id={selectedConditionId}
        />
      )}
      <ConditionInfoScreen
        visible={isConditionInfoVisible}
        setIsModalVisible={setIsConditionInfoVisible}
        id={selectedConditionId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<ConditionDto>((x) => x.id)}
        columns={columns}
        dataSource={conditions}
      />
    </>
  );
};
