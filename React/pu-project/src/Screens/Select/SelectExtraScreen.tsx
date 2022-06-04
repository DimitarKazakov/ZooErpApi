import React from 'react';
import { SelectExtraForm } from '../../Components/Forms/Select/SelectExtraForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectExtraScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectExtraForm setId={setId} action={action} />}
      visible={visible}
      name="Select Extra"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
