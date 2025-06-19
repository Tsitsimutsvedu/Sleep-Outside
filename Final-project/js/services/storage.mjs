export default class Storage {

    KEY = "website-checker-data";

    constructor() {
        this.data = this.getData();
        if (!this.data) {
            this.data = {};
        }
    }

    getData() {
        const storedData = localStorage.getItem(this.KEY);
        if (storedData) {
            this.data = JSON.parse(storedData);
        }
        return this.data;
    }

    insertData(value) {
        const key = Date.now();
        this.data[key] = value;
        localStorage.setItem(this.KEY, JSON.stringify(this.data));
    }

    setData(data) {
        this.data = data;
        localStorage.setItem(this.KEY, JSON.stringify(this.data));
    }

    removeData(key) {
        if (this.data[key]) {
            delete this.data[key];
            localStorage.setItem(this.KEY, JSON.stringify(this.data));
        }
    }

    clearData() {
        this.data = {};
        localStorage.removeItem(this.KEY);
    }
}