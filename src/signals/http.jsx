import { createSignal } from "solid-js";

function createHttpRequest(asyncCall) {
    const [state, setState] = createSignal();
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal();
    const [response, setResponse] = createSignal();

    async function request(params) {
        setState("loading");
        setLoading(true);

        try {
            const response = await asyncCall(params);

            setResponse(response?.data);
            setState("success");
        } catch (e) {
            console.log(e, e.response?.data ? e.response?.data?.error : e.message || e);
            setResponse(null);
            setError(e.response?.data ? e.response?.data?.error : e.message || e);
            setState("error");
        } finally {
            setLoading(false);
        }
    }

    return Object.assign(request, { state, setState, response, loading, setLoading, error, setError });
}

export default createHttpRequest;
