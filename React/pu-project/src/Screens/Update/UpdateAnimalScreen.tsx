import React from 'react';
import { UpdateAnimalForm } from '../../Components/Forms/Update/UpdateAnimalForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateAnimalScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateAnimalForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Animal"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
