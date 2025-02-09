export default class WeekManager {
    constructor(startTime, endTime) {
        const time = Date.now();
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // returns submission, voting, or results string literals
    getWeekProgress() {
        const delta = Date.now() - this.startTime;
        const weekDuration = this.endTime - this.startTime;
        const progress = delta / weekDuration;

        if (progress <= 4.0/7.0) {
            return "submission";
        } else if (progress <= 5.0/7.0) {
            return "voting";
        } else {
            return "results";
        }
    }

    static weekAheadFrom(startTime) {
        const endTime = startTime + 604800000;
        return endTime;
    }
}
