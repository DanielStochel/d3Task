import * as d3 from "d3";

export const gAttributes = (object, cx, cy, xPosition) => {
  object.attr(cx, xPosition);
  object.attr(cy, function(d, i) {
    return (i + 1) * 50;
  });
};

export const circleOperation = (circleSizes, setCircleSize) => {
  if (circleSizes.length * 40 > window.innerHeight / 1.5) {
    return alert("You cannot add more");
  }

  setCircleSize([...circleSizes, 600]);
  const g = d3
    .select("svg")
    .selectAll("g")
    .data(circleSizes);

  const gEnter = g.enter().append("g");
  const circle = gEnter
    .append("circle")
    .style("fill", "none")
    .style("stroke", "red");

  circle.attr("r", function(d) {
    return Math.sqrt(d);
  });

  const text = gEnter.append("text").classed("text-circle", true);

  text.style("fill", "black").text(`lorem ipsum`);

  gAttributes(text, "x", "y", 88);
  gAttributes(circle, "cx", "cy", 110);
};

export const removeCircleCalc = (circleSizes, setCircleSize) => {
  const g = d3
    .select("svg")
    .selectAll("g")
    .filter(":last-child");

  g.remove();
  setCircleSize(circleSizes.slice(-(circleSizes.length - 1)));
};
