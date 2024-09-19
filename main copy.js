const url = "https://63000b629350a1e548e9abfc.mockapi.io/api/v1/student/";

// fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("starting to fetch");
//     console.log(data);
//     console.log("finished fetching");
//   })
//   .catch((error) => console.log(error));

// console.log("finished fetching");
// async/await

// async function getStudents() {
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }

// getStudents();

// const getStudents = async () => {
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// };

// getStudents();

async function getNames() {
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError) {
    } else if (error instanceof SyntaxError) {
    }
  } finally {
    console.log("always running");
  }

  console.log("outside try/catch");

  //   starting to fetch
  //  undefined
  // finished fetching

  //   const res = await fetch(url);

  //   let error;

  //   if (res.ok) {
  //     const data = await res.json();
  //     console.log(data);
  //   } else {
  //     error = "Something went wrong.";
  //     console.log(error);
  //   }
  //   console.log(res);
}

getNames();
