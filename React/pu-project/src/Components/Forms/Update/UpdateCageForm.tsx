import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Image, Row, InputNumber, Select } from 'antd';
import { nameof } from 'ts-simple-nameof';
import TextArea from 'antd/lib/input/TextArea';
import { CageDto } from '../../../Types/Get/CageDto';
import { getAllCages, updateCage } from '../../../Utils/Controllers/CageController';
import { CreateCageDto } from '../../../Types/Post/CreateCageDto';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

export const UpdateCageForm = (props: {
  id: number;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [cage, setCage] = useState<CageDto>();
  const [imageUrl, setImageUrl] = useState('');

  const { id, setIsModalVisible } = props;

  useEffect(() => {
    getAllCages({ id: id }).then((data) => {
      setCage(data[0]);
      setImageUrl(data[0].imageUrl);
      form.setFieldsValue({
        capacity: data[0].capacity,
        area: data[0].area,
        name: data[0].name,
        description: data[0].description,
        imageUrl: data[0].imageUrl,
        location: data[0].location,
        rating: data[0].rating,
        type: data[0].typeId,
      });
    });
  }, [id]);

  const onFinish = async (values: CreateCageDto) => {
    const response = await updateCage(values, id);
    if (response) {
      message.success(`Succesffuly updated cage ${id}`);
      onReset();
      setIsModalVisible(false);
    } else {
      message.error(`There was an error updating the cage ${id}`);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="Update Cage Form"
      onFinish={async () => onFinish(form.getFieldsValue())}
    >
      <Form.Item
        name={nameof<CreateCageDto>((x) => x.name)}
        label="Name"
        rules={[{ required: true, max: 20 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCageDto>((x) => x.imageUrl)}
        label="Image Url"
        rules={[{ required: true, max: 500 }]}
      >
        <Input
          onChange={() => setImageUrl(form.getFieldValue(nameof<CreateCageDto>((x) => x.imageUrl)))}
        />
      </Form.Item>
      <Row justify="center">
        <Image
          width={200}
          height={200}
          src={imageUrl}
          fallback="data:image/png;base64,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"
        />
      </Row>
      <br />
      <Form.Item
        name={nameof<CreateCageDto>((x) => x.location)}
        label="Location"
        rules={[{ required: true, max: 50 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCageDto>((x) => x.area)}
        label="Area"
        rules={[{ required: true }]}
      >
        <InputNumber min={1.5} max={5000} defaultValue={100.5} />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCageDto>((x) => x.capacity)}
        label="Capacity"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} max={200} defaultValue={2} />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCageDto>((x) => x.rating)}
        label="Rating"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} max={6} defaultValue={3} />
      </Form.Item>
      <Form.Item
        name={nameof<CreateCageDto>((x) => x.type)}
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
            Mammals
          </Option>
          <Option key={2} value={2}>
            Birds
          </Option>
          <Option key={3} value={3}>
            Aquarium
          </Option>
          <Option key={4} value={4}>
            Terarium
          </Option>
          <Option key={5} value={5}>
            Box Cage
          </Option>
          <Option key={6} value={6}>
            Mesh Cage
          </Option>
          <Option key={7} value={7}>
            Steel Cage
          </Option>
          <Option key={8} value={8}>
            Plastic Cage
          </Option>
          <Option key={9} value={9}>
            Open Space
          </Option>
          <Option key={10} value={10}>
            Natural Enclosure
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={nameof<CreateCageDto>((x) => x.description)}
        label="Description"
        rules={[{ required: true, max: 500 }]}
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
