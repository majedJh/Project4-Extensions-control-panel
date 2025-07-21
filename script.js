const lightingBtn = document.querySelector(".lighting-mode");
    const heading = document.querySelector(".heading");;
    const extHeader = document.querySelector(".extensions-header");
    const extFilterButtons = extHeader.querySelectorAll("li");
    const ext = document.querySelector(".extensions");
    const extsList = Array.from(ext.querySelectorAll(".ext-box"));
    let activeExtsList = [];

    getActiveInLocalStorage();
    getLightingModeInLocalStorage();
    extsList.forEach(toggleActiveOnWidgets);
    extsList.forEach(hideAndShow);
    lightingBtn.addEventListener("click", changeLightMode);
    lightingBtn.addEventListener("click", setLightingModeInLocalStorage);

    extsList.forEach((e) => {
        e.querySelector(".remove-btn").querySelector("a").addEventListener("click" , deleteExt)
    })
    extFilterButtons.forEach((e) => {
        e.addEventListener("click", (event) => {
            setActiveFilterButton(event);

            if (event.currentTarget.classList.contains("active-btn")) {
                extsList.forEach(hideAndShowActiveWidgets)
            } else if (event.currentTarget.classList.contains("inactive-btn")) {
                extsList.forEach(hideAndShowInActiveWidgets)
            } else {
                extsList.forEach((extention) => {
                    if (extention.classList.contains("hidden-box")) {
                        extention.classList.remove("hidden-box");
                    }
                })
            }
        })
    })

    function hideAndShow(ele) {
        ele.querySelector(".checkbox_inp").addEventListener("change", (event) => {
            setActiveInLocalStorage(event);
            extFilterButtons.forEach((e) => {
                if (e.classList.contains("active")) {
                    if (e.classList.contains("active-btn")) {
                        extsList.forEach(hideAndShowActiveWidgets);
                    }
                    else if (e.classList.contains("inactive-btn")) {
                        extsList.forEach(hideAndShowInActiveWidgets);
                    }
                    else {
                        extsList.forEach((extention) => {
                            if (extention.classList.contains("hidden-box")) {
                                extention.classList.remove("hidden-box");
                            }
                        })
                    }
                }
            })
        })
    }
    function setActiveInLocalStorage(event) {
        if (event.currentTarget.closest(".ext-box").classList.contains("isActive")) {
            if (!activeExtsList.includes(extsList.indexOf(event.currentTarget.closest(".ext-box")))) {
                activeExtsList.push(extsList.indexOf(event.currentTarget.closest(".ext-box")));
                localStorage.setItem("activeExts", JSON.stringify(activeExtsList));
            }
        } else {
            activeExtsList.splice(activeExtsList.indexOf(extsList.indexOf(event.currentTarget.closest(".ext-box"))), 1)
            localStorage.setItem("activeExts", JSON.stringify(activeExtsList));
        }
    }
    function getActiveInLocalStorage() {
        activeExtsList = Array.from(JSON.parse(localStorage.getItem("activeExts")) || []);
        for (let i = 0; i < activeExtsList.length; i++) {
            extsList[activeExtsList[i]].querySelector(".checkbox_inp").checked = true;
            extsList[activeExtsList[i]].classList.add("isActive");
        }
    }
    function hideAndShowActiveWidgets(extention) {
        if (!extention.classList.contains("isActive")) {
            extention.classList.add("hidden-box");
        } else {
            if (extention.classList.contains("hidden-box")) {
                extention.classList.remove("hidden-box");
            }
        }
    }
    function hideAndShowInActiveWidgets(extention) {
        if (extention.classList.contains("isActive")) {
            extention.classList.add("hidden-box");
        } else {
            if (extention.classList.contains("hidden-box")) {
                extention.classList.remove("hidden-box");
            }
        }
    }

    function setActiveFilterButton(event) {
        extFilterButtons.forEach((ele) => {
            if (ele != event.currentTarget.classList) {
                ele.classList.remove("active");
            }
            event.currentTarget.classList.add("active");
        })
    }
    function toggleActiveOnWidgets(e) {
        e.querySelector(".checkbox_inp").addEventListener("change", (event) => {
            if (event.currentTarget.checked) {
                e.classList.add("isActive");
            } else {
                e.classList.remove("isActive");
            }
        })
    }
    function deleteExt(ele) {
        ele.currentTarget.closest(".ext-box").classList.add("deleted-box")
    }
    function toggleLightMode() {
        document.body.classList.toggle("light");
        heading.classList.toggle("light");
        extHeader.classList.toggle("light");
        ext.classList.toggle("light");

    }
    function changeLightMode() {
        toggleLightMode();
        if (document.body.classList.contains("light")) {
            document.querySelector(".lighting-mode").querySelector("img").setAttribute("src", "/assets/images/icon-moon.svg");
        } else {
            document.querySelector(".lighting-mode").querySelector("img").setAttribute("src", "/assets/images/icon-sun.svg");
        }
    }
    function setLightingModeInLocalStorage() {
        if (document.body.classList.contains("light")) {
            localStorage.setItem("lightingMode" , "light") 
        } else {
            localStorage.setItem("lightingMode" , "dark")
        }
    }
    function getLightingModeInLocalStorage() {
        let lightingMode = localStorage.getItem("lightingMode") || "dark";
        if (lightingMode == "light") {
            changeLightMode();
        }
    }
