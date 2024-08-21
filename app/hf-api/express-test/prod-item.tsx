import Paper from '@mui/material/Paper';

export default function ProdItem({prodObj}) {
  return(
    <Paper className="w-full lg:w-96 bg-white p-4 flex flex-col gap-2">
      <div className="text-slate-800 text-2xl mt-5 mb-2">{prodObj.i}</div>
      <div className="text-slate-900">{prodObj.a}</div>
      <div className="text-slate-900">{prodObj.b}</div>
    </Paper>
  )
}
