import React from 'react';
import { SelectCageForm } from '../../Components/Forms/Select/SelectCageForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectCageScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectCageForm setId={setId} action={action} />}
      visible={visible}
      name="Select Cage"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
