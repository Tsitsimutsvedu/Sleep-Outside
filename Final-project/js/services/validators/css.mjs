export default class CSSValidator {

    ENDPOINT = "https://jigsaw.w3.org/css-validator/validator/";

    constructor(url) {
        this.url = url;
    }

    async validate() {
        let success = false;
        const response = await fetch(`${this.ENDPOINT}?output=json&&profile=css3&uri=${this.url}`);
        if (response.ok) {
            const data = await response.json();
            this.data = data;
            success = Object.keys(data).length > 0;
        }
        return success;
    }

    getErrors() {
        return this.data.cssvalidation.errors || [];
    }

    getDetails() {
        let details = {};
        const errors = this.getErrors();
        if (errors.length > 0) {
            details = errors.map(error => {
                return {
                    source: error.source,
                    message: error.message
                };
            });
        }
        return details;
    }
}