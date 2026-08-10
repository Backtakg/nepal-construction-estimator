// ==========================================
// PAGE NAVIGATION
// ==========================================

function showNewProject() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("newProject").classList.remove("hidden");
}

function showDashboard() {
    document.getElementById("newProject").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    displayProjects();
}


// ==========================================
// PROJECT DATA
// ==========================================

let projects = JSON.parse(
    localStorage.getItem("constructionProjects")
) || [];


// ==========================================
// CALCULATE TOTAL AREA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const floorsInput = document.getElementById("floors");
    const areaInput = document.getElementById("area");
    const totalArea = document.getElementById("totalArea");

    const projectForm = document.getElementById("projectForm");


    function calculateTotalArea() {

        const floors =
            parseFloat(floorsInput.value) || 0;

        const area =
            parseFloat(areaInput.value) || 0;

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


    // ======================================
    // CREATE PROJECT
    // ======================================

    projectForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const project = {

                id: Date.now(),

                projectName:
                    document
                        .getElementById("projectName")
                        .value
                        .trim(),

                clientName:
                    document
                        .getElementById("clientName")
                        .value
                        .trim(),

                location:
                    document
                        .getElementById("location")
                        .value
                        .trim(),

                buildingType:
                    document
                        .getElementById("buildingType")
                        .value,

                floors:
                    parseFloat(
                        document
                            .getElementById("floors")
                            .value
                    ),

                area:
                    parseFloat(
                        document
                            .getElementById("area")
                            .value
                    )
            };


            project.totalArea =
                project.floors *
                project.area;


            // Add project
            projects.push(project);


            // Save projects
            localStorage.setItem(
                "constructionProjects",
                JSON.stringify(projects)
            );


            console.log(
                "Project saved:",
                project
            );


            // Reset form
            projectForm.reset();

            totalArea.textContent = "0 sq.ft";


            // Go dashboard
            showDashboard();

        }
    );


    // Display existing projects
    displayProjects();

});


// ==========================================
// DISPLAY PROJECTS
// ==========================================

function displayProjects() {

    const projectList =
        document.getElementById("projectList");


    if (!projectList) {
        return;
    }


    if (projects.length === 0) {

        projectList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🏠
                </div>

                <h3>No projects yet</h3>

                <p>
                    Create your first construction project
                    to start estimating.
                </p>

                <button
                    class="primary-button"
                    onclick="showNewProject()"
                >
                    Create Your First Project
                </button>

            </div>

        `;

        return;
    }


    projectList.innerHTML = "";


    projects.forEach(function (project) {

        const card =
            document.createElement("div");

        card.className =
            "project-card";


        card.innerHTML = `

            <div class="project-card-header">

                <div>

                    <h3>
                        ${escapeHTML(project.projectName)}
                    </h3>

                    <span class="project-location">
                        📍 ${escapeHTML(project.location)}
                    </span>

                </div>

                <span class="project-type">
                    ${escapeHTML(project.buildingType)}
                </span>

            </div>


            <div class="project-details">

                <div>
                    <span>Client</span>
                    <strong>
                        ${escapeHTML(project.clientName || "—")}
                    </strong>
                </div>


                <div>
                    <span>Floors</span>
                    <strong>
                        ${project.floors}
                    </strong>
                </div>


                <div>
                    <span>Built-up Area</span>
                    <strong>
                        ${project.totalArea.toLocaleString()} sq.ft
                    </strong>
                </div>

            </div>


            <div class="project-card-footer">

                <button
                    class="open-project-button"
                    onclick="openProject(${project.id})"
                >
                    Open Project →
                </button>

                <button
                    class="delete-button"
                    onclick="deleteProject(${project.id})"
                >
                    Delete
                </button>

            </div>

        `;


        projectList.appendChild(card);

    });

}


// ==========================================
// OPEN PROJECT
// ==========================================

function openProject(id) {

    const project =
        projects.find(
            function (item) {
                return item.id === id;
            }
        );


    if (!project) {
        return;
    }


    localStorage.setItem(
        "activeProject",
        JSON.stringify(project)
    );


    alert(
        "Project opened: " +
        project.projectName +
        "\n\nBOQ module will be added next."
    );

}


// ==========================================
// DELETE PROJECT
// ==========================================

function deleteProject(id) {

    const project =
        projects.find(
            function (item) {
                return item.id === id;
            }
        );


    if (!project) {
        return;
    }


    const confirmDelete =
        confirm(
            `Delete "${project.projectName}"?`
        );


    if (!confirmDelete) {
        return;
    }


    projects =
        projects.filter(
            function (item) {
                return item.id !== id;
            }
        );


    localStorage.setItem(
        "constructionProjects",
        JSON.stringify(projects)
    );


    displayProjects();

}


// ==========================================
// SECURITY
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;
}
