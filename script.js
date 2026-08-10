console.log("SCRIPT JS IS WORKING");

document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("newProjectButton");

    console.log("BUTTON FOUND:", button);

    if (button) {

        button.addEventListener("click", function () {

            alert("New Project button is working!");

        });

    }

});
