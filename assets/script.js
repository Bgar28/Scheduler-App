// set the current day
let today = moment().format("dddd, MMMM Do");
// set the current hour
let current = moment().format("H A");

// set hour in military time
let currentHour = moment().format('HHmm')
console.log('time',moment().format('HHmm') ) 


// displays current day in header
$('#currentDay').text(today);

// array containing hours of day and empty to-do textarea
let hourlyDay = [
    {time: '0900', todo: ''}, 
    {time: '1000', todo: ''},
    {time: '1100', todo: ''},
    {time: '1200', todo: ''},
    {time: '1300', todo: ''}, 
    {time: '1400', todo: ''},
    {time: '1500', todo: ''},
    {time: '1600', todo: ''},
    {time: '1700', todo: ''},
    {time: '1800', todo: ''},
];


// loop through the hours of day and empty to-do category
for(let i=0; i<hourlyDay.length; i++){
    const timeblockEl = $('<div>');
    const time = parseInt(hourlyDay[i].time)
    timeblockEl.addClass('row time-block');
    if(currentHour>time){
        timeblockEl.addClass('past')
    }
    else if(currentHour<time){
        timeblockEl.addClass('future')
    }
    else{
        timeblockEl.addClass('present')
    }

// displays the hours in HH:MM format
    const hourEl = $('<p>');
    hourEl.addClass('hour');
    const formattedTime = hourlyDay[i].time.substring(0, 2) + ':' + hourlyDay[i].time.substring(2)
    hourEl.text(formattedTime);

    const textareaEl = $('<textarea>');
    textareaEl.addClass('description');

    
    var todoText = JSON.parse(localStorage.getItem("data"))
    if (todoText) {
        var todoText = JSON.parse(localStorage.getItem("data"))[i].todo  
        textareaEl.val(todoText)
    }

    const buttonEl = $('<button>');
    buttonEl.attr('id', i);
    buttonEl.addClass('saveBtn');
    buttonEl.text('Save');
   
    /* takes text from todo input and saves to local storage
    then continues to take additional text entered and save to local storage
    */
    buttonEl.on('click', function () {
        let textContent = this.previousSibling.value;
        const data = JSON.parse(localStorage.getItem("data"));
        if (data) {
            data[i].todo = textContent;
            localStorage.setItem("data", JSON.stringify(data));
            return;
        }
        
        hourlyDay[i].todo = textContent;
        localStorage.setItem("data", JSON.stringify(hourlyDay));
      });
      


    timeblockEl.append(hourEl);
    timeblockEl.append(textareaEl);
    timeblockEl.append(buttonEl);

    const containerEl = $('.container');
    containerEl.append(timeblockEl);

}