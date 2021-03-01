import makerjs from "makerjs"

const {alterLength, breakAtPoint, fillet, moveRelative} = makerjs.path
const {Circle,Line} = makerjs.paths



export default function Models(width, length, t, r) {


    this.models = {}
    this.paths = {}
}

Models.metaParameters = [
    {title:"width", type:"range", value:200, min:1, max: 1000, step:1,},
]