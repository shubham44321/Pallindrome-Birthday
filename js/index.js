const form = document.getElementById("form");
const dob = document.getElementById("dob");
const log = console.log;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("res").innerHTML = "";
  document.getElementById("loader").classList.remove("hidden");
  let finalResult = "";
  setTimeout(() => {
    let newDate = dob.value.split("-");
    let formattedDate = newDate[1] + "-" + newDate[2] + "-" + newDate[0];
    const dateinDDMMYYYY = getDateinDDMMYYYY(formattedDate);
    const dateinMMDDYY = getDateinMMDDYY(formattedDate);
    const dateinMMDDYYYY = getDateinMMDDYYYY(formattedDate);
    const isPallindromeDateinDDMMYYYY = isPallindrome(dateinDDMMYYYY);
    const isPallindromeDateinMMDDYY = isPallindrome(dateinMMDDYY);
    const isPallindromeDateinMMDDYYYY = isPallindrome(dateinMMDDYYYY);
    if (
      isPallindromeDateinDDMMYYYY ||
      isPallindromeDateinMMDDYY ||
      isPallindromeDateinMMDDYYYY
    ) {
      let res = isPallindromeDateinDDMMYYYY
        ? _getDateinDDMMYYYY(formattedDate)
        : isPallindromeDateinMMDDYY
        ? _getDateinMMDDYY(formattedDate)
        : isPallindromeDateinMMDDYYYY
        ? formattedDate
        : "";
      finalResult = `Whoa!!! Your birthdate in format ${res} is palindrome`;
    } else {
      finalResult = nearestPallindrome(formattedDate);
    }
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("res").innerHTML = finalResult;
  }, 5000);
});

function getDateinDDMMYYYY(date) {
  let newDate = date.split("-");
  let formattedDate = newDate[1] + newDate[0] + newDate[2];
  return formattedDate;
}

function getDateinMMDDYY(date) {
  let newDate = date.split("-");
  let formattedDate = newDate[0] + newDate[1] + newDate[2].slice(2, 4);
  return formattedDate;
}

function getDateinMMDDYYYY(date) {
  return date.replaceAll("-", "");
}

function _getDateinDDMMYYYY(date) {
  let newDate = date.split("-");
  let formattedDate = newDate[1] + "-" + newDate[0] + "-" + newDate[2];
  return formattedDate;
}

function _getDateinMMDDYY(date) {
  let newDate = date.split("-");
  let formattedDate =
    newDate[0] + "-" + newDate[1] + "-" + newDate[2].slice(2, 4);
  return formattedDate;
}

function getNextDate(formattedDate) {
  let parsedDate = new Date(formattedDate);
  parsedDate.setDate(parsedDate.getDate() + 1);
  let dd =
    parsedDate.getDate() >= 10
      ? parsedDate.getDate()
      : "0" + parsedDate.getDate();
  let month = parsedDate.getMonth() + 1;
  let MM = month >= 10 ? month : "0" + month;
  let yyyy = parsedDate.getFullYear();
  return MM + "-" + dd + "-" + yyyy;
}

function getPreviousDate(formattedDate) {
  let parsedDate = new Date(formattedDate);
  parsedDate.setDate(parsedDate.getDate() - 1);
  let dd =
    parsedDate.getDate() >= 10
      ? parsedDate.getDate()
      : "0" + parsedDate.getDate();
  let month = parsedDate.getMonth() + 1;
  let MM = month >= 10 ? month : "0" + month;
  let yyyy = parsedDate.getFullYear();
  return MM + "-" + dd + "-" + yyyy;
}

function isPallindrome(num) {
  let temp = num;
  let finalNum = "";
  while (temp > 0) {
    finalNum += (temp % 10).toString();
    temp = parseInt(temp / 10);
  }
  finalNum = num.charAt(0) == 0 ? finalNum + "0" : finalNum;
  if (parseInt(finalNum) === parseInt(num)) {
    return true;
  } else {
    return false;
  }
}
function nearestPallindrome(date) {
  let temp2 = getNextDate(date);
  let nextDDMMYYYY = isPallindrome(getDateinDDMMYYYY(temp2));
  let nextMMDDYY = isPallindrome(getDateinMMDDYY(temp2));
  let nextMMDDYYYY = isPallindrome(getDateinMMDDYYYY(temp2));
  while (!(nextDDMMYYYY || nextMMDDYY || nextMMDDYYYY)) {
    temp2 = getNextDate(temp2);
    nextDDMMYYYY = isPallindrome(getDateinDDMMYYYY(temp2));
    nextMMDDYY = isPallindrome(getDateinMMDDYY(temp2));
    nextMMDDYYYY = isPallindrome(getDateinMMDDYYYY(temp2));
  }
  log(
    `${nextDDMMYYYY} ${nextMMDDYY} ${nextMMDDYYYY} for date ${getDateinDDMMYYYY(
      temp2
    )}`
  );

  let temp1 = getPreviousDate(date);
  let prevDDMMYYYY = isPallindrome(getDateinDDMMYYYY(temp1));
  let prevMMDDYY = isPallindrome(getDateinMMDDYY(temp1));
  let prevMMDDYYYY = isPallindrome(getDateinMMDDYYYY(temp1));
  while (!(prevDDMMYYYY || prevMMDDYY || prevMMDDYYYY)) {
    temp1 = getPreviousDate(temp1);
    prevDDMMYYYY = isPallindrome(getDateinDDMMYYYY(temp1));
    prevMMDDYY = isPallindrome(getDateinMMDDYY(temp1));
    prevMMDDYYYY = isPallindrome(getDateinMMDDYYYY(temp1));
  }
  log(
    `${prevDDMMYYYY} ${prevMMDDYY} ${prevMMDDYYYY} for date ${getDateinDDMMYYYY(
      temp1
    )}`
  );

  var nearestDate =
    Date.parse(date) - Date.parse(temp1) > Date.parse(temp2) - Date.parse(date)
      ? "temp2"
      : "temp1";

  if (nearestDate === "temp2") {
    let res = nextDDMMYYYY
      ? _getDateinDDMMYYYY(temp2)
      : nextMMDDYY
      ? _getDateinMMDDYY(temp2)
      : nextMMDDYYYY
      ? temp2
      : "";
    let daysMiss = daysdiff(date, temp2);
    return `Awww! Your birthdate is not palindrome. Nearest palindrome date is ${res} You missed it by ${daysMiss} days.`;
  } else if (nearestDate === "temp1") {
    let res = prevDDMMYYYY
      ? _getDateinDDMMYYYY(temp1)
      : prevMMDDYY
      ? _getDateinMMDDYY(temp1)
      : prevMMDDYYYY
      ? temp1
      : "";
    let daysMiss = daysdiff(date, temp1);
    return `Awww! Your birthdate is not palindrome. Nearest palindrome date is ${res} You missed it by ${daysMiss} days.`;
  } else {
    return `Something went wrong.`;
  }
}

function daysdiff(d1, d2) {
  log(d1, d2);
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
