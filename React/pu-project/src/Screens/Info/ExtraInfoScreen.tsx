import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { ExtraView } from '../../Components/View/ExtraView';

export const ExtraInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<ExtraView id={id} />}
      visible={visible}
      name="Extra Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
