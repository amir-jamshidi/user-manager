import { useContext } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../";
import { CommentColor, Purple, Red, Foreground } from "./../../helpers/Color";
import { ContactContext } from "./../../context/ContactContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/ContactValidations";

const AddContact = () => {
  //Get Values And States From App.js
  const { loading, groups, createContact } = useContext(ContactContext);

  //Return
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container d-flex flex-column justify-contnet-center align-items-center">
          <h3 className="mt-3" style={{ color: Purple }}>
            ساخت کاربر جدید
          </h3>
          <Formik
            initialValues={{
              fullname: "",
              img: "",
              phone: "",
              email: "",
              jop: "",
              group: "",
            }}
            validationSchema={contactSchema}
            onSubmit={(values) => {
              createContact(values);
            }}
          >
            <Form className="w-50 mt-3 mb-4">
              <Field
                name="fullname"
                type="text"
                className="form-control text-center"
                placeholder="نام و نام خانوادگی"
              />
              <ErrorMessage name="fullname">
                {(msg) => <span style={{ color: "#ff5555" }}>{msg}</span>}
              </ErrorMessage>
              <Field
                name="img"
                type="text"
                className="form-control text-center mt-2"
                placeholder="آدرس عکس"
              />
              <ErrorMessage name="img">
                {(msg) => <span style={{ color: "#ff5555" }}>{msg}</span>}
              </ErrorMessage>
              <Field
                name="phone"
                type="text"
                className="form-control text-center mt-2"
                placeholder="شماره همراه"
              />
              <ErrorMessage name="phone">
                {(msg) => <span style={{ color: "#ff5555" }}>{msg}</span>}
              </ErrorMessage>

              <Field
                name="email"
                type="text"
                className="form-control text-center mt-2"
                placeholder="ایمیل"
              />
              <ErrorMessage name="email">
                {(msg) => <span style={{ color: "#ff5555" }}>{msg}</span>}
              </ErrorMessage>

              <Field
                name="jop"
                type="text"
                className="form-control text-center mt-2"
                placeholder="شغل"
              />
              <ErrorMessage name="jop">
                {(msg) => <span style={{ color: "#ff5555" }}>{msg}</span>}
              </ErrorMessage>
              <Field
                as="select"
                name="group"
                className="form-control text-center mt-2"
              >
                <option value="">انتخاب دسته</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {" "}
                    {group.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="group">
                {(msg) => <span style={{ color: "#ff5555" }}>{msg}</span>}
              </ErrorMessage>

              <input
                name="submit"
                style={{ backgroundColor: CommentColor, color: Foreground }}
                className="btn  w-100 mt-2"
                type="submit"
                value="بساز !"
              />
              <Link
                to="/contacts"
                style={{ backgroundColor: Red, color: Foreground }}
                className="btn  w-100 mt-2"
              >
                انصراف
              </Link>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};

export default AddContact;
