import makerjs from "makerjs"









export default function Models(angle, arcAngle) {

    const arc = new makerjs.paths.Arc([0,0],100,0,arcAngle)
    const points  = makerjs.point.fromArc(arc)




    const circle1 = new makerjs.paths.Circle(points[0], 5)
    const circle2 = new makerjs.paths.Circle(points[1], 5)
    const line  = new makerjs.paths.Line(points)



    // const point2  = makerjs.point.fromPathEnds([0,10])
    // const circle4 = new makerjs.paths.Circle(point2, 5)
    // const circle5 = new makerjs.paths.Circle(point2, 5)









    this.models = {

    }
    this.paths = {
        arc,
        circle1,
        circle2,
        line,

    }
}

Models.metaParameters =[
    {
        title:"angle",
        type:"range",
        value:0,
        min:0,
        max:360,
        step:5,
    },
    {
        title:"arcAngle",
        type:"range",
        value:90,
        min:0,
        max:360,
        step:5,
    },
]