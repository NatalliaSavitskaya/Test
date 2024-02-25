export function parseSize(productSizeandColor) {
    const sizeMatch = productSizeandColor.match(/Size : (\w+),/);
    const size = sizeMatch ? sizeMatch[1] : null;
    return size;
}

export function parseColor(productSizeandColor) {
    const colorMatch = productSizeandColor.match(/Color : (\w+)/);
    const color = colorMatch ? colorMatch[1] : null;
    return color;
}

export function randomNumber(minNumber, maxNumber) {
    let min = Math.ceil(minNumber);
    let max = Math.floor(maxNumber);
    return Math.floor(Math.random() * (max - min + 1)) + min;   //random number in range [min,max]
}

