import PokeLogo from '../images/poke_crop.png';
import { images } from './Ww1_images/index';
import '../styles/Nav.css';

const Nav = () => {
    console.log(images);
    return (
        <nav>
            <div className='logoContainer'>
                <img className='logoImg' src={PokeLogo} alt='Logo' />
                <div>Search</div>
            </div>
            <div>
                <img src={images[0]} alt='' height='40' width='40' />
                <img src={images[1]} alt='' height='40' width='40' />
                <img src={images[2]} alt='' height='40' width='40' />
            </div>
            <div className='navLinks'>
                <div>Counter</div>
                <div>XQC</div>
            </div>
        </nav >
    );
};

{/* <ul className='navlinks'>
    <li>Home</li>
    <li>Counter</li>
    <li>XQC Trophy</li>
</ul> */}

export default Nav;