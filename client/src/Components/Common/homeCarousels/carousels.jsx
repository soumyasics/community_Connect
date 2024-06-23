import Carousel from "react-bootstrap/Carousel";

import img1 from "../../../Assets/Images/bd1.jpeg";
import donationCamp from "../../../Assets/Images/donation-camp.jpg";
import bookStacks from "../../../Assets/Images/books-stack.jpg";
import orpImg from "../../../Assets/Images/orp-teady-bear.png";

function CarouselFadeExample() {
  const captionStyle = {
    textShadow: "2px 2px 4px black", // Adjust the values as needed
  };
  return (
    <Carousel fade>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 shadow"
          style={{ height: "600px" }}
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption style={captionStyle}>
          <h3>Saving Lives with Blood Donation</h3>
          <p>Be a Lifesaver, Donate Blood, Save Lives Every Drop Counts.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          style={{ height: "600px" }}
          src={orpImg}
          alt="First slide"
        />
        <Carousel.Caption style={captionStyle}>
          <h3>Supporting Orphaned Children</h3>
          <p>
            Empower their Future , Be a Guardian Angel, Make a Lasting Impact
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          style={{ height: "600px" }}
          src={bookStacks}
          alt="First slide"
        />
        <Carousel.Caption style={captionStyle}>
          <h3>Contributing to Education</h3>
          <p>
            Ignite Minds, Transform Lives, Education for All, Building Brighter
            Futures
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
