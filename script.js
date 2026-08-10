function showNewProject() {

    document.getElementById("dashboard").classList.add("hidden");

    document.getElementById("newProject").classList.remove("hidden");

}


function showDashboard() {

    document.getElementById("newProject").classList.add("hidden");

    document.getElementById("dashboard").classList.remove("hidden");

}


const floorsInput = document.getElementById("floors");

const areaInput = document.getElementById("area");

const totalArea = document.getElementById("totalArea");


function calculateTotalArea() {

    const floors = parseFloat(floorsInput.value) || 0;

    const area = parseFloat(areaInput.value) || 0;

    const total = floors * area;

    totalArea.textContent =
        total.toLocaleString() + " sq.ft";

}


floorsInput.addEventListener(
    "input",
    calculateTotalArea
);


areaInput.addEventListener(
    "input",
    calculateTotalArea
);


document
    .getElementById("projectForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const projectName =
            document.getElementById("projectName").value;

        const clientName =
            document.getElementById("clientName").value;

        const location =
            document.getElementById("location").value;

        const buildingType =
            document.getElementById("buildingType").value;

        const floors =
            parseFloat(
                document.getElementById("floors").value
            );

        const area =
            parseFloat(
                document.getElementById("area").value
            );

        const total =
            floors * area;


        localStorage.setItem(
            "currentProject",
            JSON.stringify({

                projectName,
                clientName,
                location,
                buildingType,
                floors,
                area,
                totalArea: total

            })
        );


        alert(
            "Project created successfully!"
        );


        showDashboard();

    });
