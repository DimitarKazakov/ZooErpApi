import React from 'react';
import { SelectCarLevelForm } from '../../Components/Forms/Select/SelectCarLevelForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectCarLevelScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectCarLevelForm setId={setId} action={action} />}
      visible={visible}
      name="Select Car Level"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
