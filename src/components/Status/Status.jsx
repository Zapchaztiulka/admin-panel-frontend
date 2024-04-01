import { PropTypes } from 'prop-types';

const defaultStatusClassName = 'bg-bgBrandLight1 text-textBrand';

const mapStatusToColor = {
  нове: 'bg-bgBrandLight1 text-textBrand',
  'передано в службу доставки': 'bg-bgBrandLight1 text-textBrand',
  'очікує клієнта в пункті видачі': 'bg-bgBrandLight1 text-textBrand',
  "очікує вручення кур'єром": 'bg-bgBrandLight1 text-textBrand',
  підтверджено: 'bg-bgSuccessDark text-textSuccess',
  завершено: 'bg-bgSuccessDark text-textSuccess',
  комплектується: 'bg-bgWarningDark text-textWarning',
  скасовано: 'bg-bgWarningDark text-textWarning',
  забраковано: 'bg-bgErrorDark text-textError',

  'в наявності': 'bg-bgSuccessDark text-textSuccess',
  'під замовлення': 'bg-bgWarningDark text-textWarning',
  відсутній: 'bg-bgErrorDark text-textError',
};

const Status = ({ status }) => {
  let statusClassName = mapStatusToColor[status];
  if (!statusClassName) {
    statusClassName = defaultStatusClassName;
  }
  return (
    <div
      className={`cursor-pointer ${statusClassName} rounded-medium3 px-xs py-xs3 text-caption first-letter:capitalize`}
    >
      {status}
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Status;
