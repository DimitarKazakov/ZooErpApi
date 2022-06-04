import React from 'react';
import { UpdateExtraForm } from '../../Components/Forms/Update/UpdateExtraForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateExtraScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateExtraForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Extra"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
