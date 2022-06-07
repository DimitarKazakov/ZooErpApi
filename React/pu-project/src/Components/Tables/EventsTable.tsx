import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import React, { useEffect, useState } from 'react';
import { nameof } from 'ts-simple-nameof';
import { EventInfoScreen } from '../../Screens/Info/EventInfoScreen';
import { UpdateEventScreen } from '../../Screens/Update/UpdateVodyStyleScreen';
import { FilterDto } from '../../Types/FilterDto';
import { EventDto } from '../../Types/Get/EventDto';
import { getUserRoles } from '../../Utils/authentication';
import { deleteEvent, getAllEvents } from '../../Utils/Controllers/EventController';
import { EventForm } from '../Forms/Create/EventForm';
import { ModalForm } from '../ModalForm';

export const EventsTable = () => {
  const [filters, setFilters] = useState<FilterDto>({});
  const [events, setEvents] = useState<EventDto[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateEventVisible, setIsUpdateEventVisible] = useState(false);
  const [isEventInfoVisible, setIsEventInfoVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const roles = getUserRoles();

  const openUpdateForm = (id: number) => {
    setSelectedEventId(id);
    setIsUpdateEventVisible(true);
    setIsCreateModalVisible(false);
    setIsEventInfoVisible(false);
  };

  const deleteRow = async (id: number) => {
    await deleteEvent(id);
  };

  const columns: ColumnType<EventDto>[] = [
    {
      title: 'Type',
      dataIndex: nameof<EventDto>((x) => x.type),
      key: nameof<EventDto>((x) => x.type),
      filters: Array.from(new Set(events.map((x) => x.type))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ['descend'],
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            setSelectedEventId(record.id);
            setIsUpdateEventVisible(false);
            setIsCreateModalVisible(false);
            setIsEventInfoVisible(true);
          },
        };
      },
    },
    {
      title: 'Cage',
      dataIndex: nameof<EventDto>((x) => x.cage),
      key: nameof<EventDto>((x) => x.cage),
      filters: Array.from(new Set(events.map((x) => x.cage))).map(
        (x) => ({ text: x, value: x } as ColumnFilterItem)
      ),
      filterSearch: true,
      onFilter: (value, record) => record.cage.indexOf(value as string) === 0,
      sorter: (a, b) => a.cage.length - b.cage.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Description',
      dataIndex: nameof<EventDto>((x) => x.description),
      key: nameof<EventDto>((x) => x.description),
      filters: Array.from(new Set(events.map((x) => x.description))).map(
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
    getAllEvents(filters).then((data) => setEvents(data));
  }, [filters]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllEvents(filters).then((data) => setEvents(data));
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
            content={<EventForm setIsModalVisible={setIsCreateModalVisible} />}
            visible={isCreateModalVisible}
            name="Create Event"
            setIsModalVisible={setIsCreateModalVisible}
          />
        </>
      )}
      {roles.includes('Administrator') && selectedEventId !== 0 && (
        <UpdateEventScreen
          visible={isUpdateEventVisible}
          setIsModalVisible={setIsUpdateEventVisible}
          id={selectedEventId}
        />
      )}
      <EventInfoScreen
        visible={isEventInfoVisible}
        setIsModalVisible={setIsEventInfoVisible}
        id={selectedEventId}
      />
      <Table
        pagination={{ pageSize: 8 }}
        rowKey={nameof<EventDto>((x) => x.id)}
        columns={columns}
        dataSource={events}
      />
    </>
  );
};
