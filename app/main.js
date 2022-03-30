(function () {
    let clickTimestamps = [];
    let bpmList = [];
    const counterBtn = document.getElementById('click-counter');
    const resetBtn = document.getElementById('reset');
    const bpmText = document.getElementById('bpm-text');

    function reset() {
        clickTimestamps = [];
        bpmList = [];
        bpmText.innerText = 'BPM: 00';
    }

    function getLastTwoTimestamps() {
        if (clickTimestamps.length < 2) return null;
        const [a, b] = [-2, -1].map(x => x + clickTimestamps.length);
        return [clickTimestamps[a], clickTimestamps[b]];
    }

    function getDifference() {
        const timestamps = getLastTwoTimestamps();
        if (!timestamps) return;
        const [a, b] = timestamps;
        return b - a;
    }

    function calculateBpm() {
        const diff = getDifference();
        if (diff === undefined) return;
        const bpm = Math.floor(1000 / diff * 60);
        bpmList.push(bpm);
    }

    function outputLastBpmToPage() {
        if (!bpmList.length) return;
        bpmText.innerText = `BPM: ${bpmList[bpmList.length - 1]}`;
    }

    function clickListener() {
        clickTimestamps.push(Date.now());
        calculateBpm();
        outputLastBpmToPage();
    }

    counterBtn.addEventListener('click', clickListener);
    resetBtn.addEventListener('click', reset);
})();