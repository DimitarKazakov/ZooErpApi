import { List, Typography, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { TuningDto } from '../../Types/Get/TuningDto';
import { getTuningById } from '../../Utils/Controllers/TuningController';

export const TunningView = (props: { id: number }) => {
  const [tunning, setTunning] = useState<TuningDto>();

  const { id } = props;

  useEffect(() => {
    getTuningById(id).then((data) => setTunning(data));
  }, [id]);

  return (
    <>
      <Image width={200} src={tunning?.imageUrl} />
      <List header={<div>Info about Tunning # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Name</Typography.Text> - {tunning?.name}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Brand</Typography.Text> - {tunning?.brand}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Function</Typography.Text> - {tunning?.function}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Description</Typography.Text> - {tunning?.description}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Cars with that tunning</Typography.Text> - {tunning?.numberOfCars}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {tunning?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {tunning?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {tunning?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {tunning?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
