// ==========================================================
// NEPAL CONSTRUCTION ESTIMATOR
// PROJECTS + BOQ + EDITABLE RATES + CUSTOM ITEMS
// + NEPAL REFERENCE RATE SYSTEM
// + DAY / NIGHT THEME
// FULL REPLACEMENT VERSION
// ==========================================================

"use strict";

// ==========================================================
// GLOBAL STATE
// ==========================================================

let projects = [];
let activeProject = null;
let activeBOQ = [];
let editingProjectId = null;

const THEME_KEY = "nepalEstimatorTheme";


// ==========================================================
// ELEMENTS
// ==========================================================

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


// ==========================================================
// NEPAL REFERENCE RATE DATABASE
// ==========================================================

const NEPAL_RATE_DATABASE = {

    "TMT Bar 8 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 94
    },

    "TMT Bar 10 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 90
    },

    "TMT Bar 12 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 90
    },

    "TMT Bar 16 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 90
    },

    "TMT Bar 20 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 90
    },

    "TMT Bar 25 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 94
    },

    "TMT Bar 28 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 94
    },

    "TMT Bar 32 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 94
    },

    "TMT FE500D 8 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 104
    },

    "TMT FE500D 10 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 100
    },

    "TMT FE500D 12 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 100
    },

    "TMT FE500D 16 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 100
    },

    "TMT FE500D 20 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 100
    },

    "TMT FE500D 25 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 104
    },

    "TMT FE500D 28 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 104
    },

    "TMT FE500D 32 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 104
    },

    "TOR Bar 8 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 94
    },

    "TOR Bar 10 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 91
    },

    "TOR Bar 12 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 91
    },

    "TOR Bar 16 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 91
    },

    "TOR Bar 20 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 91
    },

    "TOR Bar 25 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 91
    },

    "TOR Bar 28 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 94
    },

    "TOR Bar 32 mm dia": {
        category: "Reinforcement",
        unit: "kg",
        rate: 94
    },

    "TOR Kari 4.75 mm": {
        category: "Reinforcement",
        unit: "kg",
        rate: 96
    },

    "TOR Kari 7 mm": {
        category: "Reinforcement",
        unit: "kg",
        rate: 96
    },

    "GI Wire Heavy Zinc Coated 8/10/12 Gauge": {
        category: "Steel / Wire",
        unit: "kg",
        rate: 129
    },

    "GI Wire Medium Zinc Coated 8/10/12 Gauge": {
        category: "Steel / Wire",
        unit: "kg",
        rate: 124
    },

    "GI Wire Light Zinc Coated 8/10/12 Gauge": {
        category: "Steel / Wire",
        unit: "kg",
        rate: 117
    },

    "Barbed Wire": {
        category: "Steel / Wire",
        unit: "kg",
        rate: 115
    },

    "U-Hook for Barbed Wire Fencing": {
        category: "Steel / Wire",
        unit: "pc",
        rate: 0.89
    },

    "Chain Link Mesh 1 x 1 inch, 12 Gauge": {
        category: "Mesh",
        unit: "sq.ft",
        rate: 827
    },

    "Chain Link Mesh 1.6 x 1.6 inch, 12 Gauge": {
        category: "Mesh",
        unit: "sq.ft",
        rate: 774
    },

    "Chain Link Mesh 2 x 2 inch, 10 Gauge": {
        category: "Mesh",
        unit: "sq.ft",
        rate: 613
    },

    "Chain Link Mesh 3 x 3 inch, 10 Gauge": {
        category: "Mesh",
        unit: "sq.ft",
        rate: 501
    },

    "Chain Link Mesh 4 x 4 inch, 10 Gauge": {
        category: "Mesh",
        unit: "sq.ft",
        rate: 399
    },

    "Mosquito Proof Net": {
        category: "Mesh",
        unit: "sq.ft",
        rate: 137
    },

    "Chicken Wire Mesh": {
        category: "Mesh",
        unit: "sq.ft",
        rate: 86
    },

    "Steel Crossing Mesh": {
        category: "Mesh",
        unit: "sq.ft",
        rate: 180
    },

    "Steel Mosquito Proof Mesh": {
        category: "Mesh",
        unit: "sq.ft",
        rate: 312
    },

    "Steel Bar Coupler 16 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 65
    },

    "Steel Bar Coupler 20 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 160
    },

    "Steel Bar Coupler 25 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 250
    },

    "Steel Bar Coupler 28 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 300
    },

    "Steel Bar Coupler 32 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 380
    },

    "Steel Bar Coupler 36 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 512
    },

    "Steel Bar Coupler 40 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 700
    },

    "Thread Cap 16 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 27
    },

    "Thread Cap 20 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 40
    },

    "Thread Cap 25 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 74
    },

    "Thread Cap 28 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 90
    },

    "Thread Cap 32 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 99
    },

    "Thread Cap 36 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 165
    },

    "Thread Cap 40 mm": {
        category: "Steel Accessories",
        unit: "pc",
        rate: 180
    }

};


// ==========================================================
// RATE SCHEDULE
// ==========================================================

const NEPAL_RATE_SCHEDULES = {

    Kathmandu: {

        "2083/84": {

            source:
                "Kathmandu District Reference Rate Schedule",

            sourceType:
                "Reference",

            sourceYear:
                "2083/84",

            items:
                Object.keys(
                    NEPAL_RATE_DATABASE
                ).map(function(name) {

                    const data =
                        NEPAL_RATE_DATABASE[name];

                    return {

                        category:
                            data.category,

                        description:
                            name,

                        unit:
                            data.unit,

                        rate:
                            Number(data.rate) || 0

                    };

                })

        }

    }

};


// ==========================================================
// SAFE RATE HELPERS
// ==========================================================

function getRateLocations() {

    if (
        !NEPAL_RATE_SCHEDULES ||
        typeof NEPAL_RATE_SCHEDULES !== "object" ||
        Array.isArray(NEPAL_RATE_SCHEDULES)
    ) {

        return [];

    }

    return Object.keys(
        NEPAL_RATE_SCHEDULES
    );

}


function getRateYears(location) {

    if (
        !location ||
        !NEPAL_RATE_SCHEDULES
    ) {

        return [];

    }

    const district =
        NEPAL_RATE_SCHEDULES[
            location
        ];

    if (
        !district ||
        typeof district !== "object" ||
        Array.isArray(district)
    ) {

        return [];

    }

    return Object.keys(
        district
    );

}


function getRateSchedule(
    location,
    year
) {

    if (
        !location ||
        !year
    ) {

        return null;

    }

    const district =
        NEPAL_RATE_SCHEDULES[
            location
        ];

    if (
        !district ||
        typeof district !== "object"
    ) {

        return null;

    }

    const schedule =
        district[year];

    if (
        !schedule ||
        typeof schedule !== "object"
    ) {

        return null;

    }

    // Critical defensive fix.
    if (
        !Array.isArray(
            schedule.items
        )
    ) {

        schedule.items = [];

    }

    return schedule;

}


function isVerifiedRate(item) {

    return !!(
        item &&
        Number.isFinite(
            Number(item.rate)
        ) &&
        Number(item.rate) > 0
    );

}


// ==========================================================
// NORMALIZE BOQ
// ==========================================================

function normalizeBOQItem(
    item,
    index
) {

    const source =
        item &&
        typeof item === "object"
            ? item
            : {};

    const quantity =
        Number(
            source.quantity
        );

    const rate =
        Number(
            source.rate
        );

    return {

        id:
            source.id != null
                ? source.id
                : Date.now() +
                  index +
                  Math.floor(
                      Math.random() * 10000
                  ),

        category:
            String(
                source.category ||
                "General"
            ),

        item:
            String(
                source.item ||
                source.description ||
                "Unnamed item"
            ),

        unit:
            String(
                source.unit ||
                "no."
            ),

        quantity:
            Number.isFinite(quantity) &&
            quantity >= 0
                ? quantity
                : 0,

        rate:
            Number.isFinite(rate) &&
            rate >= 0
                ? rate
                : 0,

        amount:
            (
                Number.isFinite(quantity)
                    ? quantity
                    : 0
            ) *
            (
                Number.isFinite(rate)
                    ? rate
                    : 0
            )

    };

}


