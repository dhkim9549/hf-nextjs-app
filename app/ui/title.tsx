export default function Title({t1, t2, t3}) {
  return (
    <div className="text-center lg:text-left lg:ml-10 p-10">
      <blockquote className="text-2xl font-bold italic text-slate-900">
        {t1}
        <span className="ml-3 mr-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-white">{t2}</span>
        </span>
        <span className="ml-2">
          {t3}
        </span>
      </blockquote>
    </div>
  )
}
