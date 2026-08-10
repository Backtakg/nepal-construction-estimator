// ==========================================
// NEPAL CONSTRUCTION ESTIMATOR
// EDITABLE BOQ VERSION
// ==========================================

let projects = [];
let activeProject = null;
let activeBOQ = [];


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

    const saved =
        localStorage.getItem("constructionProjects");

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

        console.error("Project loading error:", error);

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

    const boqScreen =
        document.getElementById("boqScreen");

    if (boqScreen) {
        boqScreen.classList.add("hidden");
    }

    newProject.classList.add("hidden");

    dashboard.classList.remove("hidden");

    displayProjects();
}


// ==========================================
// SHOW NEW PROJECT
// ==========================================

function showNewProject() {

    const boqScreen =
        document.getElementById("boqScreen");

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


        document
            .getElementById("createFirstProjectButton")
            .addEventListener(
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


        card
            .querySelector(".open-project-button")
            .addEventListener(
                "click",
                function () {

                    openProject(project.id);

                }
            );


        card
            .querySelector(".delete-button")
            .addEventListener(
                "click",
                function () {

                    deleteProject(project.id);

                }
            );

    });
}


// ==========================================
// OPEN PROJECT
// ==========================================

function openProject(id) {

    const project =
        projects.find(function (item) {

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

    loadProjectBOQ(project);

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

        boqScreen.id =
            "boqScreen";

        boqScreen.className =
            "boq-screen hidden";


        document
            .querySelector("main")
            .appendChild(boqScreen);
    }


    boqScreen.classList.remove("hidden");
}


// ==========================================
// LOAD BOQ
// ==========================================

function loadProjectBOQ(project) {

    /*
       If this project already has a saved BOQ,
       use it.

       Otherwise create the default BOQ.
    */

    if (
        Array.isArray(project.boq) &&
        project.boq.length > 0
    ) {

        activeBOQ =
            project.boq;

    } else {

        activeBOQ =
            getDefaultBOQ(project);

        saveCurrentBOQ();

    }


    renderBOQ();

}


// ==========================================
// DEFAULT BOQ
// ==========================================

function getDefaultBOQ(project) {

    const area =
        Number(project.totalArea) || 0;


    return [

        {
            id: Date.now() + 1,
            category: "Earthwork",
            item: "Excavation for foundation",
            unit: "cu.ft",
            quantity: Math.round(area * 0.12),
            rate: 55
        },


        {
            id: Date.now() + 2,
            category: "Concrete",
            item: "PCC 1:4:8",
            unit: "cu.ft",
            quantity: Math.round(area * 0.08),
            rate: 180
        },


        {
            id: Date.now() + 3,
            category: "Concrete",
            item: "RCC work",
            unit: "cu.ft",
            quantity: Math.round(area * 0.35),
            rate: 850
        },


        {
            id: Date.now() + 4,
            category: "Reinforcement",
            item: "Reinforcement steel",
            unit: "kg",
            quantity: Math.round(area * 4),
            rate: 115
        },


        {
            id: Date.now() + 5,
            category: "Masonry",
            item: "Brick masonry",
            unit: "cu.ft",
            quantity: Math.round(area * 0.25),
            rate: 220
        },


        {
            id: Date.now() + 6,
            category: "Plaster",
            item: "Cement plaster",
            unit: "sq.ft",
            quantity: Math.round(area * 1.8),
            rate: 65
        },


        {
            id: Date.now() + 7,
            category: "Flooring",
            item: "Floor tiles",
            unit: "sq.ft",
            quantity: Math.round(area),
            rate: 140
        },


        {
            id: Date.now() + 8,
            category: "Painting",
            item: "Interior & exterior painting",
            unit: "sq.ft",
            quantity: Math.round(area * 2.5),
            rate: 45
        }

    ];
}


// ==========================================
// SAVE CURRENT BOQ
// ==========================================

function saveCurrentBOQ() {

    if (!activeProject) {
        return;
    }


    const project =
        projects.find(function (item) {

            return Number(item.id) ===
                Number(activeProject.id);

        });


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
        JSON.stringify(project)
    );
}


// ==========================================
// RENDER BOQ
// ==========================================

