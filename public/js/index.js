/// front end file validation
let file_des=document.getElementById('file_des');
  
let text=file_des.textContent;
function getName() {
    let file=document.getElementById('myFileinput').value;
    
    let fname=file.substring(12);
  
   
    
    if (!file.endsWith("csv")) {
        document.getElementById('upload').style.visibility="hidden";
        file_des.textContent="selected file is not csv file please select a csv file"+"  "+text;
    }else{
        document.getElementById('upload').style.visibility="revert";
        file_des.textContent=fname+" OR "+text;
    }
    
    
}
