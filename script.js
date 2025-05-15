const students=[]

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastname=document.getElementById("lastname").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);

    if(grade>7 || grade<1 || !name || !lastname || isNaN(grade)){
        alert("Error al ingresar los datos")
            return
    }
     const student={name,lastname,grade}
     students.push(student)
     console.log(students)
     addstudentToTable(student)
     calcularPromedio()
     this.reset();

})
const tablebody=document.querySelector("#studentTable tbody")
function addstudentToTable(student){
    const row=document.createElement("tr")
    row.innerHTML= `
    <td>${student.name}</td>
    <td>${student.lastname}</td>
    <td>${student.grade}</td>
    `;
tablebody.appendChild(row)
}

const promDiv=document.getElementById("average");
function calcularPromedio(){
    if(students.length===0){
        promDiv.innerHTML="Promedio General del Curso : N/A";
            return
        
    }
    /*calcular el promedio*/
   const total=students.reduce((acc,students)=>acc+students.grade,0);
   const average=total/students.length;
   promDiv.innerHTML=`Promedio General del Curso : ${average.toFixed(2)}`;
}