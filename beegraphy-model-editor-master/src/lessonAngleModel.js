import makerjs from "makerjs"


export default function Models(width, length, t, r) {



    const rectangle1 = new makerjs.models.Rectangle(t ,length)
    const rectangle2 = new makerjs.models.Rectangle(width,t)
    makerjs.model.move(rectangle2,[0,length - t])
    makerjs.model.combineUnion(rectangle1,rectangle2)

    const figur1 = new makerjs.paths.Circle([t / 2, t / 2],r)
    const figur2 = new makerjs.paths.Circle([t / 2, length - t / 2],r)
    const figur3 = new makerjs.paths.Circle([width - t / 2, length - t / 2],r)









    this.models = {
        rectangle1,
        rectangle2,


    }
    this.paths = {
        figur1,
        figur2,
        figur3

    }
}

Models.metaParameters = [
    {
        title:"width",
        type:"range",
        value:200,
        min:1,
        max: 1000,
        step:1,
    },
    {
        title: "length",
        type: "range",
        value: 250,
        min: 1,
        max: 1000,
        step: 1,
    },
    {
        title:"thickness",
        type:"range",
        value:50,
        min:1,
        max:200,
        step:1,
    },
    {
        title: "radius",
        type: "range",
        value: 10,
        min: 1,
        max: 20,
        step: 1,
    },
    {
        title: "ScaleY",
        type: "range",
        value: 1,
        min: 1,
        max: 20,
        step: 1,
    },

]