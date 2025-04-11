// Function to check if the full name meets the length requirement
    const checkFullname = (name) =>{
    if (name.length >= 3 && name.length <= 50) {
        return true;
    } else {
        return false;
    }
}

//// Function to validate the student ID format
const checkId =(id) =>{
    const regex =/^z[0-9]{7}$/;
    if (id.match(regex)){
        return true;
    }return false;
}

// Function to validate the graduation date format
const checkDate = (date) =>{
    const regex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
    let eachDate = date.split("/");
    const dataJs = eachDate[2] +"-" + eachDate[1] + "-" + eachDate[0];
    if (date.match(regex) && (Date.parse(dataJs))){
        return true;
    }else{
        return false;
    }
}

// Function to get the formatted string for favorite programming languages
const getLanguageword=() =>{
    let output ="";
    let language = [];
    for (let cb of languageCheckboxes){
        if (cb.checked){
            language.push(cb.name);
        }
    }
    if (language.length === 0){
        output = "I have no favourite programming language";
    }else if (language.length === 1){
        output = `my favourite programming language is ${language[0]}`;
    }else if (language.length === 2){
        output = `my favourite programming languages are ${language[0]}, and ${language[1]}`;
    }else{
        let lastLang = language.pop();
        output = `my favourite programming languages are ${language.join(", ")}, and ${lastLang}`;
    }
    return output;
}

// Function to determine graduation status and return a formatted response
const getGraduateword=() =>{
    let graduateinfo = [];
    const parts = graduateDate.value.split("/");
    const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = formattedDate.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
        graduateinfo.push("graduate");
        graduateinfo.push(`in ${diffDays} days`);
        graduateinfo.push("major");
    } else if (diffDays < 0) {
        graduateinfo.push("graduated");
        graduateinfo.push(`${Math.abs(diffDays)} days ago`);
        graduateinfo.push("majored");
    } else {
        graduateinfo.push("graduate");
        graduateinfo.push(`today`);
        graduateinfo.push("major");
    }
    return graduateinfo;
}

// Function to render output text based on user input validation and formatting
const renderOutput = () => {
    if (!checkFullname(fullName.value)){
        outputText.value = "Please input a valid full name";
    }else if(!checkId(studentId.value)){
        outputText.value = "Please input a valid student ID";
    }else if(!checkDate(graduateDate.value)){
        outputText.value = "Please input a valid graduation date";
    }else{
        const languageWord = getLanguageword();
        const graduateWord = getGraduateword();
        outputText.value = `My name is ${fullName.value} (${studentId.value}), and I ${graduateWord[0]} ${graduateWord[1]}. I ${graduateWord[2]} in ${major.value}, and ${languageWord}.`;
    }
}

// Function to handle "Select All" checkbox behavior
const checkSelectall = () => {
    if (selectAll.checked === true){
        languageCheckboxes.forEach(checkBox => checkBox.checked = true);
    }else{
        languageCheckboxes.forEach(checkBox => checkBox.checked = false);
    }
}

// Function to check if all checkboxes are selected and update "Select All" status
const checkForeach = () =>{
    let allChecked = true;
    languageCheckboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            allChecked = false;
        }
    })

    selectAll.checked = allChecked;
}

// Function to reset all form inputs
const resetfunction = () =>{
    const form = document.querySelector("form");
    form.reset();
}

// Get references to all required DOM elements
const fullName = document.getElementById("fullName");
const studentId = document.getElementById("studentId");
const graduateDate = document.getElementById("graduationDate");
const major = document.getElementById("major");
const selectAll = document.getElementById("selectAll");
const languageCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#selectAll)');
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const reset = document.getElementById("resetButton");
const outputText = document.getElementById("outputText");

// Add event listeners to trigger the necessary functions
fullName.addEventListener('blur',renderOutput);
studentId.addEventListener('blur',renderOutput);
graduateDate.addEventListener('blur',renderOutput);
major.addEventListener('change',renderOutput);
selectAll.addEventListener('click',checkSelectall);
languageCheckboxes.forEach(cb=>cb.addEventListener("change",checkForeach));
reset.addEventListener('click',resetfunction);
allCheckboxes.forEach(cb=>cb.addEventListener("change",renderOutput));
