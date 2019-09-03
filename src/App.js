import * as d3 from "d3";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { circleOperation, removeCircleCalc } from "./utils/circleCalculation";
import "./App.css";

const usePrevious = circleSizes => {
  const ref = useRef();
  useEffect(() => {
    ref.current = circleSizes;
  }, [circleSizes]);
  return ref.current;
};

const App = () => {
  const [circleSizes, setCircleSize] = useState([600]);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const prevCount = usePrevious(circleSizes);

  useEffect(() => {
    if (prevCount !== undefined && prevCount.length < circleSizes.length) {
      const g = d3
        .select("svg")
        .selectAll("g")
        .filter(":last-child");

      g.transition()
        .attr("transform", `translate(${window.innerWidth - 230})`)
        .duration(5000)
        .transition()
        .attr("transform", `translate(10)`);
    }
    circleSizes.length > 1 ? setDisabledBtn(false) : setDisabledBtn(true);
  }, [circleSizes]);

  const addCircle = useCallback(
    () => circleOperation(circleSizes, setCircleSize),
    [circleSizes]
  );

  const removeCircle = useCallback(
    () => removeCircleCalc(circleSizes, setCircleSize),
    [circleSizes]
  );

  return (
    <div className="svg-container">
      <svg></svg>
      <button onClick={addCircle} className="add-button">
        Add circle
      </button>
      <button
        onClick={removeCircle}
        type="button"
        className="delete-button"
        disabled={disabledBtn}
      >
        Delete circle
      </button>
    </div>
  );
};

export default App;
