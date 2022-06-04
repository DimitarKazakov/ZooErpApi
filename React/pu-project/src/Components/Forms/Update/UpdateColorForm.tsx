import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Badge } from 'antd';
import { getColorById, updateColor } from '../../../Utils/Controllers/ColorController';
import { CreateColorDto } from '../../../Types/Post/CreataColorDto';
import { nameof } from 'ts-simple-nameof';
import { ColorDto } from '../../../Types/Get/ColorDto';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const UpdateColorForm = (props: {
  id: number;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [color, setColor] = useState<ColorDto>();

  const { id, setIsModalVisible } = props;

  useEffect(() => {
    getColorById(id).then((data) => {
      setColor(data);
      form.setFieldsValue({
        code: data?.code,
      });
    });
  }, [id]);

  const onFinish = async (values: CreateColorDto) => {
    const response = await updateColor(values, id);
    if (response) {
      message.success(`Succesffuly updated color ${id}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error update the color ${id}}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Update Color Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Badge.Ribbon text="Color" color={color?.code || ''}>
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
