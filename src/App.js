import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import Results from "./components/Results";
import Detail from "./components/Detail";
import * as searchApi from "./utils/api";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      message: "Enter a city to begin your search.",
      results: [],
      details: [],
      modalIsOpen: false,
      noResults: true
    };
    this.showDetails = this.showDetails.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  showDetails(id) {
    searchApi.getDetails(id).then(res => {
      this.setState({ details: res });
      this.openModal();
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    let city = this.state.query;
    searchApi.getCarriers(city).then(res => {
      if (Array.isArray(res) === true) {
        this.setState({ noResults: false });
        this.setState({ results: res });
      } else {
        this.setState({ noResults: true });
        this.setState({ message: res });
        this.setState({ results: [] });
      }
    });
    event.preventDefault();
    this.setState({ query: "" });
  }

  render() {
    const noResults = this.state.noResults;

    const showResults = noResults ? (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <p className="lead">{this.state.message}</p>
        </div>
      </div>
    ) : (
      <Results
        results={this.state.results}
        showDetails={this.showDetails.bind(this)}
      />
    );

    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-primary">
          <span className="navbar-brand mb-0 h1">Arrive Logistics</span>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search city"
              aria-label="Search"
              value={this.state.query}
              onChange={this.handleChange}
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>
        {showResults}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          {this.state.modalIsOpen && (
            <Detail
              details={this.state.details}
              closeModal={this.closeModal.bind(this)}
            />
          )}
        </Modal>
      </div>
    );
  }
}

export default App;
