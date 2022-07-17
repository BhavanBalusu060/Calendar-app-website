// this file is for holding all of the events 
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, onSnapshot, where, getDocs, orderBy } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Event from "./Event";

export default function EventsHolder() {


    const [currUser] = useAuthState(auth)
    const [events, setEvents] = useState([])
    const [user, setUser] = useState('')



    useEffect(() => {

        const getUser = async () => {
            if (currUser == null) {
                return;
            }
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                console.log(userDoc)
                setUser(userDoc.docs[0].id)


            } catch (err) {
                console.log(err);
                // alert('An error had occurred while fetching the users name');
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
                        eventsArr.push({ name: data.name, details: data.details, day: data.day.toDate(), start_time: data.start_time, duration: data.duration, docID: event.id, user: user })

                    })

                    setEvents(eventsArr)
                })
                return () => unsub;
            }
        }

        usr();


    }, [user, currUser])

    return (
        <div>
            {events.map(event => <Event event={event} key={event.name} />)}
        </div>
    )

}