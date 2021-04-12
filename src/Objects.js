import './App.css';
import logo from "./media/Choicezz.png";
import wheelBody from "./media/wheel-body.png";
import wheelColors from "./media/wheel-colors.png";
import arrow from "./media/wheel-mid.png";
const Navbar = () =>{
    return <div className="navbar">
        <img src={logo} alt="choicezz-logo"/>
    </div>
}

const Image = () =>{
    return <div className="image-container">
        <img src={wheelBody} alt="wheel-body"/>
        <img src={wheelColors} alt="wheel-colors" id="wheel"/>
        <img src={arrow} alt="arrow"/>
    </div>
}

const BtnLine = (props) =>{
    if(props.nd !== undefined){
        return <div className="btnLine">
            {props.st}
            {props.nd}
        </div>
    }
    return <div className="btnLine">
        {props.st}
    </div>
}

export { Navbar,Image,BtnLine};