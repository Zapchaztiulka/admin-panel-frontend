import Modal from 'universal-components-frontend/src/components/modals/universalComponents/Modal';
import Button, {
  BUTTON_TYPES,
} from 'universal-components-frontend/src/components/buttons/button';
import Input from 'universal-components-frontend/src/components/inputs/universalComponents/Input';
import Textarea from 'universal-components-frontend/src/components/inputs/universalComponents/Textarea';
import { useState } from 'react';
import { useEffect } from 'react';

const ModalWindowNewOrder = ({
  isOpen,
  handleCloseModal,
  handleCreateOrder,
}) => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPhone(value);
  };

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  useEffect(() => {
    if (phone.length >= 1) {
      if (/^0[0-9]{9}$/.test(phone)) {
        setIsValid(true);
        setPhoneError('');
      } else {
        setIsValid(false);
        setPhoneError(
          'Телефон користувача має починатися з 0 і містити 10 цифр'
        );
      }
    } else {
      setIsValid(false);
      setPhoneError('');
    }
  }, [phone]);

  const handleCreate = () => {
    handleCreateOrder(phone);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Впишіть номер телефону покупця"
    >
      <>
        <div className="lg:w-[616px] flex flex-col gap-m2 mt-xs2 w-[288px] ">
          <div className="w-full">
            <Input
              label="Номер телефону"
              onChange={handleInputChange}
              asterisk
            />
            {!!phoneError.length && <span>{phoneError}</span>}
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
            onClick={handleCreate}
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

export default ModalWindowNewOrder;
