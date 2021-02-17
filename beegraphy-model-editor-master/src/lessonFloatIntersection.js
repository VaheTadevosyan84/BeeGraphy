import makerjs from "makerjs"





export default function Models(pointX2, pointX4) {


    const point1 = [0, 0]
    const point2 = [pointX2, 20]
    const point3 = [20, 0]
    const point4 = [pointX4, 20]


    const line1 = new makerjs.paths.Line(point1, point2)
    const line2 = new makerjs.paths.Line(point3, point4)



    const point = makerjs.point.fromSlopeIntersection(line1,line2,)





    this.models = {

    }
    this.paths = {
        line1,
        line2,

    }

    if (point && point.length) {
                const circle = new makerjs.paths.Circle(point, 0.5)
                this.paths[`circle`] = circle
        }
}

Models.metaParameters =[
    {
        title:"pointX2",
        type:"range",
        value:100,
        min:0,
        max:360,
        step:1,
    },
    {
        title:"pointX4",
        type:"range",
        value:90,
        min:0,
        max:360,
        step:1,
    },
]