import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Popconfirm } from 'antd';
import { CarDto } from '../../../Types/Get/CarDto';
import { deleteCar, getAllCars } from '../../../Utils/Controllers/CarController';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const SelectCarForm = (props: {
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const [form] = Form.useForm();
  const [cars, setCars] = useState<CarDto[]>();

  useEffect(() => {
    getAllCars().then((data) => setCars(data));
  }, []);

  const { setId, action } = props;

  const deleteRow = async (id: number) => {
    await deleteCar(id);
    onFinish({ id });
  };

  const onFinish = async (values: { id: number }) => {
    setId(values.id);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Select Car Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item name="id" label="Car" rules={[{ required: true }]}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
        >
          {cars?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.model}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        {(action === 'Update' || action === 'Extras' || action === 'Tunnings') && (
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        )}
        {action === 'Delete' && (
          <Popconfirm title="Are you sure." onConfirm={() => deleteRow(form.getFieldValue('id'))}>
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        )}
      </Form.Item>
    </Form>
  );
};
