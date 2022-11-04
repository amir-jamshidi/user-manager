import axios from 'axios'

const SERVER_URL = 'http://localhost:9000';
//const SERVER_URL = 'https://usersapi.looklearn.ir';

export const getAllContact = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(url);
}

export const getGroups = () => {
    const url = `${SERVER_URL}/groups`
    return axios.get(url);
}
export const getGroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`
    return axios.get(url);
}

export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.delete(url);
}

export const editContact = (contact, contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.put(url, contact)
}
export const addContact = (contact) => {
    const url = `${SERVER_URL}/contacts`
    return axios.post(url, contact);
}