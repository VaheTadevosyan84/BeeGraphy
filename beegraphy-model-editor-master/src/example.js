import makerjs from "makerjs";

// export  default function Model(a,b)
// {
//     const line1=new makerjs.paths.Line([0,0],[0,a])
//     const line2=new makerjs.paths.Line([0,a],[b,a])
//     const line3=new makerjs.paths.Line([b,a],[b,0])
//     const line4=new makerjs.paths.Line([b,0],[0,0])
//
//     this.paths={
//         line1,
//         line2,
//         line3,
//         line4,
// };
//
// }
//
// Model.metaParameters=[
//     {
//         title:"a",
//         type:"range",
//         value:100,
//         min:0,
//         max:200,
//         step:5,
//
//     }    ,
//     {
//         title:"b",
//         type:"range",
//         value:100,
//         min:0,
//         max:200,
//         step:10,
//     }
// ];

function generateR(r,n) {
    const x = (r - 1)/ (n - 1);
    const arr = [];
    for (let i = 0; i < n; i++){
      arr.push(Math.round((i * x + 1)))
    }

    return arr.reverse();
}
// function GetR(r,n) {
//     con
//     for (let i = 0; i < n; i++){
//         arr.push(Math.round((i * x + 1)))
//     }
//
//     return arr;
// }

export default function Model(radius) {
    const gap = 5;

    const arr = generateR(radius, 5);
    // const line2=new makerjs.paths.Line([0,0],[r,n])
    // const circle1 = new makerjs.paths.Circle(radius);



    // this.paths={
    //     // line2,
    //     // circle,
    //
    // };
    //
    // console.log(arr);
    // let y = 0;
    // for(const r of arr){
    //
    //     //console.log(r)
    //     const circle = new makerjs.paths.Circle([0,y+r],r);
    //     this.paths['circle_'+ r] = circle;
    //     y += 2 * r + gap;
    //
    // }





};


// Model.metaParameters=[
//     {
//         title:"r",
//         type:"range",
//         value:30,
//         min:0,
//         max:20,
//         step:1,
//
//     }
// ];