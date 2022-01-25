import React from 'react';
import Css from './Rest.module.css';
import Rating from '../../Rating/Rating';

export default  function RestaurentDetail(props) {
    let restdata = props.restData;

    return restdata.map((data) => {
      
        return (
            <div className={Css.restContainer} key={data._id}>
                <div className={Css.restImages}>
                    <span>
                        <img src={data.restaurant_thumb} className={Css.thumbImg} alt="restaurant_thumb" />
                    </span>
                    <span className={Css.imageGallery}>
                        {data.image_gallery.map((eachImg,index) => {
                            return (<img src={eachImg}key={index+"restimg"} className={Css.galleryIMG} alt="gallery_Image" />)
                        })}
                    </span>
                </div>
                <div className={Css.restInfo}>
                    <div className={Css.restName}>
                        <h2 className={Css.heading}>{data.restaurant_name}</h2>
                        <p className={Css.address}>{data.address}</p>
                        <Rating rating={data.average_rating} />

                    </div>
                </div>
            </div>
        )
    })
}
