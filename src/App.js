import { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import './App.css';
//--
import { ContactContext } from './context/ContactContext';
//--
import { AddContact, Contacts, EditContact, NavBar, ViewContact } from './components'
import Footer from './components/Footer';
//--
import { getAllContact, getGroups, addContact, deleteContact } from './services/ContaxtService';
import { confirmAlert } from 'react-confirm-alert';
import { CurrentLine, Purple, Foreground, Red } from './helpers/Color';
//--
import { ToastContainer , toast } from 'react-toastify';
import _ from 'lodash';

import { useImmer } from 'use-immer'


function App() {

  //Init States
  const [contacts, setContacts] = useImmer([]);
  const [filterContact, setFilterContact] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [loading, setLoading] = useImmer(false);
  const [contact, setContact] = useImmer({});
  const [contactEdit, setContactEdit] = useImmer({});
  //UseNavigate
  const navigate = useNavigate();

  //Create Life Cycle => Create
  useEffect(() => {

    const fetchData = async () => {
      try {

        setLoading(true);

        const { data: contactsData } = await getAllContact();
        const { data: groupsData } = await getGroups();

        setContacts(contactsData)
        setFilterContact(contactsData)
        setGroups(groupsData);
        setLoading(false);

      } catch (error) {
        setLoading(false)
      }
    }
    fetchData();
  }, [])


  //Create Contact
  const createContactForm = async (values) => {

    try {
      setLoading(true);

      const { status, data } = await addContact(values);

      if (status === 201) {
        toast.success('کاربر با موفقیت ساخته شد !');
        setContacts(draft => {draft.push(data)})
        setFilterContact(draft => {draft.push(data)});

        setContact({});
        setLoading(false);

        navigate('/contacts')
      }

    } catch (error) {
      // setError(error.inner);
      setLoading(false);
    }
  }

  //Alert For Delete Contact
  const ConfirmDelete = (contactId, contactFullname) => {

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir='rtl' className='p-4 rounded d-flex flex-column align-items-center justify-content-center' style={{ backgroundColor: CurrentLine, width: '500px', height: '250px' }}>
            <h1 style={{ color: Purple }}>پاک کردن کاربر</h1>
            <p style={{ fontSize: '24px', color: Foreground }}> مخاطب {contactFullname} پاک شود ؟</p>
            <div className='d-flex justify-content-center'>
              <button className='btn m-1' style={{ backgroundColor: Red, width: '80px' }} onClick={() => {
                removeContact(contactId);
                onClose()
              }}>اره</button>
              <button className='btn m-1' style={{ backgroundColor: Purple, width: '80px' }} onClick={() => {
                onClose()
              }}
              >نه</button>
            </div>
          </div>
        )
      }
    })
  }

  //Delete Contact
  const removeContact = async (contactId) => {
    toast.error('کاربر حذف شد !')
    //BackUp
    const copyContacts = [...contacts];

    try {
      setLoading(true);

      setContacts(draft => draft.filter(c => c.id !== contactId));
      setFilterContact(draft => draft.filter(c => c.id !== contactId));

      let { status } = await deleteContact(contactId);

      if (status !== 200) {
        setContacts(copyContacts);
        setFilterContact(copyContacts);
       
        setLoading(false);
      } else {
        setLoading(false);
      }

    } catch (error) {
      setContacts(copyContacts);
      setFilterContact(copyContacts);
      setLoading(false);
    }
  }

  //Search Contact
  const searchContact = _.debounce(query => {

    if (!query) { return setFilterContact([...contacts]); }

    // setFilterContact(
    //   contacts.filter(contact => {
    //     return contact.fullname.toLowerCase().includes(query.toLowerCase());
    //   }));

      setFilterContact(draft => draft.filter(c => c.fullname.toLowerCase().includes(query.toLowerCase())));

  }, 2000);


  //Render
  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contact,
      setFilterContact,
      setContacts,
      setContact,
      contacts,
      filterContact,
      groups,
      deleteContact: ConfirmDelete,
      createContact: createContactForm,
      searchContact,
      contactEdit,
      setContactEdit,

    }}>
      <div className='App'>
        <ToastContainer rtl={true} position='bottom-right' theme='colored'/>
        <NavBar />
        <Routes>
          <Route path='/' element={<Navigate to='/contacts' />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/contacts/add' element={<AddContact />}></Route>
          <Route path='/contacts/:contactId' element={<ViewContact />}></Route>
          <Route path='/contacts/edit/:contactId' element={<EditContact />}></Route>
        </Routes>
        <Footer />
      </div>
    </ContactContext.Provider>
  );
}

export default App;
