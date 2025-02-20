document.addEventListener("DOMContentLoaded", () => {
    const entryDate = document.getElementById("entryDate");
    const entryText = document.getElementById("entryText");
    const saveEntry = document.getElementById("saveEntry");
    const entryList = document.getElementById("entryList");
    const themeToggle = document.getElementById("themeToggle");

    // Load previous entries from local storage
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entryList.innerHTML = "";
        entries.forEach(entry => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${entry.date}:</strong> ${entry.text}`;
            entryList.appendChild(li);
        });
    }

    // Save new entry
    saveEntry.addEventListener("click", () => {
        const date = entryDate.value;
        const text = entryText.value.trim();

        if (!date || !text) {
            alert("Please select a date and enter some text.");
            return;
        }

        const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entries.push({ date, text });
        localStorage.setItem("diaryEntries", JSON.stringify(entries));

        entryDate.value = "";
        entryText.value = "";
        loadEntries();
    });

    // Dark mode toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // Apply saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    loadEntries();
});