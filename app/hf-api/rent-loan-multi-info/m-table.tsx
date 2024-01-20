import { DataGrid } from '@mui/x-data-grid';
import { NumericFormat } from 'react-number-format';

const columns = [
  { field: 'bankNm', headerName: '은행', width: 100, headerAlign: 'center' },
  { field: 'avgLoanRat2', headerName: '대출금리(%)', width: 100, type: 'number', headerAlign: 'center' },
  { field: 'cnt', headerName: '대출실행건수', width: 100, type: 'number', headerAlign: 'center' },
  { field: 'loanAmt', headerName: '대출실행금액(원)', width: 150, type: 'number', headerAlign: 'center'}
];

export default function DataTable({bankList}) {

  let rows = [];
  bankList.forEach((e) => {
    let row = {
      "id": e.bankNm,
      "bankNm": e.bankNm,
      "avgLoanRat2": e.avgLoanRat2,
      "cnt": e.cnt,
      "loanAmt": Number(e.loanAmt)
    };
    rows.push(row);
  });
  rows.sort((a, b) => (b.loanAmt - a.loanAmt));

  return (
    <div style={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooterPagination={true}
      />
    </div>
  );
}
