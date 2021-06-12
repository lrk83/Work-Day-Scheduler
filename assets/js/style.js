var currentDay = document.querySelector("#currentDay");
var rightNow = moment();
var tasks=[];

//Assign current day to the page
currentDay.textContent=rightNow.format("dddd, MMMM Do YYYY");

var checkTimes = function(){
    for(x=0;x<9;x++){
        if (moment(tasks[x].time).diff(moment())>0){
            if (moment(tasks[x].time).diff(moment(),"minutes")<60){
                console.log(tasks[x].name);
                var taskEl=document.getElementById(tasks[x].name)
                taskEl.setAttribute("class","col-8 time-block present");
            }else{
                var taskEl=document.getElementById(tasks[x].name);
                taskEl.setAttribute("class","col-8 time-block present");
            };
        }
    };
}

var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
    if (tasks===null){
        tasks=[];
        for(x=1;x<=9;x++){
            var taskDataObj = {
                name: "block"+x,
                location: document.querySelector("#block"+x),
                time: rightNow.format("MM.DD.YYYY")+" "+moment(document.querySelector("#time"+x).textContent, ["h:mm A"]).format("HH:mm"),
                tasksToDo: ""
            };
            tasks.push(taskDataObj);
        };
    };
    checkTimes();
}

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

    //save next text to the tasks array
    for(x=0;x<9;x++){
        if (tasks[x].location.id===$(this).closest(".time-block")[0].id){
            tasks[x].tasksToDo=text;
        }
    };

    // replace textarea with new content
    $(this).replaceWith(taskP);
});

$(".saveBtn").on("click", function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(JSON.parse(localStorage.getItem("tasks")));
    console.log(JSON.stringify(tasks));
});

loadTasks();