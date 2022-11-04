import { useLocation } from "react-router-dom";
import SearchContact from "./contact/SearchContact";
import { Background, Purple, Foreground } from "../helpers/Color";

const NavBar = () => {
  //GetLocation
  const location = useLocation();

  //Return
  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg p-3 p-4"
      style={{ background: Background }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-start align-items-center">
            <span
              style={{
                fontFamily: "aviny",
                color: Foreground,
                fontSize: "28px",
              }}
            >
              اپلیکیشن مدیریت
            </span>
            <span
              style={{
                color: Purple,
                fontFamily: "aviny",
                fontSize: "32px",
                marginRight: "5px",
              }}
            >
              کاربران
            </span>
          </div>

          <div className="col-12 col-md-6 d-flex juctify-content-center align-items-center">
            {location.pathname === "/contacts" ? <SearchContact /> : null}
          </div>

          <div className="col-3 d-flex justify-content-end align-items-center p-0"></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
