import areaMapIndex from "./areaMapIndex";

const WheresWaldo = (props) => {
    const { gameInfo, imgContRef, mapRef, mainImgRef, clickHandler, mapEventHand } = props;
    function makeAreaMap(currentMapID) {
        let arr = [];
        for (let ID in areaMapIndex) {
            if (parseInt(ID) === parseInt(currentMapID)) {
                arr = areaMapIndex[ID];
            }
        }
        return arr.map((item, index) => {
            return (
                <area key={index} onClick={(e) => mapEventHand(e)} alt={item.ID} coords={item.coords} shape="rect" />
            );
        });
    }
    return (
        <div ref={imgContRef} className='imgCont'>
            <img ref={mainImgRef} onClick={(e) => clickHandler(e)} className='wwImg' src="pokemon.png" alt="" useMap="#image-map" />
            <map ref={mapRef} name="image-map">
                {makeAreaMap(gameInfo.currentMap)}
            </map>
        </div>
    );
};

export default WheresWaldo;

//onMouseMove = {(e) => logMousePos(e)}