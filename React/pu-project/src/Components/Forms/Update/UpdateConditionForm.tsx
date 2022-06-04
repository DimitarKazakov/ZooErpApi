import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { nameof } from 'ts-simple-nameof';
import TextArea from 'antd/lib/input/TextArea';
import { CreateConditionDto } from '../../../Types/Post/CreateConditionDto';
import { getConditionById, updateCondition } from '../../../Utils/Controllers/ConditionController';
import { ConditionDto } from '../../../Types/Get/ConditionDto';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const UpdateConditionForm = (props: {
  id: number;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [condition, setCondition] = useState<ConditionDto>();

  const { id, setIsModalVisible } = props;

  useEffect(() => {
    getConditionById(id).then((data) => {
      setCondition(data);
      form.setFieldsValue({ name: data.name, reason: data.reason, explanation: data.explanation });
    });
  }, [id]);

  const onFinish = async (values: CreateConditionDto) => {
    const response = await updateCondition(values, id);
    if (response) {
      message.success(`Succesffuly updated condition ${id}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error updating the condition ${id}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Update Condition Form"
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
