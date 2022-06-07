import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { FoodView } from '../../Components/View/FoodView';

export const FoodInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<FoodView id={id} />}
      visible={visible}
      name="Food Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
