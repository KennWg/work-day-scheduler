var schedule = [];

//load schedule function
var loadSchedule = function (){
    schedule = JSON.parse(localStorage.getItem("schedule"));
    if(!schedule){
        schedule = [];
    }

    //iterate and populate text
    $.each(schedule,function(index,value){
        $(".time-block").eq(index).find("p").text(value);
    });
};

//event container clicked - edit data
$(".event-container").on("click",function(){
    
    //grab existing text if it exists and replace p with textarea
    var text = $(this).find("p").text().trim();
    var textArea = $("<textarea>").addClass("form-control").val(text);
    $(this).find("p").replaceWith(textArea);
    textArea.trigger("focus");
});

//event container clicked off - changed back into textbox
$(".event-container").on("blur","textarea",function(){

    //grab text and convert back into p
    var textArea = $(this).val().trim();
    var text = $("<p>").text(textArea);
    $(this).replaceWith(text);
});

//save button clicked - save data
$(".saveBtn").on("click",function(){
    var index = $(this).closest(".time-block").index();
    var text = $(this).parent().find("p").text();
    schedule[index] = text;

    //add schedule to local storage
    localStorage.setItem("schedule", JSON.stringify(schedule));
});

//populate date function
var setDate = function(){
    $("#currentDay").text(moment().format("dddd MMMM Do, YYYY"));
};

//change colors based on time
var changeColor = function(){
    $(".event-container").removeClass("past present future");
    $(".time-container").each(function(){
        var time = moment($(this).text(),"LT");
        if(moment().isSame(time, 'hour')){
            $(this).parent().find(".event-container").addClass("present");
        }
        else if(moment().isAfter(time)){
            $(this).parent().find(".event-container").addClass("past");
        }
        else{
            $(this).parent().find(".event-container").addClass("future");
        }
    });
};

//interval function to update every 5 minutes
setInterval(function(){
    changeColor();
    setDate();
},300000)

//initial load
loadSchedule();
setDate();
changeColor();