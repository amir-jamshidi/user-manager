import { CurrentLine, Foreground, Green } from "../../helpers/Color";
import Contact from "./Contact";
import Spinner from "./../Spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

const Contacts = () => {
  //Get Values And Sates From App.js
  const {
    filterContact: contacts,
    error,
    loading,
    deleteContact,
  } = useContext(ContactContext);

  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 d-flex justify-content-center mt-3 ">
                <Link
                  to="add"
                  className="btn mx-3 d-flex align-items-center px-4"
                  style={{
                    backgroundColor: CurrentLine,
                    color: Foreground,
                    fontSize: "20px",
                  }}
                >
                  ساخت مخاطب جدید
                  <i
                    className=" fa fa-plus-circle"
                    style={{ color: Foreground, marginRight: " 10px" }}
                  ></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*---------------------------------------*/}

      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row mt-1">
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <Contact
                  key={c.id}
                  contact={c}
                  deleteContact={() => deleteContact(c.id, c.fullname)}
                />
              ))
            ) : (
              <>
                <h1 className="mt-5" style={{ color: Foreground }}>
                  اوه !!!!!
                </h1>
                <h1 className="mt-3" style={{ color: Foreground }}>
                  کاربری برای نمایش یافت نشد !!!
                </h1>
                <h1 className="mt-3" style={{ color: Foreground }}>
                  {error}
                </h1>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
