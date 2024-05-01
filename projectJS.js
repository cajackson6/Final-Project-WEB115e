document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateButton').addEventListener('click', generateMealPlan);
    document.getElementById('downloadButton').addEventListener('click', downloadMealPlan);
});

function validateEmail(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function generateMealPlan() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var goal = document.getElementById("goal").value;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    var content = `<h1>Hi ${name}!</h1>
                   <p>Thank you for using Perfectly Portioned Fitness! Welcome to the family.</p>
                   <h2>Meal Plan for ${name}</h2>
                   <p>Goal for the Week: ${goal}</p>
                   <div style='text-align: left;'>`;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach(day => {
        content += `<h3>${day}</h3>
                    <ul>
                        <li>Breakfast: ${document.getElementById(day.substring(0, 3).toLowerCase() + 'Breakfast').value}</li>
                        <li>Snack 1: ${document.getElementById(day.substring(0, 3).toLowerCase() + 'Snack1').value}</li>
                        <li>Lunch: ${document.getElementById(day.substring(0, 3).toLowerCase() + 'Lunch').value}</li>
                        <li>Snack 2: ${document.getElementById(day.substring(0, 3).toLowerCase() + 'Snack2').value}</li>
                        <li>Dinner: ${document.getElementById(day.substring(0, 3).toLowerCase() + 'Dinner').value}</li>
                    </ul>`;
    });
    content += `</div>`;

    var newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <html>
        <head>
            <title>Meal Plan</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1, h2, h3 { color: #333; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 5px; }
            </style>
        </head>
        <body>${content}</body>
        </html>`);
    newWindow.document.close();
}

function printMealPlan() {
    window.print();
}

function downloadMealPlan() {
    var name = document.getElementById("name").value;
    var goal = document.getElementById("goal").value;
    var doc = new jspdf.jsPDF();

    doc.text(`Meal Plan for ${name}`, 10, 10);
    doc.text(`Goal for the Week: ${goal}`, 10, 20);

    let yPos = 30;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach((day, index) => {
        doc.text(day, 10, yPos);
        yPos += 10;
        ['Breakfast', 'Snack1', 'Lunch', 'Snack2', 'Dinner'].forEach((meal, idx) => {
            let mealContent = document.getElementById(day.substring(0, 3).toLowerCase() + meal).value;
            doc.text(`- ${meal}: ${mealContent}`, 15, yPos);
            yPos += 10;
        });
        yPos += 5;
    });

    doc.save('Meal_Plan.pdf');
}
