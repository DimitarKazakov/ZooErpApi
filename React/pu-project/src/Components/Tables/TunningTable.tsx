import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { TunningInfoScreen } from '../../Screens/Info/TunningInfoScreen';
import { UpdateTunningScreen } from '../../Screens/Update/UpdateTunningScreen';
import { TuningDto } from '../../Types/Get/TuningDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteTuning, getAllTunings } from '../../Utils/Controllers/TuningController';
import { TunningForm } from '../Forms/Create/TunningForm';
import { ModalForm } from '../ModalForm';

export const TunningTable = () => {
  const [tunnings, setTunnings] = useState<TuningDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateTunningVisible, setIsUpdateTunningVisible] = useState(false);
  const [isTunningInfoVisible, setIsTunningInfoVisible] = useState(false);
  const [selectedTunningId, setSelectedTunningId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedTunningId(id);
    setIsUpdateTunningVisible(true);
    setIsCreateModalVisible(false);
    setIsTunningInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteTuning(id);
  };

  const columns: ColumnType<TuningDto>[] = [
    {
      title: 'Name',
      dataIndex: nameof<TuningDto>((x) => x.name),
      key: nameof<TuningDto>((x) => x.name),
      filters: Array.from(new Set(tunnings.map((x) => x.name))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedTunningId(record.id);
            setIsUpdateTunningVisible(false);
            setIsCreateModalVisible(false);
            setIsTunningInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Brand',
      dataIndex: nameof<TuningDto>((x) => x.brand),
      key: nameof<TuningDto>((x) => x.brand),
      filters: Array.from(new Set(tunnings.map((x) => x.brand))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.brand.indexOf(value as string) === 0,
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Cars With This Tunning',
      dataIndex: nameof<TuningDto>((x) => x.numberOfCars),
      key: nameof<TuningDto>((x) => x.numberOfCars),
      sorter: (a, b) => a.numberOfCars - b.numberOfCars,
    },
    {
      title: 'Created On',
      dataIndex: nameof<TuningDto>((x) => x.createdOn),
      key: nameof<TuningDto>((x) => x.createdOn),
    },
    {
      title: 'Created By',
      dataIndex: nameof<TuningDto>((x) => x.createdBy),
      key: nameof<TuningDto>((x) => x.createdBy),
      filters: Array.from(new Set(tunnings.map((x) => x.createdBy))).map(
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
                title="Are you sure. You will delete that tunning from all cars"
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
    getAllTunings().then((data) => setTunnings(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllTunings().then((data) => setTunnings(data));
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
            Create New Tunning
          </Button>
          <ModalForm
            content={<TunningForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Tunning"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedTunningId !== 0 && (
        <UpdateTunningScreen
          visible={isUpdateTunningVisible}
          setIsModalVisible={setIsUpdateTunningVisible}
          id={selectedTunningId}
        />
      )}
      <TunningInfoScreen
        visible={isTunningInfoVisible}
        setIsModalVisible={setIsTunningInfoVisible}
        id={selectedTunningId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<TuningDto>((x) => x.id)}
        columns={columns}
        dataSource={tunnings}
      />
    </>
  );
};
