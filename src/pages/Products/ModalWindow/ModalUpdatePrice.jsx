import Modal from 'universal-components-frontend/src/components/modals/universalComponents/Modal';
import { Button } from 'universal-components-frontend/src/components/buttons';
import LightningIcon from 'universal-components-frontend/src/components/icons/universalComponents/LightningIcon';
import Input from 'universal-components-frontend/src/components/inputs/universalComponents/Input';
import SaveIcon from 'universal-components-frontend/src/components/icons/universalComponents/SaveIcon';
import { useState } from 'react';

const ModalUpdatePrice = ({
  isOpen,
  handleCloseModal,
  handleSavePrice,
  product,
}) => {
  const [price, setPrice] = useState(product[0]?.price.value);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    const formattedDate = day + '.' + month + '.' + year;
    return formattedDate;
  };

  const handlePriceChange = (val) => {setPrice(val);};

  const handleSave = () => {handleSavePrice(price)}

  return (
    <div className="w-[400px]">
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        type="neutral"
        title="Актуалізація ціни"
        description="Відредагуйте ціну товару, якщо вона вже не актуальна."
        icon={<LightningIcon />}
        zIndex={10}
      >
        <div className="lg:w-[400px] flex gap-m2 mt-xs2 w-[288px] justify-center flex-col">
          <div className="text-left">
            <p className="text-caption mb-xs3">Артикул</p>
            <p className="text-body mb-s">{product[0]?.vendorCode}</p>
            <p className="text-caption mb-xs3">Назва товару</p>
            <p className="text-body mb-s">{product[0]?.name}</p>
            <p className="text-caption mb-xs3">Ціна</p>
            <Input
              inputBoxClassName="w-full"
              inputTypesFigma="SearchField"
              type="text"
              value={price}
              handleChange={handlePriceChange}
            />
            <p className="text-caption mt-xs3 ">
              Ціну перевірено {formatDate(product[0].price.updatedAt)}
            </p>
          </div>
          <Button
            text="Зберегти"
            buttonType="primary"
            onClick={handleSave}
            icon={SaveIcon}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalUpdatePrice;
