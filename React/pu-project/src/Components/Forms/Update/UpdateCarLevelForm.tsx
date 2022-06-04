import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { nameof } from 'ts-simple-nameof';
import { CreateCarLevelDto } from '../../../Types/Post/CreateCarLevelDto';
import { updateCarLevel, getCarLevelById } from '../../../Utils/Controllers/CarLevelController';
import { CarLevelDto } from '../../../Types/Get/CarLevelDto';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const UpdateCarLevelForm = (props: {
  id: number;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [carLevel, setCarLevel] = useState<CarLevelDto>();

  const { id, setIsModalVisible } = props;

  useEffect(() => {
    getCarLevelById(id).then((data) => {
      setCarLevel(data);
      form.setFieldsValue({ name: data.name });
    });
  }, [id]);

  const onFinish = async (values: CreateCarLevelDto) => {
    const response = await updateCarLevel(values, id);
    if (response) {
      message.success(`Succesffuly updated car level ${id}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error updating the car level ${id}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Update Car Level Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item
        name={nameof<CreateCarLevelDto>((x) => x.name)}
        label="Car Level"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
