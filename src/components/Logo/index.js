/* istanbul ignore file */
import PropTypes from "prop-types";
import logo from "./logo.svg";
import "./style.scss";

const Logo = ({ size }) => (
  <div className="Logo">
    <img
      src={logo}
      alt="Logo de 77events"
      width={size === "large" ? "196" : "101"}
      height={size === "large" ? "67" : "35"}
    />
  </div>
);

Logo.propTypes = {
  size: PropTypes.string,
};
Logo.defaultProps = {
  size: "small",
};

export default Logo;
