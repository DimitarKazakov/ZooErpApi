import React from 'react';
import { Modal } from 'antd';

export const ModalForm = (props: {
  content: React.ReactNode;
  visible: boolean;
  name: string;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, content, name, setIsModalVisible } = props;

  return (
    <Modal
      title={name}
      visible={visible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      width={600}
    >
      {content}
    </Modal>
  );
};
