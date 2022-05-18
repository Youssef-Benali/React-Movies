import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const { onReset, onDelete, onCount, counters } = this.props;
    return (
      <>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={onDelete}
            onCount={onCount}
            counter={counter}
          />
        ))}
      </>
    );
  }
}

export default Counters;
