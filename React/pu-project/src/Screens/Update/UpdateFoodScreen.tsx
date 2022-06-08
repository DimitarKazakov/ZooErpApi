import React from 'react';
import { UpdateFoodForm } from '../../Components/Forms/Update/UpdateFoodForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateFoodScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateFoodForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Food"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
