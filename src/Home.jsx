import { A } from "@solidjs/router";

function Home() {
    return (
        <>
            <h1>Home</h1>
            <div className="flex flex-col">
                <A href="/people">Go to people</A>
                <A href="/todo">Go to ToDo</A>
            </div>
        </>
    );
}

export default Home;
