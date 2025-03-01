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
        entries.forEach((entry, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${entry.date}:</strong> ${entry.text} 
                <button class="deleteEntry" data-index="${index}">❌</button>`;
            entryList.appendChild(li);
        });

        // Add delete event listeners
        document.querySelectorAll(".deleteEntry").forEach(button => {
            button.addEventListener("click", deleteEntry);
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

    // Delete an entry
    function deleteEntry(event) {
        const index = event.target.dataset.index;
        let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entries.splice(index, 1);
        localStorage.setItem("diaryEntries", JSON.stringify(entries));
        loadEntries();
    }

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


document.getElementById("searchEntry").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    entryList.innerHTML = "";
    
    entries
        .filter(entry => entry.text.toLowerCase().includes(searchTerm))
        .forEach((entry, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${entry.date}:</strong> ${entry.text} 
                <button class="deleteEntry" data-index="${index}">❌</button>`;
            entryList.appendChild(li);
        });

    // Add delete event listeners again
    document.querySelectorAll(".deleteEntry").forEach(button => {
        button.addEventListener("click", deleteEntry);
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("loginScreen");
    const diaryApp = document.getElementById("diaryApp");
    const passwordInput = document.getElementById("passwordInput");
    const loginButton = document.getElementById("loginButton");

    const correctPassword = "mypassword"; // Change this to your preferred password

    loginButton.addEventListener("click", () => {
        if (passwordInput.value === correctPassword) {
            loginScreen.style.display = "none";
            diaryApp.style.display = "block";
        } else {
            alert("Incorrect password! Try again.");
        }
    });
});
