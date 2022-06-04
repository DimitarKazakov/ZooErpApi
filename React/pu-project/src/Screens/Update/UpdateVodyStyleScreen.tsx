import React from 'react';
import { UpdateBodyStyleForm } from '../../Components/Forms/Update/UpdateBodyStyleForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateBodyStyleScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateBodyStyleForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Body Style"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
