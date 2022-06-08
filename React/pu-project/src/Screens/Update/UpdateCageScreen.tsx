import React from 'react';
import { UpdateCageForm } from '../../Components/Forms/Update/UpdateCageForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateCageScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateCageForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Cage"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
