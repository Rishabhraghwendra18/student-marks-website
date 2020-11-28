function Add(){
    const div=document.getElementById("result");
    const lresult=document.createElement("label");
    lresult.setAttribute("class","lresult");
    div.append(lresult);
    lresult.innerHTML="Added Successfully";
}