
//show coordinates mock fxn
    // const xx = document.querySelector('#coordinates');
    // function logMousePos(event) {
    //     // console.log(imgContRef.current.offsetLeft, imgContRef.current.getBoundingClientRect());
    //     //console.log(`X: ${event.clientX} Y: ${event.clientY}`, `xxx`);
    //     xx.textContent = `X: ${event.pageX} Y: ${event.pageY}`;
    // }


// async function updateServer(serverArr) {
//   serverArr.forEach((item) => {
//     const ref = doc(db, 'position', `${item.id}`);
//     updateDoc(ref, item.obj);
//   });
//   const arr = item.coords.split(',');
//   let [x1, y1, x2, y2] = arr;
//   [x1, x2] = transformCoords([x1, x2], scaler);
//   [y1, y2] = transformCoords([y1, y2], scaler);
//   item.coords = `${x1},${y1},${x2},${y2}`;
//   updateServer(serverArr);
// };

/* Part of checkFunction at MenuClick */
// console.log('async dataGetter', listName, xCoord, yCoord);
// const querySnapshot = await getDocs(collection(db, 'position'));
// const serverEntry = querySnapshot.docs.find((doc) => doc.data().title === listName);
// const { title, xRange, yRange } = serverEntry.data();

//copy of crap

// const [hidden, setHidden] = useState(true);
// const [showAlert, setShowAlert] = useState(false);
// const [alertInfo, setAlertInfo] = useState({ color: { backgroundColor: 'blueviolet' }, text: 'Testing.' });
// const [circleColor, setCircleColor] = useState({});
// //const [time, setTime] = useState(0);
// const imgCircleContRef = useRef(null);
// const imgContRef = useRef(null);
// const mapRef = useRef(null);
// const mainImgRef = useRef(null);

// const [hiscores, setHiscores] = useState([]);

// useEffect(() => {
//     getScores();
//     props.setHideTimer(false);
// });

// useEffect(() => {
//     //console.log(imgCircleContRef.current.children, 'imagecircle useEffect');
//     let interval = null;
//     interval = setInterval(() => {
//         props.setTime((prevTime) => prevTime + 1000);
//     }, 1000);
//     //confirmCircleColors();
//     return () => clearInterval(interval);
// }); //only first render

// useEffect(() => {
//     //console.log('BCRCont', imgContRef.current.getBoundingClientRect(), 'BCRImg', mainImgRef.current.getBoundingClientRect());
//     // const aspectRatio = mainImgRef.current.naturalWidth / mainImgRef.current.naturalHeight;
//     // setHeight(aspectRatio, mainImgRef.current.offsetWidth);
//     setCoords(); // height does not scale different from width, no need to calc
// }); //every render


// function confirmCircleColors() {
//     const arr = Array.from(imgCircleContRef.current.children);
//     const imgBorders = arr.reduce((acc, item) => {
//         return { ...acc, [item.id]: { border: '0.4vw solid red' } };
//     }, {});
//     setCircleColor(imgBorders);
// }

// useLayoutEffect(() => {
//     window.addEventListener('resize', setCoords);
//     setCoords();
//     return () => window.removeEventListener('resize', setCoords);
// }, []);

// // function setHeight(aspectRatio, currentWidth) { //aspect ratio is W:H
// //   //console.log(`AR:${aspectRatio}`, `CW:${currentWidth}`);
// //   const calcHeight = (1 / aspectRatio) * currentWidth;
// //   mainImgRef.current.height = calcHeight;
// // }

// async function setCoords() {
//     //console.log('in async', imgCont.children, map.children, height);
//     const scaler = mainImgRef.current.offsetWidth / mainImgRef.current.naturalWidth;
//     const mapItems = Array.from(mapRef.current.children);
//     const serverArr = await fetchServerData();
//     mapItems.forEach((item) => {
//         serverArr.forEach((elem) => {
//             if (elem.obj.title === item.alt) {
//                 const [x1, x2] = transformCoords(elem.obj.xRange, scaler);
//                 const [y1, y2] = transformCoords(elem.obj.yRange, scaler);
//                 item.coords = `${x1},${y1},${x2},${y2}`;
//             }
//         });
//     });

//     async function fetchServerData() {
//         let serverArr = [];
//         const querySnapshot = await getDocs(collection(db, 'position'));
//         querySnapshot.docs.forEach((doc) => {
//             serverArr = [...serverArr, { id: doc.id, obj: doc.data() }];
//         });
//         return serverArr;
//     }

//     function transformCoords(coordArr, percentChange) {
//         return coordArr.map((item) => {
//             return Math.floor(parseFloat(item) * percentChange);
//         });
//     }
// }

