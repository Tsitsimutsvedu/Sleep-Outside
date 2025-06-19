import "./components/index.mjs";
import {
    getLocalStorage,
    objectToJson,
    jsonToObject,
    setLocalStorage,
    showMessage,
    hideMessage,
    measure,
    showPagespeedInsights,
    showSelectedPagespeedInsights,
    showResults,
    hasPagespeedInsights,
    getSelectedCategories,
    showScoreDetails,
    enableCheckButton,
    validate,
    hasValidation,
    createHistoryItem
} from "./utils.mjs";
import Storage from "./services/storage.mjs";

document.addEventListener("DOMContentLoaded", function () {

    const url = document.querySelector("#url");
    const checkButton = document.querySelector("#check-button");
    const selectedMeasurements = document.querySelectorAll("#selected-measurements input[type=\"checkbox\"]");

    let selectedMeasurementsData = {};

    // URL Input
    url.addEventListener("keyup", function () {
        if (this.value != "") {
            enableCheckButton(true);
        } else {
            enableCheckButton(false);
        }
    });

    // Check Button
    checkButton.addEventListener("click", async () => {
        let historyData = {
            url: url.value,
            measurements: {}
        };
        enableCheckButton(false);
        showResults(selectedMeasurements);
        if (hasPagespeedInsights()) {
            const categories = getSelectedCategories(selectedMeasurements);
            showPagespeedInsights(categories);
            if (categories.length > 0) {
                showSelectedPagespeedInsights(categories);
                const scoresData = await measure(url.value, categories);
                historyData["measurements"] = scoresData;
                const keys = Object.keys(scoresData);
                keys.forEach(key => {
                    const data = scoresData[key];
                    const score = data.score;
                    const audits = data.audits;
                    showScoreDetails(score, key, audits);
                });
            }
        }
        if (hasValidation(selectedMeasurements, "html")) {
            const htmlValidationData = await validate(url.value, "html");
            historyData["measurements"]["html"] = htmlValidationData;
        }
        if (hasValidation(selectedMeasurements, "css")) {
            const cssValidationData = await validate(url.value, "css");
            historyData["measurements"]["css"] = cssValidationData;
        }
        const storage = new Storage;
        storage.insertData(historyData);
        enableCheckButton(true);
        showHistory();
    });

    function initSelectedMeasurements() {
        let data = getLocalStorage("selected-measurements");
        if (data && data.length > 0) {
            data = jsonToObject(data);
        }
        selectedMeasurements.forEach(selectedMeasurement => {
            const keys = Object.keys(data);
            if (keys.length > 0) {
                keys.forEach(key => {
                    if (key == selectedMeasurement.value) {
                        selectedMeasurement.checked = data[key];
                        selectedMeasurementsData[key] = data[key];
                    }
                });
            } else {
                selectedMeasurement.checked = true;
                selectedMeasurementsData[selectedMeasurement.value] = true;
            }
            selectedMeasurement.addEventListener("click", function () {
                const elems = document.querySelectorAll("#selected-measurements input[type=\"checkbox\"]");
                elems.forEach(elem => {
                    selectedMeasurementsData[elem.value] = elem.checked;
                });
                setLocalStorage("selected-measurements", objectToJson(selectedMeasurementsData));
                countSelectedMeasurements();
            });
        });
        setLocalStorage("selected-measurements", objectToJson(selectedMeasurementsData));
        countSelectedMeasurements();
    }

    function countSelectedMeasurements() {
        const selectedMeasurementsCount = document.querySelector("#selected-measurements-count");
        let count = 0;
        selectedMeasurements.forEach(selectedMeasurement => {
            if (selectedMeasurement.checked) {
                count++;
            }
        });
        selectedMeasurementsCount.textContent = count;
        if (count == 0) {
            showMessage("Please select at least one measurement.", "error");
            enableCheckButton(false);
        } else {
            hideMessage();
            enableCheckButton(true);
        }
    }

    initSelectedMeasurements();
    showHistory();

    const removeHistoryItemButtons = document.querySelectorAll(".remove-history-item-button");

    removeHistoryItemButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log(this.parent);
        });
    });
});

export async function showHistory() {
    const storage = new Storage;
    const data = await storage.getData();
    const resultsHistory = document.querySelector(".results-history");
    resultsHistory.innerHTML = "";
    if (data) {
        Object.keys(data).reverse().forEach(timestamp => {
            const historyItem = createHistoryItem(timestamp, data[timestamp]);
            resultsHistory.appendChild(historyItem);
        });
    }
}