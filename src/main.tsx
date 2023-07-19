import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "../index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-wpc8kymxzmepqxl5.us.auth0.com"
			clientId="OxQxuofsPZXSFzTqbVtKgErT2xrl3VfZ"
			authorizationParams={{
				redirect_uri: "http://localhost:4040/callback",
			}}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);
