import { getTextWidth } from "./canvasHelper.js";
export const calculateWordInLine = (number, length, sentence, start = "") => {
    const words = sentence.split(" ");
    const lineResult = [];
    let currentSentence = start;
    for (let i = 0; i < words.length; i++) {
        let wordLength = getTextWidth(words[i] + " ");
        if (getTextWidth(currentSentence) + wordLength > length) {
            if (number - lineResult.length == 1) {
                let lastSentence = "";
                for (let j = i; j < words.length; j++) {
                    lastSentence += words[j] + " ";
                }
                lineResult.push(currentSentence + lastSentence);

                currentSentence = "";
                break;
            } else {
                lineResult.push(currentSentence);
                currentSentence = words[i] + " ";
                continue;
            }
        }
        currentSentence += words[i] + " ";
    }
    if (currentSentence) {
        lineResult.push(currentSentence);
    }

    return lineResult;
};
