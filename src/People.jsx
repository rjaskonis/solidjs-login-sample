import { A } from "@solidjs/router";
import { For, createResource } from "solid-js";
import http from "./http";

async function getPeople() {
    const response = await http.get("/people");

    return response?.data?.data.map((p) => ({ id: p.id, ...p.attributes }));
}

function People() {
    const [people] = createResource(getPeople);

    return (
        <>
            <h1>People</h1>
            <A href="/">Go home</A>
            <div class="people w-[300px] h-[300px] rounded-xl shadow-lg bg-slate-200 mt-6 p-2 border-2 border-slate-300">
                <For each={people()}>{(person) => <div class="person text-green-600">{person.name}</div>}</For>
            </div>
        </>
    );
}

export default People;
