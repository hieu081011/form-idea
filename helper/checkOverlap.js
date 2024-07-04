export default function checkOverlap(element1, element2) {
    // Get bounding rectangles
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    // Check for overlap
    if (
        rect1.right >= rect2.left &&
        rect1.left <= rect2.right &&
        rect1.bottom >= rect2.top &&
        rect1.top <= rect2.bottom
    ) {
        // Elements overlap
        return true;
    } else {
        // Elements do not overlap
        return false;
    }
}
