import { useState, FormEvent, useEffect } from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export default function SigninForm() {
	const [task, setTask] = useState(false); // 1->login, 0->register

	const [error, setError] = useState("");
	const [spinning, setSpinning] = useState<boolean>(false);

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	useEffect(() => {
		setError("");
		setEmail("");
		setPassword("");
	}, [task]);

	const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		try {
			setSpinning(true);

			await fetch(import.meta.env.VITE_API_URL + "/auth/" + (task ? "login" : "register"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						localStorage.setItem("token", data.user.token);
						window.location.reload();
					} else setError(data.error);
				});
		} catch (error) {
			setError((error as Error).message);
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
					className="px-6 py-4 h-full border border-slate-200 rounded md:placeholder:text-base md:placeholder:font-medium text-slate-700 focus:border-slate-500 w-full placeholder:text-sm text-sm outline-none"
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
					className="px-6 py-4 mt-4 h-full border border-slate-200 rounded md:placeholder:text-base md:placeholder:font-medium text-slate-700 focus:border-slate-500 w-full placeholder:text-sm text-sm outline-none"
					autoCapitalize="off"
					autoComplete="off"
					onChange={(e) => setPassword(e.target.value)}
					maxLength={50}
					minLength={6}
					required={true}
					value={password}
				/>
				<div className={classNames("h-12 relative", error.length > 0 ? "mt-8" : "mt-5 md:mt-8")}>
					{error.length > 0 && (
						<label htmlFor="password" className="text-red-600 absolute -top-6 left-0 text-sm font-medium">
							{error}
						</label>
					)}
					<button type="submit" className={"h-full w-32 flex justify-center items-center rounded font-semibold md:font-bold text-sm duration-300 bg-yellow-600 hover:bg-yellow-700 text-slate-100"} disabled={spinning}>
						{spinning ? <SunIcon className="animate-spin" height={25} color={"#fff"} /> : task ? "Login" : "Register"}
					</button>
				</div>
			</div>
		</form>
	);
}
