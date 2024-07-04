export const getTextWidth = (text) => {
    // Create a dummy canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the font for the context (e.g., '16px Arial')
    context.font = "16px Arial";

    // Measure the width of the text
    const width = context.measureText(text).width;

    // Clean up: remove the canvas from the DOM
    canvas.remove();

    return width;
};
