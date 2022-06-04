import React, { useState } from 'react';
import { Form, Input, Button, message, Badge } from 'antd';
import { addColor } from '../../../Utils/Controllers/ColorController';
import { CreateColorDto } from '../../../Types/Post/CreataColorDto';
import { nameof } from 'ts-simple-nameof';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const ColorForm = (props: {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [color, setColor] = useState('');

  const { setIsModalVisible } = props;
  const onFinish = async (values: CreateColorDto) => {
    const response = await addColor(values);
    if (response) {
      message.success(`Succesffuly added new color - ${values.code}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error adding the color - ${values.code}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Color Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Badge.Ribbon text="Color" color={color}>
        <Form.Item
          name={nameof<CreateColorDto>((x) => x.code)}
          label="Color Code"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="#hex-code"
            onChange={() => setColor(form.getFieldValue(nameof<CreateColorDto>((x) => x.code)))}
          />
        </Form.Item>
      </Badge.Ribbon>
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
