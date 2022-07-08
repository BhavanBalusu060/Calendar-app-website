import Navbar from "../Components/Navbar";
import Input from "../Pages/Input";

export default function EventsHolder(props) {
    return (
        <div>
            <Navbar title={props.title} />
            <Input />
        </div>
    )
}