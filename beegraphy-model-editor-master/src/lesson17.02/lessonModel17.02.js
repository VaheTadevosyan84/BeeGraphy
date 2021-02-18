import makerjs from "makerjs"
import seedRandom from "seed-random"





export default function Models(count, seed) {
    const random = seedRandom(seed)


    this.models = {


    }
    this.paths = {


    }

    for (let i = 1; i < count; i++) {
        let randomW = random()
        const rectangle = new makerjs.models.Rectangle(randomW,randomW)
        makerjs.model.move(rectangle,[random() * 5,random() * 5])
        makerjs.model.rotate(rectangle,random() * 360,[randomW / 2,randomW / 2])
        this.models[`rectangle_${i}`] = rectangle;
        console.log(randomW);

    }

}

Models.metaParameters =[
    {title:"count", type:"range", value:20, min:0, max:100, step:1},
    {title:"seed", type:"range", value:20, min:0, max:100, step:1},
]