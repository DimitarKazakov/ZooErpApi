import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { BodyStyleView } from '../../Components/View/BodyStyleView';

export const BodyStyleInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<BodyStyleView id={id} />}
      visible={visible}
      name="BodyStyle Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