// ==========================================================
// NORMALIZE PROJECT
// ==========================================================

function normalizeProject(
    project,
    index
) {

    const source =
        project &&
        typeof project === "object"
            ? project
            : {};

    const floors =
        Number(
            source.floors
        ) || 0;

    const area =
        Number(
            source.area
        ) || 0;

    const rawBOQ =
        Array.isArray(
            source.boq
        )
            ? source.boq
            : [];

    return {

        id:
            source.id != null
                ? source.id
                : Date.now() +
                  index +
                  Math.floor(
                      Math.random() * 10000
                  ),

        projectName:
            String(
                source.projectName ||
                "Untitled Project"
            ),

        clientName:
            String(
                source.clientName ||
                ""
            ),

        location:
            String(
                source.location ||
                ""
            ),

        buildingType:
            String(
                source.buildingType ||
                "Residential"
            ),

        floors:
            floors,

        area:
            area,

        totalArea:
            Number(
                source.totalArea
            ) ||
            floors * area,

        boq:
            rawBOQ.map(
                normalizeBOQItem
            )

    };

}


// ==========================================================
// LOAD PROJECTS
// ==========================================================

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

        const data =
            JSON.parse(
                saved
            );

        projects =
            Array.isArray(data)
                ? data.map(
                    normalizeProject
                )
                : [];

    } catch (error) {

        console.error(
            "Project loading error:",
            error
        );

        projects = [];

        console.warn(
            "Existing localStorage data was not deleted."
        );

    }

}


// ==========================================================
// SAVE PROJECTS
// ==========================================================

function saveProjects() {

    try {

        localStorage.setItem(
            "constructionProjects",
            JSON.stringify(
                projects
            )
        );

    } catch (error) {

        console.error(
            "Project saving error:",
            error
        );

        alert(
            "Unable to save project data in this browser."
        );

    }

}


function showDashboard() {
editingProjectId = null;
    // User intentionally returned to dashboard
    localStorage.removeItem(
        "activeProject"
    );


    const boqScreen =
        document.getElementById(
            "boqScreen"
        );

    if (boqScreen) {

        boqScreen.classList.add(
            "hidden"
        );

    }


    if (newProject) {

        newProject.classList.add(
            "hidden"
        );

    }


    if (dashboard) {

        dashboard.classList.remove(
            "hidden"
        );

    }


    activeProject = null;
    activeBOQ = [];


    displayProjects();
}

// ==========================================================
// NEW PROJECT
// ==========================================================

function showNewProject() {

    const boqScreen =
        document.getElementById(
            "boqScreen"
        );


    if (boqScreen) {

        boqScreen.classList.add(
            "hidden"
        );

    }


    if (dashboard) {

        dashboard.classList.add(
            "hidden"
        );

    }


    if (newProject) {

        newProject.classList.remove(
            "hidden"
        );

    }

}


// ==========================================================
// DISPLAY PROJECTS
// ==========================================================

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
                    id="createFirstProjectButton">

                    Create Your First Project

                </button>

            </div>
        `;

        const button =
            document.getElementById(
                "createFirstProjectButton"
            );

        if (button) {

            button.addEventListener(
                "click",
                showNewProject
            );

        }

        return;
    }


    projectList.innerHTML = "";


    projects.forEach(function(project) {

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
                        📍
                        ${escapeHTML(
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

                    <span>
                        Client
                    </span>

                    <strong>
                        ${escapeHTML(
                            project.clientName || "—"
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Floors
                    </span>

                    <strong>
                        ${project.floors || 0}
                    </strong>

                </div>


                <div>

                    <span>
                        Built-up Area
                    </span>

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
                    class="open-project-button">

                    Open Project →

                </button>


                <div class="project-card-actions">

                    <button
                        type="button"
                        class="edit-project-button">

                        Edit

                    </button>


                    <button
                        type="button"
                        class="delete-button">

                        Delete

                    </button>

                </div>

            </div>

        `;


        projectList.appendChild(card);


        // OPEN PROJECT

        const openButton =
            card.querySelector(
                ".open-project-button"
            );

        if (openButton) {

            openButton.addEventListener(
                "click",
                function() {

                    openProject(
                        project.id
                    );

                }
            );

        }


      // ==========================================================
// EDIT PROJECT
// ==========================================================

function editProject(id) {

    const project =
        projects.find(function(item) {

            return Number(item.id) ===
                Number(id);

        });


    if (!project) {

        alert(
            "Project could not be found."
        );

        return;

    }


    editingProjectId =
        project.id;


    const projectNameInput =
        document.getElementById(
            "projectName"
        );

    const clientNameInput =
        document.getElementById(
            "clientName"
        );

    const locationInput =
        document.getElementById(
            "location"
        );

    const buildingTypeInput =
        document.getElementById(
            "buildingType"
        );


    if (projectNameInput) {

        projectNameInput.value =
            project.projectName || "";

    }


    if (clientNameInput) {

        clientNameInput.value =
            project.clientName || "";

    }


    if (locationInput) {

        locationInput.value =
            project.location || "";

    }


    if (buildingTypeInput) {

        buildingTypeInput.value =
            project.buildingType || "Residential";

    }


    if (floorsInput) {

        floorsInput.value =
            project.floors || "";

    }


    if (areaInput) {

        areaInput.value =
            project.area || "";

    }


    calculateArea();


    // Change form heading

    const formTitle =
        document.querySelector(
            ".form-header h1"
        );

    if (formTitle) {

        formTitle.textContent =
            "Edit your project";

    }


    // Change form description

    const formDescription =
        document.querySelector(
            ".form-header p"
        );

    if (formDescription) {

        formDescription.textContent =
            "Update your project details. Your existing BOQ will stay محفوظ.";

    }


    // Change submit button

    const submitButton =
        document.getElementById(
            "createProjectButton"
        );

    if (submitButton) {

        submitButton.textContent =
            "Save Changes →";

    }


    // Show form

    showNewProject();

}


        // DELETE PROJECT

        const deleteButton =
            card.querySelector(
                ".delete-button"
            );

        if (deleteButton) {

            deleteButton.addEventListener(
                "click",
                function() {

                    deleteProject(
                        project.id
                    );

                }
            );

        }

    });

}

// ==========================================================
// OPEN PROJECT
// ==========================================================

function openProject(id) {

    const project =
        projects.find(
            function(item) {

                return String(
                    item.id
                ) ===
                String(id);

            }
        );

    if (!project) {

        alert(
            "Project could not be found."
        );

        return;

    }

    activeProject =
        project;

    localStorage.setItem(
        "activeProject",
        JSON.stringify(
            project
        )
    );

    if (dashboard) {

        dashboard.classList.add(
            "hidden"
        );

    }

    if (newProject) {

        newProject.classList.add(
            "hidden"
        );

    }

    createBOQScreen();

    loadProjectBOQ(
        project
    );

}


// ==========================================================
// CREATE BOQ SCREEN
// ==========================================================

function createBOQScreen() {

    let screen =
        document.getElementById(
            "boqScreen"
        );

    if (!screen) {

        screen =
            document.createElement(
                "section"
            );

        screen.id =
            "boqScreen";

        screen.className =
            "boq-screen hidden";

        const main =
            document.querySelector(
                "main"
            );

        if (!main) {

            console.error(
                "Main element not found."
            );

            return;

        }

        main.appendChild(
            screen
        );

    }

    screen.classList.remove(
        "hidden"
    );

}


// ==========================================================
// LOAD BOQ
// ==========================================================

