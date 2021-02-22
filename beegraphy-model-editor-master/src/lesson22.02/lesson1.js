import makerjs from "makerjs";

const {Circle} = makerjs.paths;


function Ring(general){
    const {width, length} = general
    const radius = length / 2
    const mainCircle = new Circle([0,0],radius)
    const lockPlace = new Circle([radius - length / 7, 0],0.7)


    this.paths = {mainCircle,lockPlace}
}

function UnionRings(general) {
    const {width, length} = general
    const radius = length /2
    const ring = new Ring(general)
    const secondRing = new makerjs.model.clone(ring)
    makerjs.model.move(ring,[radius + length / 7, 0 ])
    const unionModel = new makerjs.model.combineUnion(secondRing, ring)
    const lockPlace = new Circle([radius - length / 7, 0],0.7)
    const lock = {paths:{lockPlace}}
    const model = new makerjs.model.combine(unionModel,lock)
    const lock2 = {paths:{lockPlace}}



    this.models = {model,lock2}
    this.paths = {}

}

function DoubleRings(general) {
    const {width, length} = general
    const bigCircle = new Circle([0,0],length / 2)
    const smallCircle = new Circle([0,0], length / 2 - length / 7)

    this.paths = {bigCircle,smallCircle}

}







export default function BraceletModel(general) {
    const {width, length} = general
    const radius = length / 2
    const rings = new UnionRings(general)
    const startRing = new Ring(general)

    makerjs.model.move(rings,[width,0])
    makerjs.model.rotate(startRing,180)

    console.log(radius + radius / 1.5)
    console.log(length / 7)



    this.models = {rings,startRing};
    this.paths = {};
    let n = 0;
    for (let i = 1; i <= width / length; i++) {
        const doubleRings = new DoubleRings(general)
        makerjs.model.move(doubleRings,[(radius + radius / 1.5) * i,0])
        this.models["doubleRings" + i] = doubleRings


    }
}


BraceletModel.metaParameters =[
    {
        type: "group", title: "General",
        parameters: [
            {key: "width", title: "Width", type: "range", value: 30, min: 1, max: 50, step: 1},
            {key: "length", title: "Length", type: "range", value: 10, min: 1, max: 20,step: 0.1},
        ],
    },
    {
        type: "group", title: "Ring",
        parameters: [
            {key: "width", title: "Width", type: "range", value: 30, min: 15, max: 200},
            {key: "length", title: "Length", type: "range", value: 30, min: 15, max: 200},
            {key: "thickness", title: "Thickness", type: "range", value: 1.5, min: 0.5, max: 3, step: 0.1},
            {key: "boundingRadius", title: "Bounding radius", type: "range", value: 0.5, min: 0.2, max: 0.75, step: 0.05},
            {key: "boltDiameter", title: "boltDiameter", type: "range", value: 3, min: 1, max: 5, step: 0.1},
            {key: "boltDistance", title: "boltDistance", type: "range", value: 5, min: 1, max: 200, step: 0.1},
        ],
    },

];

