import makerjs from "makerjs";


function BoltModel(boltDiameter) {

    const smallDiameter = boltDiameter / 2
    const circlePosition = (boltDiameter + smallDiameter) * 1.1
    const bigCircle = new makerjs.paths.Circle([0,0],boltDiameter)
    const smallCircle = new makerjs.paths.Circle([0,- circlePosition],smallDiameter)
    const rectangle = new makerjs.models.Rectangle(2 * smallDiameter, circlePosition)
    makerjs.model.move(rectangle,[ -smallDiameter,-circlePosition])

    const circles  = {paths: {bigCircle,smallCircle}}
    const hanger = new makerjs.model.combineUnion(circles,rectangle)

    this.models = {
        rectangle,
        hanger


    }

}

function MetallicCorner(width, height, thickness, boltDiameter, boltDistance,boltPlaces) {

    const rectangle = new makerjs.models.Rectangle(width,height)
    const midLine = new makerjs.paths.Line([width / 2, 0], [width / 2, height])
    rectangle.layer = "red"

    this.models ={
        rectangle
    };
    this.paths = {
        midLine
    }

}


export default function MetallicShelf(dimensions, general, paddings, corner) {

    const {width, length, height} = dimensions;
    const {count, boltDiameter, boltDistance, thickness} = general;
    const {paddingTop, paddingBottom} = paddings;
    const {cornerWidth, cornerHeight} = corner;

    const metallicCorner = new MetallicCorner(width, height, thickness, boltDiameter, boltDistance)
    const boltModel = new BoltModel(boltDiameter)




    this.models = {
        metallicCorner,
        boltModel
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
            {key: "height", title: "Height", type: "range", value: 100, min: 10, max: 2000},
        ],
    },
    {
        type: "group", title: "General",
        parameters: [
            {key: "count", title: "Count", type: "range", value: 10, min: 0, max: 200},
            {key: "boltDiameter", title: "boltDiameter", type: "range", value: 10, min: 0, max: 200},
            {key: "boltDistance", title: "boltDistance", type: "range", value: 10, min: 0, max: 200},
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

