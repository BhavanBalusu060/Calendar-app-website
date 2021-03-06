// this file is for holding all of the events 
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, onSnapshot, where, getDocs, orderBy } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Event from "./Event";
import '../Styles/EventsHolder.css'


export default function EventsHolder() {

    const [currUser] = useAuthState(auth)
    const [events, setEvents] = useState([])
    const [user, setUser] = useState('')



    useEffect(() => {

        const getUser = async () => {
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                // return userDoc.docs[0].id;
                setUser(userDoc.docs[0].id)


            } catch (err) {
                return;
            }
        }

        const usr = async () => {
            await getUser();


            if (user !== '') {
                const q = query(collection(db, 'users', user, 'events'), orderBy("day"), orderBy("start_time"))
                const unsub = onSnapshot(q, (querySnapshot) => {
                    let eventsArr = []
                    querySnapshot.forEach(event => {
                        let data = event.data();
                        console.log(event.id)
                        eventsArr.push({ user: user, name: data.name, details: data.details, day: data.day.toDate(), start_time: data.start_time, duration: data.duration, docID: event.id })

                    })
                    setEvents(eventsArr)
                })
                return () => unsub;
            }
        }

        usr();


    }, [user, currUser])

    return (
        <div >
            <div id="subhousing">
                <label className="headers">
                    Events
                </label>
                <div className="inside">
                    {events.map((event, index) => <Event className="event" event={event} props={event} id={event.docID} key={index} />)}
                </div>
            </div>
        </div>
    )

}