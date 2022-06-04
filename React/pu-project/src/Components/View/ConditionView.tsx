import { List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ConditionDto } from '../../Types/Get/ConditionDto';
import { getConditionById } from '../../Utils/Controllers/ConditionController';

export const ConditionView = (props: { id: number }) => {
  const [condition, setCondition] = useState<ConditionDto>();

  const { id } = props;

  useEffect(() => {
    getConditionById(id).then((data) => setCondition(data));
  }, [id]);

  return (
    <>
      <List header={<div>Info about Condition # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Name</Typography.Text> - {condition?.name}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Reason</Typography.Text> - {condition?.reason}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Explanation</Typography.Text> - {condition?.explanation}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Cars with that fuel</Typography.Text> - {condition?.numberOfCars}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {condition?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {condition?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {condition?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {condition?.lastModifiedBy}
        </List.Item>
      </List>
    </>
  );
};
