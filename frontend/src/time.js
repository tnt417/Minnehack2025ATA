class WeekManager {
    constructor(startTime, endTime) {
        const time = Date.now();
        this.startTime = startTime;
        this.endTime = endTime;
    }

    #getProgress() {
        const delta = Date.now() - this.startTime;
        const weekDuration = this.endTime - this.startTime;
        return delta / weekDuration;
    }

    // returns submission, voting, or results string literals
    getWeekProgress() {
        const progress = this.#getProgress();
        if (progress <= 4/7) {
            return "submission";
        } else if (progress <= 5/7) {
            return "voting";
        } else {
            return "results";
        }
    }

    // returns something like 'day 4/7'
    getNumDaysString() {
        const progress = this.#getProgress();
        const days = Math.floor(progress * 7);
        return `Day ${days}/7`;
    }

    getStartString() {
        const date = new Date(this.startTime);
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    }

    getEndString() {
        const date = new Date(this.endTime);
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    }

    static weekAheadFrom(startTime) {
        const endTime = startTime + 604800000;
        return endTime;
    }
}
