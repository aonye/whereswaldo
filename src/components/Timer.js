import '../styles/Timer.css';

const Timer = (props) => {
    return (
        <div className='timer'>
            <div className='timerTitle'>Timer</div>
            <div>
                <span>{("0" + Math.floor((props.time / 3600000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}</span>
            </div>
        </div>
    );
}

export default Timer;