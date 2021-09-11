import PokeLogo from './images/poke_crop.png';

const Nav = () => {
    return (
        <nav>
            <div className='logoContainer'>
                <img className='logoImg' src={PokeLogo} alt='Logo' />
                <div>Search</div>
            </div>
            <ul className='navlinks'>
                <li>Home</li>
                <li>Shop</li>
                <li>About</li>
                <li>XQC</li>
            </ul>
        </nav >
    );
};

export default Nav;