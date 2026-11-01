import gsap from "gsap";

const animateSearchBar = (isOpen: boolean) => {
    gsap.to(".main-wrap", {
        y: isOpen ? '-20%' : 0,
        duration: 0.5,
        ease: "power2.out",
    })
    gsap.to(".data-list-wrap",{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        y: isOpen ? -20 : 0,
        duration: 0.5,
        ease: "power2.out"
    })
}

function onSearchBarTabDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
        event.preventDefault();
        event.stopPropagation();
    }
}
function onSearchBarTabUp(event: KeyboardEvent) {
    console.log('onTabUp called', {
        key: event.key,
        target: event.target,
        currentTarget: event.currentTarget,
        timestamp: Date.now()
    });
    if (event.key === 'Tab') {
        event.preventDefault();
        event.stopPropagation();
        if (document.activeElement === document.getElementById("input")) {
            document.getElementById("input")?.blur()
            animateSearchBar(false)
        } else {
            document.getElementById("input")?.focus()
            animateSearchBar(true)
        }
        console.log("pront")
    }
}
function onSearchBarFocus() {
    document.getElementById("input")?.focus()
    animateSearchBar(true)
}
function onSearchBarBlur() {
    document.getElementById("input")?.blur()
    animateSearchBar(false)
}

export { onSearchBarTabDown, onSearchBarTabUp, onSearchBarFocus, onSearchBarBlur }