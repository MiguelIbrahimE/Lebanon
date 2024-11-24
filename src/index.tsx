import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Main App Component
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

