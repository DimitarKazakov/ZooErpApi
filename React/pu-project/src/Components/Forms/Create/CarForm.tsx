import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  message,
  Switch,
  Row,
  Image,
  InputNumber,
  DatePicker,
  Select,
} from 'antd';
import { nameof } from 'ts-simple-nameof';
import { CreateCarDto } from '../../../Types/Post/CreateCarDto';
import { addCar } from '../../../Utils/Controllers/CarController';
import { BodyStyleDto } from '../../../Types/Get/BodyStyleDto';
import { getAllBodyStyles } from '../../../Utils/Controllers/BodyStyleController';
import { CarLevelDto } from '../../../Types/Get/CarLevelDto';
import { CarMakeDto } from '../../../Types/Get/CarMakeDto';
import { FuelTypeDto } from '../../../Types/Get/FuelTypeDto';
import { ConditionDto } from '../../../Types/Get/ConditionDto';
import { ColorDto } from '../../../Types/Get/ColorDto';
import { ExtraDto } from '../../../Types/Get/ExtraDto';
import { TuningDto } from '../../../Types/Get/TuningDto';
import { getAllCarLevels } from '../../../Utils/Controllers/CarLevelController';
import { getAllCarMakes } from '../../../Utils/Controllers/CarMakeController';
import { getAllFuelTypes } from '../../../Utils/Controllers/FuelTypeController';
import { getAllConditions } from '../../../Utils/Controllers/ConditionController';
import { getAllColors } from '../../../Utils/Controllers/ColorController';
import { getAllExtras } from '../../../Utils/Controllers/ExtraController';
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

export const CarForm = (props: {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImagUrl] = useState('error');
  const [bodyStyles, setBodyStyles] = useState<BodyStyleDto[]>();
  const [carLevels, setCarLevels] = useState<CarLevelDto[]>();
  const [carMakes, setCarMakes] = useState<CarMakeDto[]>();
  const [fuelTypes, setFuelTypes] = useState<FuelTypeDto[]>();
  const [conditions, setConditions] = useState<ConditionDto[]>();
  const [colors, setColors] = useState<ColorDto[]>();
  const [extras, setExtras] = useState<ExtraDto[]>();
  const [tunnings, setTunnings] = useState<TuningDto[]>();

  const { setIsModalVisible } = props;
  useEffect(() => {
    getAllBodyStyles().then((data) => setBodyStyles(data));
    getAllCarLevels().then((data) => setCarLevels(data));
    getAllCarMakes().then((data) => setCarMakes(data));
    getAllFuelTypes().then((data) => setFuelTypes(data));
    getAllConditions().then((data) => setConditions(data));
    getAllColors().then((data) => setColors(data));
    getAllExtras().then((data) => setExtras(data));
    getAllTunings().then((data) => setTunnings(data));
  }, []);

  const onFinish = async (values: CreateCarDto) => {
    values.year = moment(values.year).format('d/MM/yyyy');
    const response = await addCar(values);
    if (response) {
      message.success(`Succesffuly added new car - ${values.model}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error adding the car - ${values.model}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Car Form"
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
          onChange={() => setImagUrl(form.getFieldValue(nameof<CreateCarDto>((x) => x.imageUrl)))}
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
      <Form.Item
        label="Is Automatic"
        name={nameof<CreateCarDto>((x) => x.isAutomatic)}
        initialValue={false}
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.power)}
        label="Power"
        rules={[{ required: true }]}
        initialValue={90}
      >
        <InputNumber min={30} max={2000} defaultValue={90} addonAfter="hrsp" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.doors)}
        label="Number Of Doors"
        rules={[{ required: true }]}
        initialValue={4}
      >
        <InputNumber min={2} max={9} defaultValue={4} />
      </Form.Item>
      <Form.Item
        label="Is Left Steering"
        name={nameof<CreateCarDto>((x) => x.isLeftSteering)}
        initialValue={false}
      >
        <Switch />
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
        initialValue={2000}
      >
        <InputNumber min={0} max={1000000} defaultValue={2000} addonAfter="lv" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.consumption)}
        label="Consumption per 100 km"
        rules={[{ required: true }]}
        initialValue={5}
      >
        <InputNumber min={1} max={50} defaultValue={5} addonAfter="liter" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.weight)}
        label="Weight"
        rules={[{ required: true }]}
        initialValue={1200}
      >
        <InputNumber min={200} max={10000} defaultValue={1200} addonAfter="kg" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.acceleration)}
        label="Acceleration to 100km/h"
        rules={[{ required: true }]}
        initialValue={8}
      >
        <InputNumber min={1.5} max={20} defaultValue={8} addonAfter="seconds" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.maxSpeed)}
        label="Max Speed"
        rules={[{ required: true }]}
        initialValue={220}
      >
        <InputNumber min={50} max={500} defaultValue={220} addonAfter="km/h" />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.bodyStyleId)}
        label="Body Style"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
          optionFilterProp="children"
        >
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
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
          optionFilterProp="children"
        >
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
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
          optionFilterProp="children"
        >
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
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
          optionFilterProp="children"
        >
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
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
          optionFilterProp="children"
        >
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
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
          optionFilterProp="children"
        >
          {colors?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.code}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.extraIds)}
        label="Extras"
        rules={[{ required: false }]}
      >
        <Select
          mode="multiple"
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
          optionFilterProp="children"
        >
          {extras?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateCarDto>((x) => x.tunningIds)}
        label="Tunnings"
        rules={[{ required: false }]}
      >
        <Select
          mode="multiple"
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
          optionFilterProp="children"
        >
          {tunnings?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
