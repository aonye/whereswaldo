import '../styles/SelectionMenu.css';

const SelectionMenu = (props) => {
    const areaMapNodes = Array.from(props.mapRef.current.childNodes);
    const { menuClickHand } = props;
    const [x, y] = props.coords;
    const setStyle = {
        left: `${x}px`,
        top: `${y}px`
    };

    function makeList(nodes) {
        return nodes.map((item, index) => {
            return (
                <li key={index} onClick={(e) => menuClickHand(e)}>{item.alt}</li>
            );
        });
    }

    return (
        <div className='menu' style={setStyle} >
            <ul className='menu' >
                {makeList(areaMapNodes)}
            </ul>
        </div >
    )
}

export default SelectionMenu;