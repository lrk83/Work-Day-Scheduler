var currentDay = document.querySelector("#currentDay");
var rightNow = moment();
var tasks=[];


//Assign current day to the page
currentDay.textContent=rightNow.format("dddd, MMMM Do YYYY");

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

var loadTaskstoDo = function(){
    for (x=1;x<=9;x++){
        document.querySelector("#block"+x).innerHTML="<p>"+tasks[x-1].tasksToDo+"<p>";
    };
}

var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"));
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
        for(x=1;x<=9;x++){
            tasks[x-1].time=rightNow.format("MM.DD.YYYY")+" "+moment(document.querySelector("#time"+x).textContent, ["h:mm A"]).format("HH:mm")
        };
    };
    checkTimes();
    loadTaskstoDo();
};



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
  
// editable field was un-focused
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

$(".saveBtn").on("click", function(){
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