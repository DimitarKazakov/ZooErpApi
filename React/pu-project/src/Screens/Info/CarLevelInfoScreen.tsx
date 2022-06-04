import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { CarLevelView } from '../../Components/View/CarLevelView';

export const CarLevelInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<CarLevelView id={id} />}
      visible={visible}
      name="Car Level Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
