import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  message,
  Select,
  DatePicker,
  InputNumber,
  Row,
  Switch,
  Image,
} from 'antd';
import { nameof } from 'ts-simple-nameof';
import { getAllBodyStyles } from '../../../Utils/Controllers/BodyStyleController';
import { BodyStyleDto } from '../../../Types/Get/BodyStyleDto';
import { CarDto } from '../../../Types/Get/CarDto';
import { getCarById, updateCar } from '../../../Utils/Controllers/CarController';
import { CreateCarDto } from '../../../Types/Post/CreateCarDto';
import { CarLevelDto } from '../../../Types/Get/CarLevelDto';
import { CarMakeDto } from '../../../Types/Get/CarMakeDto';
import { ColorDto } from '../../../Types/Get/ColorDto';
import { ConditionDto } from '../../../Types/Get/ConditionDto';
import { ExtraDto } from '../../../Types/Get/ExtraDto';
import { FuelTypeDto } from '../../../Types/Get/FuelTypeDto';
import { TuningDto } from '../../../Types/Get/TuningDto';
import { getAllCarLevels } from '../../../Utils/Controllers/CarLevelController';
import { getAllCarMakes } from '../../../Utils/Controllers/CarMakeController';
import { getAllColors } from '../../../Utils/Controllers/ColorController';
import { getAllConditions } from '../../../Utils/Controllers/ConditionController';
import { getAllExtras } from '../../../Utils/Controllers/ExtraController';
import { getAllFuelTypes } from '../../../Utils/Controllers/FuelTypeController';
import { getAllTunings } from '../../../Utils/Controllers/TuningController';
import moment from 'moment';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const UpdateCarForm = (props: {
  id: number;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [car, setCar] = useState<CarDto>();
  const [imageUrl, setImageUrl] = useState('');
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [bodyStyles, setBodyStyles] = useState<BodyStyleDto[]>();
  const [carLevels, setCarLevels] = useState<CarLevelDto[]>();
  const [carMakes, setCarMakes] = useState<CarMakeDto[]>();
  const [fuelTypes, setFuelTypes] = useState<FuelTypeDto[]>();
  const [conditions, setConditions] = useState<ConditionDto[]>();
  const [colors, setColors] = useState<ColorDto[]>();
  const [extras, setExtras] = useState<ExtraDto[]>();
  const [tunnings, setTunnings] = useState<TuningDto[]>();

  const { id, setIsModalVisible } = props;

  useEffect(() => {
    getCarById(id).then((data) => {
      setCar(data);
      setImageUrl(data.imageUrl);
      form.setFieldsValue({
        model: data.model,
        imageUrl: data.imageUrl,
        isAutomatic: data.isAutomatic,
        power: data.power,
        doors: data.doors,
        isLeftSteering: data.isLeftSteering,
        price: data.price,
        year: moment(data.year || '1/01/2022', 'D/MM/YYYY'),
        consumption: data.consumption,
        weight: data.weight,
        acceleration: data.acceleration,
        maxSpeed: data.maxSpeed,
        bodyStyleId: data.bodyStyle.id,
        carLevelId: data.carLevel.id,
        carMakeId: data.carMake.id,
        conditionId: data.condition.id,
        fuelTypeId: data.fuelType.id,
        colorId: data.color.id,
        extraIds: data.extras.map((x) => x.id),
        tunningIds: data.tunings.map((x) => x.id),
      });
      getAllBodyStyles().then((data) => setBodyStyles(data));
      getAllCarLevels().then((data) => setCarLevels(data));
      getAllCarMakes().then((data) => setCarMakes(data));
      getAllFuelTypes().then((data) => setFuelTypes(data));
      getAllConditions().then((data) => setConditions(data));
      getAllColors().then((data) => setColors(data));
      getAllExtras().then((data) => setExtras(data));
      getAllTunings().then((data) => setTunnings(data));
      setIsAutomatic(data.isAutomatic);
      setIsLeft(data.isLeftSteering);
    });
  }, [id]);

  const onFinish = async (values: CreateCarDto) => {
    values.year = moment(values.year).format('d/MM/yyyy');
    values.extraIds = [];
    values.tunningIds = [];
    const response = await updateCar(values, id);
    if (response) {
      message.success(`Succesffuly updated car ${id}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error updating the car ${id}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Update Car Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.model)}
        label="Model"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.imageUrl)}
        label="Image Url"
        rules={[{ required: true }]}
      >
        <Input
          onChange={() => setImageUrl(form.getFieldValue(nameof<CreateCarDto>((x) => x.imageUrl)))}
        />
      </Form.Item>
      <Row justify="center">
        <Image
          width={200}
          height={200}
          src={imageUrl}
          fallback="https://images.ebizautos.media/foundation/controls/vehicle-icons/default-sedan.jpg"
        />
      </Row>
      <br />
      <Form.Item label="Is Automatic" name={nameof<CreateCarDto>((x) => x.isAutomatic)}>
        <Switch onClick={(x) => setIsAutomatic(x)} checked={isAutomatic} />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.power)}
        label="Power"
        rules={[{ required: true }]}
      >
        <InputNumber min={30} max={2000} addonAfter="hrsp" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.doors)}
        label="Number Of Doors"
        rules={[{ required: true }]}
      >
        <InputNumber min={2} max={9} />
      </Form.Item>
      <Form.Item label="Is Left Steering" name={nameof<CreateCarDto>((x) => x.isLeftSteering)}>
        <Switch onClick={(x) => setIsLeft(x)} checked={isLeft} />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.year)}
        label="Year"
        rules={[{ required: true }]}
      >
        <DatePicker format={'d/MM/yyyy'} />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.price)}
        label="Price"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} max={1000000} addonAfter="lv" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.consumption)}
        label="Consumption per 100 km"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} max={50} addonAfter="liter" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.weight)}
        label="Weight"
        rules={[{ required: true }]}
      >
        <InputNumber min={200} max={10000} addonAfter="kg" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.acceleration)}
        label="Acceleration to 100km/h"
        rules={[{ required: true }]}
      >
        <InputNumber min={1.5} max={20} addonAfter="seconds" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.maxSpeed)}
        label="Max Speed"
        rules={[{ required: true }]}
      >
        <InputNumber min={50} max={500} addonAfter="km/h" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.bodyStyleId)}
        label="Body Style"
        rules={[{ required: true }]}
      >
        <Select showSearch style={{ width: 200 }} placeholder="Select...">
          {bodyStyles?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.carLevelId)}
        label="Car Level"
        rules={[{ required: true }]}
      >
        <Select showSearch style={{ width: 200 }} placeholder="Select...">
          {carLevels?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.carMakeId)}
        label="Car Make"
        rules={[{ required: true }]}
      >
        <Select showSearch style={{ width: 200 }} placeholder="Select...">
          {carMakes?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.conditionId)}
        label="Condition"
        rules={[{ required: true }]}
      >
        <Select showSearch style={{ width: 200 }} placeholder="Select...">
          {conditions?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.fuelTypeId)}
        label="Fuel Type"
        rules={[{ required: true }]}
      >
        <Select showSearch style={{ width: 200 }} placeholder="Select...">
          {fuelTypes?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.fuel}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.colorId)}
        label="Color"
        rules={[{ required: true }]}
      >
        <Select showSearch style={{ width: 200 }} placeholder="Select...">
          {colors?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.code}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
