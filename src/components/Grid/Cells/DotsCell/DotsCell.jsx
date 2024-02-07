import { DotsIcon } from '@/components/Icons/Grid/DotsIcon';
import Menu from '@/components/Menu/Menu';
import Tooltip from 'rc-tooltip';
import { useState, useCallback } from 'react';
import 'rc-tooltip/assets/bootstrap.css';

export default function DotsCell({
  onClick,
  data,
  colDef: { cellRendererParams },
}) {
  const { dotsItems } = cellRendererParams || {};
  const [visible, setVisible] = useState(false);

  const handleVisible = useCallback(() => {
    setVisible(false);
  }, []);

  const handleVisibleChange = useCallback((visible) => {
    setVisible(visible);
  }, []);

  return (
    <Tooltip
      placement="leftBottom"
      trigger={['click']}
      destroyTooltipOnHide
      showArrow={false}
      onVisibleChange={handleVisibleChange}
      overlayClassName="rc-custom"
      overlay={<Menu items={dotsItems} value={[data]} onClose={handleVisible} />}
      visible={visible}
    >
      <div className="cursor-pointer">
        <DotsIcon />
      </div>
    </Tooltip>
  );
}
