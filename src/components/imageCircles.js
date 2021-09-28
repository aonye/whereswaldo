import { images1 } from './Ww1_images/index';
import { images2 } from './Ww2_images/index';
import { images3 } from './Ww3_images/index';

const ImageCircles = (props) => {
    const { imgCircleColor, imgCircleContRef, gameInfo } = props;

    function getImgs(gameInfo) {
        switch (gameInfo.currentMap) {
            case '1': {
                return images1;
            }
            case '2': {
                return images2;
            }
            case '3': {
                return images3;
            }
            default: {
                console.log('Error in imageCircles. Never print this');
                return null;
            }
        }
    }

    function makeImgs(images) { //images is an object
        const keys = Object.keys(images); //array of keys
        return keys.map((item, index) => {
            return (
                <img key={index} style={imgCircleColor[item]} id={item} src={images[item]} alt={item} />
            );
        });
    }

    return (
        <div ref={imgCircleContRef} className='imgCirCont'>
            {makeImgs(getImgs(gameInfo))}
        </div>
    );
};

export default ImageCircles;

// const makeImages = () => {
//     let imgArr = [];
//     for (let key in images2) {
//         imgArr.push(
//             <img src={images2[key]} alt='' />
//         );
//     }
//     return imgArr.map((item) => {
//         return item;
//     })
// };

