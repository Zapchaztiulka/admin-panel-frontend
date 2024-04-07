import DotsCell from '@/components/Grid/Cells/DotsCell/DotsCell';
import EditProductCell from '@/components/Grid/Cells/EditCell/EditProductCell';
import StatusCell from '@/components/Grid/Cells/StatusCell/StatusCell';
import { formatDateForPrice } from '@/utils';

export const columns = [
  {
    field: 'checkbox',
    headerName: '',
    width: 64,
    maxWidth: 64,
    minWidth: 64,
    checkboxSelection: true,
  },
  {
    field: 'vendorCode',
    headerName: 'Артикул',
    width: 116,
    maxWidth: 258,
    minWidth: 100,
    cellClass: 'cell-orderNumber',
    valueFormatter: ({ value }) => `${value}`,
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 586,
    maxWidth: 586,
    minWidth: 200,
    valueFormatter: ({ value }) => value,
  },
  {
    field: 'price',
    headerName: 'Ціна',
    width: 118,
    maxWidth: 118,
    minWidth: 50,
    valueFormatter: ({ value }) => {
      return `${value.value} ₴`;
    },
  },
  {
    field: 'price_date',
    headerName: 'Дата оновлення ціни',
    width: 200,
    maxWidth: 200,
    minWidth: 50,
    valueFormatter: ({ data: { price } }) => {
      return `${formatDateForPrice(price.updatedAt)}`;
    },
  },
  {
    field: 'availability',
    colId: 'availability',
    headerName: 'Статус',
    cellRenderer: StatusCell,
    width: 155,
    maxWidth: 250,
    minWidth: 155,
  },
  {
    field: 'edit',
    headerName: '',
    cellRenderer: EditProductCell,
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
