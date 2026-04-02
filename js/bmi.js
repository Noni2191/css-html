function calculateBMI(){
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const result = document.getElementById("result");

        if(!weight || !height || height <= 0){
            result.innerHTML = "Please enter valid values!";
            return;
        }
        const bmi = weight / (height * height);
        let category = "";
        if (bmi < 18.5){
            category = "Underweight";
        } else if (bmi < 24.9){
            category = "Normal weight";
        }else if (bmi < 29.9){
            category = "Class 1 Obesity";
        } else if (bmi < 34.9){
            category = "Class 2 Obesity";
        } else{
            category = "Reduce Your Food"
        }
        result.innerHTML = `
        BMI: ${bmi.toFixed(2)} <br>
        Category: ${category}
        `;
    
}