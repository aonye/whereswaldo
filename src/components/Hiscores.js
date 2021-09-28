import { Link } from 'react-router-dom';
import backbutton from '../images/back_button.png';
import '../styles/Hiscores.css';

const Hiscores = (props) => {
    const { gameInfo, hiscores, slowestLB, onFormSubmit, resetGI } = props;

    function makeScores(arr) {
        return arr.map((item, index) => {
            const firstDigit = ('0' + Math.floor((item.data.time / 3600000) % 60)).slice(-2);
            const secDigit = ('0' + Math.floor((item.data.time / 60000) % 60)).slice(-2);
            const thirdDigit = ('0' + Math.floor((item.data.time / 1000) % 60)).slice(-2);
            return (
                <li key={index}>{`${item.data.name}: ${firstDigit}:${secDigit}:${thirdDigit}`}</li>
            );
        });
    }

    const Form = () => {
        return (
            <div className='form'>
                <form onSubmit={onFormSubmit}>
                    Congratulations, trainer! Please input your name below~
                    <input type="text" id="name" name="name" placeholder='Ash Ketchum' required />
                    <input type="submit" id='submit' value="Submit"></input>
                </form>
                <Restart />
            </div>
        );
    }

    const SorryMsg = () => {
        return (
            <div className='sorryMsg'>
                Better luck next time!
                <Restart />
            </div>
        );
    }

    const Restart = () => {
        return (
            <div>
                <Link to='./' onClick={() => resetGI()}><button id='restart'>Play Again?</button></Link>
            </div>
        )
    }

    return (
        <div>
            <div className='hiscoresCont'>
                <h1 className='scoresTitle'>Hiscores</h1>
                <ul className='scores'>
                    {makeScores(hiscores)}
                </ul>
                {gameInfo.clearedMaps.length !== 3 ?
                    <Link to='./'><img className='backbtn' src={backbutton} alt='backbutton' /></Link>
                    : null
                }
            </div>
            {gameInfo.clearedMaps.length === 3 ?
                (slowestLB > gameInfo.cumulativeTime ? < Form /> : <SorryMsg />)
                : null
            }
        </div>
    )
};

export default Hiscores;