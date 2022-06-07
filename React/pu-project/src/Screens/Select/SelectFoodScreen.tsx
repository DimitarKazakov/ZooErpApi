import React from 'react';
import { SelectFoodForm } from '../../Components/Forms/Select/SelectFoodForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectFoodScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectFoodForm setId={setId} action={action} />}
      visible={visible}
      name="Select Food"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
