import getRandomNumber from "../utils/getRandomNumber";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const FormLocation = ({ setIdlocation }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.inputId.value.trim();
    if (inputValue === "" || inputValue === "0") {
      setIdlocation(getRandomNumber(126));
    } else {
      setIdlocation(inputValue);
    }
    e.target.inputId.value = '';
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative" }}>
        <FontAwesomeIcon icon={faSearch} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }} />
        <input id="inputId" style={{ boxShadow: "1px 1px 10px", paddingLeft: "30px", fontSize: "18px", width: "330px", height: "40px" }} type="text" />
      </div>
      <button style={{ backgroundColor: "green", color: "white", marginLeft: "0px", height: "40px", boxShadow: "1px 1px 10px" }}>Search</button>
    </form>
  );
};

export default FormLocation;


