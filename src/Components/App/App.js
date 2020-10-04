import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./App.module.css";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
class App extends Component {
  state = {
    contacts: [],
    filter: "",
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
      alert(`${contact.name} is already in contacts `);
      return;
    }
    this.setState((prevState) => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };
  changeFilter = (filter) => {
    this.setState({ filter });
  };
  getVisibleFilter = () => {
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const { container, title } = style;
    return (
      <section className={container}>
        <h2 className={title}>Phonebook</h2>
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
