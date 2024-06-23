import "./textLeftComponent.css";

const TextLeftComponent = ({ imgPath, heading, content, buttonContent }) => {
  return (
    <div className="text-left-comp">
      <div className="text-left-section">
        <h3> {heading}</h3>
        <p> {content}</p>
      </div>

      <img src={imgPath} alt="path" />
    </div>
  );
};
export default TextLeftComponent;
