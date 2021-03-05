import makerjs from "makerjs"

const {alterLength, breakAtPoint, fillet, moveRelative,converge} = makerjs.path
const {Circle,Line,Arc,} = makerjs.paths
const {cloneToRadial} = makerjs.layout
const {move,combine,combineUnion,rotate} = makerjs.model



function HandleModel(radius,padding,width) {
    const delta = 255 / 50
    const midWidth = width / delta

    const circle1 = new Circle([0,0],radius)
    const circle2 = new Circle([midWidth,0],radius)

    const circle3 = new Circle([0,0],radius - padding)
    const circle4 = new Circle([midWidth,0],radius - padding)

    const rectangle1 = new makerjs.models.Rectangle(midWidth,2*radius)
    move(rectangle1,[0,-radius])
    const rectangle2 = new makerjs.models.Rectangle(midWidth,2 * (radius - padding))
    move(rectangle2,[0,padding -radius ])

    const circleModel1 = {paths:{circle1}}
    const circleModel2 = {paths:{circle2}}
    const circleModel3 = {paths:{circle3}}
    const circleModel4 = {paths:{circle4}}

    const cut = combineUnion(circleModel1,circleModel2)
    const cut2 = combine(cut,rectangle1)
    const cut3 = combineUnion(circleModel3,circleModel4)
    const cut4 = combine(cut3,rectangle2)
    const model = combine(cut2,cut4,false,true,true,false)
    move(model,[- midWidth / 2, 0])

    this.models = {model}
    this.paths = {}

}

function BagPart(radius,padding,width,cutPart) {
    const smallPadding = 4
    const smallRadius = 7
    const circle1 = new Circle([0,0],radius)
    const circle2 = new Circle([0,0],radius - padding)

    const line1 = new Line([- width/ 2,-cutPart],[width / 2 , -cutPart])
    const line2 = new Line([- width/ 2,padding-cutPart],[width / 2 ,padding -cutPart])

    const circleModel1 = {paths:{circle1}}
    const circleModel2 = {paths:{circle2}}
    const lineModel1 = {paths:{line1}}
    const lineModel2 = {paths:{line2}}

    const cut1 = combine(circleModel1,lineModel1,false,true,true,false)
    const cut2 = combine(circleModel2,lineModel2,false,true,true,false)


    const intersectionPoint = cut2.models.b.paths.line2.end

    const circle4 = new Circle(intersectionPoint,smallRadius)
    const startPoint = move(circle4,[intersectionPoint[0] +smallRadius + smallPadding,intersectionPoint[1] - smallRadius - smallPadding])

    const arcAngle = cut2.models.a.paths.circle2.endAngle - cut2.models.a.paths.circle2.startAngle
    const count = Math.round(arcAngle / (7.5 + smallRadius))

    const cloneRad = cloneToRadial(startPoint, count + 1,arcAngle / count)


    this.models = {
        cloneRad,
        cut1,
        cut2}
    this.paths = {}
}


function BagModel(smallRadius,midRadius,bigRadius,smallPadding,bigPadding,height) {
    const width = 2 * bigRadius
    const cutPart = Math.abs(height - (2 * bigRadius + bigPadding + 2 * smallRadius + smallPadding))

    console.log(cutPart);


    const handleModel = new HandleModel(smallRadius,smallPadding,width)
    const bagPart = new BagPart(bigRadius,bigPadding,width,cutPart)

    move(handleModel,[0,bigRadius+bigPadding+smallPadding])


    this.models = {
        handleModel,
        bagPart}
    this.paths = {}
}

BagModel.metaParameters = [
    {title:"SmallRadius", type:"range", value:45, min:10, max: 60,step:1,},
    {title:"MidRadius", type:"range", value:40, min:10, max: 50,step:1,},
    {title:"BigRadius", type:"range", value:127.5, min:100, max: 300,step:0.5,},
    {title:"SmallPadding", type:"range", value:25, min:10, max: 100,step:1,},
    {title:"BigPadding", type:"range", value:30, min:10, max: 100,step:1,},
    {title:"Height", type:"range", value:300, min:100, max: 500,step:1,},
]

export default BagModel;