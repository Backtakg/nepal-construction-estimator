function showNewProject() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("newProject").classList.remove("hidden");
}

function showDashboard() {
    document.getElementById("newProject").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", function () {

    const floorsInput = document.getElementById("floors");
    const areaInput = document.getElementById("area");
    const totalArea = document.getElementById("totalArea");
    const projectForm = document.getElementById("projectForm");

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


    projectForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const project = {

            projectName:
                document.getElementById("projectName").value.trim(),

            clientName:
                document.getElementById("clientName").value.trim(),

            location:
                document.getElementById("location").value.trim(),

            buildingType:
                document.getElementById("buildingType").value,

            floors:
                parseFloat(
                    document.getElementById("floors").value
                ),

            area:
                parseFloat(
                    document.getElementById("area").value
                )
        };


        project.totalArea =
            project.floors * project.area;


        localStorage.setItem(
            "currentProject",
            JSON.stringify(project)
        );


        console.log("Project saved:", project);

        alert("Project created successfully!");

        showDashboard();

    });

});
