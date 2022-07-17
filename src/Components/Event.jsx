// this file is for each individual event
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Event(props) {

    const del = async (e) => {
        e.preventDefault();
        await deleteDoc(doc(db, "users", props.event.user, "events", props.event.docID));
    }

    return (
        <div className="event">
            {props.event.name} |
            {props.event.details} |
            {props.event.day.toString()} |
            {props.event.start_time} |
            {props.event.duration.hours} hours {props.event.duration.mins} minutes |
            DOC ID: {props.event.docID} |
            USER ID: {props.event.user}
        </div>
    )
}