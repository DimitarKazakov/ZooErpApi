import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { nameof } from 'ts-simple-nameof';
import { CreateCarLevelDto } from '../../../Types/Post/CreateCarLevelDto';
import { addCarLevel } from '../../../Utils/Controllers/CarLevelController';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const CarLevelForm = (props: {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();

  const { setIsModalVisible } = props;
  const onFinish = async (values: CreateCarLevelDto) => {
    const response = await addCarLevel(values);
    if (response) {
      message.success(`Succesffuly added new car level - ${values.name}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error adding the car level - ${values.name}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Car Level Form"
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
          Create
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
