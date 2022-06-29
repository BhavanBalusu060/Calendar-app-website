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
    const onDateChange = useCallback((dateIn) => {
        setDay(dateIn);
    }, [])
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    function submitData(e) {
        e.preventDefault();
<<<<<<< HEAD:src/Pages/Events.jsx

        console.log("SUBMITTED!")

        if (name !== '' && timeCorrect(startTime) && (startTime !== '' && timeCorrect(endTime))) {
            valid = true;
=======
        let valid = true;
        
        if (name === '' || !timeCorrect(startTime)) {
            valid = false;
        }

        if (endTime !== '' && !timeCorrect(endTime)) {
            valid = false;
>>>>>>> 3bbf4ee4bc29f6b3f5257b127fdb9f122358f8e5:src/Components/Input.jsx
        }

        console.log('valid is ' + valid)

        if (valid === true) {
            // submit form 
        } else {
            if (name === '') {
                const nameElement = document.querySelector("#eventName");
                nameElement.style.border = '2px solid red'
            }

            if (!timeCorrect(startTime)) {
                const timeElement = document.querySelector('#startTime')
                timeElement.style.border = '2px solid red'
            }

            if (endTime !== '' && !timeCorrect(endTime)) {
                const timeElement = document.querySelector('#endTime')
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
                if (num.substring(i, i+1) === nums[j]) {
                    valid = true;
                }
            }

            if (valid === false) return false;
        }

        return true;
    }

    function timeCorrect(time) {
<<<<<<< HEAD:src/Pages/Events.jsx
        console.log(time);
        if ((time.indexOf("am") === -1 && !time.indexOf("pm") === -1) || (!time.indexOf("am") === -1 && time.indexOf("pm") === -1)) {
            return false;
        }

=======
        if (time.indexOf("am") === -1 && time.indexOf("pm") === -1) {
            return false;
        }

        if (time.indexOf(":") === -1) {
            return false;
        }

        if (!isNumber(time.substring(0, time.indexOf(":"))) || !isNumber(time.substring(time.indexOf(":") + 1, time.indexOf(":") + 3))) {
            return false;
        }

        let hr = parseInt(time.substring(0, time.indexOf(":")));
        let min = parseInt(time.substring(time.indexOf(":") + 1, time.indexOf(":") + 3));

        if (isNaN(hr) || isNaN(min)) {
            return false;
        }

        if (hr > 12 || hr <= 0) return false;
        if (min > 60 || min < 0) return false;


>>>>>>> 3bbf4ee4bc29f6b3f5257b127fdb9f122358f8e5:src/Components/Input.jsx
        return true;
    }

    return (
        <form action="" onSubmit={e => submitData(e)} className="event-input">
            <input type="text" onChange={e => {e.preventDefault(); setName(e.target.value)}} className="event name" id="eventName"placeholder="Name" />
            <textarea className="event details" onChange={e => {e.preventDefault(); setDetails(e.target.value)}} placeholder="Details"></textarea>
            <SelectDatepicker selectedDate={day} onDateChange={onDateChange} className="event date" />
            <div className="event times">
<<<<<<< HEAD:src/Pages/Events.jsx
                <input type="text" onChange={e => setStartTime(e.target.value)} className="event time" id="startTime" placeholder="Starting time (hh:mm am/pm)" />
                <input type="text" onChange={e => setEndTime(e.target.value)} className="event time" placeholder="Ending time (hh:mm am/pm)" />
=======
                <input type="text" onChange={e => {e.preventDefault(); setStartTime(e.target.value)}} className="event time" id ="startTime" placeholder="Starting time (hh:mm am/pm)" />
                <input type="text" onChange={e => {e.preventDefault(); setEndTime(e.target.value)}} className="event time" id="endTime" placeholder="Ending time (hh:mm am/pm)" />
>>>>>>> 3bbf4ee4bc29f6b3f5257b127fdb9f122358f8e5:src/Components/Input.jsx
            </div>

            <button type="submit">Submit</button>
            <p className="invalidData">Error: Invalid Data!</p>
        </form>
    )


}