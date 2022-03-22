import React, {useEffect, useState} from "react";

export function Header() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h1>Current time: {time.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</h1>
        </div>
    )
}