import makerjs from "makerjs";

/*----------------------------------------------------------------------------*/

// Draw arc by different methods
function ArcMethods() {
  const origin = [0, 20];

  const pointA = [10, 20];
  const pointB = [20, 0];
  const pointC = [-15, -15];

  const startAngle = 0;
  const endAngle = 90;
  const radius = 20;

  const largeArc = true;
  const clockwise = false;

  const arcMethod1 = new makerjs.paths.Arc(origin, radius, startAngle, endAngle);
  const arcMethod2 = new makerjs.paths.Arc(pointA, pointB, radius, largeArc, clockwise);
  const arcMethod3 = new makerjs.paths.Arc(pointA, pointB, clockwise);
  const arcMethod4 = new makerjs.paths.Arc(pointA, pointB, pointC);

  this.paths = {
    arcMethod1,
    arcMethod2,
    arcMethod3,
    arcMethod4,
  };
}

ArcMethods.metaParameters = [];

/*----------------------------------------------------------------------------*/

// Draw circle by different methods
function CircleMethods() {
  const origin = [0, 0];
  const pointA = [10, 20];
  const pointB = [20, 0];
  const pointC = [-15, -15];

  const radius = 20;

  const circleMethod1 = new makerjs.paths.Circle(radius);
  const circleMethod2 = new makerjs.paths.Circle(origin, radius);
  const circleMethod3 = new makerjs.paths.Circle(pointA, pointB);
  const circleMethod4 = new makerjs.paths.Circle(pointA, pointB, pointC);

  this.paths = {
    circleMethod1,
    circleMethod2,
    circleMethod3,
    circleMethod4,
  };
}

CircleMethods.metaParameters = [];

/*----------------------------------------------------------------------------*/

// calculating radius for each circle
function generateRadius(r, n) {
  const x = (r - 1) / (n - 1);
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(Math.round(i * x + 1));
  }

  return arr.reverse();
}

// generating 5 sequential circles from given radius to circle with radius 1
function SequentialCircles(radius) {
  const gap = 10;
  const arr = generateRadius(radius, 5);
  // console.log(arr, 'arr');

  this.paths = {};

  let y = gap;
  for (const r of arr) {
    // console.log(r, 'r');
    const circle = new makerjs.paths.Circle([0, y + r], r);
    y += 2 * r + gap;
    this.paths['circle_' + r] = circle;
  }
}

SequentialCircles.metaParameters = [
  { title: "radius", type: "range", min: 0, max: 100, value: 50 },
];

/*----------------------------------------------------------------------------*/
