import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout() {
	const [minHeight, setMinHeight] = useState("0px");

	const resetMinHeight = () => {
		const header = document.getElementsByTagName("header")[0]!;
		const footer = document.getElementsByTagName("footer")[0]!;

		setMinHeight(`${window.innerHeight - header.clientHeight - footer.clientHeight - 16}px`);
	};

	useEffect(() => {
		window.onresize = resetMinHeight;
		resetMinHeight();
	}, []);

	return (
		<div className="bg-white shadow-md rounded-md relative">
			<Header status="signin" />
			<main style={{ minHeight }}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
