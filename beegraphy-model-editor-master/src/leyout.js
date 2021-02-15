import makerjs from "makerjs"


export default function Models(countX,countY,margin, scaleX,scaleY) {

    const rectangle = new makerjs.models.Rectangle(30,10)
    const rectangle1 = new makerjs.models.Rectangle(30,20)
    // makerjs.model.move(rectangle1, [70,-50])
    makerjs.model.move(rectangle, [40,-5])
    const dist = new makerjs.model.distort(rectangle,scaleX,scaleY)
    const cloneToColumn = new makerjs.layout.cloneToColumn(rectangle,countX,margin)
    const cloneToGrid = new makerjs.layout.cloneToGrid(rectangle,countX,countY,margin)
    const cloneToRadial = new makerjs.layout.cloneToRadial(rectangle,countX, 180 / countY)




    this.models = {
        rectangle,
        // rectangle1,
        dist
        // cloneToColumn
        // cloneToGrid
        // cloneToRadial


    }
    this.paths = {

    }
}

Models.metaParameters = [

    {
        title:"countX",
        type:"range",
        value:5,
        min:1,
        max:20,
        step:1,
    },
    {
        title: "countY",
        type: "range",
        value: 10,
        min: 1,
        max: 20,
        step: 1,
    },
    {
        title:"margin",
        type:"range",
        value:10,
        min:1,
        max:20,
        step:1,
    },
    {
        title: "ScaleX",
        type: "range",
        value: 1,
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