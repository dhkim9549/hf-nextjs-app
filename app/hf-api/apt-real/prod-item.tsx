import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function ProdItem({prodObj, addAptList}) {

  return(
    <Paper className="w-72 bg-white mx-2 p-4 flex flex-col">
      <div className="text-slate-800 text-xl mb-1">{prodObj.aptNm}</div>
      <div className="text-slate-900">{prodObj.sggu}</div>
      <div className="text-slate-900 text-sm">{prodObj.cnstYr}년 준공</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {prodObj.areas &&
          prodObj.areas.map(x =>
            <AreaItem key={x} area={x} sggu={prodObj.sggu} aptNm={prodObj.aptNm} addAptList={addAptList} />
          )
        }
      </div>
    </Paper>
  )
}

function AreaItem({area, sggu, aptNm, addAptList}) {

  return(
    <Button variant="contained" className="min-w-0 h-5 px-1 py-3 bg-amber-300 text-black text-sm" onClick={() => {
      addAptList({sggu, aptNm, area});
    }}>
      {area}
    </Button>
  )
}
