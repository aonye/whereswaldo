import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { db } from './firebase/firebase.js';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import Nav from './components/Nav';
import Main from './Main';
import Home from './components/Home';
import Hiscores from './components/Hiscores';
import './index.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [hideTimer, setHideTimer] = useState(true);
  const [timerOn, setTimerOn] = useState(true);
  const [hiscores, setHiscores] = useState();
  const [slowestLB, setSlowestLB] = useState();
  const [gameInfo, setGameInfo] = useState({
    currentMap: null,
    clearedMaps: [],
    currentScore: 0,
    cumulativeTime: 0,
  });

  useEffect(() => {
    getScores().then(val => {
      const arr = sortScores(val);
      const [slowest] = arr.slice(-1);
      setHiscores(arr);
      setSlowestLB(() => {
        return slowest.data.time;
      });
    }, reason => {
      console.log('rejected: ', reason);
    });
  }, []);

  async function getScores() { //sorted
    let arr = [];
    const querySnapshot = await getDocs(collection(db, 'hiscores'));
    querySnapshot.forEach((doc) => {
      arr = [...arr, { id: doc.id, data: doc.data() }];
    });
    return arr;
  }

  function sortScores(arr) {
    return arr.sort((a, b) => {
      return parseFloat(a.data.time) - parseFloat(b.data.time);
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    const name = Array.from(e.target.childNodes).find((node) => node.name === 'name').value;
    const scores = await getScores();
    const slowest = scores.find((item) => {
      return item.data.time === slowestLB ? item : null;
    });
    const newScore = [...(scores.slice(0, -1)), { id: slowest.id, data: { name: name, time: gameInfo.cumulativeTime } }];
    console.log(name, 'name', scores, 'scores', slowest, 'slowestid', newScore, 'newscore');
    await uploadScore(newScore);
    setHiscores(sortScores(newScore));
    setGameInfo({ ...gameInfo, ...{ clearedMaps: [] } });
  }

  async function uploadScore(scores) {
    scores.forEach((item) => {
      const HSRef = doc(db, 'hiscores', `${item.id}`);
      setDoc(HSRef, item.data);
    });
  }

  const clickLvlHand = (e) => {
    let level = e.target.textContent;
    const levelNo = level.slice(-1);
    setGameInfo({ ...gameInfo, currentMap: levelNo });
  };

  function resetGI() {
    setGameInfo({
      currentMap: null,
      clearedMaps: [],
      currentScore: 0,
      cumulativeTime: 0,
    });
  }

  return (
    <BrowserRouter>
      <Nav time={time} hideTimer={hideTimer} setHideTimer={setHideTimer} />
      <Switch>
        <Route exact path='/hiscores'
          render={() =>
            <Hiscores
              gameInfo={gameInfo}
              resetGI={resetGI}
              slowestLB={slowestLB}
              hiscores={hiscores}
              onFormSubmit={onFormSubmit}
            />}
        />
        <Route exact path='/main'>
          {gameInfo.currentMap === null ?
            <Redirect to='/' /> :
            <Main time={time} setTime={setTime} timerOn={timerOn} setTimerOn={setTimerOn} setHideTimer={setHideTimer} gameInfo={gameInfo} setGameInfo={setGameInfo} />
          }
        </Route>
        <Route exact path='/'>
          {gameInfo.clearedMaps.length === 3 ?
            <Redirect to='/hiscores' /> :
            <Home gameInfo={gameInfo} clickLvlHand={clickLvlHand} />
          }
        </Route>
      </Switch>
    </BrowserRouter >
  );
};

export default App;

// async function setDB() {
//   await setDoc(doc(db, "hiscores", "0"), {
//     name: "Anonymous",
//     time: 90000,
//   });
//   await setDoc(doc(db, "hiscores", "1"), {
//     name: "Nyancat",
//     time: 95000,
//   });
//   await setDoc(doc(db, "hiscores", "2"), {
//     name: "Spike Spiegel",
//     time: 100000,
//   });
//   await setDoc(doc(db, "hiscores", "3"), {
//     name: "Monkey D. Luffy",
//     time: 120000,
//   });
//   await setDoc(doc(db, "hiscores", "4"), {
//     name: "Naruto Uzumaki",
//     time: 300000,
//   });
// }

// setDB();