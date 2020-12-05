function Add(){
    CreateDb();
    const div=document.getElementById("result");
    const lresult=document.createElement("label");
    lresult.setAttribute("class","lresult");
    div.append(lresult);
    lresult.innerHTML="Added Successfully";
}
function CreateDb(){
    let request=window.indexedDB.open("studentData",1);
    var db;
    request.onupgradeneeded=e=>{
        db=e.target.result;
        console.log(`in onupgradedneeded ${db}`);
        db.createObjectStore("student_records",{keyPath:"RollNo"});
    }
    request.onsuccess=function(event){
        db=event.target.result;
        let temp=request.result;
        console.log("DataBase Created!!");
        const tx=db.transaction("student_records","readwrite");
        const sRecords=tx.objectStore("student_records");
        const rollno=document.getElementById("rollNo").value;
        const name=document.getElementById("name").value;
        const marks=document.getElementById("marks").value;
        const data={
            RollNo:rollno,
            Name:name,
            Marks:marks
        };
        sRecords.add(data);
    }
}