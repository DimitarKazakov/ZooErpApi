import React from 'react';
import { BodyStyleForm } from '../../Components/Forms/Create/BodyStyleForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateBodyStyleScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<BodyStyleForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Body Style"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
