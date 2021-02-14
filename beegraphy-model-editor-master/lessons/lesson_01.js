import makerjs from "makerjs";

/*----------------------------------------------------------------------------*/

// Draw the simple line
function FirstModel() {
  const startPoint = [0, 0];
  const endPoint = [50, 50];
  const line = new makerjs.paths.Line(startPoint, endPoint)

  this.paths = {
    line,
  };
}

FirstModel.metaParameters = [];

/*----------------------------------------------------------------------------*/

// Make the parametric rectangle by lines
function RectangleModel(a, b) {
  const line1 = new makerjs.paths.Line([0, 0], [0, b]);
  const line2 = new makerjs.paths.Line([0, b], [a, b]);
  const line3 = new makerjs.paths.Line([a, b], [a, 0]);
  const line4 = new makerjs.paths.Line([a, 0], [0, 0]);

  this.paths = {
    line1,
    line2,
    line3,
    line4,
  };
}

RectangleModel.metaParameters = [
  { title: "width", type: "range", min: 0, max: 100, value: 50 },
  { title: "length", type: "range", min: 0, max: 100, value: 50 },
];

/*----------------------------------------------------------------------------*/

// calculating radius for each circle
function generateRadius(r, n) {
  const x = (r - 1) / (n - 1);
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(Math.round(i * x + 1));
  }

  return arr;
}

// generating 5 sequential circles from given radius to circle with radius 1
function SequentialCircles(radius) {
  const arr = generateRadius(radius, 5);
  console.log(arr, 'arr');

  this.paths = {};
}

SequentialCircles.metaParameters = [
  { title: "radius", type: "range", min: 0, max: 100, value: 50 },
];

/*----------------------------------------------------------------------------*/
