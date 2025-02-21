import { Outlet } from "react-router";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout() {
	const [signedIn] = useState<"logout" | "signin">(() => (localStorage.getItem("token") ? "logout" : "signin"));

	return (
		<div className="bg-white h-full w-full shadow-md rounded-md relative flex flex-col justify-between items-center">
			<Header status={signedIn} />
			<main className="w-full flex-1">
				<Outlet />
			</main>
			<Footer status={signedIn} />
		</div>
	);
}
