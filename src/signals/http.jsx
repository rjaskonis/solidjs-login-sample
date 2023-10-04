import { createSignal } from "solid-js";

function createHttpRequest(asyncCall) {
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal();
    const [response, setResponse] = createSignal();

    async function request(params) {
        setLoading(true);

        try {
            const response = await asyncCall(params);

            setResponse(response?.data);
        } catch (e) {
            setResponse(null);
            setError(e.response?.data?.error || e.message || e);
        } finally {
            setLoading(false);
        }
    }

    return Object.assign(request, { response, loading, setLoading, error, setError });
}

export default createHttpRequest;
