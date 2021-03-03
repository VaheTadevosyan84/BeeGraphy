import makerjs from "makerjs"

const {alterLength, breakAtPoint, fillet, moveRelative,move} = makerjs.path
const {Circle,Line} = makerjs.paths
const {cloneToRadial} = makerjs.layout

export default function CircleModel(count,k,y) {
    const radius = 50
    const padding = 20
    const circle = new Circle([0,0],2)
    const circle2 = new Circle([0,0],radius)
    const line = new Line([0,0],[0,2])
    const lineMoved = move(line,[0,50])
    const pointMoved = move(circle,[0,50])
    const points = cloneToRadial(lineMoved,count,360 / count)
    const circ = {paths:{circle2}}
    const extents =  makerjs.measure.modelExtents(circ)

    const rectangle = new makerjs.models.Rectangle(extents.width + padding,extents.height + padding)
    move(rectangle,[-radius - padding / 2,-radius - padding / 2])
    console.log(extents);


    this.models = {rectangle}
    this.paths = {}

    for (let i = 1; i < y + 1; i++) {
        const clone = makerjs.cloneObject(points)
        const sC = makerjs.model.scale(clone,i / y)
        const rot = makerjs.model.rotate(sC, i * k)
        this.models[`rot + ${i}`] = rot
    }

}

CircleModel.metaParameters = [
    {title:"Count", type:"range", value:8, min:2, max: 20,step:1,},
    {title:"K", type:"range", value:40, min:10, max: 50,step:1,},
    {title:"y", type:"range", value:20, min:10, max: 100,step:1,},
]