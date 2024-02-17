export const lightenColor = (color: { r: number, g: number, b: number, a: number }, factor: number): string => {
    const result = {
        r: Math.min(Math.round(color.r + 255 * factor), 255),
        g: Math.min(Math.round(color.g + 255 * factor), 255),
        b: Math.min(Math.round(color.b + 255 * factor), 255),
        a: 1
    };
    return `#${(result.r << 16 | result.g << 8 | result.b).toString(16).padStart(6, '0')}`;
}

export const darkenColor = (color: { r: number, g: number, b: number, a: number }, factor: number): string => {
    const result = {
        r: Math.max(Math.round(color.r - 255 * factor), 0),
        g: Math.max(Math.round(color.g - 255 * factor), 0),
        b: Math.max(Math.round(color.b - 255 * factor), 0),
        a: 1
    };
    return `#${(result.r << 16 | result.g << 8 | result.b).toString(16).padStart(6, '0')}`;
}

export const createNegativeColor = (color: { r: number, g: number, b: number, a: number }): string => {
    const colorAvg = (color.r + color.g + color.b) / 3;
    const negativeRed = 150 - colorAvg;
    const negativeGreen = 150 - colorAvg;
    const negativeBlue = 150 - colorAvg;

    return `rgb(${negativeRed}, ${negativeGreen}, ${negativeBlue})`;
}

export enum LoginState {
    LOG_IN = 'LOG_IN',
    REGISTER = 'REGISTER',
};

export const loadingSpinnerStyle = `
    .loader {
        width: 96px;
        height: 96px;
        display: inline-block;
        position: relative;
    }
    .loader::after,
    .loader::before {
        content: '';  
        box-sizing: border-box;
        width: 96px;
        height: 96px;
        border-radius: 50%;
        border: 2px solid #FFF;
        position: absolute;
        left: 0;
        top: 0;
        animation: animloader 2s linear infinite;
    }
    .loader::after {
        animation-delay: 1s;
    }
    
    @keyframes animloader {
        0% {
        transform: scale(0);
        opacity: 1;
        }
        100% {
        transform: scale(1);
        opacity: 0;
        }
    }
  `

export const reactQuillStyles = `
    .ql-container {
        border-bottom-left-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
        background: #fefcfc;
        min-height: 14em;
        border: solid !important;
        border-width: 0px 0px 2px 1px !important;
        border-color: rgb(118, 118, 118) !important;
    }
  
    .ql-snow.ql-toolbar {
        display: block;
        background: #eaecec;
        border-top-left-radius: 0.5em;
        border-top-right-radius: 0.5em;

        border: solid !important;
        border-color: rgb(118, 118, 118) !important;
        border-width: 1px 0px 0px 1px !important
    }
  
    .ql-editor {
        min-height: 14em;
    }
`

export const quilModules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
    ],
};

export const quilFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "size",
    "heading",
    "color",
    "background",
    "font",
    "align",
    "link",
    "image",
];