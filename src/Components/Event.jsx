// this file is for each individual event
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Event(props) {

    const del = async (id) => {
        console.log("dkjfs")
        console.log(props.event.user)
        await deleteDoc(doc(db, "users", props.event.user, "events", id));
    }

    function getTime() {
        let hr = parseInt(props.event.start_time.substring(0, props.event.start_time.indexOf(":")));
        let min = parseInt(props.event.start_time.substring(props.event.start_time.indexOf(":") + 1));
        if (min < 10) {
            min = "0" + min;
        }
        if (hr > 12) {
            hr = hr % 12;
            return hr + ":" + min + " pm";
        }

        return hr + ":" + min + " am";
    }

    return (
        <div className="event-holder-card">
            <div className="tick-holder">
                <div className="body-holder">
                    <h3>{props.event.name}</h3>
                    <h4>{props.event.details}</h4>
                    <h4>{props.event.day.toString().substring(0, 16)} | {getTime()} |
                        {props.event.duration.hours} hours {props.event.duration.mins} minutes</h4>
                </div>
                <div>
                    <i className="bi bi-check2" onClick={() => (del(props.event.docID))}></i>
                </div>

            </div>

        </div >
    )
}