import { useCallback, useState } from "react";
import { SelectDatepicker } from "react-select-datepicker";

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
        
        if (name !== '' && timeCorrect(startTime) && (startTime  !== '' && timeCorrect(endTime))) {
            valid = true;
        }

        if (valid === true) {
            // submit form 
        } else {
            // ask to redo components
        }

    }

    function timeCorrect(time) {
        if (time.indexOf(":") !== -1 && (time.indexOf("am") -1 || time.indexOf("pm") !== -1))
            return false;
        
        const hr = time.substring(0, time.indexOf(":"));
        const min = time.substring(time.indexOf(":"), time.indexOf(" "));

        if (hr.length() !== 2 || min.length() !== 2) 
            return false;
        
        if (parseInt(hr) > 12 || parseInt(hr) < 1 || parseInt(min) > 59 || parseInt(min) < 0)
            return false;

        
        return true;

    }
    
    return (
        <form action="" onSubmit={e => submitData(e)}>
            <input type="text" onChange={e => setName(e.target.value)} id="event name" placeholder="Name"/>
            <input type="text" onChange={e => setDetails(e.target.value)} id="event details" placeholder="Details"/>
            <SelectDatepicker selectedDate={day} onDateChange={onDateChange}/>  
            <input type="text" onChange={e => setStartTime(e.target.value)} id="event time" placeholder="Starting time (hh:mm am/pm)"/>
            <input type="text" onChange={e => setEndTime(e.target.value)} id="event time" placeholder="Ending time (hh:mm am/pm)"/>
            <button type="submit">Submit</button>
            <p className="invalidData">Error: Invalid Data!</p>
        </form>
    )
    

}