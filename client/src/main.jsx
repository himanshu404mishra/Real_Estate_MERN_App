import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain="himanshu404mishra.jp.auth0.com"
    clientId="etkcZAkIJR8Uu3QW0VBaUW6LJNcyVOWW"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    audience="https://real-estate-mern-app-two.vercel.app"
    scope="openid profile and email"
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
);
