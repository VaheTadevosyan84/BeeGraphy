import makerjs from "makerjs"

const {move, mirror} = makerjs.model;
const {Arc, Line} = makerjs.paths;
const {average} = makerjs.point
function GetMidPoint(width,height,baseHeight,degree,angle) {
    // const testLine = new Line([0,-height],[width,0])
    const av = average([0,-height],[width,0])
    // const testLine2 = new Line([0,0],[av[0]* 1.06, av[1] / 1.06])
    const av2 = average([0,0],[av[0]* 1.06, av[1] / 1.06])
    const testSide = 20 * Math.sin(degree * 15) / Math.sin(degree * (90 - angle))

    const midPoint = [av2[0] + testSide, - baseHeight]

    return midPoint
}

function StandPart(width, height,baseHeight,angle,radius,sideX,degree) {
    const smallBaseHeight = baseHeight * 3 / 5
    const arcRadius = Math.PI * radius * 90 / 180;
    const point4X = width - Math.sqrt((2 * radius)** 2 -  smallBaseHeight ** 2)
    const point5Y = height - Math.sqrt((2 * radius)** 2 -  smallBaseHeight ** 2)
    const point1 = [0,0];
    const point2 = [sideX,- height];
    const point3 = [width,0];
    const point4 = [point4X,- smallBaseHeight];
    const point5 = [sideX + smallBaseHeight,- point5Y];
    const midPoint = GetMidPoint(width,height,baseHeight,degree,angle)

    const line1  = new Line(point1,point2)
    const line2  = new Line(point1,point3)
    const arc1 = new Arc(point3,point4,arcRadius,false,true)
    const arc2 = new Arc(point2,point5,arcRadius,false,false)
    const line3  = new Line(point4,midPoint)
    const line4  = new Line(point5,midPoint)


    this.paths = {line1,line2, arc1,arc2,line3,line4}

}


function PhotoStand(width, height, baseHeight, angle) {
    const radius = 7;
    const degree = Math.PI / 180;
    const sideX = height * Math.sin(degree * 15) / Math.sin(degree * (90 - angle));

    const standPart = new StandPart(width,height,baseHeight,angle,radius,sideX,degree)
    const standPartMirror = mirror(standPart,true,true)
    move(standPartMirror,[sideX,- height])

    this.models = {standPart,standPartMirror}
}
PhotoStand.metaParameters = [
    {type: "range", title: "Width", min: 20, max: 150, value: 75},
    {type: "range", title: "Height", min: 20, max: 150, value: 80},
    {type: "range", title: "BaseHeight", min: 5, max: 25, value: 20},
    {type: "range", title: "Angle", min: 5, max: 60, value: 15},

];
export default PhotoStand;