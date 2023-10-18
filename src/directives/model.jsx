import { createRenderEffect } from "solid-js";

function getStoreKeyValue(obj, targetKeyArray) {
    let mappingValue = obj;

    targetKeyArray.forEach((key) => {
        mappingValue = mappingValue[key];
    });

    return mappingValue;
}

export default function model(el, getParams) {
    const params = getParams();

    if (params[0].constructor === Array) {
        const [store, ...targetKey] = params;
        const [storeObject, setStore] = store;

        switch (el.type) {
            case "checkbox": {
                createRenderEffect(() => (el.checked = getStoreKeyValue(storeObject, targetKey)));

                el.addEventListener("input", (e) => setStore(...targetKey, e.target.checked));

                break;
            }
            default: {
                createRenderEffect(() => (el.value = getStoreKeyValue(storeObject, targetKey)));

                el.addEventListener("input", (e) => setStore(...targetKey, e.target.value));
            }
        }
    } else {
        const [signal, setSignal] = params;

        createRenderEffect(() => (el.value = signal()));

        el.addEventListener("input", (e) => setSignal(e.target.value));
    }
}
