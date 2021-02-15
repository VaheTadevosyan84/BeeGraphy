import makerjs from "makerjs"


export default function Models() {
    const arr = []
    for (let i = 0; i < 5; i++) {
        arr[i] = []
        for (let j = 0;j < 5; j++) {
            arr[i][j] = i * 5 + j + 1
        }

        let sum = 0
        for (let i = 0; i >= 0; i--) {
            sum += arr[i][4-i]
        }


    }




    this.models = {

    }
    this.paths = {

    }
}

Models.metaParameters = [
    {
        title:"countX",
        type:"range",
        value:5,
        min:1,
        max:20,
        step:1,
    },
    {
        title: "countY",
        type: "range",
        value: 10,
        min: 1,
        max: 20,
        step: 1,
    },
    {
        title:"margin",
        type:"range",
        value:10,
        min:1,
        max:20,
        step:1,
    },
    {
        title: "ScaleX",
        type: "range",
        value: 1,
        min: 1,
        max: 20,
        step: 1,
    },
    {
        title: "ScaleY",
        type: "range",
        value: 1,
        min: 1,
        max: 20,
        step: 1,
    },

]