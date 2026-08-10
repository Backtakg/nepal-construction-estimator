// ======================================================
// NEPAL CONSTRUCTION ESTIMATOR
// FULL WORKING VERSION
// PROJECTS + BOQ + EDIT + ADD + DELETE + COST/SQ.FT
// ======================================================

let projects = [];
let activeProject = null;
let activeBOQ = [];


// ======================================================
// GET ELEMENTS
// ======================================================

const dashboard = document.getElementById("dashboard");
const newProject = document.getElementById("newProject");
const projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");

const floorsInput = document.getElementById("floors");
const areaInput = document.getElementById("area");
const totalArea = document.getElementById("totalArea");


// ======================================================
// LOCAL STORAGE
// ======================================================

function loadProjects() {

    const saved = localStorage.getItem(
        "constructionProjects"
    );

    if (!saved) {
        projects = [];
        return;
    }

    try {

        const data = JSON.parse(saved);

        projects = Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        console.error(
            "Could not load projects:",
            error
        );

        projects = [];
    }
}


function saveProjects() {

    localStorage.setItem(
        "constructionProjects",
        JSON.stringify(projects)
    );
}


// ======================================================
// NAVIGATION
// ======================================================

function hideBOQScreen() {

    const boqScreen =
        document.getElementById("boqScreen");

    if (boqScreen) {
        boqScreen.classList.add("hidden");
    }
}


function showDashboard() {

    hideBOQScreen();

    if (newProject) {
        newProject.classList.add("hidden");
    }

    if (dashboard) {
        dashboard.classList.remove("hidden");
    }

    displayProjects();
}


function showNewProject() {

    hideBOQScreen();

    if (dashboard) {
        dashboard.classList.add("hidden");
    }

    if (newProject) {
        newProject.classList.remove("hidden");
    }
}


// ======================================================
// DISPLAY PROJECTS
// ======================================================

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
                        ${project.floors || 0}
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
                function () {

                    openProject(
                        project.id
                    );

                }
            );

        }


        if (deleteButton) {

            deleteButton.addEventListener(
                "click",
                function () {

                    deleteProject(
                        project.id
                    );

                }
            );

        }

    });
}


// ======================================================
// OPEN PROJECT
// ======================================================

function openProject(id) {

    const project =
        projects.find(function (item) {

            return Number(item.id) ===
                Number(id);

        });


    if (!project) {

        alert(
            "Project could not be found."
        );

        return;
    }


    activeProject = project;


    localStorage.setItem(
        "activeProject",
        JSON.stringify(project)
    );


    if (dashboard) {
        dashboard.classList.add("hidden");
    }

    if (newProject) {
        newProject.classList.add("hidden");
    }


    createBOQScreen();

    loadProjectBOQ(project);
}


// ======================================================
// CREATE BOQ SCREEN
// ======================================================

function createBOQScreen() {

    let boqScreen =
        document.getElementById(
            "boqScreen"
        );


    if (!boqScreen) {

        boqScreen =
            document.createElement(
                "section"
            );

        boqScreen.id =
            "boqScreen";

        boqScreen.className =
            "boq-screen hidden";


        const main =
            document.querySelector("main");


        if (!main) {

            console.error(
                "Main element not found."
            );

            return;
        }


        main.appendChild(
            boqScreen
        );
    }


    boqScreen.classList.remove(
        "hidden"
    );
}


// ======================================================
// LOAD PROJECT BOQ
// ======================================================

function loadProjectBOQ(project) {

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


// ======================================================
// DEFAULT BOQ
// ======================================================

function getDefaultBOQ(project) {

    const area =
        Number(project.totalArea) || 0;


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

    ];
}


// ======================================================
// SAVE BOQ
// ======================================================

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


// ======================================================
// CALCULATE BOQ TOTAL
// ======================================================

function calculateBOQTotal() {

    let total = 0;


    activeBOQ.forEach(
        function (item) {

            const quantity =
                Number(item.quantity) || 0;

            const rate =
                Number(item.rate) || 0;

            item.amount =
                quantity * rate;

            total +=
                item.amount;

        }
    );


    return total;
}


// ======================================================
// RENDER BOQ
// ======================================================

