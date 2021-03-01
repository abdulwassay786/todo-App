var list = document.getElementById("list");


firebase.database().ref('tasks').on('child_added',function(data){


    //list
    var li = document.createElement("li");
    var liText = document.createTextNode(data.val().value);
    li.appendChild(liText);
    li.setAttribute("class","task");

    
    //delete button
    var delBtn = document.createElement("button");
    var delText = document.createTextNode("Delete");
    delBtn.setAttribute("class","btn");
    delBtn.setAttribute("id",data.val().key);
    delBtn.setAttribute("onclick","deleteTask(this)");
    delBtn.appendChild(delText);

    //edit button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("Edit");
    editBtn.setAttribute("class","btn");
    editBtn.setAttribute("id",data.val().key);
    editBtn.appendChild(editText);
    editBtn.setAttribute("onclick","editTask(this)");


    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);

})



function addTodo(){
    var input = document.getElementById("todo_item");
    var key = firebase.database().ref('task').push().key;
    var todo = {
        value: input.value,
        key: key
    }
    firebase.database().ref('tasks').child(key).set(todo);



    

    input.value = "";
}

function deleteTask(e){
    firebase.database().ref('tasks').child(e.id).remove();
    e.parentNode.remove();


}

function editTask(e){
    var val = prompt("Enter edit task",e.parentNode.firstChild.nodeValue)
    var editTask = {
        value: val,
        key: e.id
    }
    firebase.database().ref('tasks').child(e.id).set(editTask);
    e.parentNode.firstChild.nodeValue = val;
   

}

function delAll(){
    list.innerHTML = "";
    // firebase.database().ref('tasks') = "";
    firebase.database().ref('tasks').remove();

}

