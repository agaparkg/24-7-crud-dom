const url = "https://63000b629350a1e548e9abfc.mockapi.io/api/v1/students/";
const tableBody = document.querySelector("tbody");
const addStudentBtn = document.querySelector("#add-student");
const closeModal = document.querySelector("#close-modal");
const submitModal = document.querySelector("#submit-modal");
const myModal = document.querySelector("#myModal");

let studentId;

function fetchStudents() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      createStudents(data);
    })
    .catch((error) => console.log(error));
}

fetchStudents();

// window.deleteStudent = deleteStudent;

function createStudents(students) {
  tableBody.innerHTML = "";

  if (students.length) {
    students.forEach((student) => {
      // {age: 2, fname: "Alex"}
      const { fname, lname, id } = student;

      const newStudent = `<tr>
                                <td>${id}</td>
                                <td>${fname}</td>
                                <td>${lname}</td>
                                <td>
                                    <button id="edit" type="button" class="btn btn-secondary">
                                    <i class="bi bi-pencil"></i>
                                    </button>
                                    <button onclick="deleteStudent(${id})" id="delete" type="button" class="btn btn-danger">
                                    <i class="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>`;
      tableBody.innerHTML += newStudent;
    });
  } else {
    tableBody.innerHTML = `<tr>
                                <td colspan="4">No data found!</td>
                            </tr>`;
  }
}

function deleteStudent(id) {
  studentId = id;
}

function fetchDeleteStudent(id) {
  fetch(url + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(`Student with id ${data.id} has been deleted!`);
      fetchStudents();
    })
    .catch((error) => console.log(error));
}

// POST - CREATE
// GET  - READ
// PATCH/PUT - UPDATE
// DELETE - DELETE

addStudentBtn.addEventListener("click", () => {
  const modal = bootstrap.Modal.getOrCreateInstance(myModal);
  modal.show();
});

closeModal.addEventListener("click", () => {
  const modal = bootstrap.Modal.getOrCreateInstance(myModal);
  modal.hide();
});

submitModal.addEventListener("click", () => {
  fetchDeleteStudent(studentId);
  const modal = bootstrap.Modal.getOrCreateInstance(myModal);
  modal.hide();
});
