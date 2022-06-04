import React from 'react';
import { SelectCarForm } from '../../Components/Forms/Select/SelectCarForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectCarScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectCarForm setId={setId} action={action} />}
      visible={visible}
      name="Select Car"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
