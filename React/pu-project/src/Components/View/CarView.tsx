import { List, Typography, Image, Collapse } from 'antd';
import React, { useEffect, useState } from 'react';
import { CarDto } from '../../Types/Get/CarDto';
import { getCarById } from '../../Utils/Controllers/CarController';

const { Panel } = Collapse;

export const CarView = (props: { id: number }) => {
  const [car, setCar] = useState<CarDto>();

  const { id } = props;

  useEffect(() => {
    getCarById(id).then((data) => setCar(data));
  }, [id]);

  return (
    <>
      <Image width={200} src={car?.imageUrl} />
      <List header={<div>Info about Car # {id}</div>} bordered>
        <List.Item>
          <Typography.Text mark>Model</Typography.Text> - {car?.model}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Is Automatic</Typography.Text> - {car?.isAutomatic ? 'YES' : 'NO'}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Power</Typography.Text> - {car?.power}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Doors</Typography.Text> - {car?.doors}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Is Left Steering</Typography.Text> -{' '}
          {car?.isLeftSteering ? 'YES' : 'NO'}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Year</Typography.Text> - {car?.year}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Price</Typography.Text> - {car?.price} lv.
        </List.Item>
        <List.Item>
          <Typography.Text mark>Consumption</Typography.Text> - {car?.consumption} per 100 km.
        </List.Item>
        <List.Item>
          <Typography.Text mark>Weight</Typography.Text> - {car?.weight} kg.
        </List.Item>
        <List.Item>
          <Typography.Text mark>Acceleration</Typography.Text> - {car?.acceleration} to 100 km/h.
        </List.Item>
        <List.Item>
          <Typography.Text mark>Max Speed</Typography.Text> - {car?.maxSpeed} km/h.
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created On</Typography.Text> - {car?.createdOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Created By</Typography.Text> - {car?.createdBy}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified On</Typography.Text> - {car?.lastModifiedOn}
        </List.Item>
        <List.Item>
          <Typography.Text mark>Last Modified By</Typography.Text> - {car?.lastModifiedBy}
        </List.Item>
      </List>
      <Collapse>
        <Panel header="Color" key="color">
          <List header={<div>Info about Color # {car?.color?.id}</div>} bordered>
            <List.Item>
              <Typography.Text mark>Code</Typography.Text> - {car?.color?.code}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Cars with that fuel</Typography.Text> -{' '}
              {car?.color?.numberOfCars}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created On</Typography.Text> - {car?.color?.createdOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created By</Typography.Text> - {car?.color?.createdBy}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified On</Typography.Text> -{' '}
              {car?.color?.lastModifiedOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified By</Typography.Text> -{' '}
              {car?.color?.lastModifiedBy}
            </List.Item>
          </List>
        </Panel>
        <Panel header="Body Style" key="bodyStyle">
          <List header={<div>Info about BodyStyle # {car?.bodyStyle?.id}</div>} bordered>
            <List.Item>
              <Typography.Text mark>Name</Typography.Text> - {car?.bodyStyle?.name}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Description</Typography.Text> - {car?.bodyStyle?.description}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Cars with that fuel</Typography.Text> -{' '}
              {car?.bodyStyle?.numberOfCars}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created On</Typography.Text> - {car?.bodyStyle?.createdOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created By</Typography.Text> - {car?.bodyStyle?.createdBy}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified On</Typography.Text> -{' '}
              {car?.bodyStyle?.lastModifiedOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified By</Typography.Text> -{' '}
              {car?.bodyStyle?.lastModifiedBy}
            </List.Item>
          </List>
        </Panel>
        <Panel header="Condition" key="condition">
          <List header={<div>Info about Condition # {car?.condition?.id}</div>} bordered>
            <List.Item>
              <Typography.Text mark>Name</Typography.Text> - {car?.condition?.name}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Reason</Typography.Text> - {car?.condition?.reason}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Explanation</Typography.Text> - {car?.condition?.explanation}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Cars with that fuel</Typography.Text> -{' '}
              {car?.condition?.numberOfCars}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created On</Typography.Text> - {car?.condition?.createdOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created By</Typography.Text> - {car?.condition?.createdBy}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified On</Typography.Text> -{' '}
              {car?.condition?.lastModifiedOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified By</Typography.Text> -{' '}
              {car?.condition?.lastModifiedBy}
            </List.Item>
          </List>
        </Panel>
        <Panel header="Fuel Type" key="fuelType">
          <List header={<div>Info about Fuel Type # {car?.fuelType.id}</div>} bordered>
            <List.Item>
              <Typography.Text mark>Fuel</Typography.Text> - {car?.fuelType?.fuel}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Current Price</Typography.Text> - {car?.fuelType?.currentPrice}{' '}
              lv.
            </List.Item>
            <List.Item>
              <Typography.Text mark>Cars with that fuel</Typography.Text> -{' '}
              {car?.fuelType?.numberOfCars}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created On</Typography.Text> - {car?.fuelType?.createdOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created By</Typography.Text> - {car?.fuelType?.createdBy}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified On</Typography.Text> -{' '}
              {car?.fuelType?.lastModifiedOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified By</Typography.Text> -{' '}
              {car?.fuelType?.lastModifiedBy}
            </List.Item>
          </List>
        </Panel>
        <Panel header="Car Make" key="carMake">
          <>
            <Image width={200} src={car?.carMake?.imageUrl} />
            <List header={<div>Info about Car Make # {car?.carMake.id}</div>} bordered>
              <List.Item>
                <Typography.Text mark>Name</Typography.Text> - {car?.carMake?.name}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Full Name</Typography.Text> - {car?.carMake?.fullName}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Description</Typography.Text> - {car?.carMake?.description}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Founded In</Typography.Text> - {car?.carMake?.foundedIn}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Founded By</Typography.Text> - {car?.carMake?.foundedBy}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Headquarters</Typography.Text> - {car?.carMake?.headquarters}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Cars with that fuel</Typography.Text> -{' '}
                {car?.carMake?.numberOfCars}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Created On</Typography.Text> - {car?.carMake?.createdOn}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Created By</Typography.Text> - {car?.carMake?.createdBy}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Last Modified On</Typography.Text> -{' '}
                {car?.carMake?.lastModifiedOn}
              </List.Item>
              <List.Item>
                <Typography.Text mark>Last Modified By</Typography.Text> -{' '}
                {car?.carMake?.lastModifiedBy}
              </List.Item>
            </List>
          </>
        </Panel>
        <Panel header="Car Level" key="carLevel">
          <List header={<div>Info about Car Level # {car?.carLevel.id}</div>} bordered>
            <List.Item>
              <Typography.Text mark>Name</Typography.Text> - {car?.carLevel?.name}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Cars with that fuel</Typography.Text> -{' '}
              {car?.carLevel?.numberOfCars}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created On</Typography.Text> - {car?.carLevel?.createdOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Created By</Typography.Text> - {car?.carLevel?.createdBy}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified On</Typography.Text> -{' '}
              {car?.carLevel?.lastModifiedOn}
            </List.Item>
            <List.Item>
              <Typography.Text mark>Last Modified By</Typography.Text> -{' '}
              {car?.carLevel?.lastModifiedBy}
            </List.Item>
          </List>
        </Panel>
      </Collapse>
      <Collapse>
        {car?.extras.map((x) => {
          return (
            <Panel header={`Extra - ${x.name}`} key={`extra${x.id}`}>
              <>
                <Image width={200} src={x?.imageUrl} />
                <List header={<div>Info about Extra # {x.id}</div>} bordered>
                  <List.Item>
                    <Typography.Text mark>Name</Typography.Text> - {x?.name}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Brand</Typography.Text> - {x?.brand}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Usual Price</Typography.Text> - {x?.usualPrice} lv.
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Description</Typography.Text> - {x?.description}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Cars with that extra</Typography.Text> - {x?.numberOfCars}
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
        {car?.tunings.map((x) => {
          return (
            <Panel header={`Tunning - ${x.name}`} key={`tunning${x.id}`}>
              <>
                <Image width={200} src={x?.imageUrl} />
                <List header={<div>Info about Tunning # {x.id}</div>} bordered>
                  <List.Item>
                    <Typography.Text mark>Name</Typography.Text> - {x?.name}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Brand</Typography.Text> - {x?.brand}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Function</Typography.Text> - {x?.function}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Description</Typography.Text> - {x?.description}
                  </List.Item>
                  <List.Item>
                    <Typography.Text mark>Cars with that tunning</Typography.Text> -{' '}
                    {x?.numberOfCars}
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
/*
  fuelType: FuelTypeDto;
  carMake: CarMakeDto;
  extras: ExtraDto[];
  tunings: TuningDto[]; */
