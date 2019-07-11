const __letters = { "א": 1, "ב": 2, "ג": 3, "ד": 4, "ה": 5, "ו": 6, "ז": 7, "ח": 8, "ט": 9, "י": 10, "כ": 20, "ל": 30, "מ": 40, "נ": 50, "ס": 60, "ע": 70, "פ": 80, "צ": 90, "ק": 100, "ר": 200, "ש": 300, "ת": 400 };

Number.prototype.gimatria = function (options) {
    const num = this.valueOf();
    if (!Number.isInteger(num))
        return "";

    const numParts = [
        parseInt(num / 1000),   // the thousands
        num % 1000              // the rest
    ];

    let text = "";
    const letters = Object.keys(__letters)
    for (let i = 0; i < numParts.length; i++) {
        if (numParts[i] < 1)
            continue;

        // find ת-ק
        for (let j = 4; j > 0; j--) {
            let curr = j * 100;
            while (numParts[i] >= curr) {
                text += letters.find(k => __letters[k] == curr);
                numParts[i] -= curr;
            }
        }
        // find צ-י
        for (let j = 9; j > 0; j--) {
            let curr = j * 10;
            while (numParts[i] >= curr) {
                text += letters.find(k => __letters[k] == curr);
                numParts[i] -= curr;
            }
        }
        // find ט-א
        text += letters.find(k => __letters[k] == numParts[i]);
        numParts[i] -= numParts[i];
        if (i == 0 && text.length > 0) // there are any thousands
            text += "'";
    }
    return text.replace(/יה/i, "טו").replace(/יו/i, "טז");
}

String.prototype.gimatria = function () {
    const str = this.valueOf();
    if (!/[א-ת]/i.test(str))
        return 0;

    let thousandsLetters, unitsLetters;
    if (str.indexOf("'") < 0)
        unitsLetters = str;
    else {
        thousandsLetters = str.split("'")[0];
        unitsLetters = str.split("'")[1];
    }

    thousandsLetters = thousandsLetters || "";
    unitsLetters = unitsLetters || "";

    let num = 0;
    unitsLetters.split("").forEach(l => num += (__letters[l] || 0));

    return num + (thousandsLetters.gimatria() * 1000);
}
