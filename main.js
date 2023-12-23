let tasks = [
    {
        "title": "قراءة كتاب " ,
        "date" : "15/10/2023" ,
        "isDone" : true
    },
    {
        "title": "إنهاء المشروع ",
        "date" : "15/10/2023",
        "isDone" : false 
    },
    {
        "title": "إنهاء الكورس ",
        "date" : "15/10/2023",
        "isDone" : true
    }
]

function getTaskFromStorage(){
    let rtrievedTasks  =JSON.parse(localStorage.getItem("tasks"))
    tasks = rtrievedTasks ?? []
}
getTaskFromStorage();
function fillTasksOnThePage (){
document.getElementById("tasks").innerHTML = ""
    let index= 0;
    for (task of tasks ){
let content =  ` <!--Task-->
            <div class="task ${task.isDone ?'done':''}">
                <!--Task info-->
                <div class="task-info">
                    <h2>${task.title}</h2>
                    <div>
                        <span class="material-symbols-outlined">
                            calendar_month
                            </span>
                        <span>${task.date}</span>
                    </div>
                </div>
                <!--End Task info-->
                <!--Task action-->
                <div class="buttons task-action">
                    <button onclick="deleteTask(${index})" class="circular del-btn">
                        <span class="material-symbols-outlined">
                            delete
                            </span>
                    </button>
                    ${task.isDone ? `
                        <button onclick="toggleTaskCompletion(${index})" class="circular cancel-btn" >
                        <span class="material-symbols-outlined">
                            cancel
                            </span>
                    </button>
                        `:
                    `<button onclick="toggleTaskCompletion(${index})" class="circular done-btn">
                        <span class="material-symbols-outlined">
                            done
                            </span>
                    </button>`}
                    
                    <button onclick="editTask(${index})" class="circular edit-btn">
                        <span class="material-symbols-outlined">
                            edit
                            </span>
                    </button>
                </div>
                <!--End Task action-->
            </div>
            <!--End Task-->`
            document.getElementById("tasks").innerHTML += content ;
            index++
    }}
    fillTasksOnThePage();
    document.getElementById("add-btn").addEventListener("click",function(){
        let now = new Date();
        let date = now.getDate() + "/" + (now.getMonth()+ 1) +"/" +now.getFullYear();

        let taskName = prompt("Enter a title of the task");
        // let date = 
        let taskObj = {
            "title" : taskName,
            "date" : date ,
            "isDone" : false 
        }
        tasks.push(taskObj);

        storeTasks();
        fillTasksOnThePage();
        })

        function editTask(index){
            let task = tasks[index]
            let newTaskTitle = prompt("الرجاء تحديد اسم المهمة الجديد:",task.title)
            task.title = newTaskTitle
            storeTasks();
            fillTasksOnThePage();
        }

        function deleteTask(index){
            let task = tasks[index]
        let isConfirmed = confirm ("هل أنت متأكد أنك تريد حذف مهمة" + task.title);
        if(isConfirmed){
            tasks.splice(index, 1)
            storeTasks();
            fillTasksOnThePage();
        }
        }

        function toggleTaskCompletion(index){
            let task = tasks[index];
            task.isDone = ! task.isDone;
            storeTasks();
            fillTasksOnThePage();
        }

        function storeTasks (){
            let tasksString = JSON.stringify(tasks)
        localStorage.setItem("tasks",tasksString); 
        }