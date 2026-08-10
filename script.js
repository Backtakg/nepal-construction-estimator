```javascript
// ==========================================
// PROJECT DATA
// ==========================================

let projects = [];


// ==========================================
// LOAD PROJECTS
// ==========================================

function loadProjects() {

    const savedProjects =
        localStorage.getItem("constructionProjects");

    if (savedProjects) {

        try {

            projects = JSON.parse(savedProjects);

            if (!Array.isArray(projects)) {
                projects = [];
            }

        } catch (error) {

            console.error(
                "Could not load projects:",
                error
            );

            projects = [];
        }

    } else {

        projects = [];
    }
}


// ==========================================
// SAVE PROJECTS
// ==========================================

function saveProjects() {

    localStorage.setItem(
        "constructionProjects",
        JSON.stringify(projects)
    );
}


// ==========================================
// SHOW NEW PROJECT
// ==========================================

function showNewProject() {

    document
        .getElementById("dashboard")
        .classList.add("hidden");

    document
        .getElementById("newProject")
        .classList.remove("hidden");
}


// ==========================================
// SHOW DASHBOARD
// ==========================================

function showDashboard() {

    document
        .getElementById("newProject")
        .classList.add("hidden");

    document
        .getElementById("dashboard")
        .classList.remove("hidden");

    displayProjects();
}


// ==========================================
// DISPLAY PROJECTS
// ==========================================

function displayProjects() {

    const projectList =
        document.getElementById("projectList");


    if (!projectList) {

        console.error(
            "ERROR: projectList was not found."
        );

        return;
    }


    // No projects
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


    // Clear project list
    projectList.innerHTML = "";


    // Create cards
    projects.forEach(function (project) {

        const card =
            document.createElement("div");

        card.className =
            "project-card";


        const totalArea =
            Number(project.totalArea) || 0;


        card.innerHTML = `

            <div class="project-card-header">

                <div>

                    <h3>
                        ${escapeHTML(
                            project.projectName
                        )}
                    </h3>

                    <span class="project-location">
                        📍 ${escapeHTML(
                            project.location
                        )}
                    </span>

                </div>

                <span class="project-type">
                    ${escapeHTML(
                        project.buildingType
                    )}
                </span>

            </div>


            <div class="project-details">

                <div>

                    <span>Client</span>

                    <strong>
                        ${escapeHTML(
                            project.clientName || "—"
                        )}
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
                        ${totalArea.toLocaleString()}
                        sq.ft
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
// CREATE PROJECT
// ==========================================

function createProject(event) {

    event.preventDefault();


    const projectName =
        document
            .getElementById("projectName")
            .value
            .trim();


    const clientName =
        document
            .getElementById("clientName")
            .value
            .trim();


    const location =
        document
            .getElementById("location")
            .value
            .trim();


    const buildingType =
        document
            .getElementById("buildingType")
            .value;


    const floors =
        Number(
            document
                .getElementById("floors")
                .value
        );


    const area =
        Number(
            document
                .getElementById("area")
                .value
        );


    const project = {

        id: Date.now(),

        projectName: projectName,

        clientName: clientName,

        location: location,

        buildingType: buildingType,

        floors: floors,

        area: area,

        totalArea: floors * area

    };


    // Add project
    projects.push(project);


    // Save
    saveProjects();


    console.log(
        "PROJECT SAVED:",
        project
    );


    // Reset form
    document
        .getElementById("projectForm")
        .reset();


    document
        .getElementById("totalArea")
        .textContent = "0 sq.ft";


    // Go dashboard
    showDashboard();

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
        "Project: " +
        project.projectName +
        "\n\nBOQ module coming next."
    );

}


// ==========================================
// DELETE PROJECT
// ==========================================

function deleteProject(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this project?"
        );


    if (!confirmed) {
        return;
    }


    projects =
        projects.filter(
            function (project) {
                return project.id !== id;
            }
        );


    saveProjects();


    displayProjects();

}


// ==========================================
// SECURITY
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value || "";

    return div.innerHTML;
}


// ==========================================
// START APPLICATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProjects();

        displayProjects();


        // Project form
        const projectForm =
            document.getElementById("projectForm");


        if (projectForm) {

            projectForm.addEventListener(
                "submit",
                createProject
            );

        }


        // Area calculation
        const floorsInput =
            document.getElementById("floors");

        const areaInput =
            document.getElementById("area");


        function calculateTotalArea() {

            const floors =
                Number(floorsInput.value) || 0;

            const area =
                Number(areaInput.value) || 0;

            const total =
                floors * area;


            document
                .getElementById("totalArea")
                .textContent =
                total.toLocaleString() +
                " sq.ft";
        }


        floorsInput.addEventListener(
            "input",
            calculateTotalArea
        );


        areaInput.addEventListener(
            "input",
            calculateTotalArea
        );

    }
);
```
