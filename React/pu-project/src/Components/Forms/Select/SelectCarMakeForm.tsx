import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Popconfirm } from 'antd';
import { getAllCarMakes, deleteCarMake } from '../../../Utils/Controllers/CarMakeController';
import { CarMakeDto } from '../../../Types/Get/CarMakeDto';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const SelectCarMakeForm = (props: {
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const [form] = Form.useForm();
  const [carMakes, setCarMakes] = useState<CarMakeDto[]>();

  useEffect(() => {
    getAllCarMakes().then((data) => setCarMakes(data));
  }, []);

  const { setId, action } = props;

  const deleteRow = async (id: number) => {
    await deleteCarMake(id);
    onFinish({ id });
  };

  const onFinish = async (values: { id: number }) => {
    setId(values.id);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Select Car Make Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item name="id" label="Car Make" rules={[{ required: true }]}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
        >
          {carMakes?.map((x) => {
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
            title="Are you sure. You will delete all cars with that car make"
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
