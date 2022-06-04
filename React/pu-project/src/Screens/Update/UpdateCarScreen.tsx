import React from 'react';
import { UpdateCarForm } from '../../Components/Forms/Update/UpdateCarForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateCarScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateCarForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Car"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
