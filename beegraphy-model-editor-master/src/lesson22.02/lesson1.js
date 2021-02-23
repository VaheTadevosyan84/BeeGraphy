import makerjs from "makerjs";

const {Circle} = makerjs.paths;
const{combineUnion} = makerjs.model


function Ring(radius, t){

    const mainCircle = new Circle([0,0],radius)
    const lockPlace = new Circle([radius - 1.5 * t, 0],t)


    this.paths = {mainCircle,lockPlace}
}

function UnionRings(radius,t) {
    const ring = new Ring(radius,t)
    const secondRing = new makerjs.model.clone(ring)
    makerjs.model.move(ring,[radius + t, 0 ])
    const unionModel = new combineUnion(secondRing, ring)
    const lockPlace = new Circle([radius - 1.5 * t, 0],t)
    const lock = {paths:{lockPlace}}
    const model = new makerjs.model.combine(unionModel,lock)
    const lock2 = {paths:{lockPlace}}



    this.models = {model,lock2}
    this.paths = {}

}

function DoubleRings(radius, t) {

    const bigCircle = new Circle([0,0],radius)
    const smallCircle = new Circle([0,0], radius - t)

    this.paths = {bigCircle,smallCircle}

}

export default function BraceletModel(general) {
    const {width, length} = general
    const radius = length / 2
    const t = length / 7
    const rings = new UnionRings(radius,t)
    const startRing = new Ring(radius,t)

    makerjs.model.move(rings,[width,0])
    makerjs.model.rotate(startRing,180)


    this.models = {};
    this.paths = {};

    const models = [startRing,rings];


    for (let i = 1; i <= width / length; i++) {
        const doubleRings = new DoubleRings(radius, t)
        makerjs.model.move(doubleRings,[(radius + radius /5.5) * i,0])
        models.splice(i, 0, doubleRings)
    }
    const bracelet = models.reduce((acc, model) => combineUnion(acc, model), models[0]);
    this.models.bracelet = bracelet;
    console.log(models)

}


BraceletModel.metaParameters =[
    {
        type: "group", title: "General",
        parameters: [
            {key: "width", title: "Width", type: "range", value: 30, min: 1, max: 50, step: 1},
            {key: "length", title: "Length", type: "range", value: 5, min: 1, max: 20,step: 0.1},
        ],
    },
];

