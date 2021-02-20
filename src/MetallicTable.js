import makerjs from "makerjs";

const {Line, Circle} = makerjs.paths;
const {Rectangle, ConnectTheDots, BezierCurve} = makerjs.models;
const {move, mirror, rotate, combineSubtraction, distort, zero} = makerjs.model;
const {modelExtents} = makerjs.measure;

const goldenRatio = 1.61803398875;

const svgPath = "M -1835.82 1271.07C -1833.14 1262.84 -1830.69 1253.41 -1824.87 1245.4C -1819.05 1237.4 -1809.88 1230.83 -1817.36 1225.28C -1824.84 1219.72 -1848.99 1215.18 -1862.22 1218.92C -1875.45 1222.66 -1877.76 1234.68 -1878.2 1248.1C -1878.63 1261.53 -1877.19 1276.37 -1871.22 1284.14C -1865.25 1291.91 -1854.76 1292.62 -1848.07 1289.47C -1841.38 1286.31 -1838.49 1279.3 -1835.82 1271.07";
const svgCloud = makerjs.importer.fromSVGPathData(svgPath);

function roundToEven(count) {
  const c = Math.floor(count);
  return c % 2 ? c - 1 : c;
}

function Triangle(base, height) {
  const pointTop = [0, height];
  const pointBaseLeft = [-base / 2, 0];
  const pointBaseRight = [base / 2, 0];

  const triangle = new ConnectTheDots([pointBaseLeft, pointTop, pointBaseRight]);

  this.models = {triangle};
}

function Trapezoid(base, top, height) {
  const bottomLeft = [-base / 2, 0];
  const bottomRight = [base / 2, 0];
  const topLeft = [-top / 2, height];
  const topRight = [top / 2, height];

  const trapezoid = new ConnectTheDots([bottomLeft, topLeft, topRight, bottomRight]);

  this.models = {trapezoid};
}

function MetallicTableFace(width, length) {
  const sheet = new Rectangle(width, length);
  const triangleBase = Math.round(width / (2 * goldenRatio));
  const triangleHeight = Math.round(length / (3 * goldenRatio));

  const padding = Math.round(triangleHeight / (2 * goldenRatio));

  const trapezoidBase = Math.round(length / goldenRatio);
  const trapezoidTop = Math.round(length / (2 * goldenRatio));
  const trapezoidHeight = Math.round(width / 2 - 1.5 * goldenRatio * padding);

  const triangle1 = new Triangle(triangleBase, triangleHeight);
  rotate(triangle1, 180);
  move(triangle1, [width / 2, length - padding]);

  const triangle2 = new Triangle(triangleBase, triangleHeight);
  move(triangle2, [width / 2, padding]);

  const trapezoid1 = new Trapezoid(trapezoidBase, trapezoidTop, trapezoidHeight);
  rotate(trapezoid1, -90);
  move(trapezoid1, [padding, length / 2]);
  const trapezoid2 = new Trapezoid(trapezoidBase, trapezoidTop, trapezoidHeight);
  rotate(trapezoid2, 90);
  move(trapezoid2, [width - padding, length / 2]);

  this.models = {
    sheet,
    triangle1,
    triangle2,
    trapezoid1,
    trapezoid2,
  };
}

function CloudBro() {
  const cloud = makerjs.cloneObject(svgCloud);
  zero(cloud);

  this.models = { cloud };
}

function MetallicTableLeg(width, length, height, lips, thickness, workingRadius) {
  this.paths = {};
  this.models = {};

  const base = 2 * (lips - thickness - workingRadius) + Math.PI * workingRadius / 2;
  const baseLipsWidth = base / 2;
  const delta = lips - baseLipsWidth;

  const sheet = new ConnectTheDots([
    [0, 0],
    [-(lips - delta), 0],
    [-(width - delta), height - lips],
    [-(width - delta), height],
    [length - delta, height],
    [length - delta, height - lips],
    [lips - delta, 0],
  ]);
  const curveWidth = new BezierCurve([
    [-(lips - delta), 0],
    [-(lips - delta), height - lips],
    [-(width - delta), height - lips],
  ]);
  const curveLength = new BezierCurve([
    [lips - delta, 0],
    [lips - delta, height - lips],
    [length - delta, height - lips],
  ]);

  this.models.leg = combineSubtraction(combineSubtraction(sheet, curveWidth), curveLength);
  this.paths.line = new Line([0, 0], [0, height]);
  this.paths.line.layer = "blue";

  const circleX = -(width - delta - lips / 2);
  const circleY = height - lips / 2;
  const lineLength = (width - delta - lips / 2) + (length - delta - lips / 2);
  const minR = 5;
  const maxR = Math.round(lips * goldenRatio - lips) / 2;
  const count = roundToEven(lineLength / (2 * maxR + minR));

  const circleGap = lineLength / count;
  for (let i = 0; i <= count; ++i) {
    const x = circleGap * i + circleX;
    this.paths[`circle_${i}`] = new Circle([x, circleY], i % 2 ? maxR : minR);
  }

  const lK = length / 350;
  const wK = width / 350;
  const hK = height / 500;
  const cloudTopLength = distort(new CloudBro(), lK * 1.5, hK);
  const cloudBottomLength = distort(new CloudBro(), lK, hK * 0.8);
  const cloudTopWidth = distort(mirror(new CloudBro(), true, false), wK * 1.5, hK);
  const cloudBottomWidth = distort(mirror(new CloudBro(), true, false), wK, hK * 0.8);

  const cloudPadding = Math.round(lips / 3*goldenRatio);
  rotate(cloudBottomLength, 7);
  rotate(cloudBottomWidth, -7);

  const topY = height - 2*Math.max(modelExtents(cloudTopLength).height, modelExtents(cloudTopWidth).height)
  const bottomY = height - 4*Math.max(modelExtents(cloudBottomLength).height, modelExtents(cloudBottomWidth).height)
  move(cloudTopLength, [1.2*cloudPadding, topY])
  move(cloudBottomLength, [cloudPadding, bottomY])
  move(cloudTopWidth, [-1.2*cloudPadding, topY])
  move(cloudBottomWidth, [-cloudPadding, bottomY])

  this.models.cloudTopLength = cloudTopLength;
  this.models.cloudBottomLength = cloudBottomLength;
  this.models.cloudTopWidth = cloudTopWidth;
  this.models.cloudBottomWidth = cloudBottomWidth;
}

function MetallicTable(dimensions) {
  this.models = {};

  const {width, length, height} = dimensions;

  this.models.face = new MetallicTableFace(width, length);

  this.models.leg = new MetallicTableLeg(width / 2, length / 2, height, 50, 2, 0.25);
}

MetallicTable.metaParameters = [
  {
    type: "group", title: "Dimensions",
    parameters: [
      {key: "width", title: "Width", type: "range", value: 896, min: 600, max: 2000},
      {key: "length", title: "Length", type: "range", value: 496, min: 300, max: 1400},
      {key: "height", title: "Height", type: "range", value: 500, min: 100, max: 1400},
    ],
  }
];

export default MetallicTable;
