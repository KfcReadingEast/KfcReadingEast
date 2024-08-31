// app.js

document.addEventListener("DOMContentLoaded", function() {
    const clockInBtn = document.getElementById("clockInBtn");
    const clockOutBtn = document.getElementById("clockOutBtn");
    const shiftList = document.getElementById("shiftList");

    // Initialize shifts array from local storage or create a new one
    let shifts = JSON.parse(localStorage.getItem("shifts")) || [];

    // Function to render shifts in the UI
    function renderShifts() {
        shiftList.innerHTML = ""; // Clear existing list
        shifts.forEach((shift, index) => {
            const li = document.createElement("li");
            li.textContent = `Shift ${index + 1}: ${shift.start} - ${shift.end || "In Progress"}`;
            shiftList.appendChild(li);
        });
    }

    // Function to handle clock in
    function clockIn() {
        const currentDateTime = new Date().toLocaleString();
        shifts.push({ start: currentDateTime, end: null });
        localStorage.setItem("shifts", JSON.stringify(shifts));
        renderShifts();
    }

    // Function to handle clock out
    function clockOut() {
        const currentDateTime = new Date().toLocaleString();
        if (shifts.length === 0 || shifts[shifts.length - 1].end) {
            alert("You need to clock in first!");
            return;
        }
        shifts[shifts.length - 1].end = currentDateTime;
        localStorage.setItem("shifts", JSON.stringify(shifts));
        renderShifts();
    }

    // Event listeners for buttons
    clockInBtn.addEventListener("click", clockIn);
    clockOutBtn.addEventListener("click", clockOut);

    // Render shifts on page load
    renderShifts();
});
