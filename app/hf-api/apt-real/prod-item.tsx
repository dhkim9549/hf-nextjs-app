import Paper from '@mui/material/Paper';

export default function ProdItem({prodObj}) {

  return(
    <Paper className="w-full lg:w-96 bg-white p-4 flex flex-col gap-2">
      <div className="text-slate-800 text-2xl mt-5 mb-2">{prodObj.aptNm}</div>
      <div className="text-slate-900">{prodObj.sggu}</div>
      <div className="text-slate-900">{prodObj.prc}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {prodObj.areas &&
          prodObj.areas.map(x =>
            <AreaItem area={x} />
          )
        }
      </div>
    </Paper>
  )
}

function AreaItem({area}) {
  return(
    <Paper className="bg-amber-300 p-1 text-sm">
      {area}
    </Paper>
  )
}
