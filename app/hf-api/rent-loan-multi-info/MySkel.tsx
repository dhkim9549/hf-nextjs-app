export default function MySkel() {
  return (
    <div className="w-full sm:w-[450px]">
      <div className="animate-pulse flex flex-col gap-2">
        {new Array(4).fill('').map(x =>
          <div className="h-7 bg-slate-200 rounded"></div>
        )}
      </div>
    </div>
  )
}