function loadProjectBOQ(
    project
) {

    if (
        !project ||
        typeof project !== "object"
    ) {

        return;

    }

    if (
        Array.isArray(
            project.boq
        ) &&
        project.boq.length > 0
    ) {

        activeBOQ =
            project.boq.map(
                normalizeBOQItem
            );

    } else {

        activeBOQ =
            getDefaultBOQ(
                project
            );

        saveCurrentBOQ();

    }

    renderBOQ();

}


// ==========================================================
// DEFAULT BOQ
// ==========================================================

function getDefaultBOQ(
    project
) {

    const area =
        Number(
            project.totalArea
        ) || 0;

    const now =
        Date.now();

    return [

        {
            id: now + 1,
            category: "Earthwork",
            item: "Excavation for foundation",
            unit: "cu.ft",
            quantity: Math.round(
                area * 0.12
            ),
            rate: 55
        },

        {
            id: now + 2,
            category: "Concrete",
            item: "PCC 1:4:8",
            unit: "cu.ft",
            quantity: Math.round(
                area * 0.08
            ),
            rate: 180
        },

        {
            id: now + 3,
            category: "Concrete",
            item: "RCC work",
            unit: "cu.ft",
            quantity: Math.round(
                area * 0.35
            ),
            rate: 850
        },

        {
            id: now + 4,
            category: "Reinforcement",
            item: "Reinforcement steel",
            unit: "kg",
            quantity: Math.round(
                area * 4
            ),
            rate: 115
        },

        {
            id: now + 5,
            category: "Masonry",
            item: "Brick masonry",
            unit: "cu.ft",
            quantity: Math.round(
                area * 0.25
            ),
            rate: 220
        },

        {
            id: now + 6,
            category: "Plaster",
            item: "Cement plaster",
            unit: "sq.ft",
            quantity: Math.round(
                area * 1.8
            ),
            rate: 65
        },

        {
            id: now + 7,
            category: "Flooring",
            item: "Floor tiles",
            unit: "sq.ft",
            quantity: Math.round(
                area
            ),
            rate: 140
        },

        {
            id: now + 8,
            category: "Painting",
            item: "Interior & exterior painting",
            unit: "sq.ft",
            quantity: Math.round(
                area * 2.5
            ),
            rate: 45
        }

    ].map(
        normalizeBOQItem
    );

}


// ==========================================================
// SAVE CURRENT BOQ
// ==========================================================

function saveCurrentBOQ() {

    if (!activeProject) {

        return;

    }

    const project =
        projects.find(
            function(item) {

                return String(
                    item.id
                ) ===
                String(
                    activeProject.id
                );

            }
        );

    if (!project) {

        return;

    }

    project.boq =
        Array.isArray(
            activeBOQ
        )
            ? activeBOQ.map(
                normalizeBOQItem
            )
            : [];

    activeBOQ =
        project.boq;

    activeProject =
        project;

    saveProjects();

    localStorage.setItem(
        "activeProject",
        JSON.stringify(
            project
        )
    );

}


function saveActiveBOQ() {

    saveCurrentBOQ();

}


// ==========================================================
// BOQ TOTAL
// ==========================================================

function calculateBOQTotal() {

    let total = 0;

    if (
        !Array.isArray(
            activeBOQ
        )
    ) {

        activeBOQ = [];

    }

    activeBOQ.forEach(
        function(item) {

            item.quantity =
                Number(
                    item.quantity
                ) || 0;

            item.rate =
                Number(
                    item.rate
                ) || 0;

            item.amount =
                item.quantity *
                item.rate;

            total +=
                item.amount;

        }
    );

    return total;

}


// ==========================================================
// COST BREAKDOWN SETTINGS
// ==========================================================

function getCostBreakdownSettings() {

    const saved =
        localStorage.getItem(
            "costBreakdownSettings"
        );

    if (!saved) {

        return {

            contingency:
                5,

            overhead:
                5,

            profit:
                10

        };

    }

    try {

        const data =
            JSON.parse(
                saved
            );

        return {

            contingency:
                Number.isFinite(
                    Number(
                        data.contingency
                    )
                )
                    ? Number(
                        data.contingency
                    )
                    : 5,

            overhead:
                5,

            profit:
                10

        };

    } catch (error) {

        return {

            contingency: 5,
            overhead: 5,
            profit: 10

        };

    }

}


function saveCostBreakdownSettings(
    settings
) {

    localStorage.setItem(
        "costBreakdownSettings",
        JSON.stringify(
            settings
        )
    );

}


// ==========================================================
// RENDER BOQ
// ==========================================================

