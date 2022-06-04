import { List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { CarLevelDto } from '../../Types/Get/CarLevelDto';
import { getCarLevelById } from '../../Utils/Controllers/CarLevelController';

export const CarLevelView = (props: { id: number }) => {
  const [carLevel, setCarLevel] = useState<CarLevelDto>();

  const { id } = props;

  useEffect(() => {
    getCarLevelById(id).then((data) => setCarLevel(data));
  }, [id]);

  return (
    <>
      <List header={<div>Info about Car Level # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Name</Typography.Text> - {carLevel?.name}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Cars with that fuel</Typography.Text> - {carLevel?.numberOfCars}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {carLevel?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {carLevel?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {carLevel?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {carLevel?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
