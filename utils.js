import makerjs from "makerjs";

export const generateModel = (Model) => {
  const values = Model.metaParameters.map(param => {
    if (param.type === "text") {
      return {
        font: param.font,
        text: param.text,
        size: param.size,
        value: param.value,
      };
    }

    return param.value;
  });

  const generate = () => {
    const model = new Model(...values);

    const svg = makerjs.exporter.toSVG(model);
    document.getElementById("model").innerHTML = svg;
  }

  const handleChange = (index, value) => {
    values[index] = value;
    document.getElementById(`param-${index}`).textContent = value;
    generate();
  };

  generateParams(Model.metaParameters, handleChange);
  generate();
};


const generateParams = (params, handleChange) => {
  const paramsEl = document.getElementById("params");
  paramsEl.innerHTML = '';
  params.forEach((param,index) => {
    const title = typeof param.title !== "string" ? param.title['en-US'] : param.title;
    const type = param.type;

    const el = generateByType(index, type, param, handleChange);
    const label = document.createElement("label");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const span = document.createElement("span");
    span.id = `param-${index}`;
    span.textContent = param.value;

    div1.innerText = title;
    el && div2.appendChild(el);
    el && div2.append(span);
    label.appendChild(div1);
    label.appendChild(div2);

    paramsEl.appendChild(label);
  });
};

const generateByType = (index, type, params, handleChange) => {
  if (type === "range") {
    return generateRange(index, params, handleChange);
  }
  return null;
};

const generateRange = (index, params, handleChange) => {
  const el = document.createElement("input");
  el.type = "range";
  el.min = params.min;
  el.max = params.max;
  el.step = params.step;
  el.value = params.value;
  el.onchange = ev => handleChange(index, +ev.target.value);
  return el;
};

