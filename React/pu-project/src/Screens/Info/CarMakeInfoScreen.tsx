import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { CarMakeView } from '../../Components/View/CarMakeView';

export const CarMakeInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<CarMakeView id={id} />}
      visible={visible}
      name="Car Make Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
