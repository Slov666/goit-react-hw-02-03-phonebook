import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import style from "./ContactList.module.css";

const ContactList = ({ contacts, onRemoveContact }) => {
  const { container, button, item, span, ul } = style;
  return (
    <>
      <TransitionGroup component="ul" className={ul}>
        {contacts.map((contact) => (
          <CSSTransition key={contact.id} timeout={250} classNames={style}>
            <li className={container}>
              <div className={item}>
                <span className={span}>Name:</span> {contact.name}
              </div>

              <div className={item}>
                <span className={span}>Ph.</span> {contact.number}
              </div>

              <button
                className={button}
                type="button"
                onClick={() => onRemoveContact(contact.id)}
              ></button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};
export default ContactList;
ContactList.propTypes = {
  contacts: PropTypes.array,
  onRemoveContact: PropTypes.func,
};
