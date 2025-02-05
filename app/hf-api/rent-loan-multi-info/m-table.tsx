import { DataGrid } from '@mui/x-data-grid';
import { NumericFormat } from 'react-number-format';

const columns = [
  { field: 'bankNm', headerName: '은행', width: 100, headerAlign: 'center', align: 'center' },
  { field: 'avgLoanRat2', headerName: '대출금리(%)', width: 100, type: 'number', headerAlign: 'center',
    valueFormatter: (value) => {
      if (value == null) {
        return '';
      }
      return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
    },
  },
  { field: 'cnt', headerName: '대출실행건수', width: 105, type: 'number', headerAlign: 'center' },
  { field: 'loanAmt', headerName: '대출실행금액(원)', width: 150, type: 'number', headerAlign: 'center'}
];

export default function DataTable({bankList}) {

  let rows = [];
  bankList.forEach((e) => {
    let row = {
      "id": e.bankNm,
      "bankNm": e.bankNm,
      "avgLoanRat2": Number(e.avgLoanRat2),
      "cnt": e.cnt,
      "loanAmt": Number(e.loanAmt)
    };
    rows.push(row);
  });
  rows.sort((a, b) => (b.loanAmt - a.loanAmt));

  return (
    <div style={{ height: '100%', width: '100%' }} className="bg-white">
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooterPagination={true}
        sx={{
          boxShadow: 2,
          border: 0,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </div>
  );
}
