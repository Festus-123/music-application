import React from "react";
import { useState, useEffect } from "react";

const Card = ({ title }) => {
    const [count, setCount] = useState(0);
    const [hasLiked, setHasLike] = useState(false);

    useEffect(() => {
        console.log(`${title} has been liked: ${hasLiked}`);
    },[title, hasLiked]);

    // Using a use effect that run only ones on the mounting of that component 
    //  this would have an empty dependency []
    // useEffect(() => {
    //     console.log("CARD RENDERED")
    // }, [])

    // conditional rendering

    return (
        <div className="card" onClick={() => setCount(count + 1)}>
        <h1>{title} <br /> {count ? count : null} </h1>

        <button onClick={() => {
            setHasLike(!hasLiked)
        }}
        className="Like">
            {hasLiked ? "❤️" : "🤍"}
        </button>
        </div>
    )
}

const Prop = () => {

    return (
        <div>
            <Card title="wednessday Season 1" />
            <Card title="Jack ryan1" />
            <Card title="Illuminateee 1" />
            <Card title="titanic final list" />
        </div>
    )
}

export default Prop