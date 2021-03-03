import makerjs from "makerjs"

const {alterLength, breakAtPoint, fillet, moveRelative,converge} = makerjs.path
const {Circle,Line,Arc,} = makerjs.paths
const {cloneToRadial} = makerjs.layout
const {move} = makerjs.model

export default function CircleModel(radius1,radius2,radius3,padding) {

    const circle1 = new Circle([0,0],radius1)
    const circle2 = new Circle([50,0],radius1)

    const circle3 = new Circle([0,0],radius1 - padding)
    const circle4 = new Circle([50,0],radius1 - padding)

    const rectangle1 = new makerjs.models.Rectangle(50,2*radius1)
    move(rectangle1,[0,-radius1])
    const rectangle2 = new makerjs.models.Rectangle(50,2 * (radius1 - padding))
    move(rectangle2,[0,padding -radius1 ])

    const circleModel1 = {paths:{circle1}}
    const circleModel2 = {paths:{circle2}}
    const circleModel3 = {paths:{circle3}}
    const circleModel4 = {paths:{circle4}}

    const cut = makerjs.model.combineUnion(circleModel1,circleModel2)
    const cut2 = makerjs.model.combine(cut,rectangle1)
    const cut3 = makerjs.model.combineUnion(circleModel3,circleModel4)
    const cut4 = makerjs.model.combine(cut3,rectangle2)




    this.models = {cut2,cut4}
    this.paths = {}


}

CircleModel.metaParameters = [
    {title:"Radius1", type:"range", value:45, min:10, max: 60,step:1,},
    {title:"Radius2", type:"range", value:40, min:10, max: 50,step:1,},
    {title:"Radius3", type:"range", value:20, min:10, max: 100,step:1,},
    {title:"Padding", type:"range", value:25, min:10, max: 100,step:1,},
]