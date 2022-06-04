import React from 'react';
import { UpdateFuelTypeForm } from '../../Components/Forms/Update/UpdateFuelTypeForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateFuelTypeScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateFuelTypeForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Fuel Type"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
