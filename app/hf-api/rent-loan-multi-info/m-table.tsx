import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { NumericFormat } from 'react-number-format';

export default function BasicTable({bankList}) {

  bankList.sort((a, b) => b.cnt - a.cnt);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">은행</TableCell>
            <TableCell align="center">대출금리(%)</TableCell>
            <TableCell align="center">대출실행건수</TableCell>
            <TableCell align="center">대출실행금액(원)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bankList.map((row) => (
            <TableRow
              key={row.bankNm}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.bankNm}
              </TableCell>
              <TableCell align="center">{row.avgLoanRat2}</TableCell>
              <TableCell align="center">
                <NumericFormat value={row.cnt} thousandSeparator="," className="text-right"/>
              </TableCell>
              <TableCell align="right">
                <NumericFormat value={row.loanAmt} thousandSeparator="," className="text-right"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

