export default class Insights {

    KEY = "AIzaSyBuVO-NzCpOHLUuWDDl21on-iqJr8MvE2s";
    ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

    constructor(url, categories) {
        this.url = url;
        this.categories = categories;
    }

    async run() {
        let success = false;
        let categoryQueryString = `&category=${this.categories.join("&category=")}`;
        const response = await fetch(`${this.ENDPOINT}?key=${this.KEY}&url=${this.url}${categoryQueryString}`);
        if (response.ok) {
            const data = await response.json();
            this.data = data;
            success = Object.keys(data).length > 0;
        }
        return success;
    }

    getCategories() {
        return this.data.lighthouseResult.categories;
    }

    getAudits() {
        return this.data.lighthouseResult.audits;
    }

    getScore(category) {
        let score = 0;
        const categories = this.getCategories();
        Object.keys(categories).forEach(key => {
            if (key == category) {
                const categoryData = categories[key];
                score = categoryData.score * 100;
            }
        });
        return score;
    }

    getAuditDetails(category) {
        let auditDetails = [];
        const categories = this.getCategories();
        const audits = this.getAudits();
        Object.keys(this.getCategories()).forEach(key => {
            if (key == category) {
                const categoryData = categories[key];
                let auditIds = categoryData.auditRefs.map(ref => {
                    return ref.id;
                });
                auditIds.forEach(auditId => {
                    const details = audits[auditId];
                    if (details.score != null) {
                        auditDetails.push({
                            title: details.title,
                            score: details.score * 100
                        });
                    }
                });
            }
        });
        return auditDetails;
    }
}