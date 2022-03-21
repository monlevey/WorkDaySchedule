const timer = $("#current-day");
const timeblockContainer = $(".container");
const timeNow = moment(); 

// when the page loads

// show the timer
setInterval(function(){
    timer.text(moment().format("DD-MM-YYYY HH:mm:ss"));
}, 1000);

function createRow(time) {
    const row = $("<div>").attr("class", "row");
    const timeCol = $("<article>").attr("class", "col-2");
    const timeSpan = $("<span>").text(time + ":00");
    timeCol.append(timeSpan);
    row.append(timeCol);
// Change the colour of the row depending on if it is current, past or future.
    const isPast = time < Number(timeNow.format("H"));
    const isCurrent = time >= Number(timeNow.format("H")) && time <= ( Number(timeNow.format("H")) + 1);
    const isFuture = time > Number(timeNow.format('H'));

    let colorClass;
    // if the row belongs to time past
    // give it (.past)
    if(isPast){
        colorClass = 'past'
    }
    // if the row belongs to time present
    // give it (.present)
    if(isCurrent){
        colorClass = 'present'
    }
    // if the row belongs to time future
    // give it (.future)
    if(isFuture){
        colorClass = 'future';
    }

    const textareaCol = $("<article>").attr("class", "col-8 " + colorClass );
    const textarea = $("<textarea>");
    // attempt to find existing note in local storage
    // if exist then load content into textarea
    const existingNote = localStorage.getItem(time + ":00");
    if (existingNote) {
        textarea.val(existingNote);
    }
    // render the note in the text area
    textareaCol.append(textarea);
    row.append(textareaCol);

    const buttonCol = $("<article>").attr("class", "col-2");
    const button = $("<button>").attr("class", "btn btn-primary save-button");
    button.text("Save");
    buttonCol.append(button);
    row.append(buttonCol);

    return row;
}

const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
// generate all the timeblock rows 8am until 6pm
for (let index = 0; index < times.length; index++) {
    const time = times[index];
    const row = createRow(time);
    timeblockContainer.append(row);
}

// when the user clicks on the save button, each time for a row
$(document).on("click", ".save-button", function (event) {
    // save the content in the current row textarea to local storage
    // get the content of textarea
    const saveButton = $(event.target);
    const saveButtonColumn = saveButton.parent();
    const textarea = saveButtonColumn.prev().children();
    const userInput = textarea.val()
    // use the time 
    const timeSpan = saveButtonColumn.prev().prev().children();
    const timeOfRow = timeSpan.text();
    // save it
    localStorage.setItem(timeOfRow, userInput);
});

// When the user clicks on the Reset All button
$(document).on("click", "#reset-button", function (event){
    // clear local storage
    localStorage.clear();
    window.location.reload();
});

