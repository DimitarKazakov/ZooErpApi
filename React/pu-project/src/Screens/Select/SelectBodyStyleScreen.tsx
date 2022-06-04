import React from 'react';
import { SelectBodyStyleForm } from '../../Components/Forms/Select/SelectBodyStyleForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectBodyStyleScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectBodyStyleForm setId={setId} action={action} />}
      visible={visible}
      name="Select Body Style"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
