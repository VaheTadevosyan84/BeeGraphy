import makerjs from "makerjs"

const {BezierCurve, Rectangle} = makerjs.models;
const {move, combineUnion,clone,mirror} = makerjs.model;
const {cloneToRow, childrenOnChain} = makerjs.layout;
const {Arc, Line} = makerjs.paths;
const {fillet} = makerjs.path;
const {Holes, ConnectTheDots} = makerjs.models;


function Leaf(width, height, padding = 0) {
    const round = height * 0.5;
    const line1 = new Line([padding, 0], [0, height]);
    const line2 = new Line([0, height], [width, height]);
    const line3 = new Line([width, height], [width - padding, 0]);
    const line4 = new Line([width - padding, 0], [padding, 0]);
    const arc1 = fillet(line1, line4, round);
    const arc2 = fillet(line3, line4, round);
    this.paths = {line1, line2, line3, line4, arc1, arc2};
}

function OuterBox(side) {
    const leafWidth = side + 3;
    const leafHeight = 3 / 5 * side;
    const leaf1 = new Leaf(leafWidth, leafHeight, Math.round(leafWidth * 0.01))
    const leaf2 = new Leaf(leafWidth, leafHeight, Math.round(leafWidth * 0.12))
    const leaf3 = new Leaf(leafWidth, leafHeight, Math.round(leafWidth * 0.01))
    const leaf4 = new Leaf(leafWidth, leafHeight, Math.round(leafWidth * 0.12))
    move(leaf1, [0, 0])
    move(leaf2, [leafWidth, 0])
    move(leaf3, [2 * leafWidth, 0])
    move(leaf4, [3 * leafWidth, 0])
    this.models = {
        leaf1,
        leaf2,
        leaf3,
        leaf4,
    };
}

function ClosingPart(side, height){

    const point1 = [0,0]
    const point2 = [0,height]
    const point3 = [side * 0.2,height]
    const point4 = [side * 0.2,height * 0.08]
    const closingPart = new ConnectTheDots(true,[point1,point2,point3,point4])

    this.models = {closingPart}
}

function Box(side,height) {
    const leafHeight = 3 / 5 * side;
    const leafWidth = side + 3
    const boxPart = new Rectangle(leafWidth * 4,height)
    move(boxPart,[0, leafHeight])
    const closingPart = new ClosingPart(side, height)
    move(closingPart,[leafWidth * 4, leafHeight])
    const box = combineUnion(boxPart,closingPart)

    this.models = {box}

}

// function CombineUnion(...model) {
//
//     const models = [...model]
//     const unionParts = models.reduce((acc, model) => combineUnion(acc, model), models[0]);
//     return unionParts
//
// }
function InnerBox(side, height) {

    const basePart = new Rectangle(side,side)
    const leftSide = new Rectangle(height,side)
    move(leftSide,[-height,0])

    const rightSide = clone(leftSide)
    move(rightSide,[side,0])
    const topSide = new Rectangle(side, height)
    move(topSide,[0,side])
    const bottomSide = clone(topSide)
    move(bottomSide,[0,-height])
    const unionPart1 = combineUnion(combineUnion(combineUnion(combineUnion(basePart,leftSide),rightSide),topSide),bottomSide);

    const closingPart = new ClosingPart(side, height)
    move(closingPart,[side,side])
    const closingPartMirror = mirror(closingPart,true,false)
    move(closingPartMirror,[0,side])
    const bottomClosingPart = mirror(closingPart,false,true)
    move(bottomClosingPart,[side,0])
    const bottomClosingPartMirror = mirror(closingPart,true,true)
    move(bottomClosingPartMirror,[0,0])

    const unionParts = combineUnion(combineUnion(combineUnion(combineUnion(unionPart1,closingPart),closingPartMirror),bottomClosingPart),bottomClosingPartMirror)
    move(unionParts,[side * 1.5, height * 3])

    this.models = {unionParts}
}
function PaperBox(side, height) {
    const outerBox = new OuterBox(side, height)
    const box = new Box(side,height)
    const paperBox = combineUnion(outerBox,box)

    const innerBox = new InnerBox(side, height)

    this.models = {innerBox,paperBox}
}
PaperBox.metaParameters = [
    {type: "range", title: "Width", min: 10, max: 500, value: 50, step:1,},
    {type: "range", title: "Height", min: 10, max: 500, value: 50, step: 1},
];
export default PaperBox;