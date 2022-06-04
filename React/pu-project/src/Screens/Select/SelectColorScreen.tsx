import React from 'react';
import { SelectColorForm } from '../../Components/Forms/Select/SelectColorForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectColorScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectColorForm setId={setId} action={action} />}
      visible={visible}
      name="Select Color"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
