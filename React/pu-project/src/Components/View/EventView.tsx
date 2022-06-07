import { List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FilterDto } from '../../Types/FilterDto';
import { EventDto } from '../../Types/Get/EventDto';
import { getAllEvents } from '../../Utils/Controllers/EventController';

export const EventView = (props: { id: number }) => {
  const [event, setEvent] = useState<EventDto>();

  const { id } = props;
  const filter: FilterDto = {
    id: id,
  };

  useEffect(() => {
    getAllEvents(filter).then((data) => setEvent(data[0]));
  }, [id]);

  return (
    <>
      <List header={<div>Info about Event # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Type</Typography.Text> - {event?.type}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Cage</Typography.Text> - {event?.cage}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Description</Typography.Text> - {event?.description}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {event?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {event?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {event?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {event?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