function renderBOQ() {

    const screen =
        document.getElementById(
            "boqScreen"
        );

    if (
        !screen ||
        !activeProject
    ) {

        return;

    }

    if (
        !Array.isArray(
            activeBOQ
        )
    ) {

        activeBOQ = [];

    }

    const area =
        Number(
            activeProject.totalArea
        ) || 0;

    const baseTotal =
        calculateBOQTotal();

    const costPerSqFt =
        area > 0
            ? baseTotal / area
            : 0;

    const settings =
        getCostBreakdownSettings();

    const contingency =
        baseTotal *
        (
            settings.contingency /
            100
        );

    const overhead =
        baseTotal *
        0.05;

    const subtotalWithContingency =
        baseTotal +
        contingency;

    const contractorProfit =
        subtotalWithContingency *
        0.10;

    const finalTotal =
        subtotalWithContingency +
        overhead +
        contractorProfit;


    screen.innerHTML = `

        <div class="boq-container">

            <!-- HEADER -->

            <div class="boq-header">

                <button
                    type="button"
                    class="back-button"
                    id="boqBackButton">

                    ← Back to Projects

                </button>

                <h2>
                    ${escapeHTML(
                        activeProject.projectName
                    )}
                </h2>

                <p>
                    📍
                    ${escapeHTML(
                        activeProject.location
                    )}
                </p>

            </div>


            <!-- SUMMARY -->

            <div class="estimate-summary">

                <div class="summary-card">

                    <span>
                        Built-up Area
                    </span>

                    <strong>
                        ${area.toLocaleString()}
                        sq.ft
                    </strong>

                </div>


                <div class="summary-card">

                    <span>
                        BOQ Items
                    </span>

                    <strong>
                        ${activeBOQ.length}
                    </strong>

                </div>


                <div class="summary-card">

                    <span>
                        Cost / sq.ft
                    </span>

                    <strong>
                        NPR
                        ${Math.round(
                            baseTotal /
                            Math.max(area, 1)
                        ).toLocaleString()}
                    </strong>

                </div>


                <div class="summary-card total">

                    <span>
                        Estimated Cost
                    </span>

                    <strong>
                        NPR
                        ${Math.round(
                            finalTotal
                        ).toLocaleString()}
                    </strong>

                </div>

            </div>


            <!-- RATE SYSTEM -->

            <div class="nepal-rate-panel">

                <div class="rate-panel-header">

                    <h3>
                        District Rate System
                    </h3>

                    <p>
                        Select a district, fiscal year,
                        and BOQ/reference item.
                    </p>

                </div>


                <div class="rate-controls">

                    <div class="rate-field">

                        <label>
                            District
                        </label>

                        <select
                            id="rateLocation">
                        </select>

                    </div>


                    <div class="rate-field">

                        <label>
                            Fiscal Year
                        </label>

                        <select
                            id="rateYear">
                        </select>

                    </div>


                    <div class="rate-field">

                        <label>
                            Rate Source
                        </label>

                        <input
                            id="rateSource"
                            type="text"
                            readonly
                            placeholder="—"
                        >

                    </div>


                    <div class="rate-field">

                        <label>
                            BOQ Item
                        </label>

                        <select
                            id="rateItem">

                            <option value="">
                                Select BOQ item
                            </option>

                        </select>

                    </div>


                    <div class="rate-field">

                        <label>
                            Unit
                        </label>

                        <input
                            id="rateUnit"
                            type="text"
                            readonly
                            placeholder="—"
                        >

                    </div>


                    <div class="rate-field">

                        <label>
                            Rate (NPR)
                        </label>

                        <input
                            id="rateValue"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="—"
                        >

                    </div>


                    <div class="rate-action">

                        <button
                            type="button"
                            id="applyNepalRate"
                            class="primary-button">

                            Apply Rate

                        </button>

                    </div>

                </div>


                <div
                    id="rateStatus"
                    class="rate-status">

                    Select a BOQ item or reference rate.

                </div>


                <div class="rate-warning">

                    ⚠️ Reference rates should be
                    verified against applicable
                    official schedules and current
                    market quotations.

                </div>

            </div>


            <!-- BOQ -->

            <div class="boq-card">

                <div class="boq-title">

                    <div>

                        <h3>
                            Bill of Quantities
                        </h3>

                        <p>
                            Edit quantities and rates
                            directly in the table.
                        </p>

                    </div>


                    <button
                        type="button"
                        id="addBOQButton"
                        class="add-boq-button">

                        + Add BOQ Item

                    </button>

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
                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            ${
                                activeBOQ
                                    .map(
                                        function(
                                            item,
                                            index
                                        ) {

                                            return `

                                                <tr>

                                                    <td>
                                                        ${index + 1}
                                                    </td>

                                                    <td>

                                                        <input
                                                            class="boq-input"
                                                            data-field="category"
                                                            data-id="${escapeAttribute(item.id)}"
                                                            value="${escapeAttribute(item.category)}"
                                                        >

                                                    </td>

                                                    <td>

                                                        <input
                                                            class="boq-input item-input"
                                                            data-field="item"
                                                            data-id="${escapeAttribute(item.id)}"
                                                            value="${escapeAttribute(item.item)}"
                                                        >

                                                    </td>

                                                    <td>

                                                        <input
                                                            class="boq-input unit-input"
                                                            data-field="unit"
                                                            data-id="${escapeAttribute(item.id)}"
                                                            value="${escapeAttribute(item.unit)}"
                                                        >

                                                    </td>

                                                    <td>

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            class="boq-input number-input"
                                                            data-field="quantity"
                                                            data-id="${escapeAttribute(item.id)}"
                                                            value="${item.quantity}"
                                                        >

                                                    </td>

                                                    <td>

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            class="boq-input number-input"
                                                            data-field="rate"
                                                            data-id="${escapeAttribute(item.id)}"
                                                            value="${item.rate}"
                                                        >

                                                    </td>

                                                    <td>

                                                        <strong
                                                            class="amount-cell"
                                                            data-amount-id="${escapeAttribute(item.id)}">

                                                            NPR
                                                            ${Math.round(
                                                                item.amount ||
                                                                0
                                                            ).toLocaleString()}

                                                        </strong>

                                                    </td>

                                                    <td>

                                                        <button
                                                            type="button"
                                                            class="delete-boq-button"
                                                            data-delete-boq="${escapeAttribute(item.id)}">

                                                            🗑️

                                                        </button>

                                                    </td>

                                                </tr>

                                            `;

                                        }
                                    )
                                    .join("")
                            }


                            ${
                                activeBOQ.length === 0
                                    ? `

                                        <tr>

                                            <td
                                                colspan="8"
                                                class="no-boq-items">

                                                No BOQ items.
                                                Click
                                                <strong>
                                                    + Add BOQ Item
                                                </strong>
                                                to add one.

                                            </td>

                                        </tr>

                                    `
                                    : ""
                            }

                        </tbody>

                    </table>

                </div>

            </div>


            <!-- COST BREAKDOWN -->

            <div
                class="cost-breakdown-card"
                id="costBreakdown">

                <div class="cost-breakdown-header">

                    <div>

                        <h2>
                            Cost Breakdown
                        </h2>

                        <p>
                            Construction estimate summary
                        </p>

                    </div>

                </div>


                <div class="cost-breakdown-list">

                    <div class="cost-row">

                        <span>
                            Direct BOQ Cost
                        </span>

                        <strong>
                            NPR
                            ${Math.round(
                                baseTotal
                            ).toLocaleString()}
                        </strong>

                    </div>


                    <div class="cost-row">

                        <span>
                            Tools & Equipment
                        </span>

                        <strong>
                            Included in
                            overhead
                        </strong>

                    </div>


                    <div class="cost-row">

                        <span>

                            Contingency

                            <input
                                id="contingencyRate"
                                class="cost-percent-input"
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                value="${settings.contingency}"
                            > %

                        </span>

                        <strong>
                            NPR
                            ${Math.round(
                                contingency
                            ).toLocaleString()}
                        </strong>

                    </div>


                    <div class="cost-row">

                        <span>
                            Overhead
                            <small>
                                5%
                            </small>
                        </span>

                        <strong>
                            NPR
                            ${Math.round(
                                overhead
                            ).toLocaleString()}
                        </strong>

                    </div>


                    <div class="cost-row">

                        <span>
                            Contractor's Profit
                            <small>
                                10%
                            </small>
                        </span>

                        <strong>
                            NPR
                            ${Math.round(
                                contractorProfit
                            ).toLocaleString()}
                        </strong>

                    </div>


                    <div class="cost-row cost-final">

                        <span>
                            Total Estimated Project Cost
                        </span>

                        <strong>
                            NPR
                            ${Math.round(
                                finalTotal
                            ).toLocaleString()}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- ADD BOQ -->

            <div
                id="addBOQForm"
                class="add-boq-form hidden">

                <h3>
                    Add Custom BOQ Item
                </h3>


                <div class="add-boq-grid">

                    <div>

                        <label>
                            Category
                        </label>

                        <input
                            id="customCategory"
                            type="text"
                            placeholder="e.g. Plumbing"
                        >

                    </div>


                    <div>

                        <label>
                            Description
                        </label>

                        <input
                            id="customItem"
                            type="text"
                            placeholder="e.g. Water supply pipes"
                        >

                    </div>


                    <div>

                        <label>
                            Unit
                        </label>

                        <select id="customUnit">

                            <option value="sq.ft">
                                sq.ft
                            </option>

                            <option value="cu.ft">
                                cu.ft
                            </option>

                            <option value="cu.m">
                                cu.m
                            </option>

                            <option value="kg">
                                kg
                            </option>

                            <option value="m">
                                m
                            </option>

                            <option value="no.">
                                no.
                            </option>

                            <option value="set">
                                set
                            </option>

                            <option value="LS">
                                LS
                            </option>

                            <option value="pc">
                                pc
                            </option>

                        </select>

                    </div>


                    <div>

                        <label>
                            Quantity
                        </label>

                        <input
                            id="customQuantity"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0"
                        >

                    </div>


                    <div>

                        <label>
                            Rate (NPR)
                        </label>

                        <input
                            id="customRate"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0"
                        >

                    </div>

                </div>


                <div class="add-boq-actions">

                    <button
                        type="button"
                        id="saveCustomBOQ"
                        class="primary-button">

                        Add Item

                    </button>


                    <button
                        type="button"
                        id="cancelCustomBOQ"
                        class="secondary-button">

                        Cancel

                    </button>

                </div>

            </div>


            <div class="boq-note">

                <strong>
                    Preliminary Estimate:
                </strong>

                Verify applicable rates before
                commercial use.

            </div>

        </div>

    `;


    initializeRateSystem();

    attachBOQEvents();

    initializeCostBreakdown();

}


// ==========================================================
// COST BREAKDOWN
// ==========================================================

function initializeCostBreakdown() {

    const input =
        document.getElementById(
            "contingencyRate"
        );

    if (!input) {

        return;

    }

    input.addEventListener(
        "input",
        function() {

            let value =
                Number(
                    input.value
                );

            if (
                !Number.isFinite(
                    value
                ) ||
                value < 0
            ) {

                value = 0;

            }

            if (value > 100) {

                value = 100;

            }

            const settings =
                getCostBreakdownSettings();

            settings.contingency =
                value;

            saveCostBreakdownSettings(
                settings
            );

            renderBOQ();

        }
    );

}


