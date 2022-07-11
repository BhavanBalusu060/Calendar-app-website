import { useCallback, useState } from "react";
import { SelectDatepicker } from "react-select-datepicker";
import '../Styles/EventInput.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, collection, where, query, getDocs } from "firebase/firestore";
import EventsHolder from "../Components/EventsHolder";


export default function Input() {

    const [currUser] = useAuthState(auth);


    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [day, setDay] = useState(new Date());
    const onDateChange = useCallback((dateIn) => {
        setDay(dateIn);
    }, [])
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState({
        hours: 1,
        mins: 0
    });

    async function submitData(e) {
        e.preventDefault();
        let valid = true;

        if (name === '' || !timeCorrect(startTime)) {
            valid = false;
        }


        if (valid === true) {
            // submit form 
            const eventObject = {
                name: name,
                details: details,
                day: (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear(),
                start_time: startTime,
                duration: duration
            }

            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                const docID = userDoc.docs[0].id;

                try {
                    await setDoc(doc(db, "users", docID, "events", `EVENT ${eventObject.name}`), eventObject);
                } catch (err) {
                    alert('An error occured in adding the event.')
                }

            } catch (err) {
                alert('An error had occurred while fetching the users name');
                return;
            }

            const invalid = document.querySelector(".invalidData");
            invalid.style.display = 'none';

        } else {
            if (name === '') {
                const nameElement = document.querySelector("#eventName");
                nameElement.style.border = '2px solid red'
            }

            if (!timeCorrect(startTime)) {
                const timeElement = document.querySelector('#startTime')
                timeElement.style.border = '2px solid red'
            }

            const invalid = document.querySelector(".invalidData");
            invalid.style.display = 'block';
        }

    }

    function isNumber(num) {
        const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

        for (let i = 0; i < num.length; i++) {
            let valid = false;
            for (let j = 0; j < nums.length; j++) {
                if (num.substring(i, i + 1) === nums[j]) {
                    valid = true;
                }
            }
            if (valid === false) return false;
        }

        return true;
    }

    function timeCorrect(time) {
        time = time.toLowerCase();
        if (time.indexOf("am") === -1 && time.indexOf("pm") === -1) {
            return false;
        }
        else {
            if (time.indexOf("am") !== -1) {
                if (time.substring(time.indexOf("am")).length !== 2)
                    return false;
            } else {
                if (time.substring(time.indexOf("pm")).length !== 2)
                    return false;
            }
        }


        if (time.indexOf(":") === -1) {
            return false;
        }

        if (time.indexOf(" ") === -1) {
            return false;
        }

        if (time.indexOf(" ") < time.indexOf(":")) {
            return false;
        }

        if (time.substring(0, time.indexOf(":")).length < 1 || time.substring(0, time.indexOf(":")).length > 2) {
            return false;
        }

        if (time.substring(time.indexOf(":") + 1, time.indexOf(" ")).length > 2 || time.substring(time.indexOf(":") + 1, time.indexOf(" ")).length < 1) {
            return false;
        }

        if (!isNumber(time.substring(0, time.indexOf(":"))) || !isNumber(time.substring(time.indexOf(":") + 1, time.indexOf(" ")))) {
            return false;
        }

        let hr = parseInt(time.substring(0, time.indexOf(":")));
        let min = parseInt(time.substring(time.indexOf(":") + 1, time.indexOf(" ")));

        if (isNaN(hr) || isNaN(min)) {
            return false;
        }

        if (hr > 12 || hr <= 0) return false;
        if (min > 60 || min < 0) return false;

        return true;
    }

    function setDefaultBorder(e) {
        e.target.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    }

    return (
        <>
            <form action="" onSubmit={e => submitData(e)} className="event-input">
                <input type="text" onChange={e => { e.preventDefault(); setName(e.target.value); setDefaultBorder(e) }} className="event name" id="eventName" placeholder="Name" />
                <textarea className="event details" onChange={e => { e.preventDefault(); setDetails(e.target.value); setDefaultBorder(e) }} placeholder="Details"></textarea>
                <SelectDatepicker selectedDate={day} onDateChange={onDateChange} className="event date" />

                <div className="event timings">
                    <input type="text" onChange={e => { e.preventDefault(); setStartTime(e.target.value); setDefaultBorder(e) }} className="event time" id="startTime" placeholder="Time (hh:mm am/pm)" />
                    <label htmlFor="duration">Duration:</label>
                    <div className="event duration">
                        <input name="duration" type="number" id="duration-hours" min="0" placeholder="Hours"
                            onChange={e => { e.preventDefault(); setDuration({ hours: e.target.value, mins: duration.mins }) }} />
                        <input type="number" id="duration-minutes" min="0" max="59" placeholder="Minutes"
                            onChange={e => { e.preventDefault(); setDuration({ hours: duration.hours, mins: e.target.value }) }} />
                    </div>
                </div>

                <button type="submit">Submit</button>
                <p className="invalidData">Error: Invalid Data!</p>
            </form>

            <EventsHolder />
        </>

    )


}