import {span, space} from "./getHtmlCode";



const line1 = 
`${span("<", "tag")}${span("div", "tag")} ${span("id", "attr")}${span("=", "")}${span("\"", "")}${span("container", "attr-value")}${span("\"", "")}${span(">", "tag")}
`


const line2 =
`${space(1)}${span("<", "tag")}${span("div", "tag")} ${span("id", "attr")}${span("=", "")}${span("\"", "")}${span("face", "attr-value")}${span("\"", "")}${span(">", "tag")}
`

const line3 =
`${space(2)}${span("<", "tag")}${span("div", "tag")} ${span("id", "attr")}${span("=", "")}${span("\"", "")}${span("eye", "attr-value")}${span("\"", "")}${span(">", "tag")}${span("<", "tag")}${span("/", "tag")}${span("div>", "tag")}
`

const line4 = 
`${space(1)}${span("<", "tag")}${span("/", "tag")}${span("div>", "tag")}
`

const line5 = 
`${span("<", "tag")}${span("/", "tag")}${span("div>", "tag")}
`

export const htmlCode = {
    line1, 
    line2,
    line3,
    line4,
    line5
}


const line6 = 
`${span("#face", "selector")} {
`

const line7 = 
` ${span("position", "prop")}: ${span("absolute", "value")};
`

const line8 = 
` ${span("width", "prop")}: ${span("200px", "value")};
`

const line9 = 
` ${span("height", "prop")}: ${span("200px", "value")};
`

const line10 = 
` ${span("border-radius", "prop")}: ${span("50%", "value")};
`

const line11 = 
` ${span("background-color", "prop")}: ${span("#000", "value")};
`

const line12 = 
`${span("}", "")}
`

export const cssCode = {
    line6,
    line7,
    line8,
    line9,
    line10,
    line11,
    line12,
}