// ==========================================================
// INITIALIZE RATE SYSTEM
// ==========================================================

function initializeRateSystem() {

    const locationSelect =
        document.getElementById(
            "rateLocation"
        );

    const yearSelect =
        document.getElementById(
            "rateYear"
        );

    const itemSelect =
        document.getElementById(
            "rateItem"
        );

    const unitInput =
        document.getElementById(
            "rateUnit"
        );

    const rateInput =
        document.getElementById(
            "rateValue"
        );

    const sourceInput =
        document.getElementById(
            "rateSource"
        );

    const status =
        document.getElementById(
            "rateStatus"
        );

    const applyButton =
        document.getElementById(
            "applyNepalRate"
        );


    if (
        !locationSelect ||
        !yearSelect ||
        !itemSelect ||
        !unitInput ||
        !rateInput
    ) {

        console.warn(
            "Rate system elements not found."
        );

        return;

    }


    locationSelect.innerHTML =
        "";

    const locations =
        getRateLocations();


    if (
        !Array.isArray(
            locations
        ) ||
        locations.length === 0
    ) {

        locationSelect.innerHTML =
            `
                <option value="">
                    No district available
                </option>
            `;

        yearSelect.innerHTML =
            `
                <option value="">
                    No fiscal year available
                </option>
            `;

        itemSelect.innerHTML =
            `
                <option value="">
                    No reference rate available
                </option>
            `;

        return;

    }


    locations.forEach(
        function(location) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                location;

            option.textContent =
                location;

            locationSelect.appendChild(
                option
            );

        }
    );


    function addCustomBOQOptions() {

        if (
            !Array.isArray(
                activeBOQ
            ) ||
            activeBOQ.length === 0
        ) {

            return;

        }

        const boqGroup =
            document.createElement(
                "optgroup"
            );

        boqGroup.label =
            "📋 Current BOQ Items";


        activeBOQ.forEach(
            function(item) {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    "boq:" +
                    String(
                        item.id
                    );

                option.textContent =
                    `${
                        item.category ||
                        "Custom"
                    } — ${
                        item.item ||
                        "Unnamed item"
                    }`;

                boqGroup.appendChild(
                    option
                );

            }
        );


        itemSelect.appendChild(
            boqGroup
        );

    }


    function loadSchedule() {

        const location =
            locationSelect.value;

        const year =
            yearSelect.value;

        const schedule =
            getRateSchedule(
                location,
                year
            );


        itemSelect.innerHTML =
            `
                <option value="">
                    Select BOQ item
                </option>
            `;

        unitInput.value =
            "";

        rateInput.value =
            "";


        addCustomBOQOptions();


        if (!schedule) {

            if (sourceInput) {

                sourceInput.value =
                    "No schedule available";

            }

            if (status) {

                status.textContent =
                    "No rate schedule found.";

            }

            return;

        }


        const items =
            Array.isArray(
                schedule.items
            )
                ? schedule.items
                : [];


        if (sourceInput) {

            sourceInput.value =
                schedule.source ||
                "Reference";

        }


        if (status) {

            status.textContent =
                `${
                    schedule.sourceType ||
                    "Reference"
                } • ${
                    schedule.sourceYear ||
                    year
                }`;

        }


        const referenceGroup =
            document.createElement(
                "optgroup"
            );

        referenceGroup.label =
            "🇳🇵 Nepal Reference Rates";


        items.forEach(
            function(item, index) {

                if (
                    !item ||
                    typeof item !==
                        "object"
                ) {

                    return;

                }

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    "rate:" +
                    index;

                option.textContent =
                    `${
                        item.category ||
                        "General"
                    } — ${
                        item.description ||
                        "Unnamed rate item"
                    }`;

                referenceGroup.appendChild(
                    option
                );

            }
        );


        itemSelect.appendChild(
            referenceGroup
        );

    }


    function loadYears() {

        const location =
            locationSelect.value;

        yearSelect.innerHTML =
            "";

        const years =
            getRateYears(
                location
            );


        const safeYears =
            Array.isArray(
                years
            )
                ? years
                : [];


        if (
            safeYears.length === 0
        ) {

            yearSelect.innerHTML =
                `
                    <option value="">
                        No fiscal year available
                    </option>
                `;

            loadSchedule();

            return;

        }


        safeYears.forEach(
            function(year) {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    year;

                option.textContent =
                    year;

                yearSelect.appendChild(
                    option
                );

            }
        );


        loadSchedule();

    }


    itemSelect.addEventListener(
        "change",
        function() {

            const value =
                itemSelect.value;


            unitInput.value =
                "";

            rateInput.value =
                "";


            if (!value) {

                if (status) {

                    status.textContent =
                        "Select a BOQ item or reference rate.";

                }

                return;

            }


            if (
                value.indexOf(
                    "boq:"
                ) === 0
            ) {

                const id =
                    value.substring(
                        4
                    );


                const boqItem =
                    Array.isArray(
                        activeBOQ
                    )
                        ? activeBOQ.find(
                            function(item) {

                                return String(
                                    item.id
                                ) ===
                                String(
                                    id
                                );

                            }
                        )
                        : null;


                if (!boqItem) {

                    return;

                }


                unitInput.value =
                    boqItem.unit ||
                    "";

                rateInput.value =
                    Number(
                        boqItem.rate
                    ) || 0;


                if (status) {

                    status.textContent =
                        "Current BOQ item selected. Edit the rate if required.";

                }

                return;

            }


            if (
                value.indexOf(
                    "rate:"
                ) === 0
            ) {

                const index =
                    Number(
                        value.substring(
                            5
                        )
                    );


                if (
                    !Number.isInteger(
                        index
                    ) ||
                    index < 0
                ) {

                    return;

                }


                const schedule =
                    getRateSchedule(
                        locationSelect.value,
                        yearSelect.value
                    );


                const items =
                    schedule &&
                    Array.isArray(
                        schedule.items
                    )
                        ? schedule.items
                        : [];


                const item =
                    items[index];


                if (!item) {

                    return;

                }


                unitInput.value =
                    item.unit ||
                    "";

                rateInput.value =
                    Number(
                        item.rate
                    ) || 0;


                if (status) {

                    status.textContent =
                        "Reference rate loaded. You can edit it before applying.";

                }

            }

        }
    );


    locationSelect.addEventListener(
        "change",
        loadYears
    );


    yearSelect.addEventListener(
        "change",
        loadSchedule
    );


    if (applyButton) {

        applyButton.addEventListener(
            "click",
            applySelectedRate
        );

    }


    loadYears();

}


// ==========================================================
// APPLY SELECTED RATE
// ==========================================================

