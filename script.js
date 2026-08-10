// ==========================================================
// NEPAL CONSTRUCTION ESTIMATOR
// PROJECTS + BOQ + EDITABLE RATES + CUSTOM ITEMS
// + NEPAL REFERENCE RATE SYSTEM
// + COST BREAKDOWN
// + DAY / NIGHT THEME
// + LOGO + FOOTER
// ==========================================================

"use strict";

// ==========================================================
// GLOBAL STATE
// ==========================================================

let projects = [];
let activeProject = null;
let activeBOQ = [];

// ==========================================================
// COST SETTINGS
// ==========================================================

const DEFAULT_COST_SETTINGS = {
    toolsEquipmentPct: 2,
    overheadPct: 5,
    contingencyPct: 5,
    profitPct: 10
};

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
// Reference/demo values.
// Verify applicable official schedules and quotations
// before commercial use.
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
// RATE HELPERS
// ==========================================================

function getRateLocations() {

    if (
        !NEPAL_RATE_SCHEDULES ||
        typeof NEPAL_RATE_SCHEDULES !== "object"
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
        NEPAL_RATE_SCHEDULES[location];

    if (
        !district ||
        typeof district !== "object"
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
        NEPAL_RATE_SCHEDULES[location];

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

    if (
        !Array.isArray(
            schedule.items
        )
    ) {

        schedule.items = [];

    }

    return schedule;
}

// ==========================================================
// NORMALIZATION
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

function normalizeCostSettings(
    settings
) {

    const source =
        settings &&
        typeof settings === "object"
            ? settings
            : {};

    return {

        toolsEquipmentPct:
            validPercentage(
                source.toolsEquipmentPct,
                DEFAULT_COST_SETTINGS.toolsEquipmentPct
            ),

        overheadPct:
            validPercentage(
                source.overheadPct,
                DEFAULT_COST_SETTINGS.overheadPct
            ),

        contingencyPct:
            validPercentage(
                source.contingencyPct,
                DEFAULT_COST_SETTINGS.contingencyPct
            ),

        profitPct:
            validPercentage(
                source.profitPct,
                DEFAULT_COST_SETTINGS.profitPct
            )

    };

}

function validPercentage(
    value,
    fallback
) {

    const number =
        Number(value);

    if (
        !Number.isFinite(number) ||
        number < 0
    ) {

        return fallback;

    }

    return Math.min(
        number,
        100
    );

}

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
            (
                floors *
                area
            ),

        boq:
            rawBOQ.map(
                normalizeBOQItem
            ),

        costSettings:
            normalizeCostSettings(
                source.costSettings
            )

    };

}

// ==========================================================
// PROJECT STORAGE
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

    }

}

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

// ==========================================================
// DASHBOARD
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
// PROJECT LIST
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
                    🏗️
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
                        <span>Client</span>

                        <strong>
                            ${escapeHTML(
                                project.clientName ||
                                "—"
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>Floors</span>

                        <strong>
                            ${project.floors || 0}
                        </strong>
                    </div>

                    <div>
                        <span>Built-up Area</span>

                        <strong>
                            ${Number(
                                project.totalArea ||
                                0
                            ).toLocaleString()}
                            sq.ft
                        </strong>
                    </div>

                </div>

                <div class="project-card-footer">

                    <button
                        type="button"
                        class="open-project-button"
                    >
                        Open Project →
                    </button>

                    <button
                        type="button"
                        class="delete-button"
                    >
                        Delete
                    </button>

                </div>

            `;

            projectList.appendChild(
                card
            );

            const openButton =
                card.querySelector(
                    ".open-project-button"
                );

            const deleteButton =
                card.querySelector(
                    ".delete-button"
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

        }
    );

}

// ==========================================================
// OPEN PROJECT
// ==========================================================

function openProject(
    id
) {

    const project =
        projects.find(
            function(item) {

                return String(
                    item.id
                ) === String(
                    id
                );

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
// BOQ SCREEN
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

    project.costSettings =
        normalizeCostSettings(
            project.costSettings
        );

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

    }

    saveCurrentBOQ();

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
                ) === String(
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

    project.costSettings =
        normalizeCostSettings(
            project.costSettings
        );

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

// ==========================================================
// COST CALCULATION
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

function calculateCostBreakdown() {

    const subtotal =
        calculateBOQTotal();

    const settings =
        normalizeCostSettings(
            activeProject &&
            activeProject.costSettings
        );

    const toolsEquipment =
        subtotal *
        settings.toolsEquipmentPct /
        100;

    const overhead =
        subtotal *
        settings.overheadPct /
        100;

    const contingency =
        subtotal *
        settings.contingencyPct /
        100;

    const profit =
        subtotal *
        settings.profitPct /
        100;

    const grandTotal =
        subtotal +
        toolsEquipment +
        overhead +
        contingency +
        profit;

    return {

        subtotal,
        toolsEquipment,
        overhead,
        contingency,
        profit,
        grandTotal,
        settings

    };

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

    activeProject.costSettings =
        normalizeCostSettings(
            activeProject.costSettings
        );

    const area =
        Number(
            activeProject.totalArea
        ) || 0;

    const breakdown =
        calculateCostBreakdown();

    const grandTotal =
        breakdown.grandTotal;

    const costPerSqFt =
        area > 0
            ? grandTotal / area
            : 0;

    screen.innerHTML = `

        <div class="boq-container">

            <!-- ==========================================
                 PROJECT HEADER
            =========================================== -->

            <div class="boq-header">

                <button
                    type="button"
                    class="back-button"
                    id="boqBackButton"
                >
                    ← Back to Projects
                </button>

                <div class="boq-project-heading">

                    <div class="project-mini-logo">
                        <span>₨</span>
                    </div>

                    <div>

                        <span class="estimate-label">
                            CONSTRUCTION ESTIMATE
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

                </div>

            </div>

            <!-- ==========================================
                 SUMMARY
            =========================================== -->

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
                        Grand Estimate
                    </span>

                    <strong>
                        NPR
                        ${Math.round(
                            grandTotal
                        ).toLocaleString()}
                    </strong>

                </div>

            </div>

            <!-- ==========================================
                 RATE SYSTEM
            =========================================== -->

            <div class="nepal-rate-panel">

                <div class="rate-panel-header">

                    <div>

                        <span class="rate-kicker">
                            RATE REFERENCE
                        </span>

                        <h3>
                            District Rate System
                        </h3>

                        <p>
                            Select a district, fiscal year
                            and reference item.
                        </p>

                    </div>

                </div>

                <div class="rate-controls">

                    <div class="rate-field">

                        <label>
                            District
                        </label>

                        <select
                            id="rateLocation"
                        ></select>

                    </div>

                    <div class="rate-field">

                        <label>
                            Fiscal Year
                        </label>

                        <select
                            id="rateYear"
                        ></select>

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
                            BOQ / Reference Item
                        </label>

                        <select
                            id="rateItem"
                        >
                            <option value="">
                                Select item
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
                            class="primary-button"
                        >
                            Apply Rate
                        </button>

                    </div>

                </div>

                <div
                    id="rateStatus"
                    class="rate-status"
                >
                    Select a BOQ item or reference rate.
                </div>

                <div class="rate-warning">

                    <span>ⓘ</span>

                    <span>
                        Reference values only.
                        Verify applicable official schedules
                        and current market quotations before
                        commercial use.
                    </span>

                </div>

            </div>

            <!-- ==========================================
                 BOQ
            =========================================== -->

            <div class="boq-card">

                <div class="boq-title">

                    <div>

                        <span class="section-kicker">
                            QUANTITY + RATE
                        </span>

                        <h3>
                            Bill of Quantities
                        </h3>

                        <p>
                            Edit quantities and rates directly.
                        </p>

                    </div>

                    <button
                        type="button"
                        id="addBOQButton"
                        class="add-boq-button"
                    >
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
                                                    <span class="row-number">
                                                        ${index + 1}
                                                    </span>
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
                                                        data-amount-id="${escapeAttribute(item.id)}"
                                                    >
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
                                                        data-delete-boq="${escapeAttribute(item.id)}"
                                                        title="Delete item"
                                                    >
                                                        🗑
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
                                                class="no-boq-items"
                                            >
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
                                    class="total-label"
                                >
                                    BOQ SUBTOTAL
                                </td>

                                <td
                                    colspan="2"
                                    class="total-value"
                                >
                                    NPR
                                    ${Math.round(
                                        breakdown.subtotal
                                    ).toLocaleString()}
                                </td>

                            </tr>

                        </tfoot>

                    </table>

                </div>

            </div>

            <!-- ==========================================
                 COST BREAKDOWN
            =========================================== -->

            <section class="cost-breakdown-card">

                <div class="cost-breakdown-heading">

                    <div>

                        <span class="section-kicker">
                            FINAL ESTIMATE
                        </span>

                        <h2>
                            💰 Cost Breakdown
                        </h2>

                        <p>
                            Construction subtotal plus
                            project allowances and contractor costs.
                        </p>

                    </div>

                    <div class="grand-total-badge">

                        <span>
                            GRAND TOTAL
                        </span>

                        <strong
                            id="grandTotalValue"
                        >
                            NPR
                            ${Math.round(
                                breakdown.grandTotal
                            ).toLocaleString()}
                        </strong>

                    </div>

                </div>

                <div class="cost-breakdown-list">

                    <div class="cost-row subtotal-row">

                        <div>

                            <strong>
                                BOQ Subtotal
                            </strong>

                            <span>
                                Direct construction work
                            </span>

                        </div>

                        <strong
                            id="breakdownSubtotal"
                        >
                            NPR
                            ${Math.round(
                                breakdown.subtotal
                            ).toLocaleString()}
                        </strong>

                    </div>

                    <div class="cost-row">

                        <div>

                            <strong>
                                Tools &amp; Equipment
                            </strong>

                            <span>
                                Equipment / tools allowance
                            </span>

                        </div>

                        <div class="cost-value-with-percent">

                            <span>
                                ${breakdown.settings.toolsEquipmentPct}%
                            </span>

                            <strong
                                id="toolsEquipmentValue"
                            >
                                NPR
                                ${Math.round(
                                    breakdown.toolsEquipment
                                ).toLocaleString()}
                            </strong>

                        </div>

                    </div>

                    <div class="cost-row">

                        <div>

                            <strong>
                                Overhead
                            </strong>

                            <span>
                                Site and administrative overhead
                            </span>

                        </div>

                        <div class="cost-value-with-percent">

                            <span>
                                5%
                            </span>

                            <strong
                                id="overheadValue"
                            >
                                NPR
                                ${Math.round(
                                    breakdown.overhead
                                ).toLocaleString()}
                            </strong>

                        </div>

                    </div>

                    <div class="cost-row editable-cost-row">

                        <div>

                            <strong>
                                Contingency
                            </strong>

                            <span>
                                Editable allowance for uncertainty
                            </span>

                        </div>

                        <div class="editable-cost-control">

                            <div class="percent-input-wrap">

                                <input
                                    id="contingencyPct"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.5"
                                    value="${breakdown.settings.contingencyPct}"
                                    aria-label="Contingency percentage"
                                >

                                <span>
                                    %
                                </span>

                            </div>

                            <strong
                                id="contingencyValue"
                            >
                                NPR
                                ${Math.round(
                                    breakdown.contingency
                                ).toLocaleString()}
                            </strong>

                        </div>

                    </div>

                    <div class="cost-row">

                        <div>

                            <strong>
                                Contractor's Profit
                            </strong>

                            <span>
                                Contractor margin
                            </span>

                        </div>

                        <div class="cost-value-with-percent">

                            <span>
                                10%
                            </span>

                            <strong
                                id="profitValue"
                            >
                                NPR
                                ${Math.round(
                                    breakdown.profit
                                ).toLocaleString()}
                            </strong>

                        </div>

                    </div>

                </div>

                <div class="cost-breakdown-total">

                    <div>

                        <span>
                            TOTAL ESTIMATED PROJECT COST
                        </span>

                        <small>
                            NPR • Preliminary estimate
                        </small>

                    </div>

                    <strong
                        id="costBreakdownGrandTotal"
                    >
                        NPR
                        ${Math.round(
                            breakdown.grandTotal
                        ).toLocaleString()}
                    </strong>

                </div>

                <div class="cost-breakdown-note">

                    <span>⚠️</span>

                    <p>
                        Tools &amp; equipment is currently
                        carried as a 2% estimating allowance.
                        Overhead is 5%, contractor's profit is
                        10%, and contingency defaults to 5%.
                        Adjust the contingency to suit the
                        project's risk and estimating basis.
                    </p>

                </div>

            </section>

            <!-- ==========================================
                 CUSTOM BOQ FORM
            =========================================== -->

            <div
                id="addBOQForm"
                class="add-boq-form hidden"
            >

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
                        class="primary-button"
                    >
                        Add Item
                    </button>

                    <button
                        type="button"
                        id="cancelCustomBOQ"
                        class="secondary-button"
                    >
                        Cancel
                    </button>

                </div>

            </div>

            <div class="boq-note">

                <strong>
                    Preliminary Estimate:
                </strong>

                Reference rates should be verified against
                the applicable official schedule and current
                local quotations before commercial use.

            </div>

        </div>

    `;

    initializeRateSystem();

    attachBOQEvents();

    initializeCostBreakdown();

}

// ==========================================================
// COST BREAKDOWN EVENTS
// ==========================================================

function initializeCostBreakdown() {

    const input =
        document.getElementById(
            "contingencyPct"
        );

    if (!input) {

        return;

    }

    input.addEventListener(
        "input",
        function() {

            const value =
                validPercentage(
                    input.value,
                    DEFAULT_COST_SETTINGS.contingencyPct
                );

            if (
                activeProject
            ) {

                activeProject.costSettings =
                    normalizeCostSettings(
                        activeProject.costSettings
                    );

                activeProject.costSettings.contingencyPct =
                    value;

                saveCurrentBOQ();

            }

            updateCostBreakdown();

        }
    );

}

function updateCostBreakdown() {

    if (!activeProject) {

        return;

    }

    activeProject.costSettings =
        normalizeCostSettings(
            activeProject.costSettings
        );

    const breakdown =
        calculateCostBreakdown();

    const setText =
        function(
            id,
            text
        ) {

            const element =
                document.getElementById(
                    id
                );

            if (element) {

                element.textContent =
                    text;

            }

        };

    setText(
        "breakdownSubtotal",
        "NPR " +
        Math.round(
            breakdown.subtotal
        ).toLocaleString()
    );

    setText(
        "toolsEquipmentValue",
        "NPR " +
        Math.round(
            breakdown.toolsEquipment
        ).toLocaleString()
    );

    setText(
        "overheadValue",
        "NPR " +
        Math.round(
            breakdown.overhead
        ).toLocaleString()
    );

    setText(
        "contingencyValue",
        "NPR " +
        Math.round(
            breakdown.contingency
        ).toLocaleString()
    );

    setText(
        "profitValue",
        "NPR " +
        Math.round(
            breakdown.profit
        ).toLocaleString()
    );

    setText(
        "grandTotalValue",
        "NPR " +
        Math.round(
            breakdown.grandTotal
        ).toLocaleString()
    );

    setText(
        "costBreakdownGrandTotal",
        "NPR " +
        Math.round(
            breakdown.grandTotal
        ).toLocaleString()
    );

    const area =
        Number(
            activeProject.totalArea
        ) || 0;

    const costPerSqFt =
        area > 0
            ? breakdown.grandTotal / area
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
                breakdown.grandTotal
            ).toLocaleString();

    }

}

// ==========================================================
// RATE SYSTEM
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

    function addCurrentBOQOptions() {

        if (
            !Array.isArray(
                activeBOQ
            ) ||
            activeBOQ.length === 0
        ) {

            return;

        }

        const group =
            document.createElement(
                "optgroup"
            );

        group.label =
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
                    `${item.category || "Custom"} — ${item.item || "Unnamed item"}`;

                group.appendChild(
                    option
                );

            }
        );

        itemSelect.appendChild(
            group
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

        itemSelect.innerHTML = `
            <option value="">
                Select item
            </option>
        `;

        unitInput.value =
            "";

        rateInput.value =
            "";

        addCurrentBOQOptions();

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
                `${schedule.sourceType || "Reference"} • ${schedule.sourceYear || year}`;

        }

        if (
            items.length === 0
        ) {

            return;

        }

        const group =
            document.createElement(
                "optgroup"
            );

        group.label =
            "🇳🇵 Reference Rates";

        items.forEach(
            function(
                item,
                index
            ) {

                if (
                    !item ||
                    typeof item !== "object"
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
                    `${item.category || "General"} — ${item.description || "Unnamed item"}`;

                group.appendChild(
                    option
                );

            }
        );

        itemSelect.appendChild(
            group
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

            yearSelect.innerHTML = `
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

                const item =
                    Array.isArray(
                        activeBOQ
                    )
                        ? activeBOQ.find(
                            function(
                                boqItem
                            ) {

                                return String(
                                    boqItem.id
                                ) === String(
                                    id
                                );

                            }
                        )
                        : null;

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
                        "Current BOQ item selected.";

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
// APPLY RATE
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
        String(
            unitInput.value ||
            ""
        ).trim();

    if (
        selected.indexOf(
            "boq:"
        ) === 0
    ) {

        const id =
            selected.substring(
                4
            );

        const item =
            activeBOQ.find(
                function(
                    boqItem
                ) {

                    return String(
                        boqItem.id
                    ) === String(
                        id
                    );

                }
            );

        if (!item) {

            alert(
                "BOQ item could not be found."
            );

            return;

        }

        item.rate =
            rate;

        if (unit) {

            item.unit =
                unit;

        }

        item.amount =
            Number(
                item.quantity
            ) *
            rate;

        saveCurrentBOQ();

        renderBOQ();

        return;

    }

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

        const location =
            document.getElementById(
                "rateLocation"
            );

        const year =
            document.getElementById(
                "rateYear"
            );

        const schedule =
            getRateSchedule(
                location
                    ? location.value
                    : "",
                year
                    ? year.value
                    : ""
            );

        const items =
            schedule &&
            Array.isArray(
                schedule.items
            )
                ? schedule.items
                : [];

        const referenceItem =
            items[index];

        if (!referenceItem) {

            alert(
                "Reference rate item could not be found."
            );

            return;

        }

        let matchingItem =
            null;

        const referenceText =
            normalizeText(
                referenceItem.description
            );

        matchingItem =
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
                        ) === category;

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
                matchingItem.quantity
            ) *
            rate;

        saveCurrentBOQ();

        renderBOQ();

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
            item.quantity
        ) *
        Number(
            item.rate
        );

    saveCurrentBOQ();

    const amountCell =
        document.querySelector(
            `[data-amount-id="${CSS.escape(id)}"]`
        );

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

    updateCostBreakdown();

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
        normalizeBOQItem({

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
                rateValue

        }, activeBOQ.length)
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
            function(
                boqItem
            ) {

                return String(
                    boqItem.id
                ) === String(
                    id
                );

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
            function(
                boqItem
            ) {

                return String(
                    boqItem.id
                ) !== String(
                    id
                );

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
                ) === String(
                    id
                );

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
                ) !== String(
                    id
                );

            }
        );

    if (
        activeProject &&
        String(
            activeProject.id
        ) === String(
            id
        )
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
// CREATE PROJECT
// ==========================================================

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const projectNameElement =
                document.getElementById(
                    "projectName"
                );

            const clientNameElement =
                document.getElementById(
                    "clientName"
                );

            const locationElement =
                document.getElementById(
                    "location"
                );

            const buildingTypeElement =
                document.getElementById(
                    "buildingType"
                );

            const projectName =
                projectNameElement
                    ? projectNameElement.value.trim()
                    : "";

            const clientName =
                clientNameElement
                    ? clientNameElement.value.trim()
                    : "";

            const location =
                locationElement
                    ? locationElement.value.trim()
                    : "";

            const buildingType =
                buildingTypeElement
                    ? buildingTypeElement.value
                    : "Residential";

            const floors =
                Number(
                    floorsInput
                        ? floorsInput.value
                        : 0
                );

            const area =
                Number(
                    areaInput
                        ? areaInput.value
                        : 0
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
                    floors *
                    area,

                boq:
                    [],

                costSettings:
                    normalizeCostSettings(
                        DEFAULT_COST_SETTINGS
                    )

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
// THEME SYSTEM
// ==========================================================

function applyTheme(
    theme
) {

    const dark =
        theme === "dark";

    document.body.classList.toggle(
        "dark-mode",
        dark
    );

    localStorage.setItem(
        "construction-estimator-theme",
        dark
            ? "dark"
            : "light"
    );

    updateThemeButton();

}

function updateThemeButton() {

    const button =
        document.getElementById(
            "themeToggle"
        );

    if (!button) {

        return;

    }

    const dark =
        document.body.classList.contains(
            "dark-mode"
        );

    button.innerHTML =
        dark
            ? `
                <span class="theme-icon">☀️</span>
                <span>Day</span>
              `
            : `
                <span class="theme-icon">🌙</span>
                <span>Night</span>
              `;

    button.setAttribute(
        "aria-label",
        dark
            ? "Switch to day mode"
            : "Switch to night mode"
    );

}

function toggleTheme() {

    const dark =
        document.body.classList.contains(
            "dark-mode"
        );

    applyTheme(
        dark
            ? "light"
            : "dark"
    );

}

// ==========================================================
// LOGO / HEADER / FOOTER
// ==========================================================

function setupBranding() {

    const header =
        document.querySelector(
            "header"
        );

    if (!header) {

        return;

    }

    // Remove old unwanted header badges/text.

    header
        .querySelectorAll(
            ".nepal-pill, .built-for-nepal, .nepal-badge"
        )
        .forEach(
            function(element) {

                element.remove();

            }
        );

    // Existing H1 becomes the logo link.

    const oldTitle =
        header.querySelector(
            "h1"
        );

    if (oldTitle) {

        const brand =
            document.createElement(
                "a"
            );

        brand.href =
            "#";

        brand.className =
            "app-logo";

        brand.setAttribute(
            "aria-label",
            "Nepal Construction Estimator home"
        );

        brand.innerHTML = `

            <span class="logo-mark">

                <svg
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                >

                    <path
                        d="M10 28 L32 10 L54 28 V54 H10 Z"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linejoin="round"
                    />

                    <path
                        d="M20 54 V35 H44 V54"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="4"
                    />

                    <path
                        d="M28 54 V43 H36 V54"
                        fill="currentColor"
                    />

                </svg>

            </span>

            <span class="logo-text">
                <strong>
                    Nepal Construction
                    Estimator
                </strong>

                <small>
                    BOQ • COST • ESTIMATION
                </small>
            </span>

        `;

        oldTitle.replaceWith(
            brand
        );

        brand.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showDashboard();

            }
        );

    }

    let themeButton =
        document.getElementById(
            "themeToggle"
        );

    if (!themeButton) {

        themeButton =
            document.createElement(
                "button"
            );

        themeButton.id =
            "themeToggle";

        themeButton.className =
            "theme-toggle";

        themeButton.type =
            "button";

        header.appendChild(
            themeButton
        );

    }

    themeButton.onclick =
        toggleTheme;

    // Remove old subtitle if it contains the unwanted
    // old application description.

    header
        .querySelectorAll(
            "p"
        )
        .forEach(
            function(p) {

                const text =
                    normalizeText(
                        p.textContent
                    );

                if (
                    text.includes(
                        "boq & cost estimation tool"
                    ) ||
                    text.includes(
                        "built for nepal"
                    )
                ) {

                    p.remove();

                }

            }
        );

}

// ==========================================================
// FOOTER
// ==========================================================

function setupFooter() {

    let footer =
        document.querySelector(
            ".site-footer"
        );

    if (!footer) {

        footer =
            document.createElement(
                "footer"
            );

        footer.className =
            "site-footer";

        document.body.appendChild(
            footer
        );

    }

    const currentYear =
        new Date()
            .getFullYear();

    const today =
        new Date();

    const formattedDate =
        today.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    footer.innerHTML = `

        <div class="footer-inner">

            <div class="footer-logo">

                <span class="footer-logo-mark">
                    ₨
                </span>

                <strong>
                    Nepal Construction Estimator
                </strong>

            </div>

            <div class="footer-meta">

                <span>
                    ${formattedDate}
                </span>

                <span>
                    •
                </span>

                <span>
                    © ${currentYear}
                    All Rights Reserved
                </span>

            </div>

        </div>

    `;

}

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
            : String(
                value
            );

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
// CSS.escape FALLBACK
// ==========================================================

if (
    typeof window.CSS === "undefined" ||
    typeof window.CSS.escape !== "function"
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
// INITIALIZATION
// ==========================================================

function initializeApplication() {

    const savedTheme =
        localStorage.getItem(
            "construction-estimator-theme"
        );

    applyTheme(
        savedTheme === "dark"
            ? "dark"
            : "light"
    );

    setupBranding();

    setupFooter();

    loadProjects();

    displayProjects();

    calculateArea();

    console.log(
        "Nepal Construction Estimator loaded successfully."
    );

}

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApplication
    );

} else {

    initializeApplication();

}
