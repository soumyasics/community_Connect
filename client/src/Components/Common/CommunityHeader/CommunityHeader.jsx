import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Heading,
} from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import headerImg from "../../../Assets/Images/login-header-img.png";
import "./CommunityHeader.css";

const CommunityHeader = ({
  imgPath = headerImg,
  heading = "Empowering Change, Transforming Lives",
  description = `Welcome to COMMUNITY, where compassion meets action.
  At the heart of our mission lies the unwavering belief that every individual,
  regardless of their background or circumstance, deserves the opportunity to lead 
  a dignified and fulfilling life.`,
  textColor = "white",
}) => {
  const containerStyle = {
    backgroundImage: `url(${imgPath})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const fontColorStyle = {
    color: textColor,
  };
  return (
    <Container
      fluid
      className="community-header-container"
      id="community-header-container-id"
      style={containerStyle}
    >
      <Container className="community-header-content">
        <InputGroup className="mb-3 header-search-input">
          {/* <FormControl
            className="header-search-input"
            placeholder="Search"
            type="text"
          /> */}
          {/* <InputGroup.Text id="basic-addon1">
            <IoSearchOutline />
          </InputGroup.Text> */}
        </InputGroup>

        <Container
          style={fontColorStyle}
          className="community-header-text-content"
        >
          <h2>{heading}</h2>
          <p>{description}</p>
        </Container>
      </Container>
    </Container>
  );
};

export default CommunityHeader;
