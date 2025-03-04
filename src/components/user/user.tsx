import { LOCAL_IMG } from "../../utils/constants"
import profilePic from '../../images/userPic.png'

import "./user.css"

interface userProps {
    id: string,
    username: string,
    profilePic: string | null
}

export default function User(props: userProps) {
    return (
        <div className="user-container">
            <img className="user-pic" src={props.profilePic ? `${LOCAL_IMG}${props.profilePic}` : profilePic} alt="" />
            <p className="user-username"> {props.username}</p>
        </div>
    )
}