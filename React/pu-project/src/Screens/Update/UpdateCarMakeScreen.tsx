import React from 'react';
import { UpdateCarMakeForm } from '../../Components/Forms/Update/UpdateCarMakeForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateCarMakeScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateCarMakeForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Car Make"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
