export default class Collapse {
    init() {
        const collapseToggles = document.querySelectorAll("[data-toggle=\"collapse\"]");
        collapseToggles.forEach(collapseToggle => {
            collapseToggle.addEventListener("click", function() {
                const target = this.dataset.target;
                const collapse = document.querySelector(`#${target}`);
                if (collapse.classList.contains("hide") || !collapse.classList.contains("show")) {
                    collapse.classList.remove("hide");
                    collapse.classList.add("show");
                    if (this.classList.contains("fa-caret-down")) {
                        this.classList.remove("fa-caret-down");
                        this.classList.add("fa-caret-up");
                    }
                }
                else if (collapse.classList.contains("show")) {
                    collapse.classList.remove("show");
                    collapse.classList.add("hide");
                    if (this.classList.contains("fa-caret-up")) {
                        this.classList.remove("fa-caret-up");
                        this.classList.add("fa-caret-down");
                    }
                }
            });
        });
    }
}