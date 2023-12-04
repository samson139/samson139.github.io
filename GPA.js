let $ = function (id) {
  return document.getElementById(id);
};

let scoreFromGrade = function (grade) {
  if (grade == "A" || grade == "a") {
    return 4;
  } else if (grade == "B" || grade == "b") {
    return 3;
  } else if (grade == "C" || grade == "c") {
    return 2.5;
  } else if (grade == "D" || grade == "d") {
    return 1.5;
  } else if (grade == "F" || grade == "f") {
    return 0;
  } else {
  }
};
let clearAlerts = function () {
  for (let i = 0; i <= 5; i++) {
    $("creditAlert").textContent = "";
    $("gradeAlert").textContent = "";
  }
};

let calculateGPA = function (event) {
  event.preventDefault();
  let totalScore = 0;
  let totalCredits = 0;

  for (let i = 1; i <= 2; i++) {
    let creditInput = $(`credithours${i}`).value;
    let gradeInput = $(`grade${i}`).value;
    let credit = parseInt(creditInput);
    let text1 = $("creditAlert");
    let text2 = $("gradeAlert");
    if (credithours1.value.trim() === "") {
      text1.textContent = "* Credit hours field at course 1 is empty";
      return;
    }
    if (credithours2.value.trim() === "") {
      text1.textContent = "* Credit hours field at course 2 is empty";
      return;
    }
    if (isNaN(credit) || credit < 0) {
      text1.textContent = `* Invalid credit hours entered at course ${i}`;
      return;
    }
    if (credit !== 3 && credit !== 4) {
      text1.textContent = `* Invalid credit hours entered at course ${i}`;
      return;
    }
    if (credit == 3 || credit == 4) {
      text1.textContent = "";
      text2.textContent = "";
    }

    if (
      gradeInput.toUpperCase() === "A" ||
      gradeInput.toUpperCase() === "B" ||
      gradeInput.toUpperCase() === "C" ||
      gradeInput.toUpperCase() === "D" ||
      gradeInput.toUpperCase() === "F"
    ) {
      text2.textContent = "";
      let numGrade = scoreFromGrade(gradeInput.toUpperCase());
      if (!isNaN(numGrade)) {
        totalScore += credit * numGrade;
        totalCredits += credit;
      } else {
        text2.textContent = `* Invalid grades entered at course ${i}`;
        return;
      }
    } else {
      text2.textContent = `* Invalid grades entered at course ${i}`;
      return;
    }
  }

  for (let i = 3; i <= 5; i++) {
    let creditInput = $(`credithours${i}`).value;
    let gradeInput = $(`grade${i}`).value;

    if (creditInput.trim() === "" && gradeInput.trim() === "") {
      continue;
    }

    let credit = parseInt(creditInput);

    if (creditInput.trim() !== "" && (isNaN(credit) || credit < 0)) {
      text1.textContent = `* Invalid credit hours entered at course ${i}`;
      return;
    }

    if (
      gradeInput.trim() !== "" &&
      (gradeInput.toUpperCase() === "A" ||
        gradeInput.toUpperCase() === "B" ||
        gradeInput.toUpperCase() === "C" ||
        gradeInput.toUpperCase() === "D" ||
        gradeInput.toUpperCase() === "F")
    ) {
      let numGrade = scoreFromGrade(gradeInput.toUpperCase());
      if (!isNaN(numGrade)) {
        totalScore += credit * numGrade;
        totalCredits += credit;
      } else {
        text2.textContent = `* Invalid grades entered at course ${i}`;
        return;
      }
    } else if (gradeInput.trim() !== "") {
      text2.textContent = `* Invalid grades entered at course ${i}`;
      return;
    }
  }

  if (totalCredits === 0) {
    alert("No valid credits entered");
    return;
  }

  let averageGPA = totalScore / totalCredits;
  $("gpa").value = averageGPA.toFixed(1);
};
window.onload = function () {
  $("submit").onclick = calculateGPA;
  $("reset").onclick = clearAlerts;
};
