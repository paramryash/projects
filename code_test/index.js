document.addEventListener("DOMContentLoaded", function () {

    const search_button = document.getElementById('search');
    const userinput = document.getElementById('user_input');

    const statscontainr = document.querySelector(".stats-container");

    const easyCircle = document.querySelector(".easy");
    const mediumCircle = document.querySelector(".medium");
    const hardCircle = document.querySelector(".hard");

    const easyLabel = document.querySelector(".easy-label");
    const mediumLabel = document.querySelector(".medium-label");
    const hardLabel = document.querySelector(".hard-label");

    // const statscards = document.querySelector(".statsca ");

    const loading = document.querySelector(".loading");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("usernmae is  reqierd")
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,20}$/;
        const ismatching = regex.test(username);
        if (!ismatching) {
            alert("Invalid user name");
        }
        return ismatching;
    }

    async function fetchUserData(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

        try {
            search_button.textContent = "Searching...";
            search_button.disabled = true;
            loading.style.display = "block";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch user details");
            }

            const prossesdata = await response.json();
            console.log(prossesdata);

            displayUserData(prossesdata);

        }
        catch (error) {
            console.error("Error:", error);
            statscontainr.innerHTML = `
                <p class="error">Error: ${error.message}</p>
                <p>Please check the username and try again</p>
            `;
        }
        finally {
            search_button.textContent = "Search";
            search_button.disabled = false;
            loading.style.display = "none";
        }
    }
    n

    function updateProgress(solved, total, labelElement, circleElement) {
        const progress = ((solved / total) * 100);

        circleElement.style.setProperty("--progress", `${progress}%`);
        labelElement.textContent = `${solved}/${total}`;
    }

    function displayUserData(userData) {

        updateProgress(
            userData.easySolved,
            userData.totalEasy,
            easyLabel,
            easyCircle
        );
        updateProgress(
            userData.mediumSolved,
            userData.totalMedium,
            mediumLabel,
            mediumCircle
        );
        updateProgress(
            userData.hardSolved,
            userData.totalHard,
            hardLabel,
            hardCircle
        );


    }

    search_button.addEventListener('click', function () {
        const username = userinput.value.trim();
        if (validateUsername(username)) {
            fetchUserData(username);
        }
    });

});


