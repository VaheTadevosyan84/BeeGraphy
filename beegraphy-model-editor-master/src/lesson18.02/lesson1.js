import makerjs from "makerjs";

export default function Model(side) {



    const EA = makerjs.solvers.equilateralAltitude(side)
    const p1 = [0,0]
    const p2 = [side,0]
    const p3X = makerjs.point.average(p1,p2)
    const p3 = [p3X[0],EA]

    console.log(p3X)
    console.log(p3);

    const circle1 = new makerjs.paths.Circle(p1,2)
    const circle2 = new makerjs.paths.Circle(p2,2)
    const circle3 = new makerjs.paths.Circle(p3,2)
    const triangle = new makerjs.models.ConnectTheDots(true,[p1,p2,p3])





    this.paths = {
        circle1,
        circle2,
        circle3,
    };
    this.models = {
        triangle
    }
}

Model.metaParameters = [
    {title:"slide", type:"range", value:10, min:0, max:30, step:0.5,},
];
