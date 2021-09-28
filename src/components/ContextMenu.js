import { Link } from 'react-router-dom';
import '../styles/ContextMenu.css';

const ContextMenu = (props) => {
    const { gameInfo, clickLvlHand } = props;

    const enabled = (i) => {
        return (
            <Link key={i} to='./main'>
                <button id={`lvl${i}`} type="button" disabled={false} onClick={(e) => clickLvlHand(e)}>{`Level ${i}`}</button>
            </Link>
        );
    }

    const disabled = (i) => {
        return (
            <Link key={i} to='./main'>
                <button id={`lvl${i}`} type="button" disabled={true} onClick={(e) => clickLvlHand(e)}>{`Level ${i}`}</button>
            </Link>
        );
    }

    function configBtns() {
        let arr = [null, null, null];
        return arr.map((item, index) => {
            const i = index + 1;
            if (index === 0) {
                return enabled(i);
            } else {
                return gameInfo.clearedMaps.find(item => parseInt(item) === index) ? enabled(i) : disabled(i);
            }
        });
    }

    return (
        <div className="contextMenu">
            <div>Welcome trainer. Ready to find pokemon?</div>
            {configBtns()}
        </div >
    );
};

export default ContextMenu;

//className="btn btn-dark border border-secondary rounded"