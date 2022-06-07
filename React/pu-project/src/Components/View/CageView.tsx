import { List, Typography, Image, Collapse } from 'antd';
import React, { useEffect, useState } from 'react';
import { FilterDto } from '../../Types/FilterDto';
import { CageDto } from '../../Types/Get/CageDto';
import { getAllCages } from '../../Utils/Controllers/CageController';

const { Panel } = Collapse;

export const CageView = (props: { id: number }) => {
  const [cage, setCage] = useState<CageDto>();

  const { id } = props;
  const filter: FilterDto = {
    id: id,
  };

  useEffect(() => {
    getAllCages(filter).then((data) => setCage(data[0]));
  }, [id]);
  return (
    <>
      <Image width={200} src={cage?.imageUrl} />
      <List header={<div>Info about Cage # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Name</Typography.Text> - {cage?.name}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Description</Typography.Text> - {cage?.description}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Area</Typography.Text> - {cage?.area}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Location</Typography.Text> - {cage?.location}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Capacity</Typography.Text> - {cage?.capacity}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Type</Typography.Text> - {cage?.type}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Rating</Typography.Text> - {cage?.rating}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {cage?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {cage?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {cage?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {cage?.lastModifiedBy}
        </List.Item>
      </List>
      <Collapse>
        {cage?.events.map((x) => {
          return (
            <Panel header={`Event - ${x.type}`} key={`event${x.id}`}>
              <>
                <List header={<div>Info about Event # {x.id}</div>} bordered>
                  <List.Item>
                    <Typography.Text mark>Type</Typography.Text> - {x?.type}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Description</Typography.Text> - {x?.description}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Created On</Typography.Text> - {x?.createdOn}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Created By</Typography.Text> - {x?.createdBy}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Last Modified On</Typography.Text> - {x?.lastModifiedOn}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Last Modified By</Typography.Text> - {x?.lastModifiedBy}
                  </List.Item>
                </List>
              </>
            </Panel>
          );
        })}
      </Collapse>
      <Collapse>
        {cage?.animals.map((x) => {
          return (
            <Panel header={`Animal - ${x.name}`} key={`animal${x.id}`}>
              <>
                <Image width={200} src={x?.imageUrl} />
                <List header={<div>Info about Animal # {x.id}</div>} bordered>
                  <List.Item>
                    <Typography.Text mark>Name</Typography.Text> - {x?.name}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Age</Typography.Text> - {x?.age}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Gender</Typography.Text> - {x?.gender}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Kingdom</Typography.Text> - {x?.kingdomType}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Price</Typography.Text> - {x?.price} lv.
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Description</Typography.Text> - {x?.description}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Foods</Typography.Text> - {x?.foods.join(', ')}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Created On</Typography.Text> - {x?.createdOn}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Created By</Typography.Text> - {x?.createdBy}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Last Modified On</Typography.Text> - {x?.lastModifiedOn}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Last Modified By</Typography.Text> - {x?.lastModifiedBy}
                  </List.Item>
                </List>
              </>
            </Panel>
          );
        })}
      </Collapse>
    </>
  );
};
