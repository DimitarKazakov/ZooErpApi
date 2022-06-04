import React from 'react';
import { UpdateCarExtrasForm } from '../../Components/Forms/Update/UpdateCarExtrasForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateCarExtrasScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateCarExtrasForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Car Extras"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
