const collButtons = document.querySelectorAll(".collapsible-button");

collButtons.forEach(button => {
    button.addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
    });
});