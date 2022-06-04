import React from 'react';
import { TunningForm } from '../../Components/Forms/Create/TunningForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateTunningScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<TunningForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Tunning"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
