import { useContext } from "react";
import { ContactContext } from "./../../context/ContactContext";

const SearchContact = () => {
  //Get Values And State From App.js
  const {  searchContact } = useContext(ContactContext);

  return (
    <div className="input-group" dir="ltr">
      <input
        
        onChange={e=>searchContact(e.target.value)}
        placeholder="جستجو کاربران ..."
        style={{ fontSize: "20px" }}
        type="text"
        dir="rtl"
        className="form-control text-center"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
