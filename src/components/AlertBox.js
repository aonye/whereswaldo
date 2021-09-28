import '../styles/AlertBox.css';

const AlertBox = (props) => {
    return (
        <div className="alertbox">
            <span className='alertmsg' style={props.alertInfo.color}>{props.alertInfo.text}</span>
        </div>
    );
}

export default AlertBox;