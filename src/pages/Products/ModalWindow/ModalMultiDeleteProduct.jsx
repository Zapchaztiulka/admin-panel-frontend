import Modal from 'universal-components-frontend/src/components/modals/universalComponents/Modal';
import { Button } from 'universal-components-frontend/src/components/buttons';
import LightningIcon from 'universal-components-frontend/src/components/icons/universalComponents/LightningIcon';

const ModalMultiDeleteProduct = ({
  isOpen,
  length = 2,
  handleCloseModal,
  handleConfirmDelete,
}) => {
  return (
    <div className="w-[400px]">
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        type="negative"
        title= {`Видалити ${length} товарів`}
        description="Ви впевнені, що хочете видалити товари? Відмініти цю дію неможливо."
        icon={<LightningIcon />}
        zIndex={10}
      >
        <div className="lg:w-[616px] flex gap-m2 mt-xs2 w-[288px] justify-center">
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
    </div>
  );
};

export default ModalMultiDeleteProduct;
