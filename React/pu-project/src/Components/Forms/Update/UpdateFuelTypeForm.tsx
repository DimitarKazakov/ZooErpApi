import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, InputNumber } from 'antd';
import { nameof } from 'ts-simple-nameof';
import { CreateFuelTypeDto } from '../../../Types/Post/CreateFuelTypeDto';
import { getFuelTypeById, updateFuelType } from '../../../Utils/Controllers/FuelTypeController';
import { FuelTypeDto } from '../../../Types/Get/FuelTypeDto';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const UpdateFuelTypeForm = (props: {
  id: number;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [fuelType, setFuelType] = useState<FuelTypeDto>();

  const { id, setIsModalVisible } = props;
  useEffect(() => {
    getFuelTypeById(id).then((data) => {
      setFuelType(data);
      form.setFieldsValue({ fuel: data.fuel, currentPrice: data.currentPrice });
    });
  }, [id]);

  const onFinish = async (values: CreateFuelTypeDto) => {
    const response = await updateFuelType(values, id);
    if (response) {
      message.success(`Succesffuly updated fuel type ${id}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error updating the fuel type ${id}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Update Fuel Type Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item
        name={nameof<CreateFuelTypeDto>((x) => x.fuel)}
        label="Fuel Type"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={nameof<CreateFuelTypeDto>((x) => x.currentPrice)}
        label="Current Price"
        rules={[{ required: true }]}
      >
        <InputNumber min={0.5} max={20} addonAfter="lv" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
