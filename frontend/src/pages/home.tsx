import Dashboard from "@/components/dashboard";
import FrontPage from "@/components/frontpage";
import { useState } from "react";

export default function Home() {
	const [signedIn] = useState(() => (localStorage.getItem("token") ? 1 : 0));

	return <div className="px-6 mx-auto max-w-2xl lg:max-w-7xl lg:px-8 h-full">{signedIn ? <Dashboard /> : <FrontPage />}</div>;
}
