const classA = [
  {
    name: "Pliffisson",
    grade: 2,
  },

  {
    name: "Levi",
    grade: 10,
  },

  {
    name: "Fulano",
    grade: 2,
  },

  {
    name: "Lucsa",
    grade: 3,
  },
];

const classB = [
  {
    name: "Carlos",
    grade: 7,
  },

  {
    name: "Goku",
    grade: 5,
  },

  {
    name: "Say",
    grade: 2,
  },

  {
    name: "Gustavo",
    grade: 8,
  },
];

function calculateAverad(students) {
  let sum = 0;

  for (let i = 0; i < students.length; i++) {
    sum = sum + students[i].grade;

    console.log(i);
  }

  const average = sum / students.length;
  return average;
}

function sendMessage(average, classed) {
  if (average > 5) {
    console.log(`${classed} average: ${average}. Congrats`);
  } else {
    console.log(`${classed} average: ${average}. Is not good`);
  }
}

function markAsFlunkeds(student) {
  student.flunked = false;
  if (student.grade < 5) {
    student.flunked = true;
  }
}

function sendFlunkedMessage(student) {
  if (student.flunked) {
    console.log(`Student ${student.name} this flunked!`);
  }
}

function failedStudents(students) {
  for (let student of students) {
    markAsFlunkeds(student);
    sendFlunkedMessage(student);
  }
}

const average1 = calculateAverad(classA);
const average2 = calculateAverad(classB);

sendMessage(average1, "Class A");
sendMessage(average2, "Class B");

failedStudents(classA);
failedStudents(classB);
