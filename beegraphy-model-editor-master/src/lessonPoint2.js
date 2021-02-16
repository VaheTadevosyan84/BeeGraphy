import makerjs from "makerjs"









export default function Models(angle, arcAngle) {
    const p = [0, 0]

    const circle = new makerjs.paths.Circle(p, 30)
    const ang = makerjs.point.fromAngleOnCircle(angle,circle)
    const circle1 = new makerjs.paths.Circle(ang, 5)
    const arc = new makerjs.paths.Arc([100,100],40,0,arcAngle)
    const arcAng  = makerjs.point.fromArc(arc)
    const line = new makerjs.paths.Line(arcAng)








    this.models = {

    }
    this.paths = {
        circle,
        circle1,
        ang,
        arc,
        line
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