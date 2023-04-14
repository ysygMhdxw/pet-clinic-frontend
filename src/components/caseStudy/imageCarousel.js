import {Carousel} from "antd";
import PropTypes from "prop-types";

export const ImageCarousel = ({ pic1, pic2, pic3 }) => {
    return (
        <div style={{width:"600px",height:"400px"}}>
            <Carousel autoplay>
                {pic1 && (
                    <div>
                        <img  width={"600px"} height={"400px"} src={pic1} alt="pic1" />
                    </div>
                )}
                {pic2 && (
                    <div>
                        <img width={"600px"} height={"400px"} src={pic2} alt="pic2" />
                    </div>
                )}
                {pic3 && (
                    <div>
                        <img width={"600px"} height={"400px"} src={pic3} alt="pic3" />
                    </div>
                )}
            </Carousel>
        </div>

    );
};
ImageCarousel.propTypes = {
    pic1: PropTypes.pic1,
    pic2: PropTypes.pic2,
    pic3: PropTypes.pic3
}