import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { EventView } from '../../Components/View/EventView';

export const EventInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<EventView id={id} />}
      visible={visible}
      name="Event Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
