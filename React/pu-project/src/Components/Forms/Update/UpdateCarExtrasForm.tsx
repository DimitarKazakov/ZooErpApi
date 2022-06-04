import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import { nameof } from 'ts-simple-nameof';
import { CarDto } from '../../../Types/Get/CarDto';
import { getCarById, updateExtraToCar } from '../../../Utils/Controllers/CarController';
import { UpdateCarExtraDto } from '../../../Types/Post/UpdateCarExtraDto';
import { ExtraDto } from '../../../Types/Get/ExtraDto';
import { getAllExtras } from '../../../Utils/Controllers/ExtraController';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const UpdateCarExtrasForm = (props: {
  id: number;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [car, setCar] = useState<CarDto>();
  const [extras, setExtras] = useState<ExtraDto[]>();

  const { id, setIsModalVisible } = props;

  useEffect(() => {
    getCarById(id).then((data) => {
      setCar(data);
      form.setFieldsValue({ extraIds: data.extras.map((x) => x.id) });
    });

    getAllExtras().then((data) => setExtras(data));
  }, [id]);

  const onFinish = async (values: UpdateCarExtraDto) => {
    values.carId = id;
    const response = await updateExtraToCar(values);
    if (response) {
      message.success(`Succesffuly updated extras of car ${id}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error updating the extras of car ${id}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Update Car Extras Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item
        name={nameof<UpdateCarExtraDto>((x) => x.extraIds)}
        label="Extras"
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          showSearch
          style={{ width: 200 }}
          placeholder="Select..."
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
