import makerjs from "makerjs";



function generateR(r,n) {
    const x = (r - 1)/ (n - 1);
    const arr = [];
    for (let i = 0; i < n; i++){
        arr.push(Math.round((i * x + 1)))
    }
    return arr.reverse();
}
export default function Model(radius, n) {
    const gap = 5;
    const arr = generateR(radius, n);
    let y = 0;
    this.paths={
    };
    this.models = {
    };
    for(let i = 0; i < arr.length; i++){
        const w = 3 * arr[i];
        const l = 2 * arr[i];
        let positionX = 20 + arr[0] - arr[i]
        const circle = new makerjs.paths.Circle([0, y + arr[i]], arr[i]);
        const rectangle = new makerjs.models.Rectangle(w,l);
        makerjs.model.move(rectangle, [positionX, y]);
        this.paths['circle_'+ arr[i]] = circle;
        this.models['rectangle_'+ arr[i]] = rectangle;
        y += 2 * arr[i] + gap;
    }
};
Model.metaParameters=[
    {
        title:"r",
        type:"range",
        value:10,
        min:1,
        max:20,
        step:1,
    },
    {
        title:"n",
        type:"range",
        value:5,
        min:1,
        max:10,
        step:1,
    }
];