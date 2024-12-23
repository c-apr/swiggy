import { useState } from "react";

const User=(props)=>{
    const [count,setCount]=useState(0);
    const incrementCount=()=>{
        setCount(count+1);
    };
    const decrementCount=()=>{
        if(count>0)
         setCount(count-1);
    };

    return <div className="user-card">
        <h1>Count={count}</h1>
        <button onClick={incrementCount}>Increment</button>
        <button onClick={decrementCount}>Decrement</button>
        <h2>Name: {props.name}</h2>
        <h3>Location :Chennai</h3>
        <h4>Contact:@c-apr</h4>
    </div>
};

export default User;