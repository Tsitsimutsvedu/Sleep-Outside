export default class HTMLValidator {

    ENDPOINT = "https://validator.w3.org/nu/";

    constructor(url) {
        this.url = url;
    }

    async validate() {
        let success = false;
        const response = await fetch(`${this.ENDPOINT}?out=json&doc=${this.url}`);
        if (response.ok) {
            const data = await response.json();
            this.data = data;
            success = Object.keys(data).length > 0;
        }
        return success;
    }

    getMessages() {
        return this.data.messages || [];
    }

    getDetails() {
        let details = {};
        const messages = this.getMessages();
        if (messages.length > 0) {
            details = messages.map(message => {
                return {
                    type: message.type,
                    line: message.lastLine,
                    message: message.message
                };
            });
        }
        return details;
    }
}