function renderBOQ() {

    const boqScreen =
        document.getElementById(
            "boqScreen"
        );


    if (
        !boqScreen ||
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


            <!-- BOQ -->

            <div class="boq-card">


                <div class="boq-title">

                    <div>

                        <h3>
                            Bill of Quantities
                        </h3>

                        <p>
                            Edit quantities and
                            rates to prepare
                            your estimate.
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

                            ${
                                activeBOQ.map(
                                    function (
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
                                    ?

                                `

                                    <tr>

                                        <td
                                            colspan="8"
                                            class="no-boq-items">

                                            No BOQ items yet.

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


            <!-- ADD CUSTOM ITEM -->

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


            <div class="boq-note">

                <strong>
                    Preliminary Estimate:
                </strong>

                Rates are sample values for
                demonstration. Replace them
                with verified local market
                rates before commercial use.

            </div>


        </div>

    `;


    attachBOQEvents();
}


// ======================================================
// BOQ EVENTS
// ======================================================

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
            function () {

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
            function () {

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


    // EDIT BOQ INPUTS

    document
        .querySelectorAll(
            ".boq-input"
        )
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


    // DELETE BOQ ITEMS

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


// ======================================================
// UPDATE BOQ ITEM
// ======================================================

function updateBOQItem(input) {

    const id =
        Number(
            input.dataset.id
        );


    const field =
        input.dataset.field;


    const item =
        activeBOQ.find(
            function (boqItem) {

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
            Number(input.value) || 0;

    } else {

        item[field] =
            input.value;

    }


    item.amount =
        Number(item.quantity || 0) *
        Number(item.rate || 0);


    saveCurrentBOQ();


    updateBOQSummary(
        id,
        item
    );
}


// ======================================================
// UPDATE BOQ SUMMARY
// ======================================================

function updateBOQSummary(
    changedId,
    changedItem
) {

    const total =
        calculateBOQTotal();


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


    if (changedItem) {

        const amountCell =
            document.querySelector(
                `[data-amount-id="${changedId}"]`
            );


        if (amountCell) {

            amountCell.textContent =
                "NPR " +
                Math.round(
                    changedItem.amount
                ).toLocaleString();

        }

    }
}


// ======================================================
// ADD CUSTOM BOQ ITEM
// ======================================================

function addCustomBOQItem() {

    const categoryInput =
        document.getElementById(
            "customCategory"
        );


    const itemInput =
        document.getElementById(
            "customItem"
        );


    const unitInput =
        document.getElementById(
            "customUnit"
        );


    const quantityInput =
        document.getElementById(
            "customQuantity"
        );


    const rateInput =
        document.getElementById(
            "customRate"
        );


    if (
        !categoryInput ||
        !itemInput ||
        !unitInput ||
        !quantityInput ||
        !rateInput
    ) {

        return;
    }


    const category =
        categoryInput.value.trim();


    const item =
        itemInput.value.trim();


    const unit =
        unitInput.value;


    const quantity =
        Number(
            quantityInput.value
        ) || 0;


    const rate =
        Number(
            rateInput.value
        ) || 0;


    if (!category) {

        alert(
            "Please enter a category."
        );

        categoryInput.focus();

        return;
    }


    if (!item) {

        alert(
            "Please enter an item description."
        );

        itemInput.focus();

        return;
    }


    if (quantity <= 0) {

        alert(
            "Please enter a quantity greater than 0."
        );

        quantityInput.focus();

        return;
    }


    if (rate < 0) {

        alert(
            "Rate cannot be negative."
        );

        rateInput.focus();

        return;
    }


    const newItem = {

        id:
            Date.now() +
            Math.floor(
                Math.random() * 1000
            ),

        category:
            category,

        item:
            item,

        unit:
            unit,

        quantity:
            quantity,

        rate:
            rate,

        amount:
            quantity * rate

    };


    activeBOQ.push(
        newItem
    );


    saveCurrentBOQ();


    renderBOQ();
}


// ======================================================
// DELETE BOQ ITEM
// ======================================================

function deleteBOQItem(id) {

    const item =
        activeBOQ.find(
            function (boqItem) {

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
            function (boqItem) {

                return Number(
                    boqItem.id
                ) !== Number(id);

            }
        );


    saveCurrentBOQ();


    renderBOQ();
}


// ======================================================
// DELETE PROJECT
// ======================================================

function deleteProject(id) {

    const project =
        projects.find(
            function (item) {

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
            function (item) {

                return Number(
                    item.id
                ) !== Number(id);

            }
        );


    saveProjects();


    displayProjects();
}


// ======================================================
// AREA CALCULATION
// ======================================================

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


// ======================================================
// CREATE PROJECT
// ======================================================

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        function (event) {

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


            activeProject =
                null;

            activeBOQ =
                [];


            projectForm.reset();


            if (totalArea) {

                totalArea.textContent =
                    "0 sq.ft";

            }


            showDashboard();

        }
    );

}


// ======================================================
// NAVIGATION BUTTONS
// ======================================================

function connectButton(
    id,
    action
) {

    const button =
        document.getElementById(id);


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


// ======================================================
// SECURITY
// ======================================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value || "";


    return div.innerHTML;
}


function escapeAttribute(value) {

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


// ======================================================
// START APPLICATION
// ======================================================

loadProjects();

displayProjects();

console.log(
    "Nepal Construction Estimator loaded successfully."
);
// ======================================================
// NEPAL RATE DATABASE - VERSION 1
// ======================================================

const nepalRates = {

    Kathmandu: {

        "Earthwork": {
            unit: "cu.ft",
            rate: 55
        },

        "PCC": {
            unit: "cu.ft",
            rate: 180
        },

        "RCC": {
            unit: "cu.ft",
            rate: 850
        },

        "Reinforcement Steel": {
            unit: "kg",
            rate: 115
        },

        "Brick Masonry": {
            unit: "cu.ft",
            rate: 220
        },

        "Plaster": {
            unit: "sq.ft",
            rate: 65
        },

        "Flooring": {
            unit: "sq.ft",
            rate: 140
        },

        "Painting": {
            unit: "sq.ft",
            rate: 45
        }

    }

};


// ======================================================
// RATE SELECTOR
// ======================================================

function createRateSelector() {

    if (!activeProject) {
        return;
    }

    const boqScreen =
        document.getElementById("boqScreen");

    if (!boqScreen) {
        return;
    }

    const existing =
        document.getElementById(
            "nepalRatePanel"
        );

    if (existing) {
        existing.remove();
    }


    const panel =
        document.createElement("div");

    panel.id =
        "nepalRatePanel";

    panel.className =
        "nepal-rate-panel";


    panel.innerHTML = `

        <div class="rate-panel-header">

            <div>

                <span class="badge">
                    🇳🇵 Nepal Rate System
                </span>

                <h3>
                    Reference Construction Rates
                </h3>

                <p>
                    Select an item to apply a
                    reference rate to your BOQ.
                </p>

            </div>

        </div>


        <div class="rate-controls">

            <div class="rate-field">

                <label>
                    Location
                </label>

                <select id="rateLocation">

                    <option value="Kathmandu">
                        Kathmandu
                    </option>

                </select>

            </div>


            <div class="rate-field">

                <label>
                    BOQ Item
                </label>

                <select id="rateItem">

                    <option value="">
                        Select BOQ item
                    </option>

                    ${Object.keys(
                        nepalRates.Kathmandu
                    ).map(function(item) {

                        return `
                            <option value="${escapeAttribute(item)}">
                                ${escapeHTML(item)}
                            </option>
                        `;

                    }).join("")}

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
                    Suggested Rate (NPR)
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


        <div class="rate-warning">

            ⚠️ <strong>Reference rate:</strong>
            Rates are provided for estimating
            purposes and should be verified
            against current quotations and
            applicable official schedules before
            commercial use.

        </div>

    `;


    const boqContainer =
        boqScreen.querySelector(
            ".boq-container"
        );


    if (boqContainer) {

        boqContainer.insertBefore(
            panel,
            boqContainer.children[1]
        );

    }


    connectRateEvents();
}


// ======================================================
// RATE EVENTS
// ======================================================

function connectRateEvents() {

    const itemSelect =
        document.getElementById(
            "rateItem"
        );

    const rateValue =
        document.getElementById(
            "rateValue"
        );

    const rateUnit =
        document.getElementById(
            "rateUnit"
        );


    if (!itemSelect) {
        return;
    }


    itemSelect.addEventListener(
        "change",
        function () {

            const selected =
                itemSelect.value;


            if (!selected) {

                rateValue.value = "";
                rateUnit.value = "";

                return;
            }


            const rate =
                nepalRates.Kathmandu[
                    selected
                ];


            if (!rate) {
                return;
            }


            rateValue.value =
                rate.rate;


            rateUnit.value =
                rate.unit;

        }
    );


    const applyButton =
        document.getElementById(
            "applyNepalRate"
        );


    if (applyButton) {

        applyButton.addEventListener(
            "click",
            applySelectedNepalRate
        );

    }
}


// ======================================================
// APPLY SELECTED RATE
// ======================================================

function applySelectedNepalRate() {

    const itemSelect =
        document.getElementById(
            "rateItem"
        );


    const rateValue =
        document.getElementById(
            "rateValue"
        );


    const rateUnit =
        document.getElementById(
            "rateUnit"
        );


    if (
        !itemSelect ||
        !rateValue ||
        !rateUnit
    ) {
        return;
    }


    const selected =
        itemSelect.value;


    const rate =
        Number(
            rateValue.value
        ) || 0;


    const unit =
        rateUnit.value;


    if (!selected) {

        alert(
            "Please select a BOQ item."
        );

        return;
    }


    if (rate <= 0) {

        alert(
            "Please enter a valid rate."
        );

        return;
    }


    // Find matching BOQ category/item

    const boqItem =
        activeBOQ.find(
            function(item) {

                const category =
                    String(
                        item.category || ""
                    ).toLowerCase();

                const description =
                    String(
                        item.item || ""
                    ).toLowerCase();


                const search =
                    selected.toLowerCase();


                return (
                    category.includes(search) ||
                    description.includes(search)
                );

            }
        );


    if (!boqItem) {

        alert(
            "No matching BOQ item was found.\n\n" +
            "You can add the item to the BOQ first."
        );

        return;
    }


    boqItem.rate =
        rate;


    boqItem.unit =
        unit;


    boqItem.amount =
        Number(
            boqItem.quantity || 0
        ) * rate;


    saveCurrentBOQ();


    renderBOQ();


    // Recreate rate panel

    createRateSelector();


    alert(
        selected +
        " rate applied successfully."
    );
}
