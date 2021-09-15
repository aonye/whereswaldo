const Ww1 = (props) => {
    const { imgContRef, mapRef, mainImgRef, clickHandler, mapEventHand } = props;
    return (
        <div ref={imgContRef} className='imgCont'>
            <img ref={mainImgRef} onClick={(e) => clickHandler(e)} className='wwImg' src="pokemon.png" alt="" useMap="#image-map" />
            <map ref={mapRef} name="image-map">
                <area onClick={(e) => mapEventHand(e)} alt="Chatot" coords="156,852,178,827" shape="rect" />
                <area onClick={(e) => mapEventHand(e)} alt="Eevee" coords="438,671,404,695" shape="rect" />
                <area onClick={(e) => mapEventHand(e)} alt="Blissey" coords="550,391,510,421" shape="rect" />
            </map>
        </div>
    );
};

//onMouseMove = {(e) => logMousePos(e)}

export default Ww1;