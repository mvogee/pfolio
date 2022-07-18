let didScroll = false;
let lastScrollTop = 0;
let scrollDelta = 100;

const scrollAction = () => {
    const nav = document.querySelector("nav");
    let scrollTop = window.scrollY;
    if (Math.abs(scrollTop - lastScrollTop) <= scrollDelta) {
        return ;
    }
    if (scrollTop > lastScrollTop && scrollTop > nav.scrollHeight) {
        if (!nav.classList.contains("nav-hidden")) {
            nav.classList.add("nav-hidden", "nav-scrolled");
        }
        
    }
    else {
        nav.classList.remove("nav-hidden");
        if (scrollTop - scrollDelta <= 0) {
            nav.classList.remove("nav-scrolled");
        }
    }
    lastScrollTop = scrollTop;
};

document.addEventListener('scroll', (scrollEvent) => {
    didScroll = true;
    setInterval(() => {
        if (didScroll) {
            scrollAction(scrollEvent);
            didScroll = false;
        }
    }, 500);
});