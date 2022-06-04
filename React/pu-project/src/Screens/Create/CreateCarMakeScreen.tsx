import React from 'react';
import { CarMakeForm } from '../../Components/Forms/Create/CarMakeForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateCarMakeScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<CarMakeForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Car Make"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
