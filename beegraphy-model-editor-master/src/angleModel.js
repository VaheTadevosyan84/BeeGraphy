import makerjs from "makerjs";




export default function Model(r, l1, l2, w) {
    const arcRadius = Math.PI * r * 90 / 180;
    const l = l1 + arcRadius + l2;
    const mirrorZero = Math.sqrt(Math.pow(w, 2) / 2)
    const rectangleZero = w * 2


    // 3d Model
    const line1 = new makerjs.paths.Line([0, r],[0, l1])
    const line2 = new makerjs.paths.Line([r, 2 * r],[r, l1])
    const line3 = new makerjs.paths.Line([r, 0], [l2, 0])
    const line4 = new makerjs.paths.Line([2 * r, r], [l2, r])

    const arc1 = new makerjs.paths.Arc([0, r],[r, 0],arcRadius,false, false)
    const arc2 = new makerjs.paths.Arc([r,2 * r],[2 * r, r],arcRadius,false, false)

    const mirrorLine1 = new makerjs.paths.Line([mirrorZero,mirrorZero + r],[mirrorZero,mirrorZero + l1])
    const mirrorLine2 = new makerjs.paths.Line([mirrorZero + r,mirrorZero + 2 * r],[mirrorZero + r,mirrorZero + l1])
    const mirrorLine3 = new makerjs.paths.Line([mirrorZero + r, mirrorZero], [mirrorZero + l2, mirrorZero])
    const mirrorLine4 = new makerjs.paths.Line([mirrorZero + 2 * r, mirrorZero + r], [mirrorZero + l2, mirrorZero + r])

    const mirrorArc1 = new makerjs.paths.Arc([mirrorZero,mirrorZero + r],[mirrorZero + r, mirrorZero],arcRadius,false, false)
    const mirrorArc2 = new makerjs.paths.Arc([mirrorZero + r, mirrorZero + 2 * r],[mirrorZero + 2 * r,mirrorZero + r],arcRadius,false, false)

    const shortLine1 =new makerjs.paths.Line([0, l1], [r, l1])
    const shortLine2 =new makerjs.paths.Line([l2, 0], [l2, r])
    const shortLineMirror1 =new makerjs.paths.Line([mirrorZero,mirrorZero + l1], [mirrorZero + r,mirrorZero + l1])
    const shortLineMirror2 =new makerjs.paths.Line([mirrorZero + l2, mirrorZero], [mirrorZero + l2, mirrorZero + r])

    const widthLine1 = new makerjs.paths.Line([0, l1],[mirrorZero,mirrorZero + l1])
    const widthLine2 = new makerjs.paths.Line([r, l1],[mirrorZero + r,mirrorZero + l1])
    const widthLine3 = new makerjs.paths.Line([l2, 0],[mirrorZero + l2, mirrorZero])
    const widthLine4 = new makerjs.paths.Line([l2, r],[mirrorZero + l2, mirrorZero + r])

    const cutLine1 = new makerjs.paths.Line([-r / 2,-r / 2], [mirrorZero + 2 * r, mirrorZero + 2 * r])


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
        title: "Radius",
        type: "range",
        min: 1,
        max: 100,
        value: 30,
        step: 1
    },
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
    }


]