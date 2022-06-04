import React from 'react';
import { UpdateTunningForm } from '../../Components/Forms/Update/UpdateTunningForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateTunningScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateTunningForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Tunning"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
