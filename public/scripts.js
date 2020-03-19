const currentPage = location.pathname
const menuItems   = document.querySelectorAll("header .links a")

    for (item of menuItems){
        if(currentPage.includes(items.getAttribute("href"))){
            items.classList.add("active")
        }
    }