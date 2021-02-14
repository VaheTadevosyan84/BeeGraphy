import makerjs from "makerjs";

export default function Model() {
    const radius = 90;
    const origin = [5, 0];
    const PointA = [10, 10];
    const PointB = [20,0];
    const PointC = [-15, -15];
    const startAngle = 0;
    const endAngle = 90;
    const largeArc = false;
    const clockWise = false;

    const arcMethod1 = new makerjs.paths.Arc(origin, radius, startAngle, endAngle)
    const arcMethod2 = new makerjs.paths.Arc(PointA, PointB, radius, largeArc, clockWise);
    const arcMethod3 = new makerjs.paths.Arc(PointA, PointB,  clockWise);
    const arcMethod4 = new makerjs.paths.Arc(PointA, PointB,  PointC);
    const  circle1 = new makerjs.paths.Circle(radius);
    const  circle2 = new makerjs.paths.Circle(origin, radius);
    const  circle3 = new makerjs.paths.Circle(PointA, PointB);
    this.paths = {
        //arcMethod1,
        //arcMethod2,
        //arcMethod3,
        //arcMethod4,
        circle1,
        circle2,
        circle3,
    };
}

Model.metaParameters = [];
