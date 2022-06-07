import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { AnimalView } from '../../Components/View/AnimalView';

export const AnimalInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<AnimalView id={id} />}
      visible={visible}
      name="Animal Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
