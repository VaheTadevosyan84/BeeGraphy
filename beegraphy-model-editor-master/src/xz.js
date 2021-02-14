import makerjs from "makerjs";

export default function Model(
  counts,
  dimension,
  material,
) {
  this.paths = {};
  this.models = {};

  const {horizontal, vertical} = counts;
  const {width, length, height} = dimension;
  const {thickness, gap} = material;

  for (let i = 0; i < horizontal - 1; i++) {
    let rectangle = new makerjs.models.Rectangle(length, height);
    const delta = length / vertical;
    for (let j = 1; j < vertical; j++) {
      const hole = new makerjs.models.Rectangle(thickness, height / 2 + 1);
      makerjs.model.move(hole, [delta * j - thickness/ 2, -1]);
      rectangle = makerjs.model.combineSubtraction(rectangle, hole);
    }
    makerjs.model.move(rectangle, [0, (height + gap) * i]);
    this.models[`horizontal_${i+1}`] = rectangle;
  }

  for (let i = 0; i < vertical - 1; i++) {
    let rectangle = new makerjs.models.Rectangle(width, height);
    const delta = width / horizontal;
    for (let j = 1; j < horizontal; j++) {
      const hole = new makerjs.models.Rectangle(thickness, height / 2 + 1);
      makerjs.model.move(hole, [delta * j - thickness / 2, height / 2 + 1]);
      rectangle = makerjs.model.combineSubtraction(rectangle, hole);
    }
    makerjs.model.move(rectangle, [length + gap, (height + gap) * i]);
    this.models[`vertical_${i+1}`] = rectangle;
  }
}


Model.metaParameters = [
  {
    title: "counts",
    type: "group",
    parameters: [
      {key: "horizontal", title: "horizontal", type: "range", min: 2, max: 20, value: 3},
      {key: "vertical", title: "vertical", type: "range", min: 2, max: 20, value: 3},
    ],
  },
  {
    title: "dimension",
    type: "group",
    parameters: [
      {key: "width", title: "width", type: "range", min: 10, max: 2000, value: 150},
      {key: "length", title: "length", type: "range", min: 10, max: 2000, value: 200},
      {key: "height", title: "height", type: "range", min: 10, max: 2000, value: 60},
    ],
  },
  {
    title: "material",
    type: "group",
    parameters: [
      {key: "thickness", title: "thickness", type: "range", min: 1, max: 20, value: 4, step: 0.5},
      {key: "gap", title: "gap", type: "range", min: 0, max: 20, value: 5},
    ],
  },
];

