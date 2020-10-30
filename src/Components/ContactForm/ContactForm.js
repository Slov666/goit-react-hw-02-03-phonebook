import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./ContactForm.module.css";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleOnChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { name, number } = this.state;
    e.preventDefault();
    this.props.createContact(name, number);
    this.setState({ name: "" });
    this.setState({ number: "" });
  };
  render() {
    const {form, label, input, button} = style;
    const { name, number  } = this.state;
    return (
      <form className={form} onSubmit={this.handleSubmit}>
        <label className={label}>
          Name
          
          <input className={input}
            type="text"
            name="name"
            onChange={this.handleOnChange}
            value={name}
            placeholder="Enter name"
          />
        </label>
        <label className={label}>
          Number
          <input className={input}
            type="number"
            name="number"
            onChange={this.handleOnChange}
            value={number}
            placeholder="Enter number"
            required
          />
        </label>
        <button className={button} type="submit"> Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  createContact: PropTypes.func,
};
