export default class Drawer {
    init() {
        const drawerToggles = document.querySelectorAll("[data-toggle=\"drawer\"]");

        drawerToggles.forEach(drawerToggle => {
            drawerToggle.addEventListener("click", function() {
                const target = this.dataset.target;
                const drawer = document.querySelector(`#${target}`);
                let drawerBackdrop = document.querySelector(".bg-drawer-backdrop");

                if (!drawerBackdrop) {
                    drawerBackdrop = document.createElement("div");
                    drawerBackdrop.classList.add("position-fixed", "top-0", "left-0", "w-100", "h-100", "bg-drawer-backdrop");
                }

                document.body.appendChild(drawerBackdrop);

                if (drawer.classList.contains("hide") || !drawer.classList.contains("show")) {
                    drawer.classList.remove("hide");
                    drawerBackdrop.classList.remove("hide");
                    drawer.classList.add("show");
                    drawerBackdrop.classList.add("show");
                }
                else if (drawer.classList.contains("show")) {
                    drawer.classList.remove("show");
                    drawerBackdrop.classList.remove("show");
                    drawer.classList.add("hide");
                    drawerBackdrop.classList.add("hide");
                }
            });
        });
    }
}