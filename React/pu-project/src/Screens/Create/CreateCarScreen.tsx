import React from 'react';
import { CarForm } from '../../Components/Forms/Create/CarForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateCarScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<CarForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Car"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
