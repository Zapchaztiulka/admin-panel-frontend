import { PropTypes } from 'prop-types';


const statuses = ['нове', 'підтверджено', 'комплектується', 'передано в службу доставки',
    'очікує клієнта в пункті видачі', "очікує вручення кур'єром",
    'очікується післяплата','рекламація', 'повернуто',
    'завершено', 'забраковано', 'скасовано']

export const statusOptions = statuses.map(item => item.charAt(0).toUpperCase() + item.slice(1))

const mapStatusToColor = {
    'нове': 'bg-bgBrandLight1 text-textBrand',
    'передано в службу доставки': 'bg-bgBrandLight1 text-textBrand',
    'очікує клієнта в пункті видачі': 'bg-bgBrandLight1 text-textBrand',
    "очікує вручення кур'єром": 'bg-bgBrandLight1 text-textBrand',
    'підтверджено': 'bg-bgSuccessDark text-textSuccess',
    'завершено': 'bg-bgSuccessDark text-textSuccess',
    'комплектується': 'bg-bgWarningDark text-textWarning',
    'забраковано': 'bg-bgWarningDark text-textWarning',
    'скасовано': 'bg-bgWarningDark text-textWarning',
}

const Status = ({ status }) => {

    return (
        <div className={`cursor-pointer ${mapStatusToColor[status]} capitalize rounded-medium3 px-xs py-xs3 inline text-caption`}>
            {status}
        </div>
    )
}

Status.propTypes = {
    status: PropTypes.string.isRequired
}

export default Status