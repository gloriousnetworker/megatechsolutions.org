import { Skeleton } from '../ui/skeleton';

export function StaffCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-6 text-center space-y-3">
      <Skeleton className="size-24 rounded-full mx-auto" />
      <Skeleton className="h-5 w-32 mx-auto" />
      <Skeleton className="h-4 w-48 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-2 justify-center pt-2">
        <Skeleton className="h-6 w-14 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function StaffGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <StaffCardSkeleton key={i} />
      ))}
    </div>
  );
}
