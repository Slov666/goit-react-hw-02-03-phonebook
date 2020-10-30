import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";

import style from "./App.module.css";
import animate from "./animate.module.css";

import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import Already from "../Already/Already";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
    contactExist: false,
  };
  removeContact = (contactID) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(
          (contact) => contact.id !== contactID
        ),
      };
    });
  };
  addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    const isInclude = this.state.contacts.some(
      (item) => item.name === contact.name
    );
    if (isInclude) {
      this.showContactExistAlert();
      setTimeout(this.hideContactExistAlert, 2000);
      return;
    }
    this.setState((prevState) => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };
  componentDidMount() {
    const storageContacts = localStorage.getItem("concacts");
    if (storageContacts) {
      this.setState({ contacts: JSON.parse(storageContacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const currentContacts = this.state.contacts;
    if (prevContacts !== currentContacts) {
      localStorage.setItem("concacts", JSON.stringify(currentContacts));
    }
  }

  changeFilter = (filter) => {
    this.setState({ filter });
  };
  getVisibleFilter = () => {
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
  };
  showContactExistAlert = () => {
    this.setState({ contactExist: true });
  };
  hideContactExistAlert = () => {
    this.setState({ contactExist: false });
  };

  render() {
    const { filter, contactExist } = this.state;
    const { container, title } = style;
    return (
      <section className={container}>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={style}
          unmountOnExit
        >
          <h2 className={title}>Phonebook</h2>
        </CSSTransition>
        <CSSTransition
          classNames={animate}
          in={contactExist}
          timeout={250}
          unmountOnExit
        >
          <Already />
        </CSSTransition>

        <ContactForm createContact={this.addContact} />
        <h2 className={title}>Contacts</h2>
        <ContactList
          onRemoveContact={this.removeContact}
          contacts={this.getVisibleFilter()}
        />
        <Filter value={filter} onFilter={this.changeFilter} />
      </section>
    );
  }
}
export default App;
