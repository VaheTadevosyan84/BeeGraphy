import makerjs from "makerjs"

const {alterLength, breakAtPoint, fillet, moveRelative,converge} = makerjs.path
const {Circle,Line,Arc,} = makerjs.paths
const {cloneToRadial} = makerjs.layout
const {Rectangle,ConnectTheDots} = makerjs.models
const {move,combine,combineUnion,rotate,mirror} = makerjs.model


function TriangleModel(width,height,padding) {

    const point1 = [0,0];
    const point2 = [width,0];
    const point3 = [width / 2,height];

    const triangle = new ConnectTheDots(true,[point1,point2,point3])
    const triangleMirror = mirror(triangle,false,true)
    move(triangle,[0,padding / 2])
    move(triangleMirror,[0,-padding / 2])
    this.models = {triangle,triangleMirror}
    this.paths = {}

}

function ToRadius(radius,padding,count,triangleWidth,triangleHeight) {

    const triangleModel = new TriangleModel(triangleWidth,triangleHeight,padding)
    triangleModel.layer = "red"
    move(triangleModel,[radius - triangleWidth,0])
    const toRadial = cloneToRadial(triangleModel,count, 360 / count)
    this.models = {toRadial}
    this.paths = {}
}


function Model(radius,padding,count,triangleWidth,triangleHeight) {

    const triangleModel = new ToRadius(radius,padding,count,triangleWidth,triangleHeight)
    const extents =  makerjs.measure.modelExtents(triangleModel)

    console.log(extents);
    const cub = new Rectangle(radius * 2.1,radius * 2.1)
    console.log(radius);
    console.log(radius * 2.1);
    move(triangleModel,[radius + (radius * 0.05 ),radius + (radius * 0.05)])


    this.models = {triangleModel,cub}
    this.paths = {}
}

Model.metaParameters = [
    {title:"Radius", type:"range", value:50, min:10, max: 100,step:1},
    {title:"Padding", type:"range", value:5, min:1, max: 20,step:0.5},
    {title:"Count", type:"range", value:6, min:2, max: 12,step:1},
    {title:"TriangleWidth", type:"range", value:30, min:20, max: 40,step:1},
    {title:"TriangleHeight", type:"range", value:9, min:5, max: 12,step:1},
]

export default Model;