function applySelectedRate() {

    const itemSelect =
        document.getElementById(
            "rateItem"
        );

    const unitInput =
        document.getElementById(
            "rateUnit"
        );

    const rateInput =
        document.getElementById(
            "rateValue"
        );

    const status =
        document.getElementById(
            "rateStatus"
        );


    if (
        !itemSelect ||
        !unitInput ||
        !rateInput
    ) {

        return;

    }


    const selected =
        itemSelect.value;


    if (!selected) {

        alert(
            "Please select a BOQ item or reference rate."
        );

        return;

    }


    const rate =
        Number(
            rateInput.value
        );


    if (
        !Number.isFinite(
            rate
        ) ||
        rate <= 0
    ) {

        alert(
            "Please enter a valid rate greater than 0."
        );

        return;

    }


    const unit =
        String(
            unitInput.value ||
            ""
        ).trim();


    // CURRENT BOQ ITEM

    if (
        selected.indexOf(
            "boq:"
        ) === 0
    ) {

        const id =
            selected.substring(
                4
            );


        const boqItem =
            Array.isArray(
                activeBOQ
            )
                ? activeBOQ.find(
                    function(item) {

                        return String(
                            item.id
                        ) ===
                        String(
                            id
                        );

                    }
                )
                : null;


        if (!boqItem) {

            alert(
                "BOQ item could not be found."
            );

            return;

        }


        boqItem.rate =
            rate;


        if (unit) {

            boqItem.unit =
                unit;

        }


        boqItem.amount =
            Number(
                boqItem.quantity ||
                0
            ) *
            rate;


        saveCurrentBOQ();


        renderBOQ();

        return;

    }


    // REFERENCE RATE

    if (
        selected.indexOf(
            "rate:"
        ) === 0
    ) {

        const index =
            Number(
                selected.substring(
                    5
                )
            );


        const locationElement =
            document.getElementById(
                "rateLocation"
            );

        const yearElement =
            document.getElementById(
                "rateYear"
            );


        const schedule =
            getRateSchedule(
                locationElement
                    ? locationElement.value
                    : "",
                yearElement
                    ? yearElement.value
                    : ""
            );


        const items =
            schedule &&
            Array.isArray(
                schedule.items
            )
                ? schedule.items
                : [];


        if (
            !Number.isInteger(
                index
            ) ||
            !items[index]
        ) {

            alert(
                "Reference rate item could not be found."
            );

            return;

        }


        const referenceItem =
            items[index];


        const referenceText =
            normalizeText(
                referenceItem.description
            );


        let matchingItem =
            activeBOQ.find(
                function(item) {

                    return normalizeText(
                        item.item
                    ) ===
                    referenceText;

                }
            );


        if (
            !matchingItem &&
            referenceText
        ) {

            matchingItem =
                activeBOQ.find(
                    function(item) {

                        const boqText =
                            normalizeText(
                                item.item
                            );

                        return (
                            boqText.includes(
                                referenceText
                            ) ||
                            referenceText.includes(
                                boqText
                            )
                        );

                    }
                );

        }


        if (
            !matchingItem &&
            referenceItem.category
        ) {

            const category =
                normalizeText(
                    referenceItem.category
                );

            const matches =
                activeBOQ.filter(
                    function(item) {

                        return normalizeText(
                            item.category
                        ) ===
                        category;

                    }
                );


            if (
                matches.length === 1
            ) {

                matchingItem =
                    matches[0];

            }

        }


        if (!matchingItem) {

            alert(
                "No matching BOQ item was found.\n\n" +
                "Add the item to the BOQ first, " +
                "or select the current BOQ item directly."
            );

            return;

        }


        matchingItem.rate =
            rate;


        if (unit) {

            matchingItem.unit =
                unit;

        }


        matchingItem.amount =
            Number(
                matchingItem.quantity ||
                0
            ) *
            rate;


        saveCurrentBOQ();

        renderBOQ();

        return;

    }


    if (status) {

        status.textContent =
            "Rate applied.";

    }

}


// ==========================================================
// BOQ EVENTS
// ==========================================================

function attachBOQEvents() {

    const backButton =
        document.getElementById(
            "boqBackButton"
        );

    if (backButton) {

        backButton.addEventListener(
            "click",
            showDashboard
        );

    }


    const addButton =
        document.getElementById(
            "addBOQButton"
        );

    if (addButton) {

        addButton.addEventListener(
            "click",
            function() {

                const form =
                    document.getElementById(
                        "addBOQForm"
                    );

                if (form) {

                    form.classList.toggle(
                        "hidden"
                    );

                }

            }
        );

    }


    const cancelButton =
        document.getElementById(
            "cancelCustomBOQ"
        );

    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function() {

                const form =
                    document.getElementById(
                        "addBOQForm"
                    );

                if (form) {

                    form.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }


    const saveButton =
        document.getElementById(
            "saveCustomBOQ"
        );

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            addCustomBOQItem
        );

    }


    document
        .querySelectorAll(
            ".boq-input"
        )
        .forEach(
            function(input) {

                input.addEventListener(
                    "input",
                    function() {

                        updateBOQItem(
                            input
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".delete-boq-button"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        deleteBOQItem(
                            button.dataset.deleteBoq
                        );

                    }
                );

            }
        );

}


// ==========================================================
// UPDATE BOQ ITEM
// ==========================================================

function updateBOQItem(
    input
) {

    if (
        !input ||
        !input.dataset
    ) {

        return;

    }


    const id =
        String(
            input.dataset.id
        );

    const field =
        input.dataset.field;


    const item =
        activeBOQ.find(
            function(boqItem) {

                return String(
                    boqItem.id
                ) ===
                id;

            }
        );


    if (!item) {

        return;

    }


    if (
        field === "quantity" ||
        field === "rate"
    ) {

        const value =
            Number(
                input.value
            );

        item[field] =
            Number.isFinite(
                value
            ) &&
            value >= 0
                ? value
                : 0;

    } else {

        item[field] =
            input.value;

    }


    item.amount =
        Number(
            item.quantity || 0
        ) *
        Number(
            item.rate || 0
        );


    saveCurrentBOQ();


    let amountCell = null;

    try {

        amountCell =
            document.querySelector(
                `[data-amount-id="${CSS.escape(id)}"]`
            );

    } catch (error) {

        amountCell =
            document.querySelector(
                `[data-amount-id="${id}"]`
            );

    }


    if (amountCell) {

        amountCell.textContent =
            "NPR " +
            Math.round(
                item.amount
            ).toLocaleString();

    }


    updateBOQSummary();

}


// ==========================================================
// UPDATE SUMMARY
// ==========================================================

function updateBOQSummary() {

    let total = 0;

    if (
        !Array.isArray(
            activeBOQ
        )
    ) {

        activeBOQ = [];

    }


    activeBOQ.forEach(
        function(item) {

            total +=
                Number(
                    item.quantity || 0
                ) *
                Number(
                    item.rate || 0
                );

        }
    );


    const area =
        Number(
            activeProject &&
            activeProject.totalArea
        ) || 0;


    const settings =
        getCostBreakdownSettings();


    const contingency =
        total *
        (
            settings.contingency /
            100
        );


    const overhead =
        total * 0.05;


    const profit =
        (
            total +
            contingency
        ) *
        0.10;


    const finalTotal =
        total +
        contingency +
        overhead +
        profit;


    const cards =
        document.querySelectorAll(
            ".summary-card strong"
        );


    if (
        cards.length >= 4
    ) {

        cards[2].textContent =
            "NPR " +
            Math.round(
                area > 0
                    ? total / area
                    : 0
            ).toLocaleString();


        cards[3].textContent =
            "NPR " +
            Math.round(
                finalTotal
            ).toLocaleString();

    }


}


// ==========================================================
// ADD CUSTOM BOQ ITEM
// ==========================================================

function addCustomBOQItem() {

    const category =
        document.getElementById(
            "customCategory"
        );

    const item =
        document.getElementById(
            "customItem"
        );

    const unit =
        document.getElementById(
            "customUnit"
        );

    const quantity =
        document.getElementById(
            "customQuantity"
        );

    const rate =
        document.getElementById(
            "customRate"
        );


    if (
        !category ||
        !item ||
        !unit ||
        !quantity ||
        !rate
    ) {

        return;

    }


    const categoryValue =
        category.value.trim();

    const itemValue =
        item.value.trim();

    const quantityValue =
        Number(
            quantity.value
        ) || 0;

    const rateValue =
        Number(
            rate.value
        ) || 0;


    if (!categoryValue) {

        alert(
            "Please enter a category."
        );

        return;

    }


    if (!itemValue) {

        alert(
            "Please enter an item description."
        );

        return;

    }


    if (
        quantityValue <= 0
    ) {

        alert(
            "Please enter a quantity greater than 0."
        );

        return;

    }


    if (
        rateValue < 0
    ) {

        alert(
            "Rate cannot be negative."
        );

        return;

    }


    activeBOQ.push(

        normalizeBOQItem(

            {

                id:
                    Date.now() +
                    Math.floor(
                        Math.random() *
                        100000
                    ),

                category:
                    categoryValue,

                item:
                    itemValue,

                unit:
                    unit.value,

                quantity:
                    quantityValue,

                rate:
                    rateValue,

                amount:
                    quantityValue *
                    rateValue

            },

            activeBOQ.length

        )

    );


    saveCurrentBOQ();

    renderBOQ();

}


// ==========================================================
// DELETE BOQ ITEM
// ==========================================================

function deleteBOQItem(
    id
) {

    const item =
        activeBOQ.find(
            function(boqItem) {

                return String(
                    boqItem.id
                ) ===
                String(id);

            }
        );


    if (!item) {

        return;

    }


    const confirmed =
        confirm(
            'Delete "' +
            item.item +
            '" from the BOQ?'
        );


    if (!confirmed) {

        return;

    }


    activeBOQ =
        activeBOQ.filter(
            function(boqItem) {

                return String(
                    boqItem.id
                ) !==
                String(id);

            }
        );


    saveCurrentBOQ();

    renderBOQ();

}


// ==========================================================
// DELETE PROJECT
// ==========================================================

function deleteProject(
    id
) {

    const project =
        projects.find(
            function(item) {

                return String(
                    item.id
                ) ===
                String(id);

            }
        );


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
        projects.filter(
            function(item) {

                return String(
                    item.id
                ) !==
                String(id);

            }
        );


    if (
        activeProject &&
        String(
            activeProject.id
        ) ===
        String(id)
    ) {

        activeProject =
            null;

        activeBOQ =
            [];

        localStorage.removeItem(
            "activeProject"
        );

    }


    saveProjects();

    displayProjects();

}


// ==========================================================
// AREA CALCULATION
// ==========================================================

function calculateArea() {

    if (
        !floorsInput ||
        !areaInput ||
        !totalArea
    ) {

        return;

    }


    const floors =
        Number(
            floorsInput.value
        ) || 0;


    const area =
        Number(
            areaInput.value
        ) || 0;


    const total =
        floors *
        area;


    totalArea.textContent =
        total.toLocaleString() +
        " sq.ft";

}


if (floorsInput) {

    floorsInput.addEventListener(
        "input",
        calculateArea
    );

}


if (areaInput) {

    areaInput.addEventListener(
        "input",
        calculateArea
    );

}


// ==========================================================
// CREATE / UPDATE PROJECT
// ==========================================================

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const projectName =
                document
                    .getElementById(
                        "projectName"
                    )
                    .value
                    .trim();


            const clientName =
                document
                    .getElementById(
                        "clientName"
                    )
                    .value
                    .trim();


            const location =
                document
                    .getElementById(
                        "location"
                    )
                    .value
                    .trim();


            const buildingType =
                document
                    .getElementById(
                        "buildingType"
                    )
                    .value;


            const floors =
                Number(
                    floorsInput.value
                );


            const area =
                Number(
                    areaInput.value
                );


            // ==================================================
            // VALIDATION
            // ==================================================

            if (!projectName) {

                alert(
                    "Please enter the project name."
                );

                return;

            }


            if (!location) {

                alert(
                    "Please enter the project location."
                );

                return;

            }


            if (
                !floors ||
                floors <= 0
            ) {

                alert(
                    "Please enter valid number of floors."
                );

                return;

            }


            if (
                !area ||
                area <= 0
            ) {

                alert(
                    "Please enter valid floor area."
                );

                return;

            }


            // ==================================================
            // UPDATE EXISTING PROJECT
            // ==================================================

            if (editingProjectId !== null) {

                const project =
                    projects.find(
                        function(item) {

                            return Number(
                                item.id
                            ) === Number(
                                editingProjectId
                            );

                        }
                    );


                if (!project) {

                    alert(
                        "Project could not be found."
                    );

                    return;

                }


                // Update only project details

                project.projectName =
                    projectName;

                project.clientName =
                    clientName;

                project.location =
                    location;

                project.buildingType =
                    buildingType;

                project.floors =
                    floors;

                project.area =
                    area;

                project.totalArea =
                    floors * area;


                // Keep existing BOQ

                if (!Array.isArray(project.boq)) {

                    project.boq = [];

                }


                saveProjects();


                // Update active project if necessary

                if (
                    activeProject &&
                    Number(
                        activeProject.id
                    ) === Number(
                        project.id
                    )
                ) {

                    activeProject =
                        project;

                    localStorage.setItem(
                        "activeProject",
                        JSON.stringify(
                            project
                        )
                    );

                }


                // Reset edit mode

                editingProjectId =
                    null;


                projectForm.reset();


                if (totalArea) {

                    totalArea.textContent =
                        "0 sq.ft";

                }


                resetProjectFormUI();


                showDashboard();


                return;

            }


            // ==================================================
            // CREATE NEW PROJECT
            // ==================================================

            const project = {

                id:
                    Date.now(),

                projectName:
                    projectName,

                clientName:
                    clientName,

                location:
                    location,

                buildingType:
                    buildingType,

                floors:
                    floors,

                area:
                    area,

                totalArea:
                    floors * area,

                boq:
                    []

            };


            projects.push(
                project
            );


            saveProjects();


            projectForm.reset();


            if (totalArea) {

                totalArea.textContent =
                    "0 sq.ft";

            }


            resetProjectFormUI();


            showDashboard();

        }
    );

}

// ==========================================================
// NAVIGATION BUTTONS
// ==========================================================

function connectButton(
    id,
    action
) {

    const button =
        document.getElementById(
            id
        );

    if (button) {

        button.addEventListener(
            "click",
            action
        );

    }

}


connectButton(
    "newProjectButton",
    showNewProject
);

connectButton(
    "newProjectButton2",
    showNewProject
);

connectButton(
    "backButton",
    showDashboard
);

connectButton(
    "cancelButton",
    showDashboard
);


// ==========================================================
// SECURITY
// ==========================================================

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value == null
            ? ""
            : String(value);

    return div.innerHTML;

}


function escapeAttribute(
    value
) {

    return String(
        value == null
            ? ""
            : value
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}


// ==========================================================
// NORMALIZE TEXT
// ==========================================================

function normalizeText(
    value
) {

    return String(
        value == null
            ? ""
            : value
    )
        .toLowerCase()
        .replace(
            /\s+/g,
            " "
        )
        .trim();

}


// ==========================================================
// CSS ESCAPE FALLBACK
// ==========================================================

if (
    typeof window.CSS ===
        "undefined" ||
    typeof window.CSS.escape !==
        "function"
) {

    window.CSS =
        window.CSS || {};

    window.CSS.escape =
        function(value) {

            return String(
                value
            )
                .replace(
                    /\\/g,
                    "\\\\"
                )
                .replace(
                    /"/g,
                    '\\"'
                );

        };

}


// ==========================================================
// DAY / NIGHT THEME
// ==========================================================

function getSavedTheme() {

    const saved =
        localStorage.getItem(
            THEME_KEY
        );

    if (
        saved === "dark" ||
        saved === "light"
    ) {

        return saved;

    }

    return "light";

}


function applyTheme(
    theme
) {

    const safeTheme =
        theme === "dark"
            ? "dark"
            : "light";


    document.documentElement.setAttribute(
        "data-theme",
        safeTheme
    );


    localStorage.setItem(
        THEME_KEY,
        safeTheme
    );


    updateThemeButton();

}


function updateThemeButton() {

    let button =
        document.getElementById(
            "themeToggle"
        );


    if (!button) {

        return;

    }


    const dark =
        document.documentElement.getAttribute(
            "data-theme"
        ) ===
        "dark";


    button.textContent =
        dark
            ? "☀️"
            : "🌙";


    button.title =
        dark
            ? "Switch to day mode"
            : "Switch to night mode";


    button.setAttribute(
        "aria-label",
        dark
            ? "Switch to day mode"
            : "Switch to night mode"
    );

}


function toggleTheme() {

    const current =
        document.documentElement.getAttribute(
            "data-theme"
        );


    applyTheme(
        current === "dark"
            ? "light"
            : "dark"
    );

}


function createThemeButton() {

    let button =
        document.getElementById(
            "themeToggle"
        );


    if (button) {

        updateThemeButton();

        return;

    }


    button =
        document.createElement(
            "button"
        );


    button.type =
        "button";

    button.id =
        "themeToggle";

    button.className =
        "theme-toggle";

    button.setAttribute(
        "aria-label",
        "Switch theme"
    );


    button.addEventListener(
        "click",
        toggleTheme
    );


    /*
       Try to place it in the existing
       header/navigation.
    */

    const header =
        document.querySelector(
            "header"
        );


    if (header) {

        header.appendChild(
            button
        );

    } else {

        document.body.prepend(
            button
        );

    }


    updateThemeButton();

}


function initializeTheme() {

    const theme =
        getSavedTheme();


    document.documentElement.setAttribute(
        "data-theme",
        theme
    );


    /*
       Wait until DOM is ready before
       creating the button.
    */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function() {

                createThemeButton();

            }
        );

    } else {

        createThemeButton();

    }

}


