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

export const createNegativeColor = (color: { r: number, g: number, b: number, a: number }): string  => {
    const colorAvg = (color.r + color.g + color.b) / 3;
    const negativeRed = 150 - colorAvg;
    const negativeGreen = 150 - colorAvg;
    const negativeBlue = 150 - colorAvg;

    return `rgb(${negativeRed}, ${negativeGreen}, ${negativeBlue})`;
}