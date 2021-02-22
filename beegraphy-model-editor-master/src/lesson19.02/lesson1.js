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
    const oneHanger = new makerjs.model.combineUnion(circles,rectangle)
    const hanger = new makerjs.layout.cloneToColumn(oneHanger, 2, 24)

    this.models = {
        rectangle,
        oneHanger,
        hanger,



    }

}


function MetallicLeg(leg) {
    const { width, length, height, thickness, boundingRadius } = leg;
    const sheetWidth = width + length - 2*thickness - 2*boundingRadius + Math.PI * boundingRadius / 2;
    const delta = (width + length - sheetWidth) / 2;

    console.log(sheetWidth, height);

    const sheet = new Rectangle(sheetWidth, height);
    move(sheet, [- (width - delta), 0]);

    const midLine = new Line([0, 0], [0, height]);
    midLine.layer = "blue";

    // const hangers = new Hanger(boltDiameter)
    // makerjs.model.move(hangers, [legWidth / 4, 8])
    //
    // const hangers2 = new Hanger(boltDiameter)
    // const hangersHeight = makerjs.measure.modelExtents(hangers2).height
    // makerjs.model.move(hangers2, [legWidth / 4, height - hangersHeight - 8])
    //
    // const newHangersSpace = height - 2 * hangersHeight - 16


    this.models = { sheet };
    this.paths = { midLine };
}

    // for (let i = 0; i <= count; i++) {
    //
    // }


export default function MetallicShelf(dimensions, leg, general, paddings, corner) {

    const {width, length, height} = dimensions;
    const {count, boltDiameter, boltDistance, thickness} = general;
    const {paddingTop, paddingBottom} = paddings;
    const {cornerWidth, cornerHeight} = corner;

    const metallicCorner = new MetallicLeg({...leg, height})




    this.models = {
        metallicCorner,

    };
    this.paths = {
    };
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
        ],
    },
    {
        type: "group", title: "General",
        parameters: [
            {key: "count", title: "Count", type: "range", value: 10, min: 0, max: 200},
            {key: "boltDiameter", title: "boltDiameter", type: "range", value: 3, min: 1, max: 200, step: 0.1},
            {key: "boltDistance", title: "boltDistance", type: "range", value: 5, min: 1, max: 200, step: 0.1},
            {key: "thickness", title: "Thickness", type: "range", value: 10, min: 0, max: 200},
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

