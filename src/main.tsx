/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "./components/SmoothScroll";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<SmoothScroll>
				<App />
			</SmoothScroll>
		</ThemeProvider>
	</StrictMode>,
);
