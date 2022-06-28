import { useCallback, useState } from "react";
import { SelectDatepicker } from "react-select-datepicker";
import '../Styles/EventInput.css'

export default function Input() {

    const [event, setEvent] = useState({
        name: '',
        details: '',
        date: '',
        time_start: '',
        time_end: '', 
    })

    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [day, setDay] = useState(new Date());
    const onDateChange = useCallback( (dateIn) => {
        setDay(dateIn);
    }, [])
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    function submitData(e) {
        let valid = false;
        e.preventDefault();

        console.log("SUBMITTED!")
        
        if (name !== '' && timeCorrect(startTime) && (startTime  !== '' && timeCorrect(endTime))) {
            valid = true;
        }

        console.log('valid is ' + valid)

        if (valid === true) {
            // submit form 
        } else {
            if (!timeCorrect(startTime)) {
                const sTime = document.querySelector("#startTime")
            }
        }

    }

    function timeCorrect(time) {
        console.log(time);
        if ((time.indexOf("am") === -1 && !time.indexOf("pm") === -1) || (!time.indexOf("am") === -1 && time.indexOf("pm") === -1)) {
            return false;
        }

        return true;
    }
    
    return (
        <form action="" onSubmit={e => submitData(e)} className="event-input">
            <input type="text" onChange={e => setName(e.target.value)} className="event name" placeholder="Name"/>
            <input type="text" onChange={e => setDetails(e.target.value)} className="event details" placeholder="Details"/>
            <SelectDatepicker selectedDate={day} onDateChange={onDateChange} className="event date"/> 
            <div className="event times">
                <input type="text" onChange={e => setStartTime(e.target.value)} className="event time" id ="startTime" placeholder="Starting time (hh:mm am/pm)" />
                <input type="text" onChange={e => setEndTime(e.target.value)} className="event time" placeholder="Ending time (hh:mm am/pm)" />
            </div>
            
            <button type="submit">Submit</button>
            <p className="invalidData">Error: Invalid Data!</p>
        </form>
    )
    

}