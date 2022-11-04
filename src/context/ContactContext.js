import { createContext } from 'react'

export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    contact: {},
    setContacts: () => { },
    setContact: () => { },
    contacts: [],
    filterContact: [],
    contactQuery: {},
    groups: [],
    contactEdit: [],
    setContactEdit: () => { },
    setFilterContact: () => { },
    onContactChange: () => { },
    deleteContact: () => { },
    updateContact: () => { },
    searchContact: () => { },
    createContact: () => { }
});