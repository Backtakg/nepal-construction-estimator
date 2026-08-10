// ==========================================
// NEPAL CONSTRUCTION ESTIMATOR
// ==========================================

let projects = [];
let activeProject = null;


// ==========================================
// GET ELEMENTS
// ==========================================

const dashboard = document.getElementById("dashboard");
const newProject = document.getElementById("newProject");
const projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");

const floorsInput = document.getElementById("floors");
const areaInput = document.getElementById("area");
const totalArea = document.getElementById("totalArea");


// ==========================================
// LOAD PROJECTS
// ==========================================

function loadProjects() {

    const saved = localStorage.getItem("constructionProjects");

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

        console.error("Could not load projects:", error);

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
// DASHBOARD
// ==========================================

function showDashboard() {

    const boqScreen = document.getElementById("boqScreen");

    if (boqScreen) {
        boqScreen.classList.add("hidden");
    }

    newProject.classList.add("hidden");

    dashboard.classList.remove("hidden");

    displayProjects();
}


// ==========================================
// NEW PROJECT
// ==========================================

function showNewProject() {

    const boqScreen = document.getElementById("boqScreen");

    if (boqScreen) {
        boqScreen.classList.add("hidden");
    }

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

                <div class="empty-icon">🏠</div>

                <h3>No projects yet</h3>

                <p>
                    Create your first construction
                    project to start estimating.
                </p>

                <button
                    type="button"
                    class="primary-button"
                    id="createFirstProjectButton">
                    Create Your First Project
                </button>

            </div>
        `;

        document
            .getElementById("createFirstProjectButton")
            .addEventListener("click", showNewProject);

        return;
    }


    projectList.innerHTML = "";


    projects.forEach(function (project) {

        const card = document.createElement("div");

        card.className = "project-card";


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
                        ${Number(project.totalArea || 0).toLocaleString()}
                        sq.ft
                    </strong>
                </div>

            </div>


            <div class="project-card-footer">

                <button
                    type="button"
                    class="open-project-button">
                    Open Project →
                </button>

                <button
                    type="button"
                    class="delete-button">
                    Delete
                </button>

            </div>
        `;


        projectList.appendChild(card);


        // OPEN

        card
            .querySelector(".open-project-button")
            .addEventListener("click", function () {

                openProject(project.id);

            });


        // DELETE

        card
            .querySelector(".delete-button")
            .addEventListener("click", function () {

                deleteProject(project.id);

            });

    });
}


// ==========================================
// OPEN PROJECT
// ==========================================

function openProject(id) {

    console.log("Opening project:", id);

    const project = projects.find(function (item) {

        return Number(item.id) === Number(id);

    });


    if (!project) {

        alert("Project could not be found.");

        return;
    }


    activeProject = project;


    localStorage.setItem(
        "activeProject",
        JSON.stringify(project)
    );


    dashboard.classList.add("hidden");

    newProject.classList.add("hidden");


    createBOQScreen();

    renderBOQ(project);

}


// ==========================================
// CREATE BOQ SCREEN
// ==========================================

function createBOQScreen() {

    let boqScreen =
        document.getElementById("boqScreen");


    if (!boqScreen) {

        boqScreen =
            document.createElement("section");

        boqScreen.id = "boqScreen";

        boqScreen.className = "boq-screen hidden";


        const main =
            document.querySelector("main");


        main.appendChild(boqScreen);
    }


    boqScreen.classList.remove("hidden");

}


// ==========================================
// BOQ ITEMS
// ==========================================

function getBOQItems(project) {

    const area =
        Number(project.totalArea) || 0;


    return [

        {
            id: 1,
            category: "Earthwork",
            item: "Excavation for foundation",
            unit: "cu.ft",
            quantity: Math.round(area * 0.12),
            rate: 55
        },

        {
            id: 2,
            category: "Concrete",
            item: "PCC 1:4:8",
            unit: "cu.ft",
            quantity: Math.round(area * 0.08),
            rate: 180
        },

        {
            id: 3,
            category: "Concrete",
            item: "RCC work",
            unit: "cu.ft",
            quantity: Math.round(area * 0.35),
            rate: 850
        },

        {
            id: 4,
            category: "Reinforcement",
            item: "Reinforcement steel",
            unit: "kg",
            quantity: Math.round(area * 4),
            rate: 115
        },

        {
            id: 5,
            category: "Masonry",
            item: "Brick masonry",
            unit: "cu.ft",
            quantity: Math.round(area * 0.25),
            rate: 220
        },

        {
            id: 6,
            category: "Plaster",
            item: "Cement plaster",
            unit: "sq.ft",
            quantity: Math.round(area * 1.8),
            rate: 65
        },

        {
            id: 7,
            category: "Flooring",
            item: "Floor tiles",
            unit: "sq.ft",
            quantity: Math.round(area),
            rate: 140
        },

        {
            id: 8,
            category: "Painting",
            item: "Interior & exterior painting",
            unit: "sq.ft",
            quantity: Math.round(area * 2.5),
            rate: 45
        }

    ];
}


