import { db } from './firebase/firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import ImageCircles from './components/imageCircles';
import AlertBox from './components/AlertBox';
import WheresWaldo from './components/WheresWaldo';
import SelectionMenu from './components/SelectionMenu';
import './index.css';

function Main(props) {
    const [hideMenu, setHideMenu] = useState(true);
    const [hideAlert, setHideAlert] = useState(true);
    const [alertInfo, setAlertInfo] = useState({});
    const [coords, setCoords] = useState([]);
    const [imgCircleColor, setImgCircleColor] = useState({});
    const [roundInfo, setRoundInfo] = useState({
        foundItems: Array(3),
    });
    const imgCircleContRef = useRef(null);
    const imgContRef = useRef(null);
    const mapRef = useRef(null);
    const mainImgRef = useRef(null);

    const { time, setTime, timerOn, setTimerOn, setHideTimer, gameInfo, setGameInfo } = props;

    useEffect(() => {
        setHideTimer(false);
        confirmCircleColors();
    }, [setHideTimer]);

    useEffect(() => {
        window.addEventListener('resize', setMapCoords);
        setMapCoords();
        return () => window.removeEventListener('resize', setMapCoords);
    });

    useEffect(() => {
        let interval = null;
        if (timerOn === true) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerOn, setTime]);

    function confirmCircleColors() {
        const arr = Array.from(imgCircleContRef.current.children);
        const imgBorders = arr.reduce((acc, item) => {
            return { ...acc, [item.id]: { border: '0.4vw solid red' } };
        }, {});
        setImgCircleColor(imgBorders);
    }

    async function setMapCoords() {
        const scaler = mainImgRef.current.offsetWidth / mainImgRef.current.naturalWidth;
        const mapItems = Array.from(mapRef.current.children);
        let serverArr = [];
        const querySnapshot = await getDocs(collection(db, 'position'));
        querySnapshot.docs.forEach((doc) => {
            serverArr = [...serverArr, { id: doc.id, obj: doc.data() }];
        });
        mapItems.forEach((item) => {
            serverArr.forEach((elem) => {
                if (elem.obj.title === item.alt) {
                    const [x1, x2] = transformCoords(elem.obj.xRange, scaler);
                    const [y1, y2] = transformCoords(elem.obj.yRange, scaler);
                    item.coords = `${x1},${y1},${x2},${y2}`;
                }
            });
        });

        function transformCoords(coordArr, percentChange) {
            return coordArr.map((item) => {
                return Math.floor(parseFloat(item) * percentChange);
            });
        }
    }

    function checkMatch(menuItem, xCoord, yCoord) { //checks if menuitem clicked is inside map
        const topOffset = mainImgRef.current.offsetTop;
        const mapItems = Array.from(mapRef.current.children); //get all imagemap items
        const mapNode = mapItems.find((item) => item.alt === menuItem); //find the mapItem that equals the clicked menuItem
        const [x1, y1, x2, y2] = mapNode.coords.split(',');
        const [xMin, xMax] = [x1, x2].sort((a, b) => a - b);
        const [yMin, yMax] = [y1, y2].sort((a, b) => a - b);
        //console.log(listName, xMin, xMax, yMin, yMax, `xcoord:${xCoord}`, `ycoord${yCoord - topOffset}`);
        if (xCoord >= xMin && xCoord <= xMax && yCoord - topOffset >= yMin && yCoord - topOffset <= yMax) {
            return true;
        } else {
            return false;
        }
    }

    function checkClicked(menuItem) {
        const found = roundInfo.foundItems.find(e => e === menuItem);
        return found === undefined ? (setRoundInfo({ foundItems: [...roundInfo.foundItems, menuItem] }), false) : true;
    }

    function updateCircleColor(menuItem) {
        const tempObj = { [menuItem]: { border: '0.4vw solid green' } };
        setImgCircleColor({ ...imgCircleColor, ...tempObj });
    }

    function resetStateWin() {
        resetGI();
        resetTimer();
    }

    function resetGI() {
        const currentMap = gameInfo.currentMap;
        const newTime = time + gameInfo.cumulativeTime;
        if (checkRepeatPlay() === false) {
            setGameInfo({
                ...{ currentMap: null },
                ...{ clearedMaps: [...gameInfo.clearedMaps, currentMap] },
                ...{ currentScore: 0 },
                ...{ cumulativeTime: newTime }
            });
        } else {
            setGameInfo({
                ...{ currentMap: null },
                ...{ clearedMaps: [...gameInfo.clearedMaps] },
                ...{ currentScore: 0 },
                ...{ cumulativeTime: gameInfo.cumulativeTime }
            });
        }
        function checkRepeatPlay() {
            return gameInfo.clearedMaps.find(e => e === currentMap) === undefined ? false : true; //found means repeated
        }
    };

    function resetTimer() {
        setTime(0);
        setHideTimer(true);
        setTimerOn(true);
    }



    async function configAlert(result, clicked) {
        setHideAlert(false); //display alert
        if (result && clicked === true) {
            setAlertInfo({
                color: { backgroundColor: 'red' },
                text: 'You have already found this!'
            });
        }
        else if (result && clicked === false) {
            setAlertInfo({
                color: { backgroundColor: 'green' },
                text: 'Nice! You found one.'
            });
        } else {
            setAlertInfo({
                color: { backgroundColor: 'red' },
                text: 'Nope. Keep trying!'
            });
        }
        return new Promise(resolve => {
            setTimeout(() => {
                setHideAlert(true);
                resolve();
            }, 1500);
        });
    }

    function mapEventHand(e) {
        //console.log('Clicked a map item');
        e.preventDefault();
        clickHandler(e);
    }

    function clickHandler(e) {
        //console.log('Clicked on the image', `x:${e.pageX}`, `y:${e.pageY}`);
        setHideMenu(false);
        setCoords([e.pageX, e.pageY]);
    }

    async function menuClickHand(e) {
        setHideMenu(true);
        const [xCoord, yCoord] = coords;
        const menuItem = e.target.textContent;
        const matchResult = checkMatch(menuItem, xCoord, yCoord); //clicked on a map item?
        if (matchResult === true) {
            const clicked = checkClicked(menuItem);
            if (!clicked) {
                const tempGI = { ...gameInfo };
                tempGI.currentScore += 1;
                if (tempGI.currentScore === 3) { //check win
                    setTimerOn(false);
                    updateCircleColor(e.target.textContent);
                    await configAlert(matchResult, clicked);
                    resetStateWin();
                    return;
                }
                setGameInfo({ ...gameInfo, ...tempGI });
            }
            updateCircleColor(e.target.textContent);
            configAlert(matchResult, clicked);
            await configAlert(matchResult, clicked); //repeat hit
            return;
        }
        await configAlert(matchResult); //not a hit
    }

    return (
        <div className="App">
            <div>
                <ImageCircles gameInfo={gameInfo} imgCircleColor={imgCircleColor} imgCircleContRef={imgCircleContRef} />
                {hideAlert === true ? null : <AlertBox alertInfo={alertInfo} />}
                <WheresWaldo
                    gameInfo={gameInfo}
                    imgContRef={imgContRef}
                    mainImgRef={mainImgRef}
                    mapRef={mapRef}
                    clickHandler={clickHandler}
                    mapEventHand={mapEventHand}
                />
            </div>
            {hideMenu === true ? null : <SelectionMenu coords={coords} mapRef={mapRef} menuClickHand={menuClickHand} />}
        </div>
    );
};

export default Main;