import makerjs from "makerjs";
import * as sbp  from "svg-blueprint";

const data = {};
const blueprint = new sbp.Blueprint({
  axisColor: "#002082",
  axisOpacity: 0.9,
  backgroundColor: "#ffffff",
  stroke: "#111111",
  gridColor: "#4A6DE5",
  gridOpacity: 0.8,
  parentSelector: "#model",
  width: '100%',
  height: '100%'
});

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

    const path = makerjs.exporter.toSVGPathData(model, { origin: [0, 0] });
    data.el && blueprint.remove(data.el);
    data.el = blueprint.append('path', { d: path });
    blueprint.fit();
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
  el.oninput = ev => handleChange(index, +ev.target.value);
  return el;
};

