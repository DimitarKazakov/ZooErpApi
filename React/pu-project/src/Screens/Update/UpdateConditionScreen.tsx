import React from 'react';
import { UpdateConditionForm } from '../../Components/Forms/Update/UpdateConditionForm';
import { ModalForm } from '../../Components/ModalForm';

export const UpdateConditionScreen = (props: {
  visible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const { visible, setIsModalVisible, id } = props;

  return (
    <ModalForm
      content={<UpdateConditionForm id={id} setIsModalVisible={setIsModalVisible} />}
      visible={visible}
      name="Update Condition"
      setIsModalVisible={setIsModalVisible}
    />
  );
};
