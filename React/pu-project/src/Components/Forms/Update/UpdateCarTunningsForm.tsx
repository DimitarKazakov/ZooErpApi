import React, { useEffect, useState } from 'react';
import { Form, Button, message, Select } from 'antd';
import { nameof } from 'ts-simple-nameof';
import { CarDto } from '../../../Types/Get/CarDto';
import { getCarById, updateTuningToCar } from '../../../Utils/Controllers/CarController';
import { UpdateCarTuningDto } from '../../../Types/Post/UpdateCarTuningDto';
import { TuningDto } from '../../../Types/Get/TuningDto';
import { getAllTunings } from '../../../Utils/Controllers/TuningController';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const UpdateCarTunningsForm = (props: {
  id: number;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [car, setCar] = useState<CarDto>();
  const [tunnings, setTunnings] = useState<TuningDto[]>();

  const { id, setIsModalVisible } = props;

  useEffect(() => {
    getCarById(id).then((data) => {
      setCar(data);
      form.setFieldsValue({ tuningIds: data.tunings.map((x) => x.id) });
    });

    getAllTunings().then((data) => setTunnings(data));
  }, [id]);

  const onFinish = async (values: UpdateCarTuningDto) => {
    values.carId = id;
    const response = await updateTuningToCar(values);
    if (response) {
      message.success(`Succesffuly updated tunnings of car ${id}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error updating the tunnings of car ${id}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Update Car Tunnings Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item
        name={nameof<UpdateCarTuningDto>((x) => x.tuningIds)}
        label="Tunnings"
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
          optionFilterProp="children"
        >
          {tunnings?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
