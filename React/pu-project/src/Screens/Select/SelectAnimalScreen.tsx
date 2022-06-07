import React from 'react';
import { SelectAnimalForm } from '../../Components/Forms/Select/SelectAnimalForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectAnimalScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectAnimalForm setId={setId} action={action} />}
      visible={visible}
      name="Select Animal"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
