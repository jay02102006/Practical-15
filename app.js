let students = [];
let editingIndex = null;

// Store students in local storage
const storeStudents = () => {
  localStorage.setItem('students', JSON.stringify(students));
};

// Function to display students in the table
function displayStudents() {
  const tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = ""; // Clear the table body

  students.forEach((student, index) => {
    const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>${student.Id}</td>
                <td>${student.Branch}</td>
                <td>${student.Batch}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
  storeStudents(); // Store students in local storage
}
// Load students from local storage
const loadStudents = () => {
  const storedStudents = localStorage.getItem('students');
  if (storedStudents) {
      console.log("sgdrgt")
      students = JSON.parse(storedStudents);
      displayStudents();
  } else {
      students = [];
  }
};

loadStudents(); // Load students from local storage when the page loads

function addStudent(name,age,grade,Id,Branch,Batch) {
  students.push({ name,age,grade,Id,Branch,Batch });
  displayStudents();
}

// Handle form submission
document
  .getElementById("studentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const Id = document.getElementById("Id").value;
    const Branch = document.querySelector("input[name='Branch']:checked")?.value;
    const Batch = document.getElementById("Batch").value;
    console.log(Branch);


    if (editingIndex !== null) {
      students[editingIndex] = { name, age, grade,Id,Branch,Batch };
      editingIndex = null;
    } else {
      addStudent(name, age, grade,Id,Branch,Batch);
    }

    displayStudents();
    storeStudents(); // Store students in local storage

    // Reset form fields
    document.getElementById("studentForm").reset();
  });

// Function to edit a student
function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("grade").value = student.grade;
  document.getElementById("Id").value = student.Id;
  document.getElementById("Branch").value = student.Branch;
  document.getElementById("Batch").value = student.Batch;
  document.querySelector("button[type=submit]").innerText = "Save";
  editingIndex = index;
}

// Function to delete a student
function deleteStudent(index) {
  students.splice(index, 1); // Remove student from array
  displayStudents(); // Refresh the table
}