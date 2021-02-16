import makerjs from "makerjs"



function Models(bigR, smallR) {
    const circlePosition = (bigR + smallR) * 1.1
    const bigCircle = new makerjs.paths.Circle([0,0],bigR)
    const smallCircle = new makerjs.paths.Circle([0,- circlePosition],smallR)
    const rectangle = new makerjs.models.Rectangle(2 * smallR, circlePosition)
    makerjs.model.move(rectangle,[ -smallR,-circlePosition])




    const circles  = {paths: {bigCircle,smallCircle}}
    const henger = new makerjs.model.combineUnion(circles,rectangle)


    this.models = {
        rectangle,
        henger


    }
    this.paths = {


    }
}

Models.metaParameters =[
    {
        title:"bigR",
        type:"range",
        value:20,
        min:0,
        max:360,
        step:1,
    },
    {
        title:"smallR",
        type:"range",
        value:10,
        min:0,
        max:360,
        step:1,
    },
];
export default function myModels(bigR,smallR) {
    const henger = new Models(bigR,smallR)


    const rectangle = new makerjs.models.Rectangle(50, 100)
    const cloneToColumn = new makerjs.layout.cloneToColumn(henger,4,20)


    this.models = {
        rectangle,
        henger,
        cloneToColumn
    }


}

    myModels.metaParameters = [
        {
            title:"bigR",
            type:"range",
            value:20,
            min:0,
            max:360,
            step:1,
        },
        {
            title:"smallR",
            type:"range",
            value:10,
            min:0,
            max:360,
            step:1,
        },
    ]
