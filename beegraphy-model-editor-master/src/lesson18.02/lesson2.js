import makerjs from "makerjs";

export default function Model(width,radius) {

    const p1 = [18,0]
    const p2 = [18, 8.75]
    const p3 = [17.75, 9.14]
    const p4 = [0.25, 26.65]
    const p5 = [0, 27.04]
    const p6 = [0, 64.54]
    const p7 = [0.25, 64.93]
    const p8 = [17.75, 82.44]
    const p9 = [18, 82.83]
    const p10 =[18, 91.58]
    const left = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]

    const right = left.map(point => [-point[0] + width, point[1]]).reverse();
    const coords = [...left,...right]
    const figure = new makerjs.models.ConnectTheDots(true, coords);

    const l1Start = makerjs.point.average(p2,p3)
    const l1End = makerjs.point.average(coords[17],coords[18])
    const l2Start = makerjs.point.average(p4,p5)
    const l2End = makerjs.point.average(coords[15],coords[16])
    const l3Start = makerjs.point.average(p6,p7)
    const l3End = makerjs.point.average(coords[13],coords[14])
    const l4Start = makerjs.point.average(p8,p9)
    const l4End = makerjs.point.average(coords[11],coords[12])

    const circle1 = new makerjs.paths.Circle([17.38,33.79], radius)
    const circle2 = new makerjs.paths.Circle([17.38,57.79], radius)
    const circle3 = new makerjs.paths.Circle([width - 17.38,33.79], radius)
    const circle4 = new makerjs.paths.Circle([width - 17.38,57.79], radius)

    const line1 = new makerjs.paths.Line(l1Start,l1End)
    const line2 = new makerjs.paths.Line(l2Start,l2End)
    const line3 = new makerjs.paths.Line(l3Start,l3End)
    const line4 = new makerjs.paths.Line(l4Start,l4End)


    this.paths = {
        circle1,
        circle2,
        circle3,
        circle4,
        line1,
        line2,
        line3,
        line4
    };


    this.models = {
        figure,

    };
}

Model.metaParameters = [
    {title:"width", type:"range", value:100, min:50, max:500, step:0.5,},
    {title:"radius", type:"range", value:3, min:1, max:6, step:0.2,},
];
