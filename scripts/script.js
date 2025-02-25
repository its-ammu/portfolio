document.addEventListener("DOMContentLoaded", function () {
    const container = document.createElement("div");
    container.classList.add("dots-container");
    document.body.appendChild(container);

    // Create a custom cursor
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    const spacing = 30; // Distance between dots
    const fadeRadius = 400; // Radius of fade effect

    const cols = Math.ceil(window.innerWidth / spacing);
    const rows = Math.ceil(window.innerHeight / spacing);

    const dots = [];

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");

            dot.style.left = `${x * spacing}px`;
            dot.style.top = `${y * spacing}px`;

            container.appendChild(dot);
            dots.push(dot);
        }
    }

    document.addEventListener("mousemove", (e) => {
        // Move the custom cursor
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

        document.querySelectorAll("a, button, input, .interactive").forEach(el => {
            el.style.pointerEvents = "auto";
        });


        dots.forEach(dot => {
            const rect = dot.getBoundingClientRect();
            const distance = Math.hypot(rect.x - e.clientX, rect.y - e.clientY);

            const fadeFactor = Math.max(0, 1.09 - distance / fadeRadius);
            const newColor = `rgb(${255 * fadeFactor}, ${255 * fadeFactor}, 255)`;

            dot.style.backgroundColor = newColor;
        });
    });

    document.querySelector(".wand").addEventListener("mouseenter", () => {
        cursor.classList.add("hover-effect");
    });

    // Reset cursor when leaving photo
    document.querySelector(".wand").addEventListener("mouseleave", () => {
        cursor.classList.remove("hover-effect");
    });
});
