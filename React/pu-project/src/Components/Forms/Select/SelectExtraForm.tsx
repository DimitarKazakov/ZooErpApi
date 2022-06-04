import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Popconfirm } from 'antd';
import { ExtraDto } from '../../../Types/Get/ExtraDto';
import { deleteExtra, getAllExtras } from '../../../Utils/Controllers/ExtraController';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const SelectExtraForm = (props: {
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const [form] = Form.useForm();
  const [extras, setExtras] = useState<ExtraDto[]>();

  useEffect(() => {
    getAllExtras().then((data) => setExtras(data));
  }, []);

  const { setId, action } = props;

  const deleteRow = async (id: number) => {
    await deleteExtra(id);
    onFinish({ id });
  };

  const onFinish = async (values: { id: number }) => {
    setId(values.id);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Select Extra Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item name="id" label="Extra" rules={[{ required: true }]}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
        >
          {extras?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        {action === 'Update' && (
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        )}
        {action === 'Delete' && (
          <Popconfirm
            title="Are you sure. You will delete this extra from all cars"
            onConfirm={() => deleteRow(form.getFieldValue('id'))}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        )}
      </Form.Item>
    </Form>
  );
};
