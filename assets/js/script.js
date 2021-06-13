var currentDay = document.querySelector("#currentDay");
var rightNow = moment();
var tasks=[];

//Assign current day to the page
currentDay.textContent=rightNow.format("dddd, MMMM Do YYYY");

//Compare each time block to the current moment, and assign the right color
var checkTimes = function(){
    for(x=0;x<9;x++){
        if (moment(tasks[x].time).diff(moment())>0){
            if (moment(tasks[x].time).diff(moment(),"minutes")<60){
                var taskEl=document.getElementById(tasks[x].name)
                taskEl.setAttribute("class","col-8 time-block present");
            }else{
                var taskEl=document.getElementById(tasks[x].name);
                taskEl.setAttribute("class","col-8 time-block future");
            };
        };
    };
};

//Load the tasks to do text from lcoal storage
var loadTaskstoDo = function(){
    for (x=1;x<=9;x++){
        document.querySelector("#block"+x).innerHTML="<p>"+tasks[x-1].tasksToDo+"<p>";
    };
}

//Load any tasks saved in local storage
var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"));

    //If there are no tasks saved, make a new array to track tasks
    if (tasks===null){
        tasks=[];
        for(x=1;x<=9;x++){
            var taskDataObj = {
                name: "block"+x,
                time: rightNow.format("MM.DD.YYYY")+" "+moment(document.querySelector("#time"+x).textContent, ["h:mm A"]).format("HH:mm"),
                tasksToDo: "",
                btn: "btn"+x,
            };
            tasks.push(taskDataObj);
        };
    }else{
        //If there are tasks saved, update their times
        for(x=1;x<=9;x++){
            tasks[x-1].time=rightNow.format("MM.DD.YYYY")+" "+moment(document.querySelector("#time"+x).textContent, ["h:mm A"]).format("HH:mm")
        };
    };
    checkTimes();
    loadTaskstoDo();
};


//When time-blocks are clicked on make them into a textarea
$(".time-block").on("click", "p", function() {
    // get current text of p element
    var text = $(this)
      .text()
      .trim();
  
    // replace p element with a new textarea
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);
  
    // auto focus new element
    textInput.trigger("focus");
});
  
//When textareas are clicked away from, keep track of text the user has entered
$(".time-block").on("blur", "textarea", function() {
    // get current value of textarea
    var text = $(this).val();
    
    // recreate p element
    var taskP = $("<p>")
        .text(text);

    //save text to the tasks array
    for (x=0;x<9;x++){
        if (tasks[x].name===$(this).closest(".time-block")[0].id){
            tasks[x].tasksToDo=text;
        };
    };

    // replace textarea with new content
    $(this).replaceWith(taskP);
});


//When save button is clicked save the text of the corresponding time-block
$(".saveBtn").on("click", function(){

    //Load a local tasks object so that I can save the text of this specific time block
    var tasksForSaving=JSON.parse(localStorage.getItem("tasks"));
    if (tasksForSaving===null){
        tasksForSaving=[];
        for(x=1;x<=9;x++){
            var taskDataObj = {
                name: "block"+x,
                time: rightNow.format("MM.DD.YYYY")+" "+moment(document.querySelector("#time"+x).textContent, ["h:mm A"]).format("HH:mm"),
                tasksToDo: "",
                btn: "btn"+x,
            };
            tasksForSaving.push(taskDataObj);
        };
    };
    for (x=0;x<9;x++){
        console.log($(this)[0].id);
        console.log(tasks[x].btn);
        if (tasks[x].btn===$(this)[0].id){
            tasksForSaving[x].tasksToDo=tasks[x].tasksToDo;
        };
    };
    localStorage.setItem("tasks", JSON.stringify(tasksForSaving));
});

loadTasks();