import makerjs from "makerjs"

const {alterLength, breakAtPoint, fillet, moveRelative,converge} = makerjs.path
const {Circle,Line,Arc,} = makerjs.paths
const {cloneToRadial,cloneToRow,cloneToColumn} = makerjs.layout
const {Rectangle,ConnectTheDots} = makerjs.models
const {move,combine,combineUnion,rotate,mirror} = makerjs.model


function TriangleModel(width,height,padding) {


    this.models = {}
    this.paths = {}

}

function Rectangles(width,height,radius,padding) {
    const margin = padding / 4
    const countRow = Math.floor(width/ (2 * radius + margin))
    const countColumn = Math.floor(height/ (2 * radius + margin)) - 1


    const rectangle1 = new Rectangle(width,height)
    const rectangle2 = new Rectangle(width - padding,height - padding)
    move(rectangle2,[padding/2,padding/2])
    console.log(rectangle1);

    const circle = new Circle([padding/4,padding / 4],radius)
    const circleModel = {paths:{circle}}
    const toRow = cloneToRow(circleModel,countRow,margin)
    const toColumn = cloneToColumn(circleModel,countColumn,margin)
    const rowClone = makerjs.model.clone(toRow)
    move(rowClone,[0,height - padding / 2])
    const columnClone = makerjs.model.clone(toColumn)
    move(columnClone,[width - padding / 2,0])



    this.models = {rectangle1,rectangle2,toRow,toColumn,rowClone,columnClone}
    this.paths = {}


}


function Model(width,height,radius,padding) {

    const bottomPart = new Rectangles(width,height,radius,padding)


    this.models = {bottomPart}
    this.paths = {}
}

Model.metaParameters = [
    {title:"Width", type:"range", value:100, min:60, max: 200,step:1},
    {title:"Height", type:"range", value:60, min:20, max: 100,step:0.5},
    {title:"Radius", type:"range", value:1, min:1, max: 4,step:1},
    {title:"Padding", type:"range", value:10, min:1, max: 20,step:1},
]

export default Model;