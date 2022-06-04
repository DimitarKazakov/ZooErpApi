import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Popconfirm } from 'antd';
import { FuelTypeDto } from '../../../Types/Get/FuelTypeDto';
import { deleteFuelType, getAllFuelTypes } from '../../../Utils/Controllers/FuelTypeController';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const SelectFuelTypeForm = (props: {
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const [form] = Form.useForm();
  const [fuelTypes, setFuelTypes] = useState<FuelTypeDto[]>();

  useEffect(() => {
    getAllFuelTypes().then((data) => setFuelTypes(data));
  }, []);

  const { setId, action } = props;

  const deleteRow = async (id: number) => {
    await deleteFuelType(id);
    onFinish({ id });
  };

  const onFinish = async (values: { id: number }) => {
    setId(values.id);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Select Fuel Type Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item name="id" label="Fuel Type" rules={[{ required: true }]}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
        >
          {fuelTypes?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.fuel}
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
            title="Are you sure. You will delete all cars with that fuel type"
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
