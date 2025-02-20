import { useState, FormEvent } from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export default function SigninForm() {
	const [task, setTask] = useState(false); // 1->login, 0->register

	const [error, setError] = useState("");
	const [spinning, setSpinning] = useState<boolean>(false);

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		try {
			setSpinning(true);

			console.log({ email, password, task });
		} catch (error) {
		} finally {
			setSpinning(false);
		}
	};

	return (
		<form onSubmit={submitForm} className="w-full font-[family-name:--chakra-petch]">
			<h2 className="font-semibold text-slate-600 md:font-bold text-2xl md:text-3xl">{task ? "Login" : "Register"}</h2>
			<div className="w-full h-12 flex justify-start items-center">
				<p className="text-sm md:font-semibold font-normal text-gray-800">or</p>&ensp;
				<span className="text-sm md:font-bold font-semibold duration-300 text-yellow-600 hover:text-yellow-500 active:text-yellow-900 underline underline-offset-8 md:underline-offset-[11px] decoration-1 decoration-dashed cursor-pointer" onClick={() => setTask((task) => !task)}>
					{task ? "Create a account" : "Login in to your account"}
				</span>
			</div>

			<div className="w-full h-12 mt-3 md:mt-7 relative">
				<input
					type="email"
					name="email"
					placeholder="Email address"
					className={classNames("px-6 py-4 h-full border border-slate-200 rounded md:placeholder:text-base md:placeholder:font-medium text-slate-700 focus:border-slate-500 w-full placeholder:text-sm text-sm outline-none", error.length > 0 ? "border-red-600" : "")}
					autoCapitalize="off"
					autoComplete="off"
					onChange={(e) => setEmail(e.target.value)}
					maxLength={50}
					minLength={6}
					required={true}
					inputMode="email"
					value={email}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className={classNames("px-6 py-4 mt-4 h-full border border-slate-200 rounded md:placeholder:text-base md:placeholder:font-medium text-slate-700 focus:border-slate-500 w-full placeholder:text-sm text-sm outline-none", error.length > 0 ? "border-red-600" : "")}
					autoCapitalize="off"
					autoComplete="off"
					onChange={(e) => setPassword(e.target.value)}
					maxLength={50}
					minLength={6}
					required={true}
					value={password}
				/>
				{error.length > 0 && (
					<label htmlFor="password" className="text-red-600 absolute -bottom-7 text-sm font-medium">
						{error}
					</label>
				)}
				<div className={classNames("h-12 mt-5 md:mt-8", error.length > 0 ? "mt-12 md:mt-14" : "")}>
					<button type="submit" className={"h-full w-32 flex justify-center items-center rounded font-semibold md:font-bold text-sm duration-300 bg-yellow-600 hover:bg-yellow-700 text-slate-100"} disabled={spinning}>
						{spinning ? <SunIcon height={25} color={"#fff"} /> : task ? "Login" : "Register"}
					</button>
				</div>
			</div>
		</form>
	);
}
