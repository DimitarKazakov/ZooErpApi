import React from 'react';
import { EventForm } from '../../Components/Forms/Create/EventForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateEventScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<EventForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Event"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
