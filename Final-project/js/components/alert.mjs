import { hideMessage } from "../utils.mjs";

export default class Alert {
    init() {
        const closeAlerts = document.querySelectorAll("[data-close=\"alert\"]");
        closeAlerts.forEach(closeAlert => {
            closeAlert.addEventListener("click", function () {
                const target = this.dataset.target;
                const alert = document.querySelector(`#${target}`);
                hideMessage(alert);
            });
        });
    }
}