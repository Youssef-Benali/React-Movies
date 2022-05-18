import React, { Component } from "react";
import NavBar from "./navbar";
import Counters from "./counters";

import "./app.css";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  componentDidMount() {}

  handleCount = (counter, e) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    // this.setState({counters})
    counters[index] = { ...counter };
    if (e.target.innerText === "+") {
      counters[index].value++;
    } else {
      counters[index].value--;
    }
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter(
      (counter) => counter.id !== counterId
    );
    this.setState({ counters });
  };

  render() {
    return (
      <>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onCount={this.handleCount}
            onDelete={this.handleDelete}
          />
        </main>
      </>
    );
  }
}

export default App;
