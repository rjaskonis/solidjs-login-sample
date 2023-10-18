/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { Route, Router, Routes } from "@solidjs/router";
import RouteGuard from "./RouteGuard";
import Home from "./Home";
import People from "./People";
import ToDo from "./ToDo";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error("Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?");
}

render(
    () => (
        <Router>
            <Routes>
                <Route path="/signin" component={App} />
                <Route path="/" component={RouteGuard}>
                    <Route path="/" component={Home} />
                    <Route path="/people" component={People} />
                    <Route path="/todo" component={ToDo} />
                </Route>
                {/* <Route path="/" component={() => <RouteGuard>Opa</RouteGuard>} /> */}
            </Routes>
        </Router>
    ),
    root
);
