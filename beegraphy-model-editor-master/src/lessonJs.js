import makerjs from "makerjs"



function Models(bigR, smallR) {
    const circlePosition = (bigR + smallR) * 1.1
    const bigCircle = new makerjs.paths.Circle([0,0],bigR)
    const smallCircle = new makerjs.paths.Circle([0,- circlePosition],smallR)
    const rectangle = new makerjs.models.Rectangle(2 * smallR, circlePosition)
    makerjs.model.move(rectangle,[ -smallR,-circlePosition])




    const circles  = {paths: {bigCircle,smallCircle}}
    const hanger = new makerjs.model.combineUnion(circles,rectangle)


    this.models = {
        rectangle,
        hanger


    }

}

Models.metaParameters =[
    {

    },
];


export default function myModels(w, l, countH, bigR) {

    const smallR = bigR / 2
    const circlesDistance = (bigR + smallR) * 1.1
    const hangerSize = bigR + smallR + circlesDistance
    const margin = (l - countH * hangerSize)/ countH


    console.log((l - countH * hangerSize)/ countH)


    const hanger = new Models(bigR,smallR)


    const rectangle = new makerjs.models.Rectangle(w, l)
    const line = new makerjs.paths.Line([w / 2, 0],[w / 2, l])


    const cloneToColumn = new makerjs.layout.cloneToColumn(hanger,countH,margin)
    makerjs.model.move(cloneToColumn, [w / 4, margin])
    const cloneMirror = new makerjs.layout.cloneToColumn(hanger,countH,margin)
    makerjs.model.move(cloneMirror, [w - w / 4, margin])



    this.models = {
        rectangle,
        cloneToColumn,
        cloneMirror
    };
    this.paths = {
        line,
    }


}

myModels.metaParameters = [

    {
        title:"width",
        type:"range",
        value:100,
        min:0,
        max:360,
        step:1,
    },
    {
        title:"length",
        type:"range",
        value:200,
        min:0,
        max:360,
        step:1,
    },
    {
        title:"Hanger Count",
        type:"range",
        value:4,
        min:1,
        max:6,
        step:1,
    },
    {
        title:"Radius",
        type:"range",
        value:4,
        min:1,
        max:8,
        step:1,
    }

]


console.log(myModels.metaParameters)