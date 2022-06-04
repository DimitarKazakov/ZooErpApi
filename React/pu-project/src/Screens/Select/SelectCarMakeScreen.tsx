import React from 'react';
import { SelectCarMakeForm } from '../../Components/Forms/Select/SelectCarMakeForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectCarMakeScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectCarMakeForm setId={setId} action={action} />}
      visible={visible}
      name="Select Car Make"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
