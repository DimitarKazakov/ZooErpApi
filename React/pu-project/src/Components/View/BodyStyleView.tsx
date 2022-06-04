import { List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { BodyStyleDto } from '../../Types/Get/BodyStyleDto';
import { getBodyStyleById } from '../../Utils/Controllers/BodyStyleController';

export const BodyStyleView = (props: { id: number }) => {
  const [bodyStyle, setBodyStyle] = useState<BodyStyleDto>();

  const { id } = props;

  useEffect(() => {
    getBodyStyleById(id).then((data) => setBodyStyle(data));
  }, [id]);

  return (
    <>
      <List header={<div>Info about BodyStyle # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Name</Typography.Text> - {bodyStyle?.name}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Description</Typography.Text> - {bodyStyle?.description}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Cars with that fuel</Typography.Text> - {bodyStyle?.numberOfCars}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {bodyStyle?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {bodyStyle?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {bodyStyle?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {bodyStyle?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
