const students = [];
let editingIndex = -1; 

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();


    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    let valid = true;

    if (!name){
        document.getElementById("errorName").textContent= "Debe llenar este campo";
        valid = false;
    }

    if (!lastName){
        document.getElementById("errorLastName").textContent= "Debe llenar este campo";
        valid= false;
    }

    if (isNaN(grade) || grade < 1 || grade > 7) {
        document.getElementById("errorGrade").textContent= "La nota debe ser entre 1 y 7";
        valid= false;
    }

    if (!valid) return;

    const student={name,lastName,grade};
    
    if (editingIndex=== -1) {
        
        students.push(student);
    } else {
        
        students[editingIndex]= student;
        editingIndex= -1; 
        document.querySelector("button[type='submit']").textContent= "Guardar";
    }

    updateTable();
    calcularPromedio();
    this.reset();
});

const tableBody = document.querySelector("#studentTable tbody");
const promDiv = document.getElementById("average");
const totalStudentsDiv = document.getElementById("totalStudents");
const examenDiv = document.getElementById("examen");
const eximidosDiv = document.getElementById("eximidos");


function updateTable() {
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.grade}</td>
            <td>
                <button class="btn-delete">Eliminar</button>
                <button class="btn-edit">Editar</button>
            </td>
        `;
        row.querySelector(".btn-delete").addEventListener("click", function() {
            borrarEstudiante(index);
        });
        row.querySelector(".btn-edit").addEventListener("click", function() {
            editarEstudiante(index);
        });
        tableBody.appendChild(row);
    });
}

function borrarEstudiante(index) {
    students.splice(index, 1);
    updateTable();
    calcularPromedio();
}

function editarEstudiante(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("lastname").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    editingIndex = index;
    document.querySelector("button[type='submit']").textContent = "Guardar";
}

function calcularPromedio() {
    if (students.length === 0) {
        promDiv.innerHTML = "Promedio General del curso: N/A";
        totalStudentsDiv.innerHTML = "Total de estudiantes: 0";
        examenDiv.innerHTML = "Estudiantes que deben rendir examen: 0";
        eximidosDiv.innerHTML = "Estudiantes eximidos: 0";
        return;
    }
    const total = students.reduce((acc, student) => acc + student.grade, 0);
    const average = total / students.length;
    const debenExamen = students.filter(student => student.grade < 5.0).length;
    const eximidos = students.filter(student => student.grade >= 5.0).length;

    promDiv.innerHTML = `Promedio General del curso: ${average.toFixed(2)}`;
    totalStudentsDiv.innerHTML = `Total de estudiantes: ${students.length}`;
    examenDiv.innerHTML = `Estudiantes que deben rendir examen: ${debenExamen}`;
    eximidosDiv.innerHTML = `Estudiantes eximidos: ${eximidos}`;
}

updateTable();
calcularPromedio();