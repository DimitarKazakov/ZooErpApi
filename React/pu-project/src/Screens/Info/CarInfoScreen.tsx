import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { CarView } from '../../Components/View/CarView';

export const CarInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<CarView id={id} />}
      visible={visible}
      name="Car Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
