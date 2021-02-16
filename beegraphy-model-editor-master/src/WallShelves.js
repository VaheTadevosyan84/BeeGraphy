import makerjs from "makerjs";
import seedRandom from "seed-random";

const goldenRatio = 1.61803398875;

const {Rectangle} = makerjs.models;
const {move, combineSubtraction} = makerjs.model;

export default function WallShelves( main, dimension, material,) {
  this.paths = {};
  this.models = {};

  const {seed, showPreview} = main;
  const {width, length, height} = dimension;
  const {thickness, gap} = material;
  const count = 4;
  const random = new seedRandom(seed);

  if (showPreview) {
    this.models.sheet = new Rectangle(width, length);
  }

  const getRandomWidth = () => {
    let w = 0;
    const l = Math.min(width, length);
    while (w < l * 0.12 || w > l * 0.25) {
      w = Math.round(l * random());
    }
    return w;
  };

  let k = length / count;
  let d = 0;
  const boxes = [];
  for (let i = count - 1; i > 0; i--) {
    d = 1 - d;
    const w = getRandomWidth();

    const dx = w / goldenRatio * random() * (random() > 0.5 ? 1 : -1);
    const x = Math.round(width / 2 - w / 2 + dx);
    const y = Math.round(k * i - w / 2);
    boxes.push({x, y, w});

    // if (showPreview) {
    //   const rectangle = new Rectangle(w, w);
    //   move(rectangle, [x, y]);
    //   this.models[`_${i}`] = rectangle;
    // }
  }


  const shelves = [];
  // shelve 1
  {
    const box1 = boxes[0];
    const box2 = boxes[1];

    const x = Math.round((box1.x + box1.w) / 5 * goldenRatio);
    const y = box1.y;
    const w = box1.x + box1.w - x;
    const h = length - box1.y;

    if (showPreview) {
      const shelve = new Rectangle(w, h);
      move(shelve, [x, y]);
      this.models.shelve1 = shelve;
    }

    const intersections = {
      bottom: [
        Math.min(box1.x, box2.x) - x - thickness,
      ],
      right: [
        box1.w - thickness,
      ],
    };
    shelves.push({x, y, w, h, intersections});
  }

  // shelve 2
  {
    const box1 = boxes[0];
    const box2 = boxes[1];
    const box3 = boxes[2];

    const x = Math.min(box1.x, box2.x);
    const y = box2.y;
    const d = Math.round((width - x) / 7 * goldenRatio);
    const w = width - x - d;
    const h = box1.y - box2.y + box1.w;

    if (showPreview) {
      const shelve = new Rectangle(w, h);
      move(shelve, [x, y]);
      this.models.shelve2 = shelve;
    }

    const intersections = {
      top: [
        box1.x - x + box1.w - thickness,
      ],
      left: [
        box2.w - thickness,
        box1.y - y,
      ],
      bottom: [
        Math.max(box2.x + box2.w, box3.x + box3.w) - x - 2*thickness,
      ],
    };
    shelves.push({x, y, w, h, intersections});
  }

  // shelve 3
  {
    const box0 = boxes[0];
    const box1 = boxes[1];
    const box2 = boxes[2];

    const x = 0;
    const y = box2.y;
    const w = Math.max(box1.x + box1.w, box2.x + box2.w);
    const h = box1.y - box2.y + box1.w;

    if (showPreview) {
      const shelve = new Rectangle(w, h);
      move(shelve, [x, y]);
      this.models.shelve3 = shelve;
    }

    const intersections = {
      top: [
        Math.min(box0.x, box1.x),
      ],
      right: [
        box1.y - y,
        box2.w - thickness,
      ],
      bottom: [
        box2.x - thickness,
      ],
    };
    shelves.push({x, y, w, h, intersections});
  }

  // shelve 4
  {
    const box = boxes[2];

    const x = box.x;
    const y = 0;
    const w = width - box.x;
    const h = box.y + box.w;

    if (showPreview) {
      const shelve = new Rectangle(w, h);
      move(shelve, [x, y]);
      this.models.shelve4 = shelve;
    }

    const intersections = {
      top: [
        box.w - thickness,
      ],
      left: [
        box.y
      ],
    };
    shelves.push({x, y, w, h, intersections});
  }
  // console.log(boxes);
  // console.log(shelves);

  let offset = showPreview ? width : 0;
  shelves.forEach((shelve, index) => {
    let top = new Rectangle(shelve.w, height);
    let left = new Rectangle(shelve.h - thickness, height);
    let right = new Rectangle(shelve.h - thickness, height);
    let bottom = new Rectangle(shelve.w - 2 * thickness, height);


    if (shelve.intersections.top) {
      shelve.intersections.top.forEach(x => {
        const hole = new Rectangle(thickness, height / 2 + 1);
        move(hole, [x, -1]);
        top = combineSubtraction(top, hole);
      });
    }
    if (shelve.intersections.right) {
      shelve.intersections.right.forEach(x => {
        const hole = new Rectangle(thickness, height / 2 + 1);
        move(hole, [x, -1]);
        right = combineSubtraction(right, hole);
      });
    }
    if (shelve.intersections.left) {
      shelve.intersections.left.forEach(x => {
        const hole = new Rectangle(thickness, height / 2 + 1);
        move(hole, [x, -1]);
        left = combineSubtraction(left, hole);
      });
    }
    if (shelve.intersections.bottom) {
      shelve.intersections.bottom.forEach(x => {
        const hole = new Rectangle(thickness, height / 2 + 1);
        move(hole, [x, -1]);
        bottom = combineSubtraction(bottom, hole);
      });
    }

    const x = offset + gap;
    const y = height + gap;
    move(top, [x, 0]);
    move(right, [x, y]);
    move(left, [x, 2 * y]);
    move(bottom, [x, 3 * y]);

    offset += Math.max(shelve.w, shelve.h - thickness) + gap;

    this.models[`shelve_${index + 1}_left`] = left;
    this.models[`shelve_${index + 1}_top`] = top;
    this.models[`shelve_${index + 1}_right`] = right;
    this.models[`shelve_${index + 1}_bottom`] = bottom;
  });
}


WallShelves.metaParameters = [
  {
    title: "main",
    type: "group",
    parameters: [
      {key: "seed", title: "seed", type: "range", min: -99999, max: 99999, value: 885},
      {key: "showPreview", title: "preview", type: "bool", value: true},
    ],
  },
  {
    title: "dimension",
    type: "group",
    parameters: [
      {key: "width", title: "width", type: "range", min: 400, max: 1500, value: 500},
      {key: "length", title: "length", type: "range", min: 500, max: 1500, value: 800},
      {key: "height", title: "height", type: "range", min: 200, max: 400, value: 150},
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

