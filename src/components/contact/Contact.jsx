import { CurrentLine, Green, Red } from "../../helpers/Color";
import { Orange, Purple } from "./../../helpers/Color";
import { Link } from "react-router-dom";

const Contact = ({ contact, deleteContact }) => {
  //Return
  return (
    <div className="col-md-6">
      <div className="card my-2" style={{ backgroundColor: CurrentLine }}>
        <div className="card-body">
          <div className="row d-flex align-items-center justify-content-around">
            <div className="col-md-4 col-sm-4">
              <img
                src={contact.img}
                alt=""
                className="img-fluid rounded"
                style={{height:'125px' ,width: '150px', border: `1px solid ${Purple}`}}
              />
            </div>
            <div className="col-md-6 col-sm-6 ">
              <ul className="list-group m-0 p-0">
                <li className="list-group-item list-group-item-dark">
                  <span>نام و نام خانوادگی :</span>{" "}
                  <span>{contact.fullname}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  <span>شماره همراه :</span> <span>{contact.phone}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  <span>ایمیل : </span> <span>{contact.email}</span>
                </li>
              </ul>
            </div>

            <div className="col-md-2 col-sm-2 d-flex flex-column align-items-center">
              <Link
                to={`${contact.id}`}
                className="btn my-1 d-flex justify-content-center align-content-center w-75 py-2"
                style={{ backgroundColor: Orange, color: CurrentLine }}
              >
                <i className="fa fa-eye "></i>
              </Link>
              <Link
                to={`edit/${contact.id}`}
                className="btn my-1 d-flex justify-content-center align-content-center w-75 py-2"
                style={{ backgroundColor: Green, color: CurrentLine }}
              >
                <i className="fa fa-pen "></i>
              </Link>
              <button
                className="btn my-1 d-flex justify-content-center align-content-center w-75 py-2"
                style={{ backgroundColor: Red, color: CurrentLine }}
                onClick={deleteContact}
              >
                <i className="fa fa-trash "></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
