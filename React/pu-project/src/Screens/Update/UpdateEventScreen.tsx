import React from 'react';
import { UpdateEventForm } from '../../Components/Forms/Update/UpdateEventForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateEventScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateEventForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Event"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
