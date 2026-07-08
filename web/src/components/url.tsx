import { useState } from 'react'
import { ListUrls } from './list-url'
import { Logo } from './ui/logo'
import { UrlShortened } from './url-shortened'

export function Url() {
	const [reload, setReload] = useState(0)

	function handleUrlCreated() {
		setReload(prev => prev + 1)
	}

	return (
		<div className="flex flex-col  gap-6 p-10  bg-gray-200">
			<Logo />
			<div className="flex flex-col gap-6 lg:flex-row lg:justify-center lg:items-start">
				<UrlShortened onSuccess={handleUrlCreated} />
				<ListUrls reload={reload} />
			</div>
		</div>
	)
}
