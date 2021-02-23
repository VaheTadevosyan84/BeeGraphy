import makerjs from "makerjs"

const {Circle, Line} = makerjs.paths;
const {move, combineUnion, combineSubtraction} = makerjs.model;
const goldenRatio = 1.61803398875;

function Link(radius) {
    const circle1 = new Circle([0, 0], radius);
    const circle2 = new Circle([0, 0], radius * (1 - 2 / 7));


    this.paths = {
        circle1,
        circle2,
    };
}

function MainLink(radius, mirrored = false) {
    const circle = new Circle([0, 0], radius);
    const hole = new Circle([(mirrored ? 1 : -1) * radius / 3, 0], 1.5);

    this.paths = {
        circle,
        hole,
    };
}

function LeatherBracelet(width, length) {
    this.models = {};
    this.paths = {};

    const t = length / 7;
    const r = length / 2;
    const delta = t / goldenRatio;
    const n = Math.floor(width / (r + delta));

    console.log(n);

    // const line = new Line([0, r], [width, r])
    // line.layer = "green";
    // this.paths.line = line;

    const deltaW = (width - length - (n - 1) * (t + delta)) / (n - 1);
    const models = [];

    for (let i = 0; i < n; ++i) {
        const x = r + i * (deltaW + t + delta);
        let link;
        if (i === 0 || i > n - 3) {
            link = new MainLink(r, i !== 0);
        } else {
            link = new Link(r);
        }
        move(link, [x, r]);
        models.push(link);
        // this.models[`link_${i}`] = link;
    }

    const bracelet = models.reduce((acc, model) => combineUnion(acc, model), models[0]);
    this.models.bracelet = bracelet;


    console.log(this.models);

    console.log(models);
}

LeatherBracelet.metaParameters = [
    {title: "width", type: "range", value: 250, min: 50, max: 500},
    {title: "length", type: "range", value: 25, min: 10, max: 50},
];

export default LeatherBracelet;
