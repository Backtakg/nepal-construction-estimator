// ==========================================================
// NEPAL CONSTRUCTION ESTIMATOR
// PROJECTS + BOQ + EDITABLE RATES + CUSTOM ITEMS
// + NEPAL REFERENCE RATE SYSTEM
// ==========================================================

"use strict";

// ==========================================================
// GLOBAL STATE
// ==========================================================

let projects = [];
let activeProject = null;
let activeBOQ = [];


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
//
// These are reference/demo values.
// They are NOT represented as official government rates.
// Verify against the applicable official schedule and
// current market quotations before commercial use.
//
// Structure:
// {
//     "Item name": {
//         category: "...",
//         unit: "...",
//         rate: number
//     }
// }
//
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
// RATE SCHEDULE CONFIGURATION
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
                            data.rate

                    };

                })

        }

    }

};


// ==========================================================
// RATE SYSTEM FUNCTIONS
// ==========================================================

function getRateLocations() {

    return Object.keys(
        NEPAL_RATE_SCHEDULES
    );

}


function getRateYears(location) {

    if (
        !NEPAL_RATE_SCHEDULES[location]
    ) {

        return [];

    }

    return Object.keys(
        NEPAL_RATE_SCHEDULES[location]
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

    const schedule =
        NEPAL_RATE_SCHEDULES[
            location
        ] &&
        NEPAL_RATE_SCHEDULES[
            location
        ][year];


    if (!schedule) {

        return null;

    }


    // SAFETY FIX:
    // Always guarantee items is an array.

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
        typeof item.rate === "number" &&
        item.rate > 0
    );

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
            JSON.parse(saved);


        projects =
            Array.isArray(data)
                ? data
                : [];


    } catch (error) {

        console.error(
            "Project loading error:",
            error
        );


        projects = [];

    }

}


// ==========================================================
// SAVE PROJECTS
// ==========================================================

function saveProjects() {

    localStorage.setItem(
        "constructionProjects",
        JSON.stringify(projects)
    );

}


// ==========================================================
// SHOW DASHBOARD
// ==========================================================

function showDashboard() {

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


    displayProjects();

}


