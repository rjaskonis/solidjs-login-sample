import model from "./directives/model";

import { A } from "@solidjs/router";
import { createStore } from "solid-js/store";
import http from "./http";
import createHttpRequest from "./signals/http";
import { For, createEffect, createResource } from "solid-js";

async function getToDos() {
    const response = await http.get("/todos?sort[0]=id:desc");

    return response?.data?.data.map((p) => ({ id: p.id, ...p.attributes }));
}

const saveToDo = createHttpRequest(async (toDo) => (toDo.id ? http.put(`/todos/${toDo.id}`, { data: toDo }) : http.post("/todos", { data: toDo })));
// const saveToDo = createHttpRequest(async (toDo) => {
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     console.log("call");
// });

let input;

function ToDo() {
    const [toDos, { refetch }] = createResource(getToDos);
    const toDoStore = createStore({ name: "" });
    const [toDo, setToDo] = toDoStore;

    createEffect(() => {
        if (saveToDo.state() === "success" || saveToDo.state() === "error") {
            setToDo("name", "");

            refetch();
        }
    });

    return (
        <div class="todo">
            <A href="/">Go back home</A>
            <h4>My ToDos</h4>
            <input
                ref={input}
                class="p-1 border-2"
                type="text"
                name="task"
                placeholder="Type something to do and press Enter"
                use:model={[toDoStore, "name"]}
                onKeyUp={({ key }) => {
                    if (toDo.name && key === "Enter") {
                        saveToDo(toDo);

                        input.focus();
                    }
                }}
            />
            {/* <p>{saveToDo.state() || "..."}</p> */}
            <div class="list mt-8 p-4">
                <h4 class="font-bold">List</h4>
                <div class="w-[496px] h-[600px] overflow-y-scroll">
                    <div class="row grid auto-rows-[25px] grid-cols-[200px_200px] gap-4 hover:text-blue-600 cursor-pointer">
                        <For each={toDos()}>
                            {(toDo) => (
                                <>
                                    <A class="text-clip" href="" onClick={() => setToDo(toDo)}>{`${toDo.id} - ${toDo.name}`}</A>
                                    <input type="checkbox" onChange={() => saveToDo({ ...toDo, done: !toDo.done })} checked={toDo.done} />
                                </>
                            )}
                        </For>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToDo;