// ==========================================
// RENDER BOQ
// ==========================================

function renderBOQ(project) {

    const boqScreen =
        document.getElementById("boqScreen");


    if (!boqScreen) {

        console.error("BOQ screen was not created.");

        return;
    }


    const items =
        getBOQItems(project);


    let total = 0;


    items.forEach(function (item) {

        item.amount =
            item.quantity * item.rate;

        total += item.amount;

    });


    const builtUpArea =
        Number(project.totalArea) || 0;


    boqScreen.innerHTML = `

        <div class="boq-container">

            <div class="boq-header">

                <button
                    type="button"
                    class="back-button"
                    id="boqBackButton">

                    ← Back to Projects

                </button>


                <span class="badge">
                    🇳🇵 Construction Estimate
                </span>


                <h2>
                    ${escapeHTML(project.projectName)}
                </h2>


                <p>
                    📍 ${escapeHTML(project.location)}
                </p>

            </div>


            <div class="estimate-summary">

                <div class="summary-card">

                    <span>
                        Built-up Area
                    </span>

                    <strong>
                        ${builtUpArea.toLocaleString()} sq.ft
                    </strong>

                </div>


                <div class="summary-card">

                    <span>
                        BOQ Items
                    </span>

                    <strong>
                        ${items.length}
                    </strong>

                </div>


                <div class="summary-card total">

                    <span>
                        Estimated Cost
                    </span>

                    <strong>
                        NPR ${total.toLocaleString()}
                    </strong>

                </div>

            </div>


            <div class="boq-card">

                <div class="boq-title">

                    <h3>
                        Bill of Quantities
                    </h3>

                    <p>
                        Preliminary construction estimate
                    </p>

                </div>


                <div class="boq-table-wrapper">

                    <table class="boq-table">

                        <thead>

                            <tr>

                                <th>#</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Unit</th>
                                <th>Quantity</th>
                                <th>Rate (NPR)</th>
                                <th>Amount (NPR)</th>

                            </tr>

                        </thead>


                        <tbody>

                            ${items.map(function (item) {

                                return `

                                    <tr>

                                        <td>
                                            ${item.id}
                                        </td>

                                        <td>
                                            ${escapeHTML(item.category)}
                                        </td>

                                        <td>
                                            ${escapeHTML(item.item)}
                                        </td>

                                        <td>
                                            ${item.unit}
                                        </td>

                                        <td>
                                            ${item.quantity.toLocaleString()}
                                        </td>

                                        <td>
                                            ${item.rate.toLocaleString()}
                                        </td>

                                        <td>
                                            <strong>
                                                ${item.amount.toLocaleString()}
                                            </strong>
                                        </td>

                                    </tr>

                                `;

                            }).join("")}

                        </tbody>


                        <tfoot>

                            <tr>

                                <td colspan="6"
                                    style="text-align:right">

                                    <strong>
                                        TOTAL
                                    </strong>

                                </td>

                                <td>

                                    <strong>
                                        NPR ${total.toLocaleString()}
                                    </strong>

                                </td>

                            </tr>

                        </tfoot>

                    </table>

                </div>

            </div>


            <div class="boq-note">

                <strong>
                    Note:
                </strong>

                This is a preliminary estimate.
                Actual quantities and market rates
                should be verified before construction.

            </div>

        </div>
    `;


    // BACK BUTTON

    document
        .getElementById("boqBackButton")
        .addEventListener("click", function () {

            showDashboard();

        });

}


// ==========================================
// DELETE PROJECT
// ==========================================

function deleteProject(id) {

    const project =
        projects.find(function (item) {

            return Number(item.id) === Number(id);

        });


    if (!project) {
        return;
    }


    const confirmed =
        confirm(
            'Delete "' +
            project.projectName +
            '"?'
        );


    if (!confirmed) {
        return;
    }


    projects =
        projects.filter(function (item) {

            return Number(item.id) !== Number(id);

        });


    saveProjects();

    displayProjects();

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
        total.toLocaleString() + " sq.ft";

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
                    floorsInput.value
                ),

            area:
                Number(
                    areaInput.value
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
// NAVIGATION
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
// START
// ==========================================

loadProjects();

displayProjects();
