const features = [
	{ name: "Real-Time Collaboration", description: "Work together seamlessly with live code editing and instant updates." },
	{ name: "Intelligent Code Completion", description: "Boost productivity with auto code suggestions/completion." },
	{ name: "Integrated Chat", description: "Communicate with your team directly within the platform." },
	{ name: "Project Management", description: "Easily manage projects, invite team members, and track progress." },
];

export default function FrontPage() {
	return (
		<div className="h-full flex justify-center items-center mt-5">
			<div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
				<div>
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Technical Specifications</h2>

					<dl className="mt-3 sm:mt-16 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
						{features.map((feature) => (
							<div key={feature.name} className="border-t border-gray-200 pt-4">
								<dt className="font-medium text-gray-900">{feature.name}</dt>
								<dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
							</div>
						))}
					</dl>
				</div>
				<div className="flex flex-col justify-center items-center lg:items-end gap-2">
					<img alt="project dashboard" src="/example/codeeditor.png" className="w-80 sm:w-4/5" />
					<img alt="code editor" src="/example/dashboard.png" className="w-80 sm:w-4/5" />
				</div>
			</div>
		</div>
	);
}