initializeTheme();
// ==========================================================
// MODERN DAY / NIGHT THEME
// ==========================================================

function initializeTheme() {

    const savedTheme =
        localStorage.getItem("nce-theme");

    if (savedTheme === "dark") {

        document.documentElement.classList.add(
            "dark-mode"
        );

    } else {

        document.documentElement.classList.remove(
            "dark-mode"
        );

    }

    createThemeToggle();

}


// ==========================================================
// CREATE THEME TOGGLE
// ==========================================================

function createThemeToggle() {

    // Don't create duplicate button
    if (
        document.getElementById(
            "themeToggle"
        )
    ) {
        return;
    }


    const button =
        document.createElement("button");


    button.id =
        "themeToggle";


    button.className =
        "theme-toggle";


    button.type =
        "button";


    button.setAttribute(
        "aria-label",
        "Toggle day and night mode"
    );


    button.setAttribute(
        "title",
        "Toggle day / night mode"
    );


    const circle =
        document.createElement("span");


    circle.className =
        "theme-toggle-circle";


    button.appendChild(
        circle
    );


    // ------------------------------------------------------
    // FIND HEADER
    // ------------------------------------------------------

    let header =
        document.querySelector(
            ".app-header"
        );


    // If there is no custom app header,
    // create a floating top-right control.

    if (!header) {

        button.style.position =
            "fixed";

        button.style.top =
            "18px";

        button.style.right =
            "22px";

        button.style.zIndex =
            "9999";

        document.body.appendChild(
            button
        );

    } else {

        header.appendChild(
            button
        );

    }


    // ------------------------------------------------------
    // TOGGLE
    // ------------------------------------------------------

    button.addEventListener(
        "click",
        function() {

            const isDark =
                document.documentElement.classList.toggle(
                    "dark-mode"
                );


            localStorage.setItem(
                "nce-theme",
                isDark
                    ? "dark"
                    : "light"
            );


            // Small animation
            button.animate(
                [
                    {
                        transform:
                            "scale(1)"
                    },
                    {
                        transform:
                            "scale(.88) rotate(-8deg)"
                    },
                    {
                        transform:
                            "scale(1.06) rotate(4deg)"
                    },
                    {
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration: 420,
                    easing:
                        "cubic-bezier(.68,-0.55,.27,1.55)"
                }
            );

        }
    );

}


// ==========================================================
// START THEME SYSTEM
// ==========================================================

initializeTheme();

// ==========================================================
// START APP
// ==========================================================

loadProjects();


// ==========================================================
// RESTORE LAST OPEN PROJECT AFTER REFRESH
// ==========================================================

function restoreLastProject() {

    const savedActiveProject =
        localStorage.getItem("activeProject");

    // Nothing was open before refresh
    if (!savedActiveProject) {
        displayProjects();
        return;
    }

    try {

        const savedProject =
            JSON.parse(savedActiveProject);

        if (!savedProject || !savedProject.id) {
            localStorage.removeItem("activeProject");
            displayProjects();
            return;
        }


        // Find the latest version of the project
        // from the main projects array.
        const project =
            projects.find(function (item) {

                return Number(item.id) ===
                    Number(savedProject.id);

            });


        // Project was deleted
        if (!project) {

            localStorage.removeItem(
                "activeProject"
            );

            displayProjects();

            return;
        }


        // Restore active project
        activeProject = project;


        // Hide dashboard
        if (dashboard) {
            dashboard.classList.add("hidden");
        }


        // Hide new project screen
        if (newProject) {
            newProject.classList.add("hidden");
        }


        // Recreate workspace
        createBOQScreen();


        // Load the project's BOQ
        loadProjectBOQ(project);


        console.log(
            "Restored project:",
            project.projectName
        );

    } catch (error) {

        console.error(
            "Could not restore active project:",
            error
        );

        localStorage.removeItem(
            "activeProject"
        );

        displayProjects();
    }
}


// ==========================================================
// START
// ==========================================================

restoreLastProject();


console.log(
    "Constructor Estimator loaded successfully."
);
// ==========================================================
// MODERN DAY / NIGHT THEME
// ==========================================================

(function initializeTheme() {

    const themeToggle =
        document.getElementById("themeToggle");

    const brandHome =
        document.getElementById("brandHome");

    const footerDate =
        document.getElementById("footerDate");


    // ------------------------------------------------------
    // LOAD SAVED THEME
    // ------------------------------------------------------

    let savedTheme =
        localStorage.getItem(
            "nce-theme"
        );


    if (!savedTheme) {

        savedTheme =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";

    }


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );

    } else {

        document.body.classList.remove(
            "dark"
        );

    }


    // ------------------------------------------------------
    // TOGGLE
    // ------------------------------------------------------

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function() {

                const isDark =
                    document.body.classList.toggle(
                        "dark"
                    );


                const newTheme =
                    isDark
                        ? "dark"
                        : "light";


                localStorage.setItem(
                    "nce-theme",
                    newTheme
                );

            }
        );

    }


    // ------------------------------------------------------
    // BRAND → DASHBOARD
    // ------------------------------------------------------

    if (brandHome) {

        brandHome.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                if (
                    typeof showDashboard ===
                    "function"
                ) {

                    showDashboard();

                }

            }
        );

    }


    // ------------------------------------------------------
    // FOOTER DATE
    // ------------------------------------------------------

    if (footerDate) {

        const now =
            new Date();


        const formattedDate =
            now.toLocaleDateString(
                "en-NP",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        footerDate.textContent =
            formattedDate;

    }

})();
// ==========================================================
// CONSTRUCTOR ESTIMATOR THEME SYSTEM
// ==========================================================

(function initThemeSystem() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    const themeIcon =
        themeToggle
            ? themeToggle.querySelector(
                ".theme-icon"
            )
            : null;


    function getSavedTheme() {

        const saved =
            localStorage.getItem(
                "constructorEstimatorTheme"
            );

        if (
            saved === "light" ||
            saved === "dark"
        ) {

            return saved;

        }


        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light";

    }


    function applyTheme(theme) {

        document.documentElement
            .setAttribute(
                "data-theme",
                theme
            );


        if (themeIcon) {

            themeIcon.textContent =
                theme === "dark"
                    ? "☀️"
                    : "🌙";

        }


        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                theme === "dark"
                    ? "Light mode"
                    : "Dark mode"
            );

        }


        localStorage.setItem(
            "constructorEstimatorTheme",
            theme
        );

    }


    applyTheme(
        getSavedTheme()
    );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function() {

                const current =
                    document.documentElement
                        .getAttribute(
                            "data-theme"
                        ) || "light";


                const next =
                    current === "dark"
                        ? "light"
                        : "dark";


                applyTheme(next);

            }
        );

    }

})();
