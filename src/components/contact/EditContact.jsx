import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { editContact, getContact } from "../../services/ContaxtService";
import { CommentColor, Foreground, Red, Purple } from "./../../helpers/Color";
import { ContactContext } from "./../../context/ContactContext";
import { useImmer } from "use-immer";
//--
import Spinner from "./../Spinner";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { contactSchema } from "./../../validations/ContactValidations";

import { toast } from 'react-toastify';

//--
const EditContact = () => {
  //GetParams
  const { contactId } = useParams();

  //GetNavigate
  const navigate = useNavigate();

  //Get Values And State From App.js With ContextApi
  const {
    groups,
    loading,
    setLoading,
    contactEdit,
    setContactEdit,
    setContacts,
    contacts,
    setFilterContact,
  } = useContext(ContactContext);

  //Life Cycle => Create
  useEffect(() => {
    const getContacts = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setContactEdit(contactData);
      } catch (error) {
        setLoading(false);
      }
    };
    getContacts();
  }, []);

  //Efit Contact
  const formSubmit = async (value) => {
    try {
      setLoading(true);
      const { data } = await editContact(value, contactId);
      if (data) {
        toast.info('کاربر ویرایش شد !')
        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });
        setFilterContact((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });

        setLoading(false);
        navigate("/contacts");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  //Return
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container d-flex flex-column justify-contnet-center align-items-center">
          <h3 className="mt-3" style={{ color: Purple }}>
            ویرایش کاربر
          </h3>
          <Formik
            initialValues={{
              fullname: contactEdit.fullname,
              img: contactEdit.img,
              phone: contactEdit.phone,
              email: contactEdit.email,
              jop: contactEdit.jop,
              group: contactEdit.group,
            }}
            validationSchema={contactSchema}
            onSubmit={(values) => {
              formSubmit(values);
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
                value="ویرایش !"
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
    </div>
  );
};

export default EditContact;
