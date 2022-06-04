import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Popconfirm } from 'antd';
import { CarLevelDto } from '../../../Types/Get/CarLevelDto';
import { getAllCarLevels, deleteCarLevel } from '../../../Utils/Controllers/CarLevelController';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const SelectCarLevelForm = (props: {
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const [form] = Form.useForm();
  const [carLevels, setCarLevels] = useState<CarLevelDto[]>();

  useEffect(() => {
    getAllCarLevels().then((data) => setCarLevels(data));
  }, []);

  const { setId, action } = props;

  const deleteRow = async (id: number) => {
    await deleteCarLevel(id);
    onFinish({ id });
  };

  const onFinish = async (values: { id: number }) => {
    setId(values.id);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Select Car Level Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item name="id" label="Car Level" rules={[{ required: true }]}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
        >
          {carLevels?.map((x) => {
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
            title="Are you sure. You will delete all cars with that car level"
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
