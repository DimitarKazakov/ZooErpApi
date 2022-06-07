import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { CageView } from '../../Components/View/CageView';

export const CageInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<CageView id={id} />}
      visible={visible}
      name="Cage Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
