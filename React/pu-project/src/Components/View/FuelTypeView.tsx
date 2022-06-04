import { List, Typography, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { FuelTypeDto } from '../../Types/Get/FuelTypeDto';
import { getFuelTypeById } from '../../Utils/Controllers/FuelTypeController';

export const FuelTypeView = (props: { id: number }) => {
  const [fuelType, setFuelType] = useState<FuelTypeDto>();

  const { id } = props;

  useEffect(() => {
    getFuelTypeById(id).then((data) => setFuelType(data));
  }, [id]);

  return (
    <>
      <List header={<div>Info about Fuel Type # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Fuel</Typography.Text> - {fuelType?.fuel}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Current Price</Typography.Text> - {fuelType?.currentPrice} lv.
        </List.Item>
        <List.Item>
          <Typography.Text mark>Cars with that fuel</Typography.Text> - {fuelType?.numberOfCars}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {fuelType?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {fuelType?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {fuelType?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {fuelType?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
