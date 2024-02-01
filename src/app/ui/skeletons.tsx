const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function CardSkeleton(){
  return(
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2"></div>
          </div>
          <div className="w-full" />
      </div>
    </>
  )
}