import DotsCell from '@/components/Grid/Cells/DotsCell/DotsCell';
import EditCell from '@/components/Grid/Cells/EditCell/EditCell';
import ProductsTooltip from '@/components/ProductsTooltip/ProductsTooltip';
import Status from '@/components/Status/Status';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

export const OrderCard = ({ item, dotsItems }) => {
  const [showProductsTooltip, setShowProductsTooltip] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProducts = useCallback(
    (e) => {
      e.preventDefault();
      setShowProductsTooltip(!showProductsTooltip);
    },
    [showProductsTooltip]
  );

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  return (
    <div className="rounded-medium border border-borderDefault relative">
      <div className="bg-bgGreyLigth p-xs flex gap-xs2 text-xs text-textSecondary rounded-medium">
        <input type="checkbox" />#{item._id.slice(-6)}
      </div>
      <div className="p-xs flex gap-xs2">
        Номер телефону
        <span className="text-textInputActive text-base">+38{item.phone}</span>
      </div>
      <div className="p-xs flex gap-xs2 items-center">
        Статус <Status status={item.status} />
      </div>
      <div className="p-xs flex gap-xs2 ">
        Вартість
        <span className="text-textInputActive text-base">
          {item.totalPrice}
        </span>
      </div>

      <div className="p-xs flex gap-xs2 items-center relative">
        Замовлення
        <div onClick={handleProducts}>
          <span className="text-textBrand text-base">
            {item.products.length} товари
          </span>
        </div>
        {showProductsTooltip && (
          <Link
            to={`details/${item._id}`}
            className="absolute	top-[40px] right-0 rounded-medium2 shadow-tooltip"
            key={item._id}
          >
            <ProductsTooltip value={item.products} />
          </Link>
        )}
      </div>

      <div className="flex justify-end gap-sPlus p-s">
        <EditCell data={item} />
        <DotsCell
          onClick={handleOpenMenu}
          data={item}
          colDef={{ cellRendererParams: { dotsItems } }}
        />
      </div>
    </div>
  );
};
