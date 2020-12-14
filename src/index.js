function Add() {
    let request = window.indexedDB.open("studentData", 1);
    request.onupgradeneeded = e => {
        db = e.target.result;
        db.createObjectStore("student_records", { keyPath: "RollNo" });
    }
    request.onsuccess = function (event) {
        db = event.target.result;
        let temp = request.result;
        console.log("DataBase Created!!");
        const tx = db.transaction("student_records", "readwrite");
        const sRecords = tx.objectStore("student_records");
        const rollno = document.getElementById("rollNo").value;
        const name = document.getElementById("name").value;
        const marks = document.getElementById("marks").value;
        const data = {
            RollNo: rollno,
            Name: name,
            Marks: marks
        };
        sRecords.add(data);
        const div = document.getElementById("result");
        const lresult = "<label>Added Successfully</label>"
        div.innerHTML = lresult;
    }
    request.onerror = () => {
        const div = document.getElementById("result");
        const lresult = "<label>Can't Add data</label>"
        div.innerHTML = lresult;
    }
}
function Search() {
    let request = window.indexedDB.open("studentData", 1);
    request.onupgradeneeded = e => {
        e.target.transaction.abort();
        const div = document.getElementById("result");
        const lresult = "<label>Database doesn't exists</label>"
        div.innerHTML = lresult;
    }
    request.onsuccess = function (event) {
        db = event.target.result;
        const tx = db.transaction("student_records", "readwrite");
        const sRecords = tx.objectStore("student_records");
        const rollno = document.getElementById("rollNo").value;
        const data = sRecords.get(rollno);
        data.onsuccess = () => {
            if (typeof data.result != "undefined") {
                const syntax=`<table>
                <tr>
                    <th>Name:</th>
                    <td>${data.result.Name}</td>
                </tr>
                <tr>
                    <th>Roll No:</th>
                    <td>${data.result.RollNo}</td>
                </tr>
                <tr>
                    <th>Marks:</th>
                    <td>${data.result.Marks}</td>
                </tr>
                </table>`
                const div = document.getElementById("result");
                div.innerHTML = syntax;
            }
            else{
                const div = document.getElementById("result");
                const lresult = "<label>No Record found</label>"
                div.innerHTML = lresult;
            }
        }
        data.onerror = () => {
            const div = document.getElementById("result");
            const lresult = "<label>Error:Can't open record</label>"
            div.innerHTML = lresult;
        }
    }
    request.onerror = () => {
        const div = document.getElementById("result");
        const lresult = "<label>Error:Can't open database</label>"
        div.innerHTML = lresult;
    }
}
function Delete() {
    let request = window.indexedDB.open("studentData", 1);
    request.onupgradeneeded = e => {
        e.target.transaction.abort();
        const div = document.getElementById("result");
        const lresult = "<label>Error:Database doesn't exists</label>"
        div.innerHTML = lresult;
    }
    request.onsuccess = function (event) {
        db = event.target.result;
        const tx = db.transaction("student_records", "readwrite");
        const sRecords = tx.objectStore("student_records");
        const rollno = document.getElementById("rollNo").value;
        const data = sRecords.delete(rollno);
        data.onsuccess = () => {
            if (typeof data.result == "undefined") {
                const syntax="Deleted Successfully"
                const div = document.getElementById("result");
                div.innerHTML = syntax;
            }
            else{
                const div = document.getElementById("result");
                const lresult = "<label>No Record found . Can't delete</label>"
                div.innerHTML = lresult;
            }
        }
        data.onerror = () => {
            const div = document.getElementById("result");
            const lresult = "<label>Error:Can't open record</label>"
            div.innerHTML = lresult;
        }
    }
    request.onerror = () => {
        const div = document.getElementById("result");
        const lresult = "<label>Error:Can't open database</label>"
        div.innerHTML = lresult;
    }
}