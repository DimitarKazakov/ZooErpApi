import React from 'react';
import { SelectTunningForm } from '../../Components/Forms/Select/SelectTunningForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectTunningScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectTunningForm setId={setId} action={action} />}
      visible={visible}
      name="Select Tunning"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
