import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { ColorView } from '../../Components/View/ColorView';

export const ColorInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<ColorView id={id} />}
      visible={visible}
      name="Color Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
