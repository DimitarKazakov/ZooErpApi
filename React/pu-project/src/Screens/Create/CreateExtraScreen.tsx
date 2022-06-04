import React from 'react';
import { ExtraForm } from '../../Components/Forms/Create/ExtraForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateExtraScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<ExtraForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Extra"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
