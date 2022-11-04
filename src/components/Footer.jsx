import { Purple } from "../helpers/Color";

const Footer = () => {
  return (
    <div className="bg-dark mt-3 shadow-lg">
      <div className="container text-white p-4 d-flex flex-column justify-content-center align-items-center">
        <span style={{ fontSize: "28px" }}>ساخته شده توسط : امیر حسین</span>
        <hr className="w-100" style={{ color: Purple }} />
        <div>
          <i className="fa fa-copyright mx-1"></i>

          <span style={{ fontSize: "20" }}>
            تمامی حقوق این سایت محفوظ می باشد
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
