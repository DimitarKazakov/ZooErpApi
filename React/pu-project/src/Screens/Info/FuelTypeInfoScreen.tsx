import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { FuelTypeView } from '../../Components/View/FuelTypeView';

export const FuelTypeInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<FuelTypeView id={id} />}
      visible={visible}
      name="Fuel Type Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
