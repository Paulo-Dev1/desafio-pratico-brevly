import { WarningIcon } from '@phosphor-icons/react'

export function InputShortened({
	label,
	value,
	onChange,
	error,
}: {
	label: string
	value: string
	onChange: (value: string) => void
	error?: string
}) {
	return (
		<>
			<div className="-mb-2">
				<span className="text-gray-500 w-full text-xs">{label}</span>
			</div>
			<div
				className={`flex items-center rounded-lg border outline-none
                  ${error ? 'border-danger' : 'border-gray-300'}
		        ${
							error
								? 'focus-within:border-danger focus-within:ring-2 focus-within:ring-red-200'
								: 'focus-within:border-blue-base'
						}`}
			>
				<span className="ml-3 shrink-0 text-gray-600">brev.ly/</span>
				<input
					type="text"
					value={value}
					onChange={e => onChange(e.target.value)}
					className="w-full min-w-0 flex-1 py-2 text-sm text-gray-600 outline-none sm:text-base"
				/>
			</div>
			{error && (
				<p className="flex text-xs text-gray-500 -mb-2 -mt-2">
					<WarningIcon size={16} className="text-danger mr-1" />
					{error}
				</p>
			)}
		</>
	)
}
