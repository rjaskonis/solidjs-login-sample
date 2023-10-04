import model from "./directives/model";

import http from "./http";
import { createStore } from "solid-js/store";
import createHttpRequest from "./signals/http";
import { Switch, createEffect } from "solid-js";

const signIn = createHttpRequest(async (credentials) => http.post("/auth/local", credentials));

function Login() {
    const credentialsStore = createStore({ identifier: "rjaskonis@gmail.com", password: "abc123" });
    const [credentials] = credentialsStore;

    createEffect(() => {
        if (signIn.error()) {
            setTimeout(() => signIn.setError(), 3000);
        }
    });

    createEffect(() => {
        if (signIn.response()) {
            localStorage.setItem("access_token", signIn.response().jwt);
        }
    });

    return (
        <>
            {`State: `}
            <Switch fallback={<span>Nothing happened yet</span>}>
                <Match when={signIn.state() === "loading"}>Loading...</Match>
                <Match when={signIn.state() === "error"}>{signIn.error()?.message}</Match>
                <Match when={signIn.state() === "success"}>success</Match>
            </Switch>
            {/* <Show when={signIn.loading()}>
                <div className="loader fixed">Loading</div>
            </Show>
            <Show when={signIn.error()}>
                <div className="loader fixed">Something bad happened: {JSON.stringify(signIn.error()?.message)}</div>
            </Show>
            <Show when={signIn.response()}>
                <div className="loader fixed">Great</div>
            </Show> */}
            <form class="grid grid-flow-row grid-cols-1 gap-6 mt-6 w-full">
                <div class="field grid grid-flow-row gap-1">
                    <label class="font-bold">E-mail</label>
                    <input class="p-1 border-2" type="text" name="identifier" use:model={[credentialsStore, "identifier"]} />
                </div>
                <div class="field grid grid-flow-row gap-1">
                    <label class="font-bold">Password</label>
                    <input class="p-1 border-2" type="password" name="password" use:model={[credentialsStore, "password"]} />
                </div>
                <div className="buttons grid grid-flow-col grid-cols-2 gap-4">
                    <button class="border bg-slate-200 p-4" type="button" onClick={() => signIn(credentials)}>
                        Sign in
                    </button>
                    <button class="border bg-slate-200 p-4" type="button">
                        Forgot password?
                    </button>
                </div>
            </form>
        </>
    );
}

export default Login;
