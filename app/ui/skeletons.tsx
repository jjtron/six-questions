// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full ' +
  'before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r ' +
  'before:from-transparent before:via-white/60 before:to-transparent';

export default function SixAnswersSkeleton() {
  return (
<div className="flex flex-col bg-inherit md:pl-2">
	<div className="flex md:flex-row flex-col">
		<div className="basis-1/4 pl-2 border-1 border-slate-400 rounded-md bg-sky-300">
			<p className="font-bold">WHO</p>Jerry, Mike, Joe
		</div>
		<div className="basis-1/4 pl-2 border-1 border-slate-400 rounded-md bg-sky-300">
			<p className="font-bold">WHEN</p>
			<div>02/01/2024</div>
			<div>12:00 AM</div>
		</div>
		<div className="basis-1/2 pl-2 border-1 border-slate-400 rounded-md bg-sky-300">
			<div className="flex flex-row">
				<div className="basis-16 text-right shrink-0 mr-2 font-bold text-base">WHERE:</div>
				<div className="text-left font-semibold text-base"> My Place Two</div>
			</div>
			<div className="flex flex-row">
				<div className="basis-16 text-right shrink-0 mr-2 md:text-base text-sm">Street: </div>
				<div className="text-left md:text-base text-sm"> 726 Fifteenth Ave</div>
			</div>
			<div className="flex flex-row">
				<div className="basis-16 text-right shrink-0 mr-2 md:text-base text-sm">City: </div>
				<div className="text-left md:text-base text-sm"> New York</div>
			</div>
			<div className="flex flex-row">
				<div className="basis-16 text-right shrink-0 mr-2 md:text-base text-sm">State: </div>
				<div className="text-left md:text-base text-sm"> New York</div>
			</div>
		</div>
	</div>
	<div className="flex-col">
		<div className="flex flex-col rounded-md mt-px border-1 border-slate-400 pl-2 even:bg-sky-250 odd:bg-sky-300">
			<p className="font-bold">WHAT</p>
			<p className="break-all">This is a test</p>
		</div>
		<div className="flex flex-col rounded-md mt-px border-1 border-slate-400 pl-2 even:bg-sky-250 odd:bg-sky-300">
			<p className="font-bold">HOW</p>
			<p className="break-all">This is a test</p>
		</div>
		<div className="flex flex-col rounded-md mt-px border-1 border-slate-400 pl-2 even:bg-sky-250 odd:bg-sky-300">
			<p className="font-bold">WHY</p>
			<p className="break-all">This is a test</p>
		</div>
	</div>
</div>
  );
}

