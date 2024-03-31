import DotsCell from '@/components/Grid/Cells/DotsCell/DotsCell';
import EditCell from '@/components/Grid/Cells/EditCell/EditCell';
import Status from '@/components/Status/Status';
import { useCallback, useState } from 'react';


export const ProductCard = ({ item, dotsItems, onSelect, selectedIds }) => {
 
  const [menuOpen, setMenuOpen] = useState(false);


  const handleOpenMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const handleSelect = useCallback(
    (e) => {
      onSelect(item, e.target.checked);
    },
    [item, onSelect]
  );

  return (
    <div className="rounded-medium border border-borderDefault relative">
      <label
        className="bg-bgGreyLigth p-xs flex gap-xs2 text-textSecondary rounded-medium"
        htmlFor={`card_order${item._id}`}
      >
        <input
          id={`card_order${item._id}`}
          type="checkbox"
          onChange={handleSelect}
          checked={selectedIds.includes(item?._id)}
        />
        {item.name}
      </label>

      <div className="p-xs flex gap-xs2">
        Артикул
        <span className="text-textInputActive text-base">
          {item.vendorCode}
        </span>
      </div>
      <div className="p-xs flex gap-xs2 ">
        Ціна
        <span className="text-textInputActive text-base">
          {item.price.value} ₴
        </span>
        
      </div>
      <div className="p-xs flex gap-xs2 items-center">
          Статус <Status status={item.availability} />
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
