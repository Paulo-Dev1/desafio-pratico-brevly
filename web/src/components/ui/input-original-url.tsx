export function InputOriginal({
	label,
	placeholder,
	value,
	onChange,
}: {
	label: string
	placeholder: string
	value: string
	onChange: (value: string) => void
}) {
	return (
		<>
			<div className="-mb-2">
				<span className="text-gray-500 w-full text-xs">{label}</span>
			</div>         
				<input
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={e => onChange(e.target.value)}
					className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600"
				/>
			
		</>
	)
}
