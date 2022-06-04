import React from 'react';
import { SelectFuelTypeForm } from '../../Components/Forms/Select/SelectFuelTypeForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectFuelTypeScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectFuelTypeForm setId={setId} action={action} />}
      visible={visible}
      name="Select Fuel Type"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
