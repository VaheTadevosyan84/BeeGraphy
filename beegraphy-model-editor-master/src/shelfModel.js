import makerjs from "makerjs"











export default function Model(hRCount, vRCount, w, l, h, thick) {
    this.models = {};




    const delta = w / hRCount
    const alfa = l / vRCount
    for (let i = 0; i < hRCount; i++) {
        let rectangle = new makerjs.models.Rectangle(w, h)
        for (let j = 1; j < hRCount; j++) {
            const hole = new makerjs.models.Rectangle(thick, h / 2)
            makerjs.model.move(hole, [j * delta - thick / 2, 0])
            rectangle = makerjs.model.combineSubtraction(rectangle, hole)
        }
        makerjs.model.move(rectangle, [0, (l + 5) * i])
        this.models["rectangle" + i] = rectangle;
    }


    for (let i = 0; i < vRCount; i++) {
        let rectangle = new makerjs.models.Rectangle(l, h)
        for (let j = 1; j < vRCount; j++) {
            const hole = new makerjs.models.Rectangle(thick, h / 2)
            makerjs.model.move(hole, [j * alfa - thick / 2, 0])
            rectangle = makerjs.model.combineSubtraction(rectangle, hole)
        }
        makerjs.model.move(rectangle, [w + 5, (l + 5) * i])
        this.models["rectangle1" + i] = rectangle
    }
}
Model.metaParameters = [
    {
        title: "horizontalCount",
        type: "range",
        min: 1,
        max: 5,
        value: 3,
        step: 1,
    },
    {
        title: "verticalCount",
        type: "range",
        min: 1,
        max: 5,
        value: 3,
        step: 1,
    },
    {
        title: "width",
        type: "range",
        min: 50,
        max: 500,
        value: 100,
        step: 1,
    },
    {
        title: "length",
        type: "range",
        min: 50,
        max: 500,
        value: 150,
        step: 1,
    },
    {
        title: "height",
        type: "range",
        min: 50,
        max: 500,
        value: 60,
        step: 1,
    },
    {
        title: "thicknes",
        type: "range",
        min: 1,
        max: 3,
        value: 1,
        step: 1,
    },
];