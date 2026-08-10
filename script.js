"use strict";


/* ==========================================
   START APPLICATION
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ======================================
           ELEMENTS
        ====================================== */

        const dashboard =
            document.getElementById(
                "dashboard"
            );


        const newProject =
            document.getElementById(
                "newProject"
            );


        const boqSection =
            document.getElementById(
                "boqSection"
            );


        const projectForm =
            document.getElementById(
                "projectForm"
            );


        const projectList =
            document.getElementById(
                "projectList"
            );


        const floorsInput =
            document.getElementById(
                "floors"
            );


        const areaInput =
            document.getElementById(
                "area"
            );


        const totalArea =
            document.getElementById(
                "totalArea"
            );


        const boqForm =
            document.getElementById(
                "boqForm"
            );


        const boqTableBody =
            document.getElementById(
                "boqTableBody"
            );


        const boqEmpty =
            document.getElementById(
                "boqEmpty"
            );


        const boqGrandTotal =
            document.getElementById(
                "boqGrandTotal"
            );


        const boqBackButton =
            document.getElementById(
                "boqBackButton"
            );


        /* ======================================
           DATA
        ====================================== */

        let projects = [];

        let activeProject = null;


        /* ======================================
           LOAD PROJECTS
        ====================================== */

        loadProjects();


        displayProjects();


        /* ======================================
           NAVIGATION BUTTONS
        ====================================== */

        document
            .getElementById(
                "newProjectButton"
            )
            .addEventListener(
                "click",
                showNewProject
            );


        document
            .getElementById(
                "newProjectButton2"
            )
            .addEventListener(
                "click",
                showNewProject
            );


        document
            .getElementById(
                "backButton"
            )
            .addEventListener(
                "click",
                showDashboard
            );


        document
            .getElementById(
                "cancelButton"
            )
            .addEventListener(
                "click",
                showDashboard
            );


        boqBackButton.addEventListener(
            "click",
            showDashboard
        );


        /* ======================================
           PROJECT FORM
        ====================================== */

        projectForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                createProject();

            }
        );


        /* ======================================
           AREA CALCULATION
        ====================================== */

        floorsInput.addEventListener(
            "input",
            calculateArea
        );


        areaInput.addEventListener(
            "input",
            calculateArea
        );


        /* ======================================
           BOQ FORM
        ====================================== */

        boqForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                addBOQItem();

            }
        );


        /* ======================================
           LOAD PROJECTS
        ====================================== */

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


                if (
                    Array.isArray(data)
                ) {

                    projects = data;

                } else {

                    projects = [];

                }

            } catch (error) {

                console.error(
                    "Could not load projects:",
                    error
                );

                projects = [];

            }

        }


        /* ======================================
           SAVE PROJECTS
        ====================================== */

        function saveProjects() {

            localStorage.setItem(
                "constructionProjects",
                JSON.stringify(projects)
            );

        }


        /* ======================================
           SHOW DASHBOARD
        ====================================== */

        function showDashboard() {

            dashboard.classList.remove(
                "hidden"
            );


            newProject.classList.add(
                "hidden"
            );


            boqSection.classList.add(
                "hidden"
            );


            displayProjects();


            window.scrollTo(
                0,
                0
            );

        }


        /* ======================================
           SHOW NEW PROJECT
        ====================================== */

        function showNewProject() {

            dashboard.classList.add(
                "hidden"
            );


            newProject.classList.remove(
                "hidden"
            );


            boqSection.classList.add(
                "hidden"
            );


            window.scrollTo(
                0,
                0
            );

        }


        /* ======================================
           CALCULATE AREA
        ====================================== */

        function calculateArea() {

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
                formatNumber(total) +
                " sq.ft";

        }


        /* ======================================
           CREATE PROJECT
        ====================================== */

        function createProject() {

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
                    document
                        .getElementById(
                            "floors"
                        )
                        .value
                );


            const area =
                Number(
                    document
                        .getElementById(
                            "area"
                        )
                        .value
                );


            if (
                !projectName ||
                !location ||
                !buildingType ||
                floors <= 0 ||
                area <= 0
            ) {

                alert(
                    "Please fill all required fields correctly."
                );

                return;

            }


            const project = {

                id: Date.now(),

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
                    floors * area

            };


            projects.push(
                project
            );


            saveProjects();


            projectForm.reset();


            totalArea.textContent =
                "0 sq.ft";


            showDashboard();

        }


        /* ======================================
           DISPLAY PROJECTS
        ====================================== */

        function displayProjects() {

            projectList.innerHTML =
                "";


            if (
                projects.length === 0
            ) {

                showEmptyProjects();

                return;

            }


            projects.forEach(
                function (project) {

                    createProjectCard(
                        project
                    );

                }
            );

        }


        /* ======================================
           EMPTY PROJECTS
        ====================================== */

        function showEmptyProjects() {

            const empty =
                document.createElement(
                    "div"
                );


            empty.className =
                "empty-state";


            const icon =
                document.createElement(
                    "div"
                );

            icon.className =
                "empty-icon";

            icon.textContent =
                "🏠";


            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                "No projects yet";


            const text =
                document.createElement(
                    "p"
                );

            text.textContent =
                "Create your first construction project to start estimating.";


            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "btn btn-primary";

            button.textContent =
                "Create Your First Project";


            button.addEventListener(
                "click",
                showNewProject
            );


            empty.appendChild(
                icon
            );

            empty.appendChild(
                title
            );

            empty.appendChild(
                text
            );

            empty.appendChild(
                button
            );


            projectList.appendChild(
                empty
            );

        }


        /* ======================================
           PROJECT CARD
        ====================================== */

        function createProjectCard(
            project
        ) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "project-card";


            /* HEADER */

            const header =
                document.createElement(
                    "div"
                );

            header.className =
                "project-card-header";


            const titleArea =
                document.createElement(
                    "div"
                );


            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                project.projectName;


            const location =
                document.createElement(
                    "span"
                );

            location.className =
                "project-location";

            location.textContent =
                "📍 " +
                project.location;


            titleArea.appendChild(
                title
            );

            titleArea.appendChild(
                location
            );


            const type =
                document.createElement(
                    "span"
                );

            type.className =
                "project-type";

            type.textContent =
                project.buildingType;


            header.appendChild(
                titleArea
            );

            header.appendChild(
                type
            );


            /* DETAILS */

            const details =
                document.createElement(
                    "div"
                );

            details.className =
                "project-details";


            details.appendChild(
                createDetail(
                    "Client",
                    project.clientName ||
                    "—"
                )
            );


            details.appendChild(
                createDetail(
                    "Floors",
                    project.floors
                )
            );


            details.appendChild(
                createDetail(
                    "Built-up Area",
                    formatNumber(
                        project.totalArea
                    ) +
                    " sq.ft"
                )
            );


            /* FOOTER */

            const footer =
                document.createElement(
                    "div"
                );

            footer.className =
                "project-card-footer";


            const openButton =
                document.createElement(
                    "button"
                );

            openButton.type =
                "button";

            openButton.className =
                "open-project-button";

            openButton.textContent =
                "Open Project →";


            openButton.addEventListener(
                "click",
                function () {

                    openProject(
                        project
                    );

                }
            );


            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.type =
                "button";

            deleteButton.className =
                "delete-button";

            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteProject(
                        project
                    );

                }
            );


            footer.appendChild(
                openButton
            );

            footer.appendChild(
                deleteButton
            );


            card.appendChild(
                header
            );

            card.appendChild(
                details
            );

            card.appendChild(
                footer
            );


            projectList.appendChild(
                card
            );

        }


        /* ======================================
           PROJECT DETAIL
        ====================================== */

        function createDetail(
            label,
            value
        ) {

            const box =
                document.createElement(
                    "div"
                );


            const labelElement =
                document.createElement(
                    "span"
                );

            labelElement.textContent =
                label;


            const valueElement =
                document.createElement(
                    "strong"
                );

            valueElement.textContent =
                value;


            box.appendChild(
                labelElement
            );

            box.appendChild(
                valueElement
            );


            return box;

        }


        /* ======================================
           OPEN PROJECT
        ====================================== */

        function openProject(
            project
        ) {

            activeProject =
                project;


            localStorage.setItem(
                "activeProject",
                JSON.stringify(
                    project
                )
            );


            dashboard.classList.add(
                "hidden"
            );


            newProject.classList.add(
                "hidden"
            );


            boqSection.classList.remove(
                "hidden"
            );


            document
                .getElementById(
                    "boqProjectName"
                )
                .textContent =
                project.projectName;


            document
                .getElementById(
                    "boqProjectInfo"
                )
                .textContent =
                "Bill of Quantities & Cost Estimate";


            document
                .getElementById(
                    "boqLocation"
                )
                .textContent =
                project.location;


            document
                .getElementById(
                    "boqBuildingType"
                )
                .textContent =
                project.buildingType;


            document
                .getElementById(
                    "boqArea"
                )
                .textContent =
                formatNumber(
                    project.totalArea
                ) +
                " sq.ft";


            displayBOQ();


            window.scrollTo(
                0,
                0
            );

        }


        /* ======================================
           GET BOQ
        ====================================== */

        function getBOQ() {

            if (
                !activeProject
            ) {

                return [];

            }


            const key =
                "boq_" +
                activeProject.id;


            const saved =
                localStorage.getItem(
                    key
                );


            if (!saved) {

                return [];

            }


            try {

                const items =
                    JSON.parse(
                        saved
                    );


                if (
                    Array.isArray(items)
                ) {

                    return items;

                }

            } catch (error) {

                console.error(
                    "Could not load BOQ:",
                    error
                );

            }


            return [];

        }


        /* ======================================
           SAVE BOQ
        ====================================== */

        function saveBOQ(
            items
        ) {

            if (
                !activeProject
            ) {

                return;

            }


            const key =
                "boq_" +
                activeProject.id;


            localStorage.setItem(
                key,
                JSON.stringify(
                    items
                )
            );

        }


        /* ======================================
           ADD BOQ ITEM
        ====================================== */

        function addBOQItem() {

            if (
                !activeProject
            ) {

                alert(
                    "Please open a project first."
                );

                return;

            }


            const item =
                document
                    .getElementById(
                        "boqItem"
                    )
                    .value
                    .trim();


            const description =
                document
                    .getElementById(
                        "boqDescription"
                    )
                    .value
                    .trim();


            const unit =
                document
                    .getElementById(
                        "boqUnit"
                    )
                    .value;


            const quantity =
                Number(
                    document
                        .getElementById(
                            "boqQuantity"
                        )
                        .value
                );


            const rate =
                Number(
                    document
                        .getElementById(
                            "boqRate"
                        )
                        .value
                );


            if (
                !item ||
                !unit ||
                quantity <= 0 ||
                rate < 0 ||
                !Number.isFinite(
                    quantity
                ) ||
                !Number.isFinite(
                    rate
                )
            ) {

                alert(
                    "Please enter a valid work item, unit, quantity and rate."
                );

                return;

            }


            const items =
                getBOQ();


            const newItem = {

                id:
                    Date.now(),

                item:
                    item,

                description:
                    description,

                unit:
                    unit,

                quantity:
                    quantity,

                rate:
                    rate,

                amount:
                    quantity * rate

            };


            items.push(
                newItem
            );


            saveBOQ(
                items
            );


            boqForm.reset();


            displayBOQ();

        }


        /* ======================================
           DISPLAY BOQ
        ====================================== */

        function displayBOQ() {

            const items =
                getBOQ();


            boqTableBody.innerHTML =
                "";


            if (
                items.length === 0
            ) {

                boqEmpty.style.display =
                    "block";


                boqGrandTotal.textContent =
                    "NPR 0.00";


                return;

            }


            boqEmpty.style.display =
                "none";


            let total = 0;


            items.forEach(
                function (
                    item,
                    index
                ) {

                    const row =
                        document.createElement(
                            "tr"
                        );


                    const numberCell =
                        document.createElement(
                            "td"
                        );

                    numberCell.textContent =
                        index + 1;


                    const itemCell =
                        document.createElement(
                            "td"
                        );

                    itemCell.textContent =
                        item.item;


                    const descriptionCell =
                        document.createElement(
                            "td"
                        );

                    descriptionCell.textContent =
                        item.description ||
                        "—";


                    const unitCell =
                        document.createElement(
                            "td"
                        );

                    unitCell.textContent =
                        item.unit;


                    const quantityCell =
                        document.createElement(
                            "td"
                        );

                    quantityCell.textContent =
                        formatNumber(
                            item.quantity
                        );


                    const rateCell =
                        document.createElement(
                            "td"
                        );

                    rateCell.textContent =
                        formatNumber(
                            item.rate
                        );


                    const amountCell =
                        document.createElement(
                            "td"
                        );

                    amountCell.textContent =
                        formatNumber(
                            item.amount
                        );


                    const actionCell =
                        document.createElement(
                            "td"
                        );


                    const deleteButton =
                        document.createElement(
                            "button"
                        );

                    deleteButton.type =
                        "button";

                    deleteButton.className =
                        "boq-delete";

                    deleteButton.textContent =
                        "Delete";


                    deleteButton.addEventListener(
                        "click",
                        function () {

                            deleteBOQItem(
                                item.id
                            );

                        }
                    );


                    actionCell.appendChild(
                        deleteButton
                    );


                    row.appendChild(
                        numberCell
                    );

                    row.appendChild(
                        itemCell
                    );

                    row.appendChild(
                        descriptionCell
                    );

                    row.appendChild(
                        unitCell
                    );

                    row.appendChild(
                        quantityCell
                    );

                    row.appendChild(
                        rateCell
                    );

                    row.appendChild(
                        amountCell
                    );

                    row.appendChild(
                        actionCell
                    );


                    boqTableBody.appendChild(
                        row
                    );


                    total +=
                        Number(
                            item.amount
                        ) || 0;

                }
            );


            boqGrandTotal.textContent =
                "NPR " +
                formatNumber(
                    total
                );

        }


        /* ======================================
           DELETE BOQ ITEM
        ====================================== */

        function deleteBOQItem(
            id
        ) {

            const items =
                getBOQ();


            const item =
                items.find(
                    function (
                        boqItem
                    ) {

                        return (
                            boqItem.id ===
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


            const updatedItems =
                items.filter(
                    function (
                        boqItem
                    ) {

                        return (
                            boqItem.id !==
                            id
                        );

                    }
                );


            saveBOQ(
                updatedItems
            );


            displayBOQ();

        }


        /* ======================================
           DELETE PROJECT
        ====================================== */

        function deleteProject(
            project
        ) {

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
                    function (
                        item
                    ) {

                        return (
                            item.id !==
                            project.id
                        );

                    }
                );


            saveProjects();


            localStorage.removeItem(
                "boq_" +
                project.id
            );


            displayProjects();

        }


        /* ======================================
           NUMBER FORMAT
        ====================================== */

        function formatNumber(
            value
        ) {

            return Number(
                value || 0
            ).toLocaleString(
                "en-IN",
                {
                    maximumFractionDigits: 2
                }
            );

        }


    }

);
