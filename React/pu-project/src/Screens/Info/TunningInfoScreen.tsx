import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { TunningView } from '../../Components/View/TunningView';

export const TunningInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<TunningView id={id} />}
      visible={visible}
      name="Tunning Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
