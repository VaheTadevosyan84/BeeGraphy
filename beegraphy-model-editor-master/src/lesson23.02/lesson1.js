import makerjs from "makerjs";

const {Circle,Line,Arc} = makerjs.paths
const {Rectangle, BezierCurve} = makerjs.models
const {move, findSingleChain} = makerjs.model
const {cloneToRow, childrenOnPath, childrenOnChain} = makerjs.layout

export default function Model(general) {

    const {count} = general
    const point1 = [0, 20]
    const point2 = [15, 20]
    const point3 = [30, 0]
    const point4 = [60, 20]


    const curve = new BezierCurve(point1,point2,point3,point4)
    const chain = findSingleChain(curve)
    // const arc = new Arc([0,0],50,0,90)
    const rectangle = new Rectangle(5,2)

    const recRow =  cloneToRow(rectangle, 5, 10)


    const rectangle2 = new Rectangle(128,50)
    const recChain = findSingleChain(rectangle2)
    const chainToPoints = makerjs.chain.toPoints(recChain,recChain.pathLength/count)
    const circle = new makerjs.models.Holes(2,chainToPoints)


    console.log(recChain.pathLength / count);
    console.log(recChain.links[1].pathLength);
    console.log(recChain.links[0].pathLength);


    const modelChild = childrenOnChain(recRow, chain, 0.5)
    // makerjs.model.zero(recRow,true,true)



    this.models = {rectangle2};
    this.paths = {};

    if (count > 0) this.models[circle] = circle



}


Model.metaParameters =[
    {
        type: "group", title: "General",
        parameters: [
            {key: "count", title: "Count", type: "range", value: 30, min: 0, max: 50, step: 1},
        ],
    },
];

