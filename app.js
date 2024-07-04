import checkOverlap from "./helper/checkOverlap.js";
import { mockData, SELECTOPTIONS, dataField } from "./data.js";
import { calculateWordInLine } from "./helper/commonHelper.js";
import { printPDF } from "./helper/pdfPrintHelper.js";
const button = document.querySelector(".create");
const allSpan = document.querySelectorAll("p");
const print = document.querySelector(".print");
const printPDFButton = document.querySelector(".print-pdf");
button.addEventListener("click", () => {
    createNewPlaceHolder();
});
printPDFButton.addEventListener("click", printPDF);
const createNewPlaceHolder = () => {
    const placeHolder = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `x`;

    deleteButton.classList.add("delete-button");
    placeHolder.innerHTML = `<select>${dataField.map(
        (field) => `<option value="${field.slug}">${field.label}</option>`
    )}</select>
    `;
    placeHolder.classList.add("my-content-editor");
    placeHolder.appendChild(deleteButton);
    placeHolder.setAttribute("draggable", "true");
    document.querySelector("body").appendChild(placeHolder);
    //handle drag event
    deleteButton.addEventListener("click", () => {
        placeHolder.remove();
    });
    let OffsetX = 0;
    let OffsetY = 0;
    placeHolder.addEventListener("dragstart", (e) => {
        const rect = placeHolder.getBoundingClientRect();
        OffsetX = e.clientX - rect.left;
        OffsetY = e.clientY - rect.top;
    });

    placeHolder.addEventListener("dragend", (e) => {
        const elementX = e.clientX;
        const elementY = e.clientY;

        placeHolder.style.top = `${elementY - OffsetY}`;
        placeHolder.style.left = `${elementX - OffsetX}`;
    });
};
function setContent(element, content) {
    const span = element.querySelector("span");
    span.innerHTML = content;
}

print.addEventListener("click", () => {
    const allEditor = document.querySelectorAll(".my-content-editor");
    allEditor.forEach((placeHolder) => {
        const overLappingSpan = [...allSpan].filter((span) =>
            checkOverlap(placeHolder, span)
        );
        const currentSelectValue = placeHolder.querySelector("select")?.value;
        const dataEmbed = mockData[currentSelectValue];
        const fieldType = dataField.find(
            (field) => field.slug === currentSelectValue
        )?.type;
        //handle enject data for each field type

        if (fieldType === "select") {
            const selectBoxSpan = overLappingSpan
                .map((p) => p.querySelector("span"))
                .filter((span) => {
                    if (!span) return;
                    return (
                        span.innerText == SELECTOPTIONS.CHECKED ||
                        span.innerText == SELECTOPTIONS.UNCHECKED
                    );
                });
            console.log(selectBoxSpan);
            selectBoxSpan.forEach((selected, index) => {
                if (index + 1 == dataEmbed) {
                    selected.innerHTML = SELECTOPTIONS.CHECKED;
                    return;
                }
                selected.innerHTML = SELECTOPTIONS.UNCHECKED;
            });
            return;
        }
        if (fieldType == "text") {
            if (dataEmbed) {
                const lineResult = calculateWordInLine(
                    overLappingSpan.length,
                    overLappingSpan[0].offsetWidth,
                    dataEmbed
                );
                lineResult.forEach((text, index) =>
                    setContent(overLappingSpan[index], text)
                );
            }
        }
    });
});
