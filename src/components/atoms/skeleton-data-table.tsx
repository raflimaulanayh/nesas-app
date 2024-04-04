import { Skeleton } from './ui/skeleton'

export const SkeletonDataTable = () => {
  return (
    <div className="grid gap-2">
      <div className="flex justify-between gap-2 mb-4">
        <Skeleton className="w-4/12 h-8 rounded-md bg-slate-200" />
        <Skeleton className="w-8/12 h-8 rounded-md bg-slate-200" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            {index % 2 === 0 ? (
              <>
                <Skeleton className="w-4 h-4 rounded-full bg-slate-200" />
                <Skeleton className="w-full h-8 rounded-md bg-slate-200" />
              </>
            ) : (
              <>
                <Skeleton className="w-10/12 h-8 rounded-md bg-slate-200" />
                <Skeleton className="w-2/12 h-8 rounded-md bg-slate-200" />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Skeleton className="w-full h-8 rounded-md bg-slate-200" />
        <Skeleton className="w-full h-8 rounded-md bg-slate-200" />
      </div>
    </div>
  )
}
