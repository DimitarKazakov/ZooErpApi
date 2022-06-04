import React from 'react';
import { CarLevelForm } from '../../Components/Forms/Create/CarLevelForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateCarLevelScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<CarLevelForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Car Level"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