// ==========================================================
// SHOW NEW PROJECT
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


    if (
        projects.length === 0
    ) {

        projectList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🏠
                </div>

                <h3>
                    No projects yet
                </h3>

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


    projects.forEach(
        function(project) {

            const card =
                document.createElement(
                    "div"
                );


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


                    <button
                        type="button"
                        class="delete-button">

                        Delete

                    </button>

                </div>

            `;


            projectList.appendChild(
                card
            );


            card
                .querySelector(
                    ".open-project-button"
                )
                .addEventListener(
                    "click",
                    function() {

                        openProject(
                            project.id
                        );

                    }
                );


            card
                .querySelector(
                    ".delete-button"
                )
                .addEventListener(
                    "click",
                    function() {

                        deleteProject(
                            project.id
                        );

                    }
                );

        }
    );

}


// ==========================================================
// OPEN PROJECT
// ==========================================================

function openProject(id) {

    const project =
        projects.find(
            function(item) {

                return Number(
                    item.id
                ) === Number(id);

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
        Array.isArray(project.boq) &&
        project.boq.length > 0
    ) {

        activeBOQ =
            project.boq;

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

            id:
                now + 1,

            category:
                "Earthwork",

            item:
                "Excavation for foundation",

            unit:
                "cu.ft",

            quantity:
                Math.round(
                    area * 0.12
                ),

            rate:
                55

        },


        {

            id:
                now + 2,

            category:
                "Concrete",

            item:
                "PCC 1:4:8",

            unit:
                "cu.ft",

            quantity:
                Math.round(
                    area * 0.08
                ),

            rate:
                180

        },


        {

            id:
                now + 3,

            category:
                "Concrete",

            item:
                "RCC work",

            unit:
                "cu.ft",

            quantity:
                Math.round(
                    area * 0.35
                ),

            rate:
                850

        },


        {

            id:
                now + 4,

            category:
                "Reinforcement",

            item:
                "Reinforcement steel",

            unit:
                "kg",

            quantity:
                Math.round(
                    area * 4
                ),

            rate:
                115

        },


        {

            id:
                now + 5,

            category:
                "Masonry",

            item:
                "Brick masonry",

            unit:
                "cu.ft",

            quantity:
                Math.round(
                    area * 0.25
                ),

            rate:
                220

        },


        {

            id:
                now + 6,

            category:
                "Plaster",

            item:
                "Cement plaster",

            unit:
                "sq.ft",

            quantity:
                Math.round(
                    area * 1.8
                ),

            rate:
                65

        },


        {

            id:
                now + 7,

            category:
                "Flooring",

            item:
                "Floor tiles",

            unit:
                "sq.ft",

            quantity:
                Math.round(
                    area
                ),

            rate:
                140

        },


        {

            id:
                now + 8,

            category:
                "Painting",

            item:
                "Interior & exterior painting",

            unit:
                "sq.ft",

            quantity:
                Math.round(
                    area * 2.5
                ),

            rate:
                45

        }

    ];

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

                return Number(
                    item.id
                ) === Number(
                    activeProject.id
                );

            }
        );


    if (!project) {

        return;

    }


    project.boq =
        activeBOQ;


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


// ==========================================================
// ALIAS FOR COMPATIBILITY
// ==========================================================

function saveActiveBOQ() {

    saveCurrentBOQ();

}


// ==========================================================
// CALCULATE BOQ TOTAL
// ==========================================================

function calculateBOQTotal() {

    let total = 0;


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
// CATEGORY-WISE BOQ SUMMARY
// ==========================================================

function calculateCategorySummary() {

    const categories = {};

    if (!Array.isArray(activeBOQ)) {
        return categories;
    }

    activeBOQ.forEach(function(item) {

        const category =
            String(item.category || "Uncategorized").trim() ||
            "Uncategorized";

        const quantity =
            Number(item.quantity) || 0;

        const rate =
            Number(item.rate) || 0;

        const amount =
            quantity * rate;

        if (!categories[category]) {

            categories[category] = {
                category: category,
                itemCount: 0,
                amount: 0
            };

        }

        categories[category].itemCount += 1;

        categories[category].amount += amount;

    });

    return categories;
}
// ==========================================================
// MATERIAL / LABOUR / OTHER SUMMARY
// ==========================================================

function calculateCostTypeSummary() {

    const summary = {
        Material: 0,
        Labour: 0,
        Other: 0
    };

    if (!Array.isArray(activeBOQ)) {
        return summary;
    }

    activeBOQ.forEach(function(item) {

        const amount =
            Number(item.quantity || 0) *
            Number(item.rate || 0);

        let type =
            String(
                item.costType || "Material"
            ).trim();

        if (
            type !== "Material" &&
            type !== "Labour" &&
            type !== "Other"
        ) {
            type = "Other";
        }

        summary[type] += amount;

    });

    return summary;
}
// ==========================================================
// RENDER MATERIAL / LABOUR SUMMARY
// ==========================================================

function renderCostTypeSummary() {

    const container =
        document.getElementById(
            "costTypeSummary"
        );

    if (!container) {
        return;
    }

    const summary =
        calculateCostTypeSummary();

    const total =
        summary.Material +
        summary.Labour +
        summary.Other;

    container.innerHTML = `

        <div class="cost-type-row">

            <span>
                🧱 Material
            </span>

            <strong>
                NPR
                ${Math.round(
                    summary.Material
                ).toLocaleString()}
            </strong>

        </div>


        <div class="cost-type-row">

            <span>
                👷 Labour
            </span>

            <strong>
                NPR
                ${Math.round(
                    summary.Labour
                ).toLocaleString()}
            </strong>

        </div>


        <div class="cost-type-row">

            <span>
                📦 Other
            </span>

            <strong>
                NPR
                ${Math.round(
                    summary.Other
                ).toLocaleString()}
            </strong>

        </div>


        <div class="cost-type-total">

            <strong>
                TOTAL
            </strong>

            <strong>
                NPR
                ${Math.round(
                    total
                ).toLocaleString()}
            </strong>

        </div>

    `;
}

// ==========================================================
// RENDER CATEGORY SUMMARY
// ==========================================================

function renderCategorySummary() {

    const container =
        document.getElementById(
            "categorySummary"
        );

    if (!container) {
        return;
    }

    const categories =
        calculateCategorySummary();

    const categoryNames =
        Object.keys(categories);

    if (categoryNames.length === 0) {

        container.innerHTML = `
            <div class="category-empty">
                No BOQ categories available.
            </div>
        `;

        return;
    }

    let html = "";

    categoryNames.forEach(function(category) {

        const data =
            categories[category];

        html += `
            <div class="category-summary-row">

                <div class="category-summary-name">

                    <strong>
                        ${escapeHTML(category)}
                    </strong>

                    <span>
                        ${data.itemCount}
                        ${data.itemCount === 1 ? "item" : "items"}
                    </span>

                </div>

                <div class="category-summary-amount">

                    NPR
                    ${Math.round(
                        data.amount
                    ).toLocaleString()}

                </div>

            </div>
        `;

    });

    const total =
        categoryNames.reduce(
            function(sum, category) {

                return sum +
                    categories[category].amount;

            },
            0
        );

    html += `
        <div class="category-summary-total">

            <strong>
                TOTAL
            </strong>

            <strong>
                NPR
                ${Math.round(
                    total
                ).toLocaleString()}
            </strong>

        </div>
    `;

    container.innerHTML = html;
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


    const area =
        Number(
            activeProject.totalArea
        ) || 0;


    const total =
        calculateBOQTotal();


    const costPerSqFt =
        area > 0
            ? total / area
            : 0;


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


                <span class="badge">

                    🇳🇵 Construction Estimate

                </span>


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
                            costPerSqFt
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
                            total
                        ).toLocaleString()}

                    </strong>

                </div>

            </div>


            <!-- NEPAL RATE SYSTEM -->

            <div class="nepal-rate-panel">

                <div class="rate-panel-header">

                    <span class="badge">
                        🇳🇵 Nepal Rate System
                    </span>


                    <h3>
                        Nepal District Rate System
                    </h3>


                    <p>

                        Select a district and fiscal
                        year, then select a BOQ item
                        or Nepal reference item.

                    </p>

                </div>


                <div class="rate-controls">

                    <!-- DISTRICT -->

                    <div class="rate-field">

                        <label>
                            District
                        </label>

                        <select
                            id="rateLocation">

                        </select>

                    </div>


                    <!-- FISCAL YEAR -->

                    <div class="rate-field">

                        <label>
                            Fiscal Year
                        </label>

                        <select
                            id="rateYear">

                        </select>

                    </div>


                    <!-- SOURCE -->

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


                    <!-- BOQ ITEM -->

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


                    <!-- UNIT -->

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


                    <!-- RATE -->

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


                    <!-- APPLY -->

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

                    ⚠️

                    <strong>
                        Reference rate:
                    </strong>

                    Verify rates against the current
                    official schedule and local market
                    quotations before commercial use.

                </div>

            </div>

<!-- CATEGORY SUMMARY -->

<div class="category-summary-card">

    <div class="category-summary-header">

        <div>

            <span class="badge">
                📊 BOQ Breakdown
            </span>

            <h3>
                Category-wise Cost Summary
            </h3>

            <p>
                Automatic subtotal of each BOQ category.
            </p>

        </div>

    </div>

    <div
        id="categorySummary"
        class="category-summary-list">

    </div>

</div>
<!-- MATERIAL / LABOUR SUMMARY -->

<div class="cost-type-summary-card">

    <div class="category-summary-header">

        <span class="badge">
            💰 Cost Breakdown
        </span>

        <h3>
            Material & Labour Cost
        </h3>

        <p>
            Automatic breakdown of the BOQ by cost type.
        </p>

    </div>


    <div
        id="costTypeSummary"
        class="cost-type-summary">

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
                                activeBOQ.map(
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
                                                        data-id="${item.id}"
                                                        value="${escapeAttribute(
                                                            item.category
                                                        )}"
                                                    >

                                                </td>


                                                <td>

                                                    <input
                                                        class="boq-input item-input"
                                                        data-field="item"
                                                        data-id="${item.id}"
                                                        value="${escapeAttribute(
                                                            item.item
                                                        )}"
                                                    >

                                                </td>


                                                <td>

                                                    <input
                                                        class="boq-input unit-input"
                                                        data-field="unit"
                                                        data-id="${item.id}"
                                                        value="${escapeAttribute(
                                                            item.unit
                                                        )}"
                                                    >

                                                </td>


                                                <td>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        class="boq-input number-input"
                                                        data-field="quantity"
                                                        data-id="${item.id}"
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
                                                        data-id="${item.id}"
                                                        value="${item.rate}"
                                                    >

                                                </td>


                                                <td>

                                                    <strong
                                                        class="amount-cell"
                                                        data-amount-id="${item.id}">

                                                        NPR
                                                        ${Math.round(
                                                            item.amount || 0
                                                        ).toLocaleString()}

                                                    </strong>

                                                </td>


                                                <td>

                                                    <button
                                                        type="button"
                                                        class="delete-boq-button"
                                                        data-delete-boq="${item.id}">

                                                        🗑️

                                                    </button>

                                                </td>

                                            </tr>

                                        `;

                                    }
                                ).join("")
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


                        <tfoot>

                            <tr>

                                <td
                                    colspan="6"
                                    class="total-label">

                                    TOTAL ESTIMATED COST

                                </td>


                                <td
                                    colspan="2"
                                    class="total-value">

                                    NPR
                                    ${Math.round(
                                        total
                                    ).toLocaleString()}

                                </td>

                            </tr>

                        </tfoot>

                    </table>

                </div>

            </div>


            <!-- CUSTOM BOQ FORM -->

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

                Reference rates should be verified
                against the applicable official
                schedule before commercial use.

            </div>

        </div>

    `;


   initializeRateSystem();

attachBOQEvents();

renderCategorySummary();

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


    // ------------------------------------------------------
    // DISTRICTS
    // ------------------------------------------------------

    locationSelect.innerHTML = "";


    const locations =
        getRateLocations();


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


    // ------------------------------------------------------
    // LOAD YEARS
    // ------------------------------------------------------

    function loadYears() {

        const location =
            locationSelect.value;


        yearSelect.innerHTML = "";


        const years =
            getRateYears(
                location
            );


        years.forEach(
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


    // ------------------------------------------------------
    // LOAD SCHEDULE
    // ------------------------------------------------------

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


        itemSelect.innerHTML = `

            <option value="">
                Select BOQ item
            </option>

        `;


        if (!schedule) {

            if (sourceInput) {

                sourceInput.value =
                    "No schedule available";

            }


            if (status) {

                status.textContent =
                    "No rate schedule found.";

            }


            addCustomBOQOptions();

            return;

        }


        if (sourceInput) {

            sourceInput.value =
                schedule.source ||
                "Reference";

        }


        if (status) {

            status.textContent =
                `${schedule.sourceType || "Reference"} • ${schedule.sourceYear || year}`;

        }


        // --------------------------------------------------
        // CURRENT BOQ ITEMS
        // --------------------------------------------------

        addCustomBOQOptions();


        // --------------------------------------------------
        // REFERENCE RATE ITEMS
        // --------------------------------------------------

        const referenceGroup =
            document.createElement(
                "optgroup"
            );


        referenceGroup.label =
            "🇳🇵 Nepal Reference Rates";


        schedule.items.forEach(
            function(item, index) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    "rate:" + index;


                option.textContent =
                    `${item.category} — ${item.description}`;


                referenceGroup.appendChild(
                    option
                );

            }
        );


        itemSelect.appendChild(
            referenceGroup
        );

    }


    // ------------------------------------------------------
    // ADD CURRENT BOQ ITEMS
    // ------------------------------------------------------

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
                    "boq:" + item.id;


                option.textContent =
                    `${item.category || "Custom"} — ${item.item || "Unnamed item"}`;


                boqGroup.appendChild(
                    option
                );

            }
        );


        itemSelect.appendChild(
            boqGroup
        );

    }


    // ------------------------------------------------------
    // ITEM SELECTED
    // ------------------------------------------------------

    itemSelect.addEventListener(
        "change",
        function() {

            const value =
                itemSelect.value;


            unitInput.value =
                "";


            rateInput.value =
                "";


            rateInput.readOnly =
                false;


            rateInput.placeholder =
                "Enter rate";


            if (!value) {

                if (status) {

                    status.textContent =
                        "Select a BOQ item or reference rate.";

                }

                return;

            }


            // ----------------------------------------------
            // CURRENT BOQ ITEM
            // ----------------------------------------------

            if (
                value.startsWith(
                    "boq:"
                )
            ) {

                const id =
                    value.substring(4);


                const boqItem =
                    activeBOQ.find(
                        function(item) {

                            return String(
                                item.id
                            ) === String(id);

                        }
                    );


                if (!boqItem) {

                    return;

                }


                unitInput.value =
                    boqItem.unit || "";


                rateInput.value =
                    boqItem.rate || "";


                rateInput.readOnly =
                    false;


                if (status) {

                    status.textContent =
                        "Current BOQ item selected. Edit the rate if required.";

                }


                return;

            }


            // ----------------------------------------------
            // REFERENCE RATE
            // ----------------------------------------------

            if (
                value.startsWith(
                    "rate:"
                )
            ) {

                const index =
                    Number(
                        value.substring(5)
                    );


                const schedule =
                    getRateSchedule(
                        locationSelect.value,
                        yearSelect.value
                    );


                if (
                    !schedule ||
                    !Array.isArray(
                        schedule.items
                    ) ||
                    !schedule.items[index]
                ) {

                    return;

                }


                const item =
                    schedule.items[index];


                unitInput.value =
                    item.unit || "";


                rateInput.value =
                    typeof item.rate === "number"
                        ? item.rate
                        : "";


                rateInput.readOnly =
                    false;


                if (status) {

                    status.textContent =
                        "Reference rate loaded. You can edit it before applying.";

                }

            }

        }
    );


    // ------------------------------------------------------
    // DISTRICT CHANGE
    // ------------------------------------------------------

    locationSelect.addEventListener(
        "change",
        function() {

            loadYears();

        }
    );


    // ------------------------------------------------------
    // YEAR CHANGE
    // ------------------------------------------------------

    yearSelect.addEventListener(
        "change",
        function() {

            loadSchedule();

        }
    );


    // ------------------------------------------------------
    // APPLY RATE
    // ------------------------------------------------------

    const applyButton =
        document.getElementById(
            "applyNepalRate"
        );


    if (applyButton) {

        applyButton.addEventListener(
            "click",
            applySelectedRate
        );

    }


    // ------------------------------------------------------
    // INITIAL LOAD
    // ------------------------------------------------------

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
        !Number.isFinite(rate) ||
        rate <= 0
    ) {

        alert(
            "Please enter a valid rate greater than 0."
        );

        return;

    }


    const unit =
        unitInput.value.trim();


    // ======================================================
    // APPLY DIRECTLY TO CURRENT BOQ ITEM
    // ======================================================

    if (
        selected.startsWith(
            "boq:"
        )
    ) {

        const id =
            selected.substring(4);


        const boqItem =
            activeBOQ.find(
                function(item) {

                    return String(
                        item.id
                    ) === String(id);

                }
            );


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
                boqItem.quantity || 0
            ) *
            rate;


        saveCurrentBOQ();


        renderBOQ();


        return;

    }


    // ======================================================
    // APPLY REFERENCE RATE
    // ======================================================

    if (
        selected.startsWith(
            "rate:"
        )
    ) {

        const index =
            Number(
                selected.substring(5)
            );


        const location =
            document.getElementById(
                "rateLocation"
            ).value;


        const year =
            document.getElementById(
                "rateYear"
            ).value;


        const schedule =
            getRateSchedule(
                location,
                year
            );


        if (
            !schedule ||
            !Array.isArray(
                schedule.items
            ) ||
            !schedule.items[index]
        ) {

            alert(
                "Reference rate item could not be found."
            );

            return;

        }


        const referenceItem =
            schedule.items[index];


        // --------------------------------------------------
        // TRY DESCRIPTION MATCH
        // --------------------------------------------------

        let matchingItem =
            activeBOQ.find(
                function(item) {

                    return normalizeText(
                        item.item
                    ) ===
                    normalizeText(
                        referenceItem.description
                    );

                }
            );


        // --------------------------------------------------
        // TRY PARTIAL DESCRIPTION
        // --------------------------------------------------

        if (!matchingItem) {

            matchingItem =
                activeBOQ.find(
                    function(item) {

                        const boqText =
                            normalizeText(
                                item.item
                            );


                        const rateText =
                            normalizeText(
                                referenceItem.description
                            );


                        return (
                            boqText.includes(
                                rateText
                            ) ||
                            rateText.includes(
                                boqText
                            )
                        );

                    }
                );

        }


        // --------------------------------------------------
        // TRY CATEGORY
        // --------------------------------------------------

        if (!matchingItem) {

            matchingItem =
                activeBOQ.find(
                    function(item) {

                        return normalizeText(
                            item.category
                        ) ===
                        normalizeText(
                            referenceItem.category
                        );

                    }
                );

        }


        if (!matchingItem) {

            alert(
                "No matching BOQ item was found.\n\n" +
                "Add the item to the BOQ first, or select the current BOQ item directly from the dropdown."
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
                matchingItem.quantity || 0
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
// ATTACH BOQ EVENTS
// ==========================================================

function attachBOQEvents() {

    // ------------------------------------------------------
    // BACK
    // ------------------------------------------------------

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


    // ------------------------------------------------------
    // ADD ITEM
    // ------------------------------------------------------

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


    // ------------------------------------------------------
    // CANCEL
    // ------------------------------------------------------

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


    // ------------------------------------------------------
    // SAVE CUSTOM
    // ------------------------------------------------------

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


    // ------------------------------------------------------
    // EDITABLE BOQ INPUTS
    // ------------------------------------------------------

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


    // ------------------------------------------------------
    // DELETE
    // ------------------------------------------------------

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

    const id =
        Number(
            input.dataset.id
        );


    const field =
        input.dataset.field;


    const item =
        activeBOQ.find(
            function(boqItem) {

                return Number(
                    boqItem.id
                ) === id;

            }
        );


    if (!item) {

        return;

    }


    if (
        field === "quantity" ||
        field === "rate"
    ) {

        item[field] =
            Number(
                input.value
            ) || 0;

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


    const amountCell =
        document.querySelector(
            `[data-amount-id="${id}"]`
        );


    if (amountCell) {

        amountCell.textContent =
            "NPR " +
            Math.round(
                item.amount
            ).toLocaleString();

    }


   updateBOQSummary();

renderCategorySummary(); 

}


// ==========================================================
// UPDATE SUMMARY
// ==========================================================

function updateBOQSummary() {

    let total = 0;


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
            activeProject.totalArea
        ) || 0;


    const costPerSqFt =
        area > 0
            ? total / area
            : 0;


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
                costPerSqFt
            ).toLocaleString();


        cards[3].textContent =
            "NPR " +
            Math.round(
                total
            ).toLocaleString();

    }


    const totalValue =
        document.querySelector(
            ".total-value"
        );


    if (totalValue) {

        totalValue.textContent =
            "NPR " +
            Math.round(
                total
            ).toLocaleString();

    }
renderCategorySummary();
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


    activeBOQ.push({

        id:
            Date.now() +
            Math.floor(
                Math.random() * 1000
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

    });


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

                return Number(
                    boqItem.id
                ) === Number(id);

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

                return Number(
                    boqItem.id
                ) !== Number(id);

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

                return Number(
                    item.id
                ) === Number(id);

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

                return Number(
                    item.id
                ) !== Number(id);

            }
        );


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
        floors * area;


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
// CREATE PROJECT
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


            if (!projectName) {

                alert(
                    "Please enter a project name."
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
                    "Please enter valid floors."
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
        value || "";


    return div.innerHTML;

}


function escapeAttribute(
    value
) {

    return String(
        value || ""
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
        value || ""
    )
        .toLowerCase()
        .replace(
            /\s+/g,
            " "
        )
        .trim();

}


// ==========================================================
// START APP
// ==========================================================

loadProjects();

displayProjects();

console.log(
    "Nepal Construction Estimator loaded successfully."
);
