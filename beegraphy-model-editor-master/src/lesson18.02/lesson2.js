import makerjs from "makerjs";

export default function Model(width,radius) {

    const left = [
        [18,0],
        [18, 8.75],
        [17.75, 9.14],
        [0.25, 26.65],
        [0, 27.04],
        [0, 64.54],
        [0.25, 64.93],
        [17.75, 82.44],
        [18, 82.83],
        [18, 91.58]
    ]

    const right = left.map(point => [-point[0] + width, point[1]]).reverse();
    const coords = [...left,...right]

    const figure = new makerjs.models.ConnectTheDots(true, coords);
    const circle1 = new makerjs.paths.Circle([17.38,33.79], radius)
    const circle2 = new makerjs.paths.Circle([17.38,57.79], radius)
    const circle3 = new makerjs.paths.Circle([width - 17.38,33.79], radius)
    const circle4 = new makerjs.paths.Circle([width - 17.38,57.79], radius)





    this.paths = {
        circle1,
        circle2,
        circle3,
        circle4
    };
    this.models = {
        figure,

    };
}

Model.metaParameters = [
    {title:"width", type:"range", value:100, min:50, max:2000, step:1,},
    {title:"radius", type:"range", value:5, min:0, max:30, step:0.5,},
];
