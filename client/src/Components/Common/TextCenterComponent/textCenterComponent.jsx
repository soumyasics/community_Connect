import "./textCenterComponent.css";
import { useNavigate } from "react-router-dom";
const TextCenterComponent = ({
  heading,
  textContent,
  buttonContent = "View Leaderboard",
}) => {
  const navigate = useNavigate();
  return (
    <div className="text-center-comp">
      <h1>{heading}</h1>
      <p>{textContent}</p>
      {buttonContent !== null && (
        <button
          onClick={() => {
            navigate("user/leaderboard");
          }}
        >
          {" "}
          {buttonContent}
        </button>
      )}
    </div>
  );
};
export default TextCenterComponent;
