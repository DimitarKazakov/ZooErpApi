import { List, Typography, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { ExtraDto } from '../../Types/Get/ExtraDto';
import { getExtraById } from '../../Utils/Controllers/ExtraController';

export const ExtraView = (props: { id: number }) => {
  const [extra, setExtra] = useState<ExtraDto>();

  const { id } = props;

  useEffect(() => {
    getExtraById(id).then((data) => setExtra(data));
  }, [id]);

  return (
    <>
      <Image width={200} src={extra?.imageUrl} />
      <List header={<div>Info about Extra # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Name</Typography.Text> - {extra?.name}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Brand</Typography.Text> - {extra?.brand}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Usual Price</Typography.Text> - {extra?.usualPrice} lv.
        </List.Item>
        <List.Item>
          <Typography.Text mark>Description</Typography.Text> - {extra?.description}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Cars with that extra</Typography.Text> - {extra?.numberOfCars}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {extra?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {extra?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {extra?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {extra?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
