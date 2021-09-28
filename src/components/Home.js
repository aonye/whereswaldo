import ContextMenu from './ContextMenu';

const Home = (props) => {
    const { gameInfo, clickLvlHand } = props;

    return (
        <div className='home'>
            <ContextMenu gameInfo={gameInfo} clickLvlHand={clickLvlHand} />
        </div>
    )
};

export default Home;