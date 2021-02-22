import makerjs from "makerjs";

const { Rectangle } = makerjs.models;
const { Line } = makerjs.paths;
const { move } = makerjs.model;

function Hanger(boltDiameter) {

    const smallDiameter = boltDiameter / 2
    const circlePosition = (boltDiameter + smallDiameter) * 1.1
    const bigCircle = new makerjs.paths.Circle([0,circlePosition],boltDiameter)
    const smallCircle = new makerjs.paths.Circle([0,0],smallDiameter)
    const rectangle = new makerjs.models.Rectangle(2 * smallDiameter, circlePosition)
    makerjs.model.move(rectangle,[ -smallDiameter,0])

    const circles  = {paths: {bigCircle,smallCircle}}
    const hanger = new makerjs.model.combineUnion(circles,rectangle)

    this.models = {hanger}


}

function CornerIntersection(leg) {
    const { width, length, height, thickness, boundingRadius,boltDiameter, boltDistance} = leg;

    const hanger = new Hanger(boltDiameter)
    const mirrorHanger = new makerjs.model.clone(hanger)
    makerjs.model.move(hanger, [0, 0])
    makerjs.model.move(mirrorHanger, [0, 24])
    const hangerHoles = new makerjs.model.combine(hanger,mirrorHanger)

    this.models = {hangerHoles}

}

function MetallicLeg(leg) {
    const { width, length, height, thickness, boundingRadius,boltDiameter, boltDistance} = leg;

    const sheetWidth = width + length - 2 * thickness - 2 * boundingRadius + Math.PI * boundingRadius / 2;
    const delta = (width + length - sheetWidth) / 2;

    const sheet = new Rectangle(sheetWidth, height);
    move(sheet, [- (width - delta), 0]);

    const midLine = new Line([sheetWidth / 2, 0], [sheetWidth / 2, height]);
    midLine.layer = "red";

    const modelSize = makerjs.measure.modelExtents(new CornerIntersection(leg))
    const cornerIntersectionBottom = new CornerIntersection(leg)
    makerjs.model.move(cornerIntersectionBottom,[sheetWidth / 4, modelSize.low[1] + 8])
    const cornerIntersectionTop = new CornerIntersection(leg)
    makerjs.model.move(cornerIntersectionTop, [sheetWidth / 4, height - modelSize.high[1] - 8])
    const cornerIntersection = new makerjs.model.combine(cornerIntersectionBottom,cornerIntersectionTop)
    const cornerIntersectionMirror = new makerjs.model.mirror(cornerIntersection,true,false)

    // const topPoint = makerjs.measure.modelExtents(cornerIntersectionTop).low
    // const bottomPoint = makerjs.measure.modelExtents(cornerIntersectionBottom).high


    this.models = { sheet, cornerIntersection, cornerIntersectionMirror};
    this.paths = { midLine };


}

export default function MetallicShelf(dimensions, leg, general, paddings, corner) {

    const {width, length, height} = dimensions;
    const {count} = general;
    const {paddingTop, paddingBottom} = paddings;
    const {cornerWidth, cornerHeight} = corner;

    const metallicLeg = new MetallicLeg({...leg, height})



    this.models = {metallicLeg,};
    this.paths = {};
}


MetallicShelf.metaParameters =[
    {
        type: "group", title: "Dimensions",
        parameters: [
            {key: "width", title: "Width", type: "range", value: 100, min: 10, max: 2000},
            {key: "length", title: "Length", type: "range", value: 100, min: 10, max: 2000},
            {key: "height", title: "Height", type: "range", value: 200, min: 10, max: 2000},
        ],
    },
    {
        type: "group", title: "leg",
        parameters: [
            {key: "width", title: "Width", type: "range", value: 30, min: 15, max: 200},
            {key: "length", title: "Length", type: "range", value: 30, min: 15, max: 200},
            {key: "thickness", title: "Thickness", type: "range", value: 1.5, min: 0.5, max: 3, step: 0.1},
            {key: "boundingRadius", title: "Bounding radius", type: "range", value: 0.5, min: 0.2, max: 0.75, step: 0.05},
            {key: "boltDiameter", title: "boltDiameter", type: "range", value: 3, min: 1, max: 5, step: 0.1},
            {key: "boltDistance", title: "boltDistance", type: "range", value: 5, min: 1, max: 200, step: 0.1},
        ],
    },
    {
        type: "group", title: "General",
        parameters: [
            {key: "count", title: "Count", type: "range", value: 4, min: 0, max: 200},

        ],
    },
    {
        type: "group", title: "Paddings",
        parameters: [
            {key: "paddingTop", title: "Top", type: "range", value: 10, min: 0, max: 200},
            {key: "paddingBottom", title: "Bottom", type: "range", value: 10, min: 0, max: 200},
        ],
    },
    {
        type: "group", title: "Corner",
        parameters: [
            {key: "cornerWidth", title: "Corner width", type: "range", value: 10, min: 0, max: 200},
            {key: "cornerHeight", title: "Corner height", type: "range", value: 10, min: 0, max: 200},
        ],
    },
];

