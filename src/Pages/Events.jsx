import Navbar from "../Components/Navbar";
import Input from "../Components/Input";
import EventsHolder from "../Components/EventsHolder";

export default function Events(props) {
    return (
        <div>
            <Navbar title={props.title} />
            <Input />
            <EventsHolder />
        </div>
    )
}