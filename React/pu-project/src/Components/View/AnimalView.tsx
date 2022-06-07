import { List, Typography, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { FilterDto } from '../../Types/FilterDto';
import { AnimalDto } from '../../Types/Get/AnimalDto';
import { getAllAnimals } from '../../Utils/Controllers/AnimalController';

export const AnimalView = (props: { id: number }) => {
  const [animal, setAnimal] = useState<AnimalDto>();

  const { id } = props;
  const filter: FilterDto = {
    id: id,
  };

  useEffect(() => {
    getAllAnimals(filter).then((data) => setAnimal(data[0]));
  }, [id]);

  return (
    <>
      <Image width={200} src={animal?.imageUrl} />
      <List header={<div>Info about Animal # {animal?.id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Name</Typography.Text> - {animal?.name}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Age</Typography.Text> - {animal?.age}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Gender</Typography.Text> - {animal?.gender}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Kingdom</Typography.Text> - {animal?.kingdomType}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Price</Typography.Text> - {animal?.price} lv.
        </List.Item>
        <List.Item>
          <Typography.Text mark>Description</Typography.Text> - {animal?.description}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Foods</Typography.Text> - {animal?.foods.join(', ')}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {animal?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {animal?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {animal?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {animal?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
