import React from 'react';
import { UpdateCarTunningsForm } from '../../Components/Forms/Update/UpdateCarTunningsForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateCarTunningsScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateCarTunningsForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Car Tunnings"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
