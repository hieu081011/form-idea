import { PLACE_HOLDER_SELECTOR, HIGHLIGHT_PLACEHOLDER } from "../const.js";
import checkOverlap from "./checkOverlap.js";
export const highlightPlaceHolderArea = () => {
    const allSpan = document.querySelectorAll("p");
    const allPlaceHolder = document.querySelectorAll(
        `.${PLACE_HOLDER_SELECTOR}`
    );
    allSpan.forEach((span) => span.classList.remove(HIGHLIGHT_PLACEHOLDER));
    allPlaceHolder.forEach((placeholder) => {
        const overLappingSpan = [...allSpan].filter((span) =>
            checkOverlap(placeholder, span)
        );
        overLappingSpan.forEach((span) => {
            span.classList.add(HIGHLIGHT_PLACEHOLDER);
        });
    });
};
