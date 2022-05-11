import "./App.css";
import ComponentA from "./components/ComponentA";
import React, { useReducer } from "react";
import ComponentB from "./components/ComponentB";
import ComponentC from "./components/ComponentC";

export const countContext = React.createContext();

const intitalValue = 0;
const useredusing = (state, action) => {
  switch (action) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return intitalValue;
    default:
      return state;
  }
};

const App = () => {
  const [count, dispatch] = useReducer(useredusing, intitalValue);

  return (
    <countContext.Provider
      value={{ countState: count, countDispatch: dispatch }}
    >
      <div className="App">
        <h2>{count}</h2>
        <ComponentA />
        <ComponentB />
        <ComponentC />
      </div>
    </countContext.Provider>
  );
};

export default App;
