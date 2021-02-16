import makerjs from "makerjs";





export default function Model(l1, l2, w, h) {

    //նոռմալ աշխատումա մենակ էս դեպքում, երբ r = h
    const r = h

    const arcRadius = Math.PI * r * 90 / 180;
    const l = l1 + arcRadius + l2;




    // 3d Model
    const positionY = l1 + r + h;
    const positionX = l2 + r + h;
    const mirrorZero = Math.sqrt(Math.pow(w, 2) / 2)
    const rectangleZero = w * 2

    const line1 = new makerjs.paths.Line([0, h],[0, positionY])
    const mirrorLine1 = new makerjs.paths.Line([mirrorZero,mirrorZero + h],[mirrorZero,mirrorZero + positionY])
    const line2 = new makerjs.paths.Line([h, h + r],[h, positionY])
    const mirrorLine2 = new makerjs.paths.Line([mirrorZero + h,mirrorZero + h + r],[mirrorZero + h,mirrorZero + positionY])
    const line3 = new makerjs.paths.Line([h, 0], [positionX, 0])
    const mirrorLine3 = new makerjs.paths.Line([mirrorZero + h, mirrorZero], [mirrorZero + positionX, mirrorZero])
    const line4 = new makerjs.paths.Line([h + r, h], [positionX, h])
    const mirrorLine4 = new makerjs.paths.Line([mirrorZero + h + r, mirrorZero + h], [mirrorZero + positionX, mirrorZero + h])

    const arc1 = new makerjs.paths.Arc([0, h],[h, 0],arcRadius,false, false)
    const mirrorArc1 = new makerjs.paths.Arc([mirrorZero,mirrorZero + h],[mirrorZero + h, mirrorZero],arcRadius,false, false)
    const arc2 = new makerjs.paths.Arc([h, h + r],[h + r, h],arcRadius,false, false)
    const mirrorArc2 = new makerjs.paths.Arc([mirrorZero + h, mirrorZero + h + r],[mirrorZero + h + r, mirrorZero + h],arcRadius,false, false)


    const shortLine1 =new makerjs.paths.Line([0, positionY], [h, positionY])
    const shortLineMirror1 =new makerjs.paths.Line([mirrorZero,mirrorZero + positionY], [mirrorZero + h,mirrorZero + positionY])
    const shortLine2 =new makerjs.paths.Line([positionX, 0], [positionX, h])
    const shortLineMirror2 =new makerjs.paths.Line([mirrorZero + positionX, mirrorZero], [mirrorZero + positionX, mirrorZero + h])

    const widthLine1 = new makerjs.paths.Line([0, positionY],[mirrorZero,mirrorZero + positionY])
    const widthLine2 = new makerjs.paths.Line([h, positionY],[mirrorZero + h,mirrorZero + positionY])
    const widthLine3 = new makerjs.paths.Line([positionX, 0],[mirrorZero + positionX, mirrorZero])
    const widthLine4 = new makerjs.paths.Line([positionX, h],[mirrorZero + positionX, mirrorZero + h])

    const cutLine1 = new makerjs.paths.Line([-h / 2,-h / 2], [mirrorZero + 3 * h, mirrorZero + 3 * h])


    // 2d Model

    const rectangle = new makerjs.models.Rectangle(w,l)
    makerjs.model.move(rectangle, [rectangleZero, 0])

    const cutLine2 = new makerjs.paths.Line([rectangleZero, l2 + arcRadius / 2], [rectangleZero + w, l2 + arcRadius / 2])





    this.paths = {
        line1,
        line2,
        line3,
        line4,
        arc1,
        arc2,
        mirrorLine1,
        mirrorLine2,
        mirrorLine3,
        mirrorLine4,
        mirrorArc1,
        mirrorArc2,
        shortLine1,
        shortLine2,
        shortLineMirror1,
        shortLineMirror2,
        widthLine1,
        widthLine2,
        widthLine3,
        widthLine4,
        cutLine1,
        cutLine2,
    }
    this.models = {
        rectangle
    }

}

Model.metaParameters = [


    {
        title: "Vertical length",
        type: "range",
        min: 100,
        max: 1000,
        value: 240,
        step: 1
    },
    {
        title: "Horizontal length",
        type: "range",
        min: 100,
        max: 1000,
        value: 280,
        step: 1
    },
    {
        title: "Width",
        type: "range",
        min: 300,
        max: 2000,
        value: 800,
        step: 1
    },
    {
        title: "Height",
        type: "range",
        min: 1,
        max: 100,
        value: 20,
        step: 1
    },
    {
        title: "Radius",
        type: "range",
        min: 1,
        max: 100,
        value: 30,
        step: 1
    },


]