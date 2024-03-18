import { useState } from 'react';
import Textarea from 'universal-components-frontend/src/components/inputs/universalComponents/Textarea';
import Modal from 'universal-components-frontend/src/components/modals/universalComponents/Modal';
import {
  Button,
  BUTTON_TYPES,
} from 'universal-components-frontend/src/components/buttons';
import { useEffect } from 'react';

const ModalWindowComment = ({
  isOpen,
  handleCloseModal,
  handleSaveComment,
}) => {
  const [adminComment, setAdminComment] = useState('');
  const [isValid, setIsValid] = useState(false)

  const handleTextareaChange = (e) => {
    setAdminComment(e.target.value);
  };

  useEffect(() => {
    if (adminComment.length > 9) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  },[adminComment])

  const handleAddComment = () => {
    handleSaveComment(adminComment);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Додати коментар"
      description="Довжина коментаря повинна бути більше 10 символів"
      type="neutral"
      zIndex={10}
      isIcon={false}
    >
      <>
        <div className="lg:w-[616px] flex flex-col gap-m2 mt-xs2 w-[288px] text-left">
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
