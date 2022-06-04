import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { nameof } from 'ts-simple-nameof';
import TextArea from 'antd/lib/input/TextArea';
import { CreateConditionDto } from '../../../Types/Post/CreateConditionDto';
import { addCondition } from '../../../Utils/Controllers/ConditionController';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const ConditionForm = (props: {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();

  const { setIsModalVisible } = props;
  const onFinish = async (values: CreateConditionDto) => {
    const response = await addCondition(values);
    if (response) {
      message.success(`Succesffuly added new condition - ${values.name}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error adding the condition - ${values.name}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Condition Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item
        name={nameof<CreateConditionDto>((x) => x.name)}
        label="Condition"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={nameof<CreateConditionDto>((x) => x.reason)}
        label="Reason"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={nameof<CreateConditionDto>((x) => x.explanation)}
        label="Explanation"
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
