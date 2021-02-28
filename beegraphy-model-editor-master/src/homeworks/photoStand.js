import makerjs from "makerjs"

const {BezierCurve, Rectangle} = makerjs.models;
const {move, combineUnion} = makerjs.model;
const {cloneToRow, childrenOnChain} = makerjs.layout;
const {Arc, Line} = makerjs.paths;
const {fillet} = makerjs.path;
const {Holes, ConnectTheDots} = makerjs.models;


function StandPart(width, height,baseHeight,angle, side,radius) {
    const degree = Math.PI / 180;
    const smallBaseHeight = baseHeight * 3 / 5
    const point4X = width - Math.sqrt((2 * radius)** 2 -  smallBaseHeight ** 2)
    const point5Y = height - Math.sqrt((2 * radius)** 2 -  smallBaseHeight ** 2)
    const smallSide = 20 * Math.sin(degree * 15) / Math.sin(degree * (90 - angle));
    const point1 = [0,0];
    const point2 = [side,- height];
    const point3 = [width,0];
    const point4 = [point4X,- smallBaseHeight];
    const point5 = [side + smallBaseHeight,- point5Y];
    const point = [baseHeight + smallSide, - baseHeight]




    const line1  = new Line(point1,point2)
    const line2  = new Line(point1,point3)
    // const line3  = new Line(point4,point5)
    const arc = new Arc(point3,point4,true)


    this.paths = {line1,line2, arc}

}


function PhotoStand(width, height, baseHeight, angle) {
    const radius = 7;
    const degree = Math.PI / 180;
    const standHeight = height * Math.sin(degree * 90) / Math.sin(degree * (90 - angle));
    const side = height * Math.sin(degree * 15) / Math.sin(degree * (90 - angle));



    const standPart = new StandPart(width,height,baseHeight,angle,side,radius)


    this.models = {standPart}
}
PhotoStand.metaParameters = [
    {type: "range", title: "Width", min: 20, max: 150, value: 75},
    {type: "range", title: "Height", min: 20, max: 150, value: 80},
    {type: "range", title: "BaseHeight", min: 5, max: 25, value: 20},
    {type: "range", title: "Angle", min: 5, max: 60, value: 15},

];
export default PhotoStand;