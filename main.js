const url = "https://63000b629350a1e548e9abfc.mockapi.io/api/v1/students/";
const tableBody = document.querySelector("tbody");
const addStudentBtn = document.querySelector("#add-student");

// ------------ Bootstrap Modal ------------
// const myModal = bootstrap.Modal.getOrCreateInstance("#myModal");
const myModal = new bootstrap.Modal("#myModal");
const modalTitle = document.querySelector(".modal-title");
const modalBody = document.querySelector(".modal-body");
const modalFooter = document.querySelector(".modal-footer");
// ------------ Bootstrap Modal ------------

// ------------ Search ------------
const searchGlassIcon = document.querySelector("#search-glass");
const searchClearIcon = document.querySelector("#search-clear");
const searchInput = document.querySelector("#search-input");
// ------------ Search ------------

let allStudents = [];

function fetchStudents() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allStudents = data;
      createStudents(allStudents);
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
      const { fname, lname, id, email, github, avatar } = student;

      const newStudent = `<tr>
                                <td>${id}</td>
                                <td>
                                    <img src="${avatar}" alt="" width="100" />
                                </td>
                                <td>${fname}</td>
                                <td>${lname}</td>
                                <td>${email}</td>
                                <td>${github}</td>
                                <td>
                                    <button onclick="editStudent(${id})" id="edit" type="button" class="btn btn-secondary">
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
                                <td colspan="6">No data found!</td>
                            </tr>`;
  }
}

function editStudent(id) {
  const currStudent = allStudents.find((student) => student.id == id);

  const { fname, lname } = currStudent;

  const mBody = `<form onsubmit="submitFormData(event, true, ${id})">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label"
                      >First Name</label
                    >
                    <div class="col-sm-10">
                      <input value="${fname}" required type="text" class="form-control modal-inputs" id="fname" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label"
                      >Last Name</label
                    >
                    <div class="col-sm-10">
                      <input value="${lname}" required type="text" class="form-control modal-inputs" id="lname" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-10">
                      <button
                        data-bs-dismiss="modal"
                        type="button"
                        class="btn btn-secondary"
                        id="close-modal"
                      >
                        Cancel
                      </button>
                      <button id="submit-modal" type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>`;
  const mFooter = "";
  displayModalAndContent("Edit Student", mBody, mFooter);
}

function deleteStudent(id) {
  const mBody = `<p>Are you sure you wanna delete student with id <strong>${id}</strong></p>`;
  const mFooter = `<button
                    data-bs-dismiss="modal"
                    type="button"
                    class="btn btn-secondary"
                    id="close-modal"
                  >
                    No
                  </button>
                  <button onclick="yesDeleteStudent('${id}')" id="submit-modal" type="button" class="btn btn-primary">
                    Yes
                  </button>`;
  displayModalAndContent("Delete A Student?", mBody, mFooter);
}

function yesDeleteStudent(id) {
  const options = {
    method: "DELETE",
  };
  fetch(url + id, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(`Student with id ${data.id} has been deleted!`);
      fetchStudents();
      myModal.hide();
    })
    .catch((error) => console.log(error));
}

// POST - CREATE
// GET  - READ
// PATCH/PUT - UPDATE
// DELETE - DELETE

addStudentBtn.addEventListener("click", () => {
  const mBody = `<form onsubmit="submitFormData(event, false, null)">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label"
                      >First Name</label
                    >
                    <div class="col-sm-10">
                      <input required type="text" class="form-control modal-inputs" id="fname" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label"
                      >Last Name</label
                    >
                    <div class="col-sm-10">
                      <input required type="text" class="form-control modal-inputs" id="lname" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-10">
                      <button
                        data-bs-dismiss="modal"
                        type="button"
                        class="btn btn-secondary"
                        id="close-modal"
                      >
                        Cancel
                      </button>
                      <button id="submit-modal" type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>`;
  const mFooter = "";
  displayModalAndContent("Add New Student", mBody, mFooter);
});

function submitFormData(event, editMode, id) {
  event.preventDefault();

  // const modal = document.querySelector("#myModal");
  const inputElements = document.querySelectorAll("input.modal-inputs");

  const formData = {};

  for (let input of inputElements) {
    formData[input.id] = input.value;
  }

  // fetch with POST method

  const options = {
    method: editMode ? "PUT" : "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(formData),
  };

  const customUrl = editMode ? url + id : url;

  fetch(customUrl, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(
        `Student with id ${data.id} has been successfully ${
          editMode ? "updated" : "added"
        }!`
      );
      fetchStudents();
      myModal.hide();
    })
    .catch((error) => console.log(error));
}

function displayModalAndContent(title, body, footer) {
  myModal.show();
  modalTitle.innerHTML = title;
  modalBody.innerHTML = body;
  modalFooter.innerHTML = footer;
}

searchInput.addEventListener("keyup", (event) => {
  const value = event.target.value.trim().toLowerCase();
  let filteredStudents = [];

  if (value !== "") {
    searchGlassIcon.classList.add("d-none");
    searchClearIcon.classList.remove("d-none");

    filteredStudents = allStudents.filter((student) => {
      return (
        student.fname.toLowerCase().includes(value) ||
        student.lname.toLowerCase().includes(value)
      );
    });

    createStudents(filteredStudents);
  } else {
    searchGlassIcon.classList.remove("d-none");
    searchClearIcon.classList.add("d-none");
    createStudents(allStudents);
  }
});

searchClearIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchGlassIcon.classList.remove("d-none");
  searchClearIcon.classList.add("d-none");

  createStudents(allStudents);
});
