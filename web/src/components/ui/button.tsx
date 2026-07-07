import type { ReactNode } from 'react'

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
	children: ReactNode
	disabled?: boolean
}

export function Button({
	type = 'button',
	onClick,
	children,
	disabled = false,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className="mt-4 inline-flex w-full cursor-pointer justify-center rounded-lg bg-blue-base px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 sm:text-base"
		>
			{children}
		</button>
	)
}
