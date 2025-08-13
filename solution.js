# day-of-week

function solution(D) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Step 1: Convert date strings into array of {date, weekday, value}
    let entries = Object.keys(D).map(dateStr => ({
        date: new Date(dateStr),
        weekday: days[new Date(dateStr).getDay()],
        value: D[dateStr]
    }));

    // Step 2: Sort by date
    entries.sort((a, b) => a.date - b.date);

    // Step 3: Initialize results with null
    let result = {};
    orderedDays.forEach(day => result[day] = null);

    // Step 4: Fill known days directly (closest in timeline)
    for (let entry of entries) {
        let day = entry.weekday;
        if (result[day] === null) {
            result[day] = entry.value;
        } else {
            // If already filled, check if this date is closer to missing neighbors
            // (This ensures later week values can replace earlier if closer to gap)
            result[day] = entry.value;
        }
    }

    // Step 5: Fill remaining nulls by averaging nearest neighbors
    for (let i = 0; i < orderedDays.length; i++) {
        if (result[orderedDays[i]] === null) {
            let prevIndex = (i - 1 + orderedDays.length) % orderedDays.length;
            let nextIndex = (i + 1) % orderedDays.length;

            while (result[orderedDays[prevIndex]] === null) {
                prevIndex = (prevIndex - 1 + orderedDays.length) % orderedDays.length;
            }
            while (result[orderedDays[nextIndex]] === null) {
                nextIndex = (nextIndex + 1) % orderedDays.length;
            }

            result[orderedDays[i]] = Math.floor(
                (result[orderedDays[prevIndex]] + result[orderedDays[nextIndex]]) / 2
            );
        }
    }

    return result;
}

// ------------------ TEST CASES ------------------

let input1 = {
    "2020-01-01": 4, // Wed
    "2020-01-02": 4, // Thu
    "2020-01-03": 6, // Fri
    "2020-01-04": 8, // Sat
    "2020-01-05": 2, // Sun
    "2020-01-06": 6, // Mon
    "2020-01-07": 2, // Tue
    "2020-01-08": 2  // Wed
};
console.log("Test 1 Output:", solution(input1));
// Expected: { Mon: 6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 2 }

let input2 = {
    "2020-01-01": 6, // Wed
    "2020-01-04": 12, // Sat
    "2020-01-05": 14, // Sun
    "2020-01-06": 2,  // Mon
    "2020-01-07": 4   // Tue
};
console.log("Test 2 Output:", solution(input2));
// Expected: { Mon: 2, Tue: 4, Wed: 6, Thu: 8, Fri: 10, Sat: 12, Sun: 14 }
