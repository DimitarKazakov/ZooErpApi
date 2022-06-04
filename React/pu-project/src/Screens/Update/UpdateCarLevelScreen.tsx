import React from 'react';
import { UpdateCarLevelForm } from '../../Components/Forms/Update/UpdateCarLevelForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateCarLevelScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateCarLevelForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Car Level"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