function renderBOQ() {

    const boqScreen =
        document.getElementById("boqScreen");


    if (!boqScreen || !activeProject) {
        return;
    }


    const area =
        Number(activeProject.totalArea) || 0;


    let total = 0;


    activeBOQ.forEach(function (item) {

        item.quantity =
            Number(item.quantity) || 0;

        item.rate =
            Number(item.rate) || 0;

        item.amount =
            item.quantity *
            item.rate;

        total +=
            item.amount;

    });


    const costPerSqFt =
        area > 0
            ? total / area
            : 0;


    boqScreen.innerHTML = `

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


            <!-- BOQ CARD -->

            <div class="boq-card">


                <div class="boq-title">

                    <div>

                        <h3>
                            Bill of Quantities
                        </h3>

                        <p>
                            Edit quantities and rates
                            to prepare your estimate.
                        </p>

                    </div>


                    <button
                        type="button"
                        id="addBOQButton"
                        class="add-boq-button">

                        + Add BOQ Item

                    </button>

                </div>


                <!-- TABLE -->

                <div class="boq-table-wrapper">

                    <table class="boq-table">

                        <thead>

                            <tr>

                                <th>#</th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Unit
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Rate (NPR)
                                </th>

                                <th>
                                    Amount (NPR)
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${activeBOQ.map(
                                function (item, index) {

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
                                                    value="${escapeAttribute(item.category)}"
                                                >

                                            </td>


                                            <td>

                                                <input
                                                    class="boq-input item-input"
                                                    data-field="item"
                                                    data-id="${item.id}"
                                                    value="${escapeAttribute(item.item)}"
                                                >

                                            </td>


                                            <td>

                                                <input
                                                    class="boq-input unit-input"
                                                    data-field="unit"
                                                    data-id="${item.id}"
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
                                                        item.amount
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
                            ).join("")}


                            ${
                                activeBOQ.length === 0
                                ?

                                `

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

                                :

                                ""
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


            <!-- ADD ITEM AREA -->

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


            <!-- NOTE -->

            <div class="boq-note">

                <strong>
                    Preliminary Estimate:
                </strong>

                Rates are sample values for
                demonstration. They should be
                replaced with verified local market
                rates before using this estimate
                commercially.

            </div>


        </div>

    `;


    attachBOQEvents();

}


// ==========================================
// BOQ EVENTS
// ==========================================

function attachBOQEvents() {


    // BACK

    document
        .getElementById("boqBackButton")
        .addEventListener(
            "click",
            showDashboard
        );


    // ADD ITEM BUTTON

    document
        .getElementById("addBOQButton")
        .addEventListener(
            "click",
            function () {

                const form =
                    document.getElementById(
                        "addBOQForm"
                    );

                form.classList.toggle("hidden");

            }
        );


    // CANCEL ADD

    document
        .getElementById("cancelCustomBOQ")
        .addEventListener(
            "click",
            function () {

                document
                    .getElementById("addBOQForm")
                    .classList.add("hidden");

            }
        );


    // SAVE CUSTOM ITEM

    document
        .getElementById("saveCustomBOQ")
        .addEventListener(
            "click",
            addCustomBOQItem
        );


    // INPUT CHANGES

    document
        .querySelectorAll(".boq-input")
        .forEach(function (input) {

            input.addEventListener(
                "input",
                function () {

                    updateBOQItem(
                        input
                    );

                }
            );

        });


    // DELETE BUTTONS

    document
        .querySelectorAll(
            ".delete-boq-button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    deleteBOQItem(
                        button.dataset.deleteBoq
                    );

                }
            );

        });

}


// ==========================================
// UPDATE BOQ ITEM
// ==========================================

function updateBOQItem(input) {

    const id =
        Number(input.dataset.id);


    const field =
        input.dataset.field;


    const item =
        activeBOQ.find(function (boqItem) {

            return Number(boqItem.id) === id;

        });


    if (!item) {
        return;
    }


    if (
        field === "quantity" ||
        field === "rate"
    ) {

        item[field] =
            Number(input.value) || 0;

    } else {

        item[field] =
            input.value;

    }


    item.amount =
        Number(item.quantity) *
        Number(item.rate);


    saveCurrentBOQ();


    updateBOQSummary();


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

}


// ==========================================
// UPDATE SUMMARY WITHOUT RELOADING
// ==========================================

function updateBOQSummary() {

    let total = 0;


    activeBOQ.forEach(function (item) {

        total +=
            Number(item.quantity || 0) *
            Number(item.rate || 0);

    });


    const area =
        Number(
            activeProject.totalArea
        ) || 0;


    const costPerSqFt =
        area > 0
            ? total / area
            : 0;


    const summaryCards =
        document.querySelectorAll(
            ".summary-card strong"
        );


    if (summaryCards.length >= 4) {

        summaryCards[2].textContent =
            "NPR " +
            Math.round(
                costPerSqFt
            ).toLocaleString();


        summaryCards[3].textContent =
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

}


// ==========================================
// ADD CUSTOM BOQ ITEM
// ==========================================

function addCustomBOQItem() {

    const category =
        document
            .getElementById("customCategory")
            .value
            .trim();


    const item =
        document
            .getElementById("customItem")
            .value
            .trim();


    const unit =
        document
            .getElementById("customUnit")
            .value;


    const quantity =
        Number(
            document
                .getElementById("customQuantity")
                .value
        ) || 0;


    const rate =
        Number(
            document
                .getElementById("customRate")
                .value
        ) || 0;


    if (!category) {

        alert("Please enter a category.");

        return;
    }


    if (!item) {

        alert("Please enter an item description.");

        return;
    }


    if (quantity <= 0) {

        alert("Please enter a quantity greater than 0.");

        return;
    }


    if (rate < 0) {

        alert("Rate cannot be negative.");

        return;
    }


    const newItem = {

        id:
            Date.now(),

        category:
            category,

        item:
            item,

        unit:
            unit,

        quantity:
            quantity,

        rate:
            rate

    };


    newItem.amount =
        quantity * rate;


    activeBOQ.push(newItem);


    saveCurrentBOQ();


    renderBOQ();

}


// ==========================================
// DELETE BOQ ITEM
// ==========================================

function deleteBOQItem(id) {

    const item =
        activeBOQ.find(function (boqItem) {

            return Number(boqItem.id) ===
                Number(id);

        });


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
        activeBOQ.filter(function (boqItem) {

            return Number(boqItem.id) !==
                Number(id);

        });


    saveCurrentBOQ();


    renderBOQ();

}


// ==========================================
// DELETE PROJECT
// ==========================================

function deleteProject(id) {

    const project =
        projects.find(function (item) {

            return Number(item.id) ===
                Number(id);

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

            return Number(item.id) !==
                Number(id);

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

            id:
                Date.now(),

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


function escapeAttribute(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


// ==========================================
// START APP
// ==========================================

loadProjects();

displayProjects();
