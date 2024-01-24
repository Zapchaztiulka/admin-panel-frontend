import { useState } from 'react';
import Input from 'universal-components-frontend/src/components/inputs/universalComponents/Input';
import Textarea from 'universal-components-frontend/src/components/inputs/universalComponents/Textarea';
import Modal from 'universal-components-frontend/src/components/modals/universalComponents/Modal';
import Button, {
  BUTTON_TYPES,
} from 'universal-components-frontend/src/components/buttons/button';
import { useEffect } from 'react';

const ModalWindowComment = ({
  isOpen,
  handleCloseModal,
  handleSaveComment,
}) => {
  const [adminName, setAdminName] = useState('');
  const [adminComment, setAdminComment] = useState('');
  const [isValid, setIsValid] = useState(false)

  const handleInputChange = (e) => {
    setAdminName(e.target.value);
  };
  const handleTextareaChange = (e) => {
    setAdminComment(e.target.value);
  };

  useEffect(() => {
    if (adminName && adminComment) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  },[adminName, adminComment])

  const handleAddComment = () => {
    const data = {
      adminData: {
        adminName,
        adminComment,
      },
    };
    handleSaveComment(data);
  };

  return (
    <Modal
      
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Додати коментар"
      description="Впишіть ім’я менеджеру, який залишає коментар, та Ваш коментар."
    >
      <>
        <div className="flex flex-col gap-m2 mt-xs2 w-[616px]">
          <div className="w-full">
            <Input label="Менеджер" onChange={handleInputChange} />
          </div>
          <div className="w-full">
            <Textarea
              label="Коментар до замовлення"
              onChange={handleTextareaChange}
            />
          </div>
        </div>
        <div className="flex gap-m mt-m">
          <Button
            disabled={!isValid}
            text="Зберегти"
            buttonType={BUTTON_TYPES.PRIMARY}
            onClick={handleAddComment}
          />
          <Button
            text="Видалити"
            buttonType={BUTTON_TYPES.DESTRUCTIVE}
            onClick={handleCloseModal}
          />
        </div>
      </>
    </Modal>
  );
};

export default ModalWindowComment;
