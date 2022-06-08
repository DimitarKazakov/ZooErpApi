import React from 'react';
import { AnimalForm } from '../../Components/Forms/Create/AnimalForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateAnimalScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<AnimalForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Animal"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
