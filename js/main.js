class showTimer {
    constructor(
        timeTrackerList,
        startStreamButton,
        startShowButton,
        startMusicPauseButton,
        endMusicPauseButton,
        startTechnicalProblemsButton,
        endTechnicalProblemsButton,
        endShowButton,
        copyToClipoardTimestampsButton
    ) {
        this.timeTrackerList = timeTrackerList;
        this.startStreamButton = startStreamButton;
        this.startShowButton = startShowButton;
        this.startMusicPauseButton = startMusicPauseButton;
        this.endMusicPauseButton = endMusicPauseButton;
        this.startTechnicalProblemsButton = startTechnicalProblemsButton;
        this.endTechnicalProblemsButton = endTechnicalProblemsButton;
        this.endShowButton = endShowButton;
        this.copyToClipoardTimestampsButton = copyToClipoardTimestampsButton;
        this.streamStartDate;

        this.startStreamButton.onclick = () => (this.startStream());
        this.startShowButton.onclick = () => (this.startShow());
        this.startMusicPauseButton.onclick = () => (this.startMusicPause());
        this.endMusicPauseButton.onclick = () => (this.endMusicPause());
        this.startTechnicalProblemsButton.onclick = () => (this.startTechnicalProblems());
        this.endTechnicalProblemsButton.onclick = () => (this.endTechnicalProblems());
        this.endShowButton.onclick = () => (this.endShow());
        this.copyToClipoardTimestampsButton.onclick = () => (this.copyToClipBoardTimestamps());
    }

    startStream() {
        this.streamStartDate = new Date;
        this.startStreamButton.setAttribute("disabled", true);
        this.startShowButton.removeAttribute("disabled");
        this.startMusicPauseButton.removeAttribute("disabled");
        this.endMusicPauseButton.removeAttribute("disabled");
        this.startTechnicalProblemsButton.removeAttribute("disabled");
        this.endTechnicalProblemsButton.removeAttribute("disabled");
        this.endShowButton.removeAttribute("disabled");
    }

    startShow() {
        this.timeTrackerList.append(
            this.createTextListItem('Show started at:'),
            this.createTimeListItem()
        );
    }

    startMusicPause() {
        this.timeTrackerList.append(
            this.createTextListItem('Music Pause started at:'),
            this.createTimeListItem()
        );
    }

    endMusicPause() {
        this.timeTrackerList.append(
            this.createTextListItem('Music Pause ended at:'),
            this.createTimeListItem()
        );
    }

    startTechnicalProblems() {
        this.timeTrackerList.append(
            this.createTextListItem('Technical Problems started at:'),
            this.createTimeListItem()
        );
    }

    endTechnicalProblems() {
        this.timeTrackerList.append(
            this.createTextListItem('Technical Problems ended at:'),
            this.createTimeListItem()
        );
    }

    endShow() {
        this.timeTrackerList.append(
            this.createTextListItem('Show ended at:'),
            this.createTimeListItem()
        );
    }

    createTextListItem(text) {
        var textListItem = document.createElement('li');
        textListItem.innerHTML = text;
        textListItem.setAttribute('class', 'list-group-item');

        return textListItem;
    }

    createTimeListItem() {
        var timeListItem = document.createElement('li');
        timeListItem.innerHTML = this.getTimeFromStreamStart();
        timeListItem.setAttribute('class', 'list-group-item time-track');

        return timeListItem;
    }

    getTimeFromStreamStart() {
        var now = new Date;
        var timer = new Date (now - this.streamStartDate);
        var milliseconds = timer.getMilliseconds(),
            seconds = timer.getSeconds(),
            minutes = timer.getMinutes(),
            hours = timer.getUTCHours();

        if(milliseconds < 100){
            milliseconds = '0' + milliseconds;
        }
        if(seconds < 10){
            seconds = '0' + seconds;
        }
        if (minutes < 10){
            minutes = '0' + minutes;
        }

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    copyToClipBoardTimestamps() {
        var text = '';
        for (var listItem of document.getElementsByClassName('time-track')) {
            text += listItem.innerHTML + '\n';
        }

        // Hack found in the internet for copy of only required data
        var textArea = document.createElement("textarea");

        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';

        textArea.value = text;

        document.body.appendChild(textArea);

        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    }
}

var showTimerInstance = new showTimer(
    document.getElementById('timeTracker'),
    document.getElementById('startStreamButton'),
    document.getElementById('startShowButton'),
    document.getElementById('startMusicPauseButton'),
    document.getElementById('endMusicPauseButton'),
    document.getElementById('startTechnicalProblemsButton'),
    document.getElementById('endTechnicalProblemsButton'),
    document.getElementById('endShowButton'),
    document.getElementById('copyTimestampsToClipboard')
);

window.addEventListener("beforeunload", function (event) {
    var confirmationMessage = "\o/";

    event.returnValue = confirmationMessage;
    return confirmationMessage;
});
