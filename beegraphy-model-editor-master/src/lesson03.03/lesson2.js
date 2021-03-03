import makerjs from "makerjs"

const {alterLength, breakAtPoint, fillet, moveRelative,move,converge} = makerjs.path
const {Circle,Line,Arc,} = makerjs.paths
const {cloneToRadial} = makerjs.layout

export default function CircleModel(count,k,y) {

    const point1 = [-20,20]
    const point2 = [0,0]
    const point3 = [10,0]
    const point4 = [20,20]
    const point5 = [0,10]

    const circle1 = new Circle(point1,0.5)
    const circle2 = new Circle(point2,0.5)
    const circle3 = new Circle(point3,0.5)
    const circle4 = new Circle(point4,0.5)
    const circle5 = new Circle(point5,0.5)

    const line1 = new Line(point1,point2)
    const line2 = new Line(point4,point3)
    const line3 = new Line(point4,point5)

    const circle6 = new Circle(line1.origin,1)
    const conv =  converge(line1,line2,false,true)
    const circle7 = new Circle(conv,2)
    circle7.layer = "red"


    this.models = {}
    this.paths = {circle1,circle2,circle3,circle4,circle5,line1,line2,line3,circle6,circle7}


}

CircleModel.metaParameters = [
    {title:"Count", type:"range", value:8, min:2, max: 20,step:1,},
    {title:"K", type:"range", value:40, min:10, max: 50,step:1,},
    {title:"y", type:"range", value:20, min:10, max: 100,step:1,},
]