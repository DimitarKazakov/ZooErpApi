import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { nameof } from 'ts-simple-nameof';
import { CreateBodyStyleDto } from '../../../Types/Post/CreateBodyStyleDto';
import { getBodyStyleById, updateBodyStyle } from '../../../Utils/Controllers/BodyStyleController';
import TextArea from 'antd/lib/input/TextArea';
import { BodyStyleDto } from '../../../Types/Get/BodyStyleDto';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const UpdateBodyStyleForm = (props: {
  id: number;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [bodyStyle, setBodyStyle] = useState<BodyStyleDto>();

  const { id, setIsModalVisible } = props;

  useEffect(() => {
    getBodyStyleById(id).then((data) => {
      setBodyStyle(data);
      form.setFieldsValue({ name: data.name, description: data.description });
    });
  }, [id]);

  const onFinish = async (values: CreateBodyStyleDto) => {
    const response = await updateBodyStyle(values, id);
    if (response) {
      message.success(`Succesffuly updated body style ${id}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error updating the body style ${id}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Update Body Style Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item
        name={nameof<CreateBodyStyleDto>((x) => x.name)}
        label="Body Style"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={nameof<CreateBodyStyleDto>((x) => x.description)}
        label="Description"
        rules={[{ required: false }]}
      >
        <TextArea rows={5} maxLength={500} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
