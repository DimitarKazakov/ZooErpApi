import React from 'react';
import { SelectConditionForm } from '../../Components/Forms/Select/SelectConditionForm';
import { ModalForm } from '../../Components/ModalForm';

export const SelectConditionScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  action: string;
}) => {
  const { visible, setIsModalVisible, setId, action } = props;

  return (
    <ModalForm
      content={<SelectConditionForm setId={setId} action={action} />}
      visible={visible}
      name="Select Condition"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
