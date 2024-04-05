import { Skeleton } from './ui/skeleton'

export const SkeletonAction = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-52" />
      <Skeleton className="w-full h-[90vh]" />
    </div>
  )
}
