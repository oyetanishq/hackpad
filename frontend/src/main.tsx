import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./global.css";

import Layout from "@/layout";
import Home from "@/pages/home";
import NotFound from "@/pages/404";
import Code from "@/pages/code";

import TNCPolicy from "@/pages/policies/tnc";
import PrivacyPolicy from "@/pages/policies/privacy";
import CookiesPolicy from "@/pages/policies/cookies";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/code/:id" element={<Code />} />
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="policy">
						<Route path="terms-and-condition" element={<TNCPolicy />} />
						<Route path="cookies" element={<CookiesPolicy />} />
						<Route path="privacy" element={<PrivacyPolicy />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
