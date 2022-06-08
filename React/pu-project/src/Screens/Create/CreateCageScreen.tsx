import React from 'react';
import { CageForm } from '../../Components/Forms/Create/CageForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateCageScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<CageForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Cage"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
