import makerjs from "makerjs"

const {alterLength, breakAtPoint, fillet, moveRelative} = makerjs.path
const {Circle,Line} = makerjs.paths
export default function Models(width, length, t, r) {

    const p1 = [0,0]
    const p2 = [40,40]
    const p3 = [80,40]
    const p4 = [50,40]

    const circle1 = new Circle(p1,0.5)
    const circle2 = new Circle(p2,0.5)
    const circle3 = new Circle(p3,0.5)
    const circle4 = new Circle(p4,0.5)
    const line1 = new Line(p1,p2)
    const line2 = new Line(p2,p3)
    const line3 = new Line([0,0],[30,0])

    alterLength(line1,20,true)

    breakAtPoint(line2,p4);

    const fill = fillet(line1,line2,10)
    moveRelative(line3,p3)





    this.models = {}
    this.paths = {circle1,circle2,circle3,circle4, line1, line2,line3,fill}
}

Models.metaParameters = [
    {
        title:"width",
        type:"range",
        value:200,
        min:1,
        max: 1000,
        step:1,
    },
]