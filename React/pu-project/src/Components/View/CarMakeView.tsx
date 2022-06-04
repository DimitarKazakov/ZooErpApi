import { List, Typography, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { CarMakeDto } from '../../Types/Get/CarMakeDto';
import { getCarMakeById } from '../../Utils/Controllers/CarMakeController';

export const CarMakeView = (props: { id: number }) => {
  const [carMake, setCarMake] = useState<CarMakeDto>();

  const { id } = props;

  useEffect(() => {
    getCarMakeById(id).then((data) => setCarMake(data));
  }, [id]);

  return (
    <>
      <Image width={200} src={carMake?.imageUrl} />
      <List header={<div>Info about Car Make # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Name</Typography.Text> - {carMake?.name}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Full Name</Typography.Text> - {carMake?.fullName}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Description</Typography.Text> - {carMake?.description}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Founded In</Typography.Text> - {carMake?.foundedIn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Founded By</Typography.Text> - {carMake?.foundedBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Headquarters</Typography.Text> - {carMake?.headquarters}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Cars with that fuel</Typography.Text> - {carMake?.numberOfCars}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {carMake?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {carMake?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {carMake?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {carMake?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
