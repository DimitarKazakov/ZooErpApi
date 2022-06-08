import React from 'react';
import { FoodForm } from '../../Components/Forms/Create/FoodForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateFoodScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<FoodForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Food"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
