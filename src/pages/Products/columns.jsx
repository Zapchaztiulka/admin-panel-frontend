import DotsCell from "@/components/Grid/Cells/DotsCell/DotsCell";
import EditCell from "@/components/Grid/Cells/EditCell/EditCell";
import StatusCell from "@/components/Grid/Cells/StatusCell/StatusCell";


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
    field: '_id',
    headerName: 'Артикул',
    width: 116,
    maxWidth: 258,
    minWidth: 100,
    cellClass: 'cell-orderNumber',
    valueFormatter: ({ value }) => `${value.slice(-6)}`,
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
    field: 'availability',
    colId: 'availability',
    headerName: 'Статус',
    cellRenderer: StatusCell,
    width: 150,
    maxWidth: 250,
    minWidth: 130,
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
