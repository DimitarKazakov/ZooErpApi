import React from 'react';
import { Form, Input, Button, message, InputNumber } from 'antd';
import { nameof } from 'ts-simple-nameof';
import { CreateFuelTypeDto } from '../../../Types/Post/CreateFuelTypeDto';
import { addFuelType } from '../../../Utils/Controllers/FuelTypeController';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const FuelTypeForm = (props: {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();

  const { setIsModalVisible } = props;
  const onFinish = async (values: CreateFuelTypeDto) => {
    const response = await addFuelType(values);
    if (response) {
      message.success(`Succesffuly added new fuel type - ${values.fuel}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error adding the fuel type - ${values.fuel}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Fuel Type Form"
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
        <InputNumber min={0.5} max={20} defaultValue={1} addonAfter="lv" />
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
