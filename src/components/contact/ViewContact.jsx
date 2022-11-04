import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CurrentLine, Green, Pink, Purple, Red } from "../../helpers/Color";
import { getContact, getGroup } from "../../services/ContaxtService";
import { Orange } from "./../../helpers/Color";
//--
import Spinner from "./../Spinner";
import { ContactContext } from "./../../context/ContactContext";
//--
const ViewContact = () => {
  //Get Valuses And Sates From App.js
  const { loading, setLoading } = useContext(ContactContext);

  //Get Id From Params
  const { contactId } = useParams();

  //Init States
  const [state, setState] = useState({
    contact: {},
    group: "",
  });

  //Life Cycle => Create
  useEffect(() => {
    const getContacts = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);
        setState({
          ...state,
          contact: contactData,
          group: groupData,
        });
        setLoading(false);
      } catch (error) {
        setState({
          ...state,
        });
        setLoading(false);
      }
    };
    setState({ ...state });
    getContacts();
  }, []);

  const { fullname, img, phone, email, jop } = state.contact;
  const { name } = state.group;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mb-5">
          <h3 className="mt-3" style={{ color: Purple }}>
            نمایش اطلاعات کاربر
          </h3>

          <div
            style={{ backgroundColor: CurrentLine }}
            className="d-flex rounded flex-column justify-content-center align-items-center mt-5"
          >
            <span
              className="rounded px-3 text-white"
              style={{
                backgroundColor: Red,
                maxWidth: "250px",
                marginTop: "-13px",
                fontSize: "20px",
              }}
            >
              {name}
            </span>

            <div className="row p-4  d-flex justify-content-center align-items-center w-100">
              <div className="col-3">
                <img
                  className="rounded"
                  height={200}
                  width={200}
                  src={img}
                  alt=""
                />
              </div>
              <div className="col-6 ">
                <ul className="list-group p-0" style={{ fontSize: "18px" }}>
                  <i className="list-group-item">
                    <span>نام و نام خانوادگی : </span> <span>{fullname}</span>
                  </i>
                  <i className="list-group-item">
                    <span>شماره تلفن : </span>
                    <span>{phone}</span>
                  </i>
                  <i className="list-group-item">
                    <span>ایمیل : </span>
                    <span>{email}</span>
                  </i>
                  <i className="list-group-item">
                    <span>شغل : </span>
                    <span>{jop}</span>
                  </i>
                </ul>
              </div>
              <div className="col-3 d-flex flex-column">
                <button style={{ backgroundColor: Red }} className="btn">
                  حذف کاربر
                </button>
                <button style={{ backgroundColor: Green }} className="btn my-1">
                  ارسال پیام
                </button>
                <button style={{ backgroundColor: Pink }} className="btn">
                  نمایش مشخصات کاربر
                </button>
              </div>
            </div>
          </div>
          <Link
            to="/contacts"
            style={{ backgroundColor: Orange }}
            className="btn w-100 mt-2"
          >
            بازگشت
          </Link>
        </div>
      )}
    </>
  );
};

export default ViewContact;
