import { Link } from 'react-router-dom';
import PokeLogo from '../images/poke_crop.png';
import Trophy from '../images/Gold-Trophy.png';
import Timer from './Timer';
import '../styles/Nav.css';

const Nav = (props) => {
    const { time, hideTimer, setHideTimer } = props;
    return (
        <nav>
            <Link to='./' onClick={() => setHideTimer(true)}>
                <div className='logoContainer'>
                    <img className='logoImg' src={PokeLogo} alt='Logo' />
                    <div>Search</div>
                </div>
            </Link>
            {hideTimer === true ? <div></div> : <Timer time={time} />}
            <div className='navLinks'>
                <Link to='./hiscores'><img onClick={() => setHideTimer(true)} className='hiscores' src={Trophy} alt='Hiscores' /></Link>
            </div>
        </nav >
    );
};

export default Nav;