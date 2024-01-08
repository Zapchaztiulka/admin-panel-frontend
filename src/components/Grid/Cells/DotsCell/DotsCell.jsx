import { DotsIcon } from '@/components/Icons/Grid/DotsIcon';
import Menu from '@/components/Menu/Menu';
import Tooltip from 'rc-tooltip';
import React from 'react';
import 'rc-tooltip/assets/bootstrap.css';

export default function DotsCell({ onClick, colDef: { cellRendererParams } }) {
  const { dotsItems } = cellRendererParams;

  return (
    <Tooltip
      placement="leftBottom"
      trigger={['click']}
      overlay={<Menu items={dotsItems} />}
    >
      <div className="cursor-pointer">
        <DotsIcon />
      </div>
    </Tooltip>
  );
}
