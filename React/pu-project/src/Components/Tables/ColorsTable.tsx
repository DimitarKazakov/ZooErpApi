import React from 'react';
import { Table, Badge, Button, Space, Popconfirm } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { ColorDto } from '../../Types/Get/ColorDto';
import { deleteColor, getAllColors } from '../../Utils/Controllers/ColorController';
import { ColorForm } from '../Forms/Create/ColorForm';
import { ModalForm } from '../ModalForm';
import { getUserRoles } from '../../Utils/authentication';
import { ColumnType } from 'antd/lib/table';
import { UpdateColorScreen } from '../../Screens/Update/UpdateColorScreen';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { ColorInfoScreen } from '../../Screens/Info/ColorInfoScreen';

export const ColorsTable = () => {
  const [colors, setColors] = useState<ColorDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateColorVisible, setIsUpdateColorVisible] = useState(false);
  const [isColorInfoVisible, setIsColorInfoVisible] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedColorId(id);
    setIsUpdateColorVisible(true);
    setIsCreateModalVisible(false);
    setIsColorInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteColor(id);
  };

  const columns: ColumnType<ColorDto>[] = [
    {
      title: 'Color Code',
      dataIndex: nameof<ColorDto>((x) => x.code),
      key: nameof<ColorDto>((x) => x.code),
      render: (x: string) => <Badge color={x} text={x} />,
      filters: Array.from(new Set(colors.map((x) => x.code))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.code.indexOf(value as string) === 0,
      sorter: (a, b) => a.code.length - b.code.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedColorId(record.id);
            setIsUpdateColorVisible(false);
            setIsCreateModalVisible(false);
            setIsColorInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Cars With This Color',
      dataIndex: nameof<ColorDto>((x) => x.numberOfCars),
      key: nameof<ColorDto>((x) => x.numberOfCars),
      sorter: (a, b) => a.numberOfCars - b.numberOfCars,
    },
    {
      title: 'Created On',
      dataIndex: nameof<ColorDto>((x) => x.createdOn),
      key: nameof<ColorDto>((x) => x.createdOn),
    },
    {
      title: 'Created By',
      dataIndex: nameof<ColorDto>((x) => x.createdBy),
      key: nameof<ColorDto>((x) => x.createdBy),
      filters: Array.from(new Set(colors.map((x) => x.createdBy))).map(
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
                title="Are you sure. You will delete all cars with that color"
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
    getAllColors().then((data) => setColors(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllColors().then((data) => setColors(data));
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
            Create New Color
          </Button>
          <ModalForm
            content={<ColorForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Color"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedColorId !== 0 && (
        <UpdateColorScreen
          visible={isUpdateColorVisible}
          setIsModalVisible={setIsUpdateColorVisible}
          id={selectedColorId}
        />
      )}
      <ColorInfoScreen
        visible={isColorInfoVisible}
        setIsModalVisible={setIsColorInfoVisible}
        id={selectedColorId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<ColorDto>((x) => x.id)}
        columns={columns}
        dataSource={colors}
      />
    </>
  );
};
