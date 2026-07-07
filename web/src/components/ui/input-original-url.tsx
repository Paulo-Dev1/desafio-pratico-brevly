import { WarningIcon } from '@phosphor-icons/react'

export function InputOriginal({
	label,
	placeholder,
	value,
	onChange,
	error,
}: {
	label: string
	placeholder: string
	value: string
	onChange: (value: string) => void
	error?: string
	inputverific: number
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
				className={`w-full min-w-0 rounded-lg border-1-5 px-3 py-2 text-sm text-gray-600 outline-none sm:text-base
                       ${error ? 'border-danger' : 'border-gray-300'}
		        ${
							error
								? 'focus-within:border-danger focus-within:ring-2 focus-within:ring-red-200'
								: 'focus-within:border-blue-base'
						}`}
			/>
			{error && (
				<p className="flex text-xs text-gray-500 -mb-2 -mt-2">
					<WarningIcon size={16} className="text-danger mr-1" />
					{error}
				</p>
			)}
		</>
	)
}
