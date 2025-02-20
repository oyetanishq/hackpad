import { useState } from "react";
import { Link } from "react-router";
import Signin from "@/components/signin";

interface Params {
	status: string;
}

export default function Header({ status }: Params) {
	const [signinState, setSigninState] = useState(false);

	return (
		<header className="mx-auto max-w-7xl px-6 pt-10 sm:px-6 lg:px-8 flex justify-between items-center">
			<Signin open={signinState} setOpen={setSigninState} />

			{/* title */}
			<Link to="/">
				<p className="text-3xl text-gray-900 font-extrabold tracking-tighter transition duration-300 cursor-pointer hover:text-yellow-600 active:text-yellow-900">hackpad</p>
			</Link>

			{/* status */}
			<div onClick={() => (status === "signin" ? setSigninState(true) : undefined)} className="z-10 flex justify-center items-center flex-row group cursor-pointer relative px-1 overflow-hidden">
				<p className="text-lg text-gray-900 tracking-tighter">{status}</p>
				<div hidden={status !== "signin"} className="absolute h-2/5 w-full transition duration-300 bottom-1 group-hover:translate-x-0 group-active:translate-x-0 translate-x-4 left-0 right-0 bg-yellow-500 -z-10 rounded-sm"></div>
			</div>
		</header>
	);
}
