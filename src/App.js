import Nav from './Nav';
import ImageMap from 'image-map';
import './index.css';

function App() {
  const img = document.querySelector('#img');
  const xx = document.querySelector('#coordinates');
  function logMousePos(event) {
    console.log(`X: ${event.clientX} Y: ${event.clientY}`);
    xx.textContent = `X: ${event.pageX} Y: ${event.pageY}`;
  }
  ImageMap('img[usemap]', 500);
  img.addEventListener("mousemove", logMousePos);
  //const rect = img.getBoundingClientRect();
  //console.log(rect.top, rect.right, rect.bottom, rect.left);
  return (
    <div className="App">
      <Nav />
    </div>
  );
}

export default App;
