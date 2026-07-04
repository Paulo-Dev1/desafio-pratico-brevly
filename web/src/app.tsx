import { Route, Routes } from 'react-router-dom'
import { Error404 } from './components/errors/error-404'
import { Redirect } from './components/redirect'
import { Url } from './components/url'

export function App() {
	return (
		<main className="h-dvh flex flex-col items-center justify-center p-10 c bg-[#E4E6EC]">
			<Routes>
				<Route path="/*" element={<Url />} />
				<Route path="/:shortenedUrl" element={<Redirect />} />
				<Route path="/not-found" element={<Error404 />} />
			</Routes>
		</main>
	)
}
