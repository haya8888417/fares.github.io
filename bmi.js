document.getElementById("name").addEventListener("input", function() {
    document.getElementById("nameError").innerHTML = "";
});
document.getElementById("height").addEventListener("input", function() {
    document.getElementById("heightError").innerHTML = "";
});
document.getElementById("weight").addEventListener("input", function() {
    document.getElementById("weightError").innerHTML = "";
});
document.getElementById("decimal").addEventListener("input", function() {
    document.getElementById("decimalError").innerHTML = "";
});

function clearErrors() {
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("heightError").innerHTML = "";
    document.getElementById("weightError").innerHTML = "";
    document.getElementById("decimalError").innerHTML = "";
    document.getElementById("result").innerHTML = "";
}

function showError(id, message) {
    document.getElementById(id).innerHTML = message;
}

function validateInput(name, height, weight, decimal, heightUnit, weightUnit) {
    if (name.trim() === "") {
        showError("nameError", "Name cannot be empty.");
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError("nameError", "Name must contain only letters and spaces.");
        return false;
    } else if (name.trim().length < 2) {
        showError("nameError", "Name must have at least 2 letters.");
        return false;
    }

    if (isNaN(height)) {
        showError("heightError", "Height cannot be empty.");
        return false;
    } else if (heightUnit == 2 && (height < 50 || height > 250)) {
        showError("heightError", "Height must be between 50 and 250 cm.");
        return false;
    } else if (heightUnit == 1 && (height < 20 || height > 100)) {
        showError("heightError", "Height must be between 20 and 100 inches.");
        return false;
    }

    if (isNaN(weight)) {
        showError("weightError", "Weight cannot be empty.");
        return false;
    } else if (weightUnit == 2 && (weight < 20 || weight > 200)) {
        showError("weightError", "Weight must be between 20 and 200 kg.");
        return false;
    } else if (weightUnit == 1 && (weight < 40 || weight > 400)) {
        showError("weightError", "Weight must be between 40 and 400 pounds.");
        return false;
    }

    if (isNaN(decimal)) {
        showError("decimalError", "Decimals cannot be empty.");
        return false;
    } else if (decimal < 0 || decimal > 10) {
        showError("decimalError", "Decimals must be between 0 and 10.");
        return false;
    }

    return true;
}

function CalculateBMI() {
    clearErrors();

    var name = document.getElementById("name").value.trim();
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var heightUnit = document.getElementById("heightunit").value;
    var weightUnit = document.getElementById("weightunit").value;
    var decimal = parseInt(document.getElementById("decimal").value);
    var result = document.getElementById("result");

    if (!validateInput(name, height, weight, decimal, heightUnit, weightUnit)) {
        return;
    }

    // Convert units
    if (heightUnit == 1) {
        height = height * 0.0254; // Convert inches to meters
    } else {
        height = height / 100; // Convert cm to meters
    }

    if (weightUnit == 1) {
        weight = weight * 0.453592; // Convert pounds to kg
    }

    var bmi = weight / (height * height);
    bmi = bmi.toFixed(decimal);

    var bmiMessage = "";
    var bmiColor = "";

    if (bmi < 18.5) {
        bmiMessage = "Underweight";
        bmiColor = "red";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        bmiMessage = "Normal weight";
        bmiColor = "green";
    } else if (bmi >= 25 && bmi <= 29.9) {
        bmiMessage = "Overweight";
        bmiColor = "orange";
    } else if (bmi >= 30) {
        bmiMessage = "Obese";
        bmiColor = "red";
    }

    result.innerHTML = `Dear ${name}, your BMI is ${bmi} which indicates that you are ${bmiMessage}`;
    result.style.color = bmiColor;
}