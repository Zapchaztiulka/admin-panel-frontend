import { DotsIcon } from '@/components/Icons/Grid/DotsIcon';
import Menu from '@/components/Menu/Menu';
import Tooltip from 'rc-tooltip';
import React from 'react';
import 'rc-tooltip/assets/bootstrap.css';

export default function DotsCell({
  onClick,
  data,
  colDef: { cellRendererParams },
}) {
  const { dotsItems } = cellRendererParams || {};

  return (
    <Tooltip
      placement="leftBottom"
      trigger={['click']}
      showArrow={false}
      overlayClassName="rc-custom"
      overlay={<Menu items={dotsItems} item={data} />}
    >
      <div className="cursor-pointer">
        <DotsIcon />
      </div>
    </Tooltip>
  );
}