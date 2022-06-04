import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { nameof } from 'ts-simple-nameof';
import { CreateBodyStyleDto } from '../../../Types/Post/CreateBodyStyleDto';
import { addBodyStyle } from '../../../Utils/Controllers/BodyStyleController';
import TextArea from 'antd/lib/input/TextArea';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const BodyStyleForm = (props: {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const { setIsModalVisible } = props;
  const onFinish = async (values: CreateBodyStyleDto) => {
    const response = await addBodyStyle(values);
    if (response) {
      message.success(`Succesffuly added new body style - ${values.name}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error adding the body style - ${values.name}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Body Style Form"
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
          Create
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
