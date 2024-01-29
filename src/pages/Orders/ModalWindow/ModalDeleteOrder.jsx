import Modal from 'universal-components-frontend/src/components/modals/universalComponents/Modal';
import Button, {
  BUTTON_TYPES,
} from 'universal-components-frontend/src/components/buttons/button';
import LightningIcon from 'universal-components-frontend/src/components/icons/universalComponents/LightningIcon';



const ModalDeleteOrder = ({
  isOpen,
  handleCloseModal,
  handleConfirmDelete,
}) => {
 

  return (
    <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          type="negative"
          title="Видалити замовлення"
          description="Ви впевнені, що хочете видалити замовлення? Відмініти цю дію неможливо."
          icon={<LightningIcon />}
        >
          <div className="lg:w-[616px] flex flex-col gap-m2 mt-xs2 w-[288px]">
            <Button
              text="Відмінити"
              buttonType={BUTTON_TYPES.SECONDARY_GRAY}
              onClick={handleCloseModal}
            />
            <Button
              text="Видалити"
              buttonType={BUTTON_TYPES.DESTRUCTIVE}
              onClick={handleConfirmDelete}
            />
          </div>
        </Modal>
  );
};

export default ModalDeleteOrder;
