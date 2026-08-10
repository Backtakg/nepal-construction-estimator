function createProject() {

    const projectName = prompt("Enter project name:");

    if (!projectName) {
        return;
    }

    alert(
        "Project created: " + projectName +
        "\n\nProject creation screen will be added next."
    );
}
