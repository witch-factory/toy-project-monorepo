import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import TodoApp from "./App";
import Login from "./Login";
import Register from "./Register";

// biome-ignore lint/style/noNonNullAssertion: This is library code
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<TodoApp />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
