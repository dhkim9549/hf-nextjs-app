export default function MySkel() {
  return (
    <div class="w-full lg:w-96 bg-white p-4">
      <div class="animate-pulse flex flex-col gap-3">
        <div class="h-6 mt-5 mb-2 bg-slate-200 rounded"></div>
        {new Array(4).fill('').map(x =>
          <div class="h-3 bg-slate-200 rounded"></div>
        )}
      </div>
    </div>
  )
}