// const xx = document.querySelector('#coordinates');
// function logMousePos(event) {
//     // console.log(imgContRef.current.offsetLeft, imgContRef.current.getBoundingClientRect());
//     //console.log(`X: ${event.clientX} Y: ${event.clientY}`, `xxx`);
//     xx.textContent = `X: ${event.pageX} Y: ${event.pageY}`;
// }

// function checkCoord(menuItem, xCoord, yCoord) {
//     const topOffset = mainImgRef.current.offsetTop;
//     const mapItems = Array.from(mapRef.current.children); //get all imagemap items
//     const mapNode = mapItems.find((item) => item.alt === menuItem); //find the mapItem that equals the clicked menuItem
//     const [x1, y1, x2, y2] = mapNode.coords.split(',');
//     const [xMin, xMax] = [x1, x2].sort((a, b) => a - b);
//     const [yMin, yMax] = [y1, y2].sort((a, b) => a - b);
//     //console.log(listName, xMin, xMax, yMin, yMax, `xcoord:${xCoord}`, `ycoord${yCoord - topOffset}`);
//     if (xCoord >= xMin && xCoord <= xMax && yCoord - topOffset >= yMin && yCoord - topOffset <= yMax) {
//         const tempObj = { [menuItem]: { border: '0.4vw solid green' } };
//         setCircleColor({ ...circleColor, ...tempObj });
//         return true;
//     } else {
//         return false;
//     }
// }

// function mapEventHand(e) {
//     console.log('clicked a map item');
//     e.preventDefault();
//     clickHandler(e);
// }

// function clickHandler(e) {
//     console.log('i clicked this', e.pageX, e.pageY);
//     setHidden(false);
//     setX(e.pageX);
//     setY(e.pageY);
// }

// function menuClickHand(e) {
//     console.log('menuClicked');
//     //console.log(e.target);
//     const result = checkCoord(e.target.textContent, x, y);
//     configAlert(result);
//     setHidden(true);
// }

// function configAlert(result) {
//     setShowAlert(true);
//     if (result) {
//         // const [showAlert, setShowAlert] = useState(false);
//         // const [alertText, setAlertText] = useState({});
//         setAlertInfo({
//             color: { backgroundColor: 'green' },
//             text: 'Nice! You found one.'
//         });
//     } else {
//         setAlertInfo({
//             color: { backgroundColor: 'red' },
//             text: 'Nope. Keep trying!'
//         });
//     }
//     setTimeout(() => {
//         setShowAlert(false);
//     }, 1500);
// }


// // function resizeCoords() {
// //   const aspectRatio = mainImgRef.current.naturalWidth / mainImgRef.current.naturalHeight;
// //   setHeight(aspectRatio, mainImgRef.current.offsetWidth);
// //   setCoords();
// // }

// // function useWindowSize() {
// //   const [size, setSize] = useState([0, 0]);
// //   useLayoutEffect(() => {
// //     function updateSize() {
// //       const aspectRatio = mainImgRef.current.naturalWidth / mainImgRef.current.naturalHeight;
// //       setHeight(aspectRatio, mainImgRef.current.offsetWidth);
// //       clone();
// //     }
// //     window.addEventListener('resize', updateSize);
// //     updateSize();
// //     return () => window.removeEventListener('resize', updateSize);
// //   }, []);
// //   return size;
// // }

// // function useWindowSize() {
// //   const [size, setSize] = useState([0, 0]);
// //   useLayoutEffect(() => {
// //     function updateSize() {
// //       setSize([window.innerWidth, window.innerHeight]);
// //     }
// //     window.addEventListener('resize', updateSize);
// //     updateSize();
// //     return () => window.removeEventListener('resize', updateSize);
// //   }, []);
// //   return size;
// // }

// // function ShowWindowDimensions(props) {
// //   
// //   return ;
// // }

// // <div>
// //   <img src={images[0]} alt='' height='80' width='80' />
// //   <img src={images[1]} alt='' height='80' width='80' />
// //   <img src={images[2]} alt='' height='80' width='80' />
// // </div>

// async function getScores() {
//     let arr = [];
//     const querySnapshot = await getDocs(collection(db, 'hiscores'));
//     querySnapshot.forEach((doc) => {
//         arr = [...arr, { id: doc.id, data: doc.data() }];
//     });
//     arr.sort((a, b) => {
//         return parseFloat(b.data.score) - parseFloat(a.data.score);
//     });
//     setHiscores(arr);
// }


    // useEffect(() => {
    //     console.log('this is called');
    //     //setMapCoords(); // height does not scale different from width, no need to calc
    //     //console.log('BCRCont', imgContRef.current.getBoundingClientRect(), 'BCRImg', mainImgRef.current.getBoundingClientRect());
    // });