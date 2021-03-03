import makerjs from "makerjs"

const {move, mirror,combineUnion} = makerjs.model;
const {Arc, Line} = makerjs.paths;
const {average} = makerjs.point

function BaseModel(width, height, angle, bigArc,hole,pointX) {
    const smallArc = hole / 2
    const delta = 9.9 / 4.24
    const smallSide = height / delta

    const point1 = [0,height];
    const point2 = [pointX,0];
    const point3 = [width,height];
    const point4 = [width - pointX,0];
    const point5 = [width / 2 - smallArc,0];
    const point6 = [width / 2 + smallArc,0];
    const point7 = [width / 2 - smallArc,smallSide];
    const point8 = [width / 2 + smallArc,smallSide];


    const line1 = new Line(point1,point2);
    const line2 = new Line(point3,point4);
    const line3 = new Line(point5,point7);
    const line4 = new Line(point6,point8);

    const topArc = new Arc(point1,point3,bigArc,false,true);
    const bottomArc = new Arc(point2,point4,bigArc,false,true);
    const arcSmall = new Arc(point7,point8,smallArc,false,true);
    const lineModel = {paths:{line3,line4}}
    const arcModel = {paths:{bottomArc}}
    const cut = combineUnion(arcModel,lineModel)
    this.models = {cut};
    this.paths = {line1,line2,topArc,arcSmall,};
}
function SidePart(width, height, angle,bigArc,pointX) {
    const point1 = [0, height];
    const point2 = [pointX, 0];
    const point3 = [width / 4, height * 2];
    const point4 = [width / 4, 0];
    const point5 = [width, height];
    const point6 = [width, 0];


    const line1 = new Line(point1,point2)
    const line2 = new Line(point3,point4)
    const arcTop = new Arc(point1,point5,bigArc,false,true)
    const arcBottom = new Arc(point2,point6,bigArc,false,true)

    const lineModels = {paths:{line1,line2}}
    const arcBottomModel = {paths:{arcBottom}}
    const arcTopModel = { paths:{arcTop}}
    const cut = makerjs.model.combine(arcBottomModel,lineModels,true,false)
    const combine = makerjs.model.combine(cut,arcTopModel,true,false,true)

    this.models = {combine};
    this.paths = {};
}

function HangerModel(width, height, angle,bigArc,hole) {
    const degree = Math.PI / 180;
    const pointX = height * Math.tan(degree * angle)
    const padding = height / 3
    const sidePartPointX = (height + padding) * Math.tan(degree * angle)

    const baseModel = new BaseModel(width,height,angle,bigArc,hole,pointX)
    move(baseModel,[0,height + padding])


    const sidePart = new SidePart(width,height,angle,bigArc,pointX)
    move(sidePart,[sidePartPointX,0])
    const sidePartMirror = mirror(sidePart,true,false)
    move(sidePartMirror,[width - sidePartPointX,0])
    this.models = {sidePart,sidePartMirror, baseModel}
}
HangerModel.metaParameters = [
    {type: "range", title: "Width", min: 20, max: 100, value: 40, step: 1},
    {type: "range", title: "Height", min: 5, max: 150, value: 9.9, step: 0.1},
    {type: "range", title: "Angle", min: 0, max: 45, value: 10, step: 1},
    {type: "range", title: "BigArc", min: 50, max: 500, value: 286, step: 1},
    {type: "range", title: "Hole", min: 1, max: 10, value: 6, step: 1},

];
export default HangerModel;