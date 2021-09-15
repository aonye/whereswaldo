import '../styles/SelectionMenu.css';

const SelectionMenu = (props) => {
    const setStyle = {
        left: `${props.x}px`,
        top: `${props.y}px`
    };
    const { menuClickHand } = props;
    return (
        <div className='menu' style={setStyle} >
            <ul className='menu' >
                <li onClick={(e) => menuClickHand(e)}>Blissey</li>
                <li onClick={(e) => menuClickHand(e)}>Eevee</li>
                <li onClick={(e) => menuClickHand(e)}>Chatot</li>
            </ul>
        </div >
    )
}

export default SelectionMenu;