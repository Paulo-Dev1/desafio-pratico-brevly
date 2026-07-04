export function InputShortened({
	label,
	value,
	onChange,
}: {
	label: string
	value: string
	onChange: (value: string) => void
}) {
	return (
		<>
			<div className="-mb-2">
				<span className="text-gray-500 w-full text-xs">{label}</span>
			</div>
			<div className="flex items-center rounded-lg border border-gray-300">
				<span className=" text-gray-500 ml-3">brev.ly/</span>
				<input
					type="text"
					value={value}
					onChange={e => onChange(e.target.value)}
					className="flex-1 outline-none w-full  px-3 py-2 text-gray-800"
				/>
			</div>
		</>
	)
}
