import Navbar from "../Components/Navbar";
import Input from "../Pages/Events";

export default function EventsHolder(props) {
    return (
        <div>
            <Navbar title={props.title} />
            <Input />
        </div>
    )
}