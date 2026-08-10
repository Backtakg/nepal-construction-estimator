"use strict";


// ==========================================
// PROJECT DATA
// ==========================================

let projects = [];


// ==========================================
// START APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Nepal Construction Estimator loaded");


    // --------------------------------------
    // GET ELEMENTS
    // --------------------------------------

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

    const newProjectButton =
        document.getElementById("newProjectButton");

    const newProjectButton2 =
        document.getElementById("newProjectButton2");

    const backButton =
        document.getElementById("backButton");

    const cancelButton =
        document.getElementById("cancelButton");


    // --------------------------------------
    // LOAD PROJECTS
    // --------------------------------------

    loadProjects();


    // --------------------------------------
    // INITIAL DISPLAY
    // --------------------------------------

    displayProjects();


    // --------------------------------------
    // NEW PROJECT BUTTON
    // --------------------------------------

    newProjectButton.addEventListener(
        "click",
        function () {

            showNewProject();

        }
    );


    // --------------------------------------
    // SECOND NEW PROJECT BUTTON
    // --------------------------------------

    newProjectButton2.addEventListener(
        "click",
        function () {

            showNewProject();

        }
    );


    // --------------------------------------
    // BACK BUTTON
    // --------------------------------------

    backButton.addEventListener(
        "click",
        function () {

            showDashboard();

        }
    );


    // --------------------------------------
    // CANCEL BUTTON
    // --------------------------------------

    cancelButton.addEventListener(
        "click",
        function () {

            showDashboard();

        }
    );


    // --------------------------------------
    // FORM SUBMIT
    // --------------------------------------

    projectForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            createProject();

        }
    );


    // --------------------------------------
    // AREA CALCULATION
    // --------------------------------------

    floorsInput.addEventListener(
        "input",
        calculateTotalArea
    );


    areaInput.addEventListener(
        "input",
        calculateTotalArea
    );


    // --------------------------------------
    // FUNCTIONS
    // --------------------------------------


    function loadProjects() {

        const savedProjects =
            localStorage.getItem(
                "constructionProjects"
            );


        if (!savedProjects) {

            projects = [];

            return;
        }


        try {

            projects =
                JSON.parse(savedProjects);


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

    }


    function saveProjects() {

        localStorage.setItem(
            "constructionProjects",
            JSON.stringify(projects)
        );

    }


    function showNewProject() {

        dashboard.classList.add("hidden");

        newProject.classList.remove("hidden");

        window.scrollTo(
            0,
            0
        );

    }


    function showDashboard() {

        newProject.classList.add("hidden");

        dashboard.classList.remove("hidden");

        displayProjects();

        window.scrollTo(
            0,
            0
        );

    }


    function calculateTotalArea() {

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


    function createProject() {

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


        if (
            !projectName ||
            !location ||
            !buildingType ||
            !floors ||
            !area
        ) {

            alert(
                "Please fill all required fields."
            );

            return;

        }


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


        projects.push(project);


        saveProjects();


        console.log(
            "Project created:",
            project
        );


        projectForm.reset();


        totalArea.textContent =
            "0 sq.ft";


        showDashboard();

    }


    function displayProjects() {

        projectList.innerHTML = "";


        if (projects.length === 0) {

            const empty =
                document.createElement("div");


            empty.className =
                "empty-state";


            const icon =
                document.createElement("div");

            icon.className =
                "empty-icon";

            icon.textContent =
                "🏠";


            const title =
                document.createElement("h3");

            title.textContent =
                "No projects yet";


            const text =
                document.createElement("p");

            text.textContent =
                "Create your first construction project to start estimating.";


            const button =
                document.createElement("button");

            button.type =
                "button";

            button.className =
                "btn btn-primary";

            button.textContent =
                "Create Your First Project";


            button.addEventListener(
                "click",
                function () {

                    showNewProject();

                }
            );


            empty.appendChild(icon);

            empty.appendChild(title);

            empty.appendChild(text);

            empty.appendChild(button);


            projectList.appendChild(empty);


            return;

        }


        projects.forEach(
            function (project) {

                createProjectCard(project);

            }
        );

    }


    function createProjectCard(project) {

        const card =
            document.createElement("div");


        card.className =
            "project-card";


        // HEADER

        const header =
            document.createElement("div");

        header.className =
            "project-card-header";


        const titleArea =
            document.createElement("div");


        const title =
            document.createElement("h3");

        title.textContent =
            project.projectName;


        const location =
            document.createElement("span");

        location.className =
            "project-location";

        location.textContent =
            "📍 " + project.location;


        titleArea.appendChild(title);

        titleArea.appendChild(location);


        const type =
            document.createElement("span");

        type.className =
            "project-type";

        type.textContent =
            project.buildingType;


        header.appendChild(titleArea);

        header.appendChild(type);


        // DETAILS

        const details =
            document.createElement("div");

        details.className =
            "project-details";


        const clientBox =
            createDetail(
                "Client",
                project.clientName || "—"
            );


        const floorsBox =
            createDetail(
                "Floors",
                project.floors
            );


        const areaBox =
            createDetail(
                "Built-up Area",
                Number(
                    project.totalArea
                ).toLocaleString() +
                " sq.ft"
            );


        details.appendChild(clientBox);

        details.appendChild(floorsBox);

        details.appendChild(areaBox);


        // FOOTER

        const footer =
            document.createElement("div");

        footer.className =
            "project-card-footer";


        const openButton =
            document.createElement("button");

        openButton.type =
            "button";

        openButton.className =
            "open-project-button";

        openButton.textContent =
            "Open Project →";


        openButton.addEventListener(
            "click",
            function () {

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
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.type =
            "button";

        deleteButton.className =
            "delete-button";

        deleteButton.textContent =
            "Delete";


        deleteButton.addEventListener(
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


        footer.appendChild(openButton);

        footer.appendChild(deleteButton);


        // BUILD CARD

        card.appendChild(header);

        card.appendChild(details);

        card.appendChild(footer);


        projectList.appendChild(card);

    }


    function createDetail(
        label,
        value
    ) {

        const box =
            document.createElement("div");


        const labelElement =
            document.createElement("span");

        labelElement.textContent =
            label;


        const valueElement =
            document.createElement("strong");

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

});
