import React from "react";
import PropTypes from "prop-types";
import style from "./ContactList.module.css";

const ContactList = ({ contacts, onRemoveContact }) => {
  const { container, button, item, span } = style;
  return (
    <>
      {contacts.map((contact) => (
        <ul key={contact.id} className={container}>
          <li className={item}>
            <span className={span}>Name:</span> {contact.name}
          </li>
          <li className={item}>
            <span className={span}>Ph.</span> {contact.number}
          </li>
          <button
            className={button}
            type="button"
            onClick={() => onRemoveContact(contact.id)}
          ></button>
        </ul>
      ))}
    </>
  );
};
export default ContactList;
ContactList.propTypes = {
  contacts: PropTypes.array,
  onRemoveContact: PropTypes.func,
};
