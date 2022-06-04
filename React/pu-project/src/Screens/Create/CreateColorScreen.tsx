import React from 'react';
import { ColorForm } from '../../Components/Forms/Create/ColorForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateColorScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<ColorForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Color"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
