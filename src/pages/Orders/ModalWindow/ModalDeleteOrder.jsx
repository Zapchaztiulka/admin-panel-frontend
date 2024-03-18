import Modal from 'universal-components-frontend/src/components/modals/universalComponents/Modal';
import { Button } from 'universal-components-frontend/src/components/buttons';
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
          zIndex={10}
        >
          <div className="lg:w-[616px] flex flex-col gap-m2 mt-xs2 w-[288px]">
            <Button
              text="Відмінити"
              buttonType="secondary-gray"
              onClick={handleCloseModal}
            />
            <Button
              text="Видалити"
              buttonType="desctructive"
              onClick={handleConfirmDelete}
            />
          </div>
        </Modal>
  );
};

export default ModalDeleteOrder;
