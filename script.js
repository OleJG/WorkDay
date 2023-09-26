document.addEventListener("DOMContentLoaded", function () {
    
    const currentDayElement = document.getElementById("currentDay");
    const currentDate = new Date();
    currentDayElement.textContent = currentDate.toDateString();

    // Generate timeblocks
    const timeBlocksContainer = document.querySelector("time-blocks");
    const businessHours = 9; 
    const hoursInDay = 8; 

    for (let i = 0; i < hoursInDay; i++) {
        const hour = businessHours + i;
        const timeBlock = document.createElement("div");
        timeBlock.classList.add("time-block");
        timeBlock.innerHTML = `
            <div class="hour">${hour}:00</div>
            <textarea class="event"></textarea>
            <button class="save-btn">Save</button>
        `;

        
        const currentTime = currentDate.getHours();
        if (hour < currentTime) {
            timeBlock.classList.add("past");
        } else if (hour === currentTime) {
            timeBlock.classList.add("present");
        } else {
            timeBlock.classList.add("future");
        }

        
        const eventTextarea = timeBlock.querySelector(".event");
        const saveButton = timeBlock.querySelector(".save-btn");
        const localStorageKey = `event_${hour}`;

        const savedEvent = localStorage.getItem(localStorageKey);
        if (savedEvent) {
            eventTextarea.value = savedEvent;
        }

       
        saveButton.addEventListener("click", function () {
            const eventText = eventTextarea.value;
            localStorage.setItem(localStorageKey, eventText);
        });

        // timeBlocksContainer.appendChild(timeBlock);
    }
});
