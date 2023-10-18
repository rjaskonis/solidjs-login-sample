import { Outlet, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

function RouteGuard(props) {
    const navigate = useNavigate();

    const token = localStorage.getItem("access_token");

    createEffect(() => {
        if (!token) {
            navigate("/signin", { replace: true });
        }
    });

    return <Outlet />;
}

export default RouteGuard;
