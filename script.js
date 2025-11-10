// Runs after page loads
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("clickMe");
    const message = document.getElementById("message");

    button.addEventListener("click", () => {
        message.textContent = "You clicked the button!";
        button.textContent = "Clicked!";
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".animated-text");
    let globalLetterIndex = 0;      // Counts letters across all elements
    const perLetterDelay = 0.08;    // Seconds between letters
  
    elements.forEach(el => {
      const text = el.textContent;
      el.textContent = "";           // Clear the element
  
      [...text].forEach(char => {
        if (char.trim() !== '') { // ignores spaces, tabs, newlines
          const span = document.createElement("span");
          span.textContent = char;
          span.style.animationDelay = `${globalLetterIndex * perLetterDelay}s`;
          el.appendChild(span);
          globalLetterIndex++;
        }
      });
    });
  });
