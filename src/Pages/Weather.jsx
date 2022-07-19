import Navbar from "../Components/Navbar"
import '../Styles/Weather.css'
import { useState, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function Location() {
    const [currUser] = useAuthState(auth);

    const [loc, setLoc] = useState("None");
    const locRef = useRef("")

    const getUserLoc = async () => {
        if (currUser == null) {
            return;
        }
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const userDoc = await getDocs(q);
            const userLoc = userDoc.docs[0].get("location")
            console.log(userLoc)
            setLoc(userLoc)


        } catch (err) {
            console.log(err);
            alert('An error had occurred while fetching the users name');
            return;

        }
    }

    useEffect(() => {
        getUserLoc()
    }, [currUser])



    function getLocation(e) {
        e.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLoc)
        } else {
            setLoc("None");
        }
    }

    function getLoc(position) {

        setLoc(position.coords.latitude + ", " + position.coords.longitude)
        addToDB(position.coords.latitude + ", " + position.coords.longitude)
    }

    function nonAlpha(val) {
        for (let i = 0; i < val.length; i++) {
            let str = val.substring(i, i + 1);
            if (!str.match(/[a-z]/i))
                return true;
        }
        console.log(val)
    }

    const submitData = async e => {
        e.preventDefault();
        let wrong = document.querySelector(".wrong");

        if (!nonAlpha(locRef.current.value) && locRef.current.value !== '') {
            setLoc(locRef.current.value)
            wrong.style.display = "none"

            await addToDB(locRef.current.value)

        }
        else {
            wrong.style.display = "block"
            const inp = document.querySelector(".locationInput")
            inp.style.border = "1px solid red";
        }
    }

    const addToDB = async (val) => {
        if (!currUser) return;
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const userDoc = await getDocs(q);
            const docID = userDoc.docs[0].id;

            await updateDoc(doc(db, "users", docID), { location: val })

        } catch (err) {
            console.error(err)
            alert("Unable to save location.")
        }
    }

    return (
        <>
            <Navbar title={"Weather"} />
            <div className="GetUserLocation">
                <h1>Location for Weather: {loc} </h1>
                <button onClick={(e) => getLocation(e)}>Request Location</button>
                <h2>Want to type your city in instead?</h2>
                <form onSubmit={e => submitData(e)}>
                    <input type="text" placeholder="Enter a city name" ref={locRef} className="locationInput" onChange={e => e.target.style.border = "2px solid rgba(0, 0, 0, 0.2)"} />
                    <button className="locationSubmit">Submit</button>
                </form>
                <p className="disclaimer">*Note: All cities may not be avaliable</p>
            </div>
            <p className="wrong">Error: Invalid Data!</p>

        </>
    )
}