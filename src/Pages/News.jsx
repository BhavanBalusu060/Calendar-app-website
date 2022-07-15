import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

function News() {

    const [rss, setRss] = useState({})
    const [link, setLink] = useState("")

    useEffect(() => {
        fetch("/rssFeed")
            .catch(() => { alert("Can't retrieve rss feed link") })
            .then(
                res => res.json()
            ).then(
                data => {
                    setRss(data)
                    console.log(data)
                }
            )
    }, [])

    const submitLink = () => {
        const s = JSON.stringify({ link });

        fetch("/getLink", { method: "POST", body: s })
            .catch(() => { alert("Cannot POST link") })
    }

    return (
        <div>
            <input type="text" value={link} onChange={(e) => setLink(e.target.value)}></input>
            <button onClick={() => submitLink()}>Submit</button>
            {
                (typeof rss === 'undefined') ? (
                    <p>Loading...</p>
                ) : (
                    <p>{rss[2]}</p>

                )
            }
        </div >
    );
}

export default News;