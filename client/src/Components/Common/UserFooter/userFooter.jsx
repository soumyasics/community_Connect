import React from "react";
import { Form, InputGroup, Stack } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillGoogleCircle,
} from "react-icons/ai";
import "./userFooter.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const iconStyle = {
    fontSize: "25px",
  };
  const navigate = useNavigate();

  return (
    <div className="my-footer">
      <div>
        <Stack>
          <h4
            className="footer-logo"
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            Community Connect{" "}
          </h4>
          {/* <InputGroup style={{ width: "240px" }} className="footer-mail">
            <InputGroup.Text>
              <AiOutlineMail />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Enter Your Email" />
          </InputGroup> */}
          {/* <div className="socialmedia-icons">
            <FaSquareInstagram style={iconStyle} />
            <AiFillFacebook style={iconStyle} />
            <AiFillTwitterSquare style={iconStyle} />
            <AiFillGoogleCircle style={iconStyle} />
          </div> */}
        </Stack>

        {/* <Stack className="my-stack">
          <p> Page Links</p>
          </Stack> */}
      
          {/* <p onClick={() => navigate("/user/leaderboard")}>Leaderboard</p>
          <p onClick={() => navigate("/terms")}>Legal terms</p> */}

        <>
          <Stack className="my-stack">
            <p>Get started</p>
            <p
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </p>
            <p onClick={() => navigate("/user/signup")}>Sign Up</p>
            <p onClick={() => navigate("/user/login")}>Login </p>
          </Stack>

          {/* <Stack className="my-stack">
            <p>About </p>
            <p onClick={() => navigate("/institute")}>Institute</p>
            <p onClick={() => navigate("/orphanage")}>Orphanage</p>
          </Stack> */}

          <Stack className="my-stack">
            <p>Contact us</p>
            <p>(+91) 123-456-7890</p>
            <p>communityconnect@gmail.com</p>
          </Stack>
        </>

        {/* <Stack className="download-app-stack my-stack">
          <p>Download App</p>
          <img
            src="https://pbs.twimg.com/media/F8K8X3_XMAAKWYp?format=jpg&name=small"
            alt="play-store"
          />
          <img
            src="https://pbs.twimg.com/media/F8K9Y0mXUAA7itL?format=png&name=small"
            alt="play-store"
          />
        </Stack> */}
      </div>
      <div className="footer-credit">
        <p>©2024 Community Connect</p>
        <div>
          {/* <p>Terms of Service</p>
          <p>Privacy Policy</p> */}
        </div>
      </div>
    </div>
  );
};
export default Footer;
