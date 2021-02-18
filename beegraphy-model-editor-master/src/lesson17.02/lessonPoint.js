import makerjs from "makerjs"



export default function Models(scaleX) {
    const p1 = [8, 0]
    const p2 = [200, 0]

    const line = new makerjs.paths.Line(p1,p2)
    const circle1 = new makerjs.paths.Circle(p1, 1)
    const circle2 = new makerjs.paths.Circle(p2, 1)
    const av = makerjs.point.average(p1,p2)
    const dist = new makerjs.point.distort(av,scaleX,1)
    const circle3 = new makerjs.paths.Circle(dist, 5)





    this.models = {

    }
    this.paths = {
        line,
        circle1,
        circle2,
        circle3,
        dist
    }
}

Models.metaParameters =[
    {
        title:"scaleX",
        type:"range",
        value:1,
        min:0,
        max:2,
        step:0.2,
    },
]