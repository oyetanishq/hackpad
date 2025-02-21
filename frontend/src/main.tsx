import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./global.css";

import Layout from "@/layout";
import Home from "@/pages/home";
import NotFound from "@/pages/404";
import Code from "@/pages/code";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/code/:id" element={<Code />} />
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
