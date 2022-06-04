import React from 'react';
import { ConditionForm } from '../../Components/Forms/Create/ConditionForm';
import { ModalForm } from '../../Components/ModalForm';

export const CreateConditionScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setIsModalVisible } = props;

  return (
    <ModalForm
      content={<ConditionForm setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Create Condition"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
