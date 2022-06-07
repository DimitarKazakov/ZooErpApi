import { List, Typography, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { FilterDto } from '../../Types/FilterDto';
import { FoodDto } from '../../Types/Get/FoodDto';
import { getAllFoods } from '../../Utils/Controllers/FoodController';

export const FoodView = (props: { id: number }) => {
  const [food, setFood] = useState<FoodDto>();

  const { id } = props;
  const filter: FilterDto = {
    id: id,
  };

  useEffect(() => {
    getAllFoods(filter).then((data) => setFood(data[0]));
  }, [id]);

  return (
    <>
      <Image width={200} src={food?.imageUrl} />
      <List header={<div>Info about Food # {food?.id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Name</Typography.Text> - {food?.name}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Calories</Typography.Text> - {food?.colories}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Type</Typography.Text> - {food?.type}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Quantity</Typography.Text> - {food?.quantity}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Usage</Typography.Text> - {food?.usageType}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Price</Typography.Text> - {food?.price} lv.
        </List.Item>
        <List.Item>
          <Typography.Text mark>Description</Typography.Text> - {food?.description}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Animals</Typography.Text> - {food?.animals.join(', ')}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {food?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {food?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {food?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {food?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
