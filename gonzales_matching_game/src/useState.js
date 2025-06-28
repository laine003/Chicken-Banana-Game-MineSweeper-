import { useState } from "react";

function Counter(){
    const[count, setCount] = useState(0);
    function handleClick(){
        setCount(count +1);
    }
    return(
        <div>
            <p> You clicked {count} times.</p>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
}

function App(){
    return(
        <div>
            <Counter />
        </div>
    );
}

export default Counter;