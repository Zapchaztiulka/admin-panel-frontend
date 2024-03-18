import DotsCell from '@/components/Grid/Cells/DotsCell/DotsCell';
import EditCell from '@/components/Grid/Cells/EditCell/EditCell';
import ProductsCell from '@/components/Grid/Cells/ProductsCell/ProductsCell';
import StatusCell from '@/components/Grid/Cells/StatusCell/StatusCell';
import ProductsTooltip from '@/components/ProductsTooltip/ProductsTooltip';

export const columns = [
  {
    field: 'checkbox2',
    headerName: '',
    width: 64,
    maxWidth: 64,
    minWidth: 64,
    checkboxSelection: true,
  },
  {
    field: '_id',
    headerName: '№ замовлення',
    width: 258,
    maxWidth: 258,
    minWidth: 127,
    cellClass: 'cell-orderNumber',
    valueFormatter: ({ value }) => {
      return `${value.slice(-6)}`;
    },
  },
  {
    field: 'phone',
    headerName: 'Номер телефону',
    width: 284,
    maxWidth: 284,
    minWidth: 158,
    valueFormatter: ({ value }) => {
      return `+38${value}`;
    },
  },
  {
    field: 'totalPrice',
    headerName: 'Вартість',
    width: 258,
    maxWidth: 258,
    minWidth: 127,
    valueFormatter: ({ value }) => {
      return `${value} ₴`;
    },
  },
  {
    field: 'products',
    headerName: 'Замовлення',
    width: 259,
    maxWidth: 259,
    minWidth: 114,
    tooltipField: 'products',
    tooltipComponent: ProductsTooltip,
    cellRenderer: ProductsCell,
  },
  {
    field: 'status',
    colId: 'status',
    headerName: 'Статус',
    cellRenderer: StatusCell,
    width: 240,
    maxWidth: 900,
    minWidth: 240,
  },
  {
    field: 'edit',
    headerName: '',
    cellRenderer: EditCell,
    width: 56,
    maxWidth: 56,
    minWidth: 56,
  },
  {
    field: 'settings',
    headerName: '',
    cellRenderer: DotsCell,
    width: 56,
    maxWidth: 56,
    minWidth: 56,
  },
];
