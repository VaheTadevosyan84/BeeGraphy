import makerjs from "makerjs";

const {Circle,Line,Arc} = makerjs.paths
const {Rectangle, BezierCurve} = makerjs.models
const {move, findSingleChain} = makerjs.model
const {cloneToRow, childrenOnPath, childrenOnChain} = makerjs.layout

export default function Model(general) {

    const {side,height,round} = general
    const width = 4 * (side * 0.3)
    const padding = 2

    const line1 = new Line([padding,0],[0,height])
    const line2 = new Line([0,height],[side,height])
    const line3 = new Line([side,height],[side - padding,0])
    const line4 = new Line([side - padding,0],[padding,0])

    const fill1 = makerjs.path.fillet(line1,line4,round)
    const fill2 = makerjs.path.fillet(line3,line4,round)
    const fill3 = makerjs.path.fillet(line1,line4,round)
    const fill4 = makerjs.path.fillet(line3,line4,round)

    const fillModelFirst = {paths:{line1,line2,line3,line4,fill1,fill2}}
    const fillModelFirstClone = makerjs.model.clone(fillModelFirst)
    move(fillModelFirstClone,[2 * side, 0])

    const fillModelSecond = {paths:{line1,line2,line3,line4,fill3,fill4}}
    const fillModelSecondClone = makerjs.model.clone(fillModelFirst)
    move(fillModelSecond, [side, 0])
    move(fillModelSecondClone, [3 * side, 0])







    this.models = {fillModelFirst,fillModelSecond};
    this.paths = {};


}


Model.metaParameters =[
    {
        type: "group", title: "General",
        parameters: [
            {key: "side", title: "Side", type: "range", value: 30, min: 0, max: 50, step: 1},
            {key: "height", title: "Height", type: "range", value: 30, min: 0, max: 50, step: 1},
            {key: "round", title: "Round", type: "range", value: 1, min: 0, max: 50, step: 0.1},
        ],
    },
];

