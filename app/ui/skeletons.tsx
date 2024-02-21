// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function SixAnswersSkeleton() {
  return (
	<div className="basis-1/2 pl-2 border-1 border-slate-400 rounded-md bg-gray-100">
		<div className="flex flex-row">
			<div className="basis-16 text-right shrink-0 mr-2 font-light text-base">WHERE:</div>
			<div className="text-left font-light text-base">loading . . .</div>
		</div>
		<div className="flex flex-row">
			<div className="basis-16 text-right shrink-0 mr-2 md:text-base text-sm">Street: </div>
			<div className="text-left md:text-base text-sm">loading . . .</div>
		</div>
		<div className="flex flex-row">
			<div className="basis-16 text-right shrink-0 mr-2 md:text-base text-sm">City: </div>
			<div className="text-left md:text-base text-sm">loading . . .</div>
		</div>
		<div className="flex flex-row">
			<div className="basis-16 text-right shrink-0 mr-2 md:text-base text-sm">State: </div>
			<div className="text-left md:text-base text-sm">loading . . .</div>
		</div>
	</div>
  );
}

