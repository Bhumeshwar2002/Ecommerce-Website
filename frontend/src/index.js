import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store.js";
import {positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById("root")); 
const options = {
	timeout:5000,
	positions:positions.BOTTOM_CENTER,
	transition:transitions.SCALE,
}
root.render(
	<Provider store={store}>
		<AlertProvider template={AlertTemplate}{...options}>
		<App />
		</AlertProvider>
	</Provider>
);



