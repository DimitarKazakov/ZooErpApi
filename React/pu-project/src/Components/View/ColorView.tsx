import { List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColorDto } from '../../Types/Get/ColorDto';
import { getColorById } from '../../Utils/Controllers/ColorController';

export const ColorView = (props: { id: number }) => {
  const [color, setColor] = useState<ColorDto>();

  const { id } = props;

  useEffect(() => {
    getColorById(id).then((data) => setColor(data));
  }, [id]);

  return (
    <>
      <List header={<div>Info about Color # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Code</Typography.Text> - {color?.code}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Cars with that fuel</Typography.Text> - {color?.numberOfCars}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {color?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {color?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {color?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {color?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
