import React, { useEffect, useState } from 'react';
import { Form, Button, message, Select } from 'antd';
import { nameof } from 'ts-simple-nameof';
import TextArea from 'antd/lib/input/TextArea';
import { CageOptionsDto } from '../../../Types/Get/CageOptionsDto';
import { getCageOptions } from '../../../Utils/Controllers/CageController';
import { addEvent } from '../../../Utils/Controllers/EventController';
import { CreateEventDto } from '../../../Types/Post/CreateEventDto';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const EventForm = (props: {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [cageOptions, setCageOptions] = useState<CageOptionsDto[]>();

  useEffect(() => {
    getCageOptions().then((data) => setCageOptions(data));
  }, []);

  const { setIsModalVisible } = props;
  const onFinish = async (values: CreateEventDto) => {
    const response = await addEvent(values);
    if (response) {
      message.success('Succesffuly added new event');
      onReset();
      setIsModalVisible(false);
    } else {
      message.error('There was an error adding the event');
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Event Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item
        name={nameof<CreateEventDto>((x) => x.type)}
        label="Type"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
        >
          <Option key={1} value={1}>
            Cage Created
          </Option>
          <Option key={2} value={2}>
            Animal Added
          </Option>
          <Option key={3} value={3}>
            Animal Removed
          </Option>
          <Option key={4} value={4}>
            Food Stock Empty
          </Option>
          <Option key={5} value={5}>
            Food Restocked
          </Option>
          <Option key={6} value={6}>
            Cage Capacity At Max
          </Option>
          <Option key={7} value={7}>
            Animal Sold
          </Option>
          <Option key={8} value={8}>
            Waiting For Baby
          </Option>
          <Option key={9} value={9}>
            Cage is Dirty
          </Option>
          <Option key={10} value={10}>
            Cage was cleaned
          </Option>
          <Option key={11} value={11}>
            Accident
          </Option>
          <Option key={12} value={12}>
            Update
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateEventDto>((x) => x.cageId)}
        label="Cage"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
        >
          {cageOptions?.map((x) => {
            return (
              <Option key={x.id} value={x.id}>
                {x.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateEventDto>((x) => x.description)}
        label="Description"
        rules={[{ required: true }]}
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
