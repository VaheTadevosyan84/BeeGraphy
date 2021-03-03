import makerjs from "makerjs";


const {Line}=makerjs.paths;
const {fillet}=makerjs.path;
const {fromSlopeIntersection}=makerjs.point;
const {mirror,move}=makerjs.model;

function FrameStand(width,height,baseHeight,radius,arcHeight,baseWidth){
  const line1=new Line([0,0],[width,0]);
  const line2=new Line([0,0],[0,arcHeight]);
  const line3=new Line([0,arcHeight],[width,baseHeight]);
  const line4=new Line([width,0],[width-baseWidth,height]);
  const line5=new Line([width-baseWidth,height],[width-baseWidth-arcHeight,height]);
  const line6=new Line([width-baseWidth-arcHeight,height],[width-baseHeight,0]);
  const point = fromSlopeIntersection(line3,line6);
  const line7=new Line([0,arcHeight],point);
  const line8=new Line([width-baseWidth-arcHeight,height],point);
  const fillet2=new fillet(line5,line8,radius);
  const fillet1=new fillet(line2,line7,radius);
  this.paths={fillet1,fillet2,line1, line2,line4,line5,line7,line8};
}
function Model(width,height,angle,baseHeight){
  const arcHeight=3/5*baseHeight;
  const radian=Math.PI*angle/180;
  const baseWidth=height*Math.atan(radian);
  const radius=7;
  const leftModel=new FrameStand(width,height,baseHeight,radius,arcHeight,baseWidth);
  const rightModel=new mirror(new FrameStand(width,height,baseHeight,radius,arcHeight,baseWidth),true,true);
  move(rightModel,[2*width-baseWidth,height]);
  this.models = {
    leftModel,
    rightModel,
  }
}
Model.metaParameters=[
  {title:"width",type:"range",min:20,max:150,value:75},
  {title:"height",type:"range",min:20,max:150,value:80},
  {title:"angle",type:"range",min:5,max:60,value:15},
  {title:"baseHeight",type:"range",min:5,max:25,value:20},
];
export default  Model;