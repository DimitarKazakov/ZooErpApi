import React from 'react';
import { ModalForm } from '../../Components/ModalForm';
import { ConditionView } from '../../Components/View/ConditionView';

export const ConditionInfoScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<ConditionView id={id} />}
      visible={visible}
      name="Condition Info"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
