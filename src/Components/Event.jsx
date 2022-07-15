// this file is for each individual event

export default function Event(props) {
    return (
        <div className="event">
            {props.event.name} |
            {props.event.details} |
            {props.event.day} |
            {props.event.start_time} |
            {props.event.duration.hours} hours {props.event.duration.mins} minutes
        </div>
    )
}