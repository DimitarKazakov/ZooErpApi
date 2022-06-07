import React from 'react';
import { SelectEventForm } from '../../Components/Forms/Select/SelectEventForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectEventScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectEventForm setId={setId} action={action} />}
      visible={visible}
      name="Select Event"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
