import React from 'react';
import { UpdateColorForm } from '../../Components/Forms/Update/UpdateColorForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateColorScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;
  return (
    <ModalForm
      content={<UpdateColorForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Color"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
