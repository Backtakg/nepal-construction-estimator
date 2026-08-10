```javascript
// ==========================================
// PROJECT DATA
// ==========================================

let projects = [];


// ==========================================
// GET ELEMENTS
// ==========================================

const dashboard =
    document.getElementById("dashboard");

const newProject =
    document.getElementById("newProject");

const projectForm =
    document.getElementById("projectForm");

const projectList =
    document.getElementById("projectList");

const floorsInput =
    document.getElementById("floors");

const areaInput =
    document.getElementById("area");

const totalArea =
    document.getElementById("totalArea");


// ==========================================
// LOAD PROJECTS
// ==========================================

function loadProjects() {

    const saved =
        localStorage.getItem(
            "constructionProjects"
        );

    if (!saved) {

        projects = [];

        return;
    }

    try {

        projects = JSON.parse(saved);

        if (!Array.isArray(projects)) {
            projects = [];
        }

    } catch (error) {

        console.error(
            "Project loading error:",
            error
        );

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
// SHOW DASHBOARD
// ==========================================

function showDashboard() {

    newProject.classList.add("hidden");

    dashboard.classList.remove("hidden");

    displayProjects();
}


// ==========================================
// SHOW NEW PROJECT
// ==========================================

function showNewProject() {

    dashboard.classList.add("hidden");

    newProject.classList.remove("hidden");
}


// ==========================================
// DISPLAY PROJECTS
// ==========================================

function displayProjects() {

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
                    Create your first construction
                    project to start estimating.
                </p>

                <button
                    type="button"
                    class="primary-button"
                    id="createFirstProjectButton"
                >
                    Create Your First Project
                </button>

            </div>
        `;


        const button =
            document.getElementById(
                "createFirstProjectButton"
            );


        button.addEventListener(
            "click",
            showNewProject
        );


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
                        ${Number(
                            project.totalArea || 0
                        ).toLocaleString()}
                        sq.ft
                    </strong>

                </div>

            </div>


            <div class="project-card-footer">

                <button
                    type="button"
                    class="open-project-button"
                    data-id="${project.id}"
                >
                    Open Project →
                </button>

                <button
                    type="button"
                    class="delete-button"
                    data-delete-id="${project.id}"
                >
                    Delete
                </button>

            </div>
        `;


        projectList.appendChild(card);


        // OPEN PROJECT

        card
            .querySelector(".open-project-button")
            .addEventListener(
                "click",
                function () {

                    alert(
                        "Project: " +
                        project.projectName +
                        "\n\nBOQ module will be added next."
                    );

                }
            );


        // DELETE PROJECT

        card
            .querySelector(".delete-button")
            .addEventListener(
                "click",
                function () {

                    const confirmed =
                        confirm(
                            "Delete " +
                            project.projectName +
                            "?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    projects =
                        projects.filter(
                            function (item) {

                                return (
                                    item.id !==
                                    project.id
                                );

                            }
                        );


                    saveProjects();

                    displayProjects();

                }
            );

    });
}


// ==========================================
// CALCULATE AREA
// ==========================================

function calculateArea() {

    const floors =
        Number(floorsInput.value) || 0;

    const area =
        Number(areaInput.value) || 0;


    const total =
        floors * area;


    totalArea.textContent =
        total.toLocaleString() +
        " sq.ft";
}


floorsInput.addEventListener(
    "input",
    calculateArea
);


areaInput.addEventListener(
    "input",
    calculateArea
);


// ==========================================
// CREATE PROJECT
// ==========================================

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
                Number(
                    document
                        .getElementById("floors")
                        .value
                ),

            area:
                Number(
                    document
                        .getElementById("area")
                        .value
                )

        };


        project.totalArea =
            project.floors *
            project.area;


        projects.push(project);


        saveProjects();


        projectForm.reset();


        totalArea.textContent =
            "0 sq.ft";


        showDashboard();

    }
);


// ==========================================
// NAVIGATION BUTTONS
// ==========================================

document
    .getElementById("newProjectButton")
    .addEventListener(
        "click",
        showNewProject
    );


document
    .getElementById("newProjectButton2")
    .addEventListener(
        "click",
        showNewProject
    );


document
    .getElementById("backButton")
    .addEventListener(
        "click",
        showDashboard
    );


document
    .getElementById("cancelButton")
    .addEventListener(
        "click",
        showDashboard
    );


document
    .getElementById("createFirstProjectButton")
    .addEventListener(
        "click",
        showNewProject
    );


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
// START APP
// ==========================================

loadProjects();

displayProjects();
```
