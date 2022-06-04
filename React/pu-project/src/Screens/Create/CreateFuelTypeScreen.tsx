import React from 'react';
import { FuelTypeForm } from '../../Components/Forms/Create/FuelTypeForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateFuelTypeScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<FuelTypeForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Fuel Type"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
