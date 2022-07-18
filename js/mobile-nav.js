const dropDownBtn = document.querySelector(".mobile-nav-btn");

dropDownBtn.addEventListener("click", () => {
    const nav = document.querySelector("nav");
    const navBtn = document.querySelector(".mobile-nav-btn");
    navBtn.classList.toggle("nav-btn-flipped");
    nav.classList.toggle("nav-mobile-hide");
});