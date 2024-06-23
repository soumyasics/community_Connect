import "./textRightComp.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../../Context/authContext";
import useToast from "../../../hooks/useToast";
const TextRightComponent = ({ imgPath, content, heading, buttonContent }) => {
  const { userContext } = useContext(AuthContext);
  const { showToast, ToastComponent } = useToast();

  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    if (userContext && userContext.userType !== "") {
      return true;
    }
    return false;
  };

  const redirectToCamp = () => {
    if (isUserLoggedIn()) {
      if (buttonContent === "View Camps") {
        navigate("/view-blood-camps");
      }
    } else {
      showToast("Log in for view camps");
      console.log("User is not logged in.");
    }
  };
  return (
    <>
      {ToastComponent}
      <div className="text-right-comp">
        <div className="text-right-img-container">
          <img src={imgPath} alt="path" />
        </div>
        <div className="text-right-section">
          <h3> {heading}</h3>
          <p> {content}</p>

          {buttonContent !== null && (
            <button onClick={redirectToCamp}>{buttonContent}</button>
          )}
        </div>
      </div>
    </>
  );
};
export default TextRightComponent;
