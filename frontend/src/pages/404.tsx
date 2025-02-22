import { Link } from "react-router";

export default function NotFound() {
	return (
		<div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 text-center">
			<p className="text-base font-semibold text-yellow-600">404</p>
			<h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Page not found</h1>
			<p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Sorry, we couldn't find the page you're looking for.</p>
			<div className="mt-10 flex items-center justify-center gap-x-6">
				<Link to="/" className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-600">
					Go back home
				</Link>
			</div>
		</div>
	);
}
