function onTabDown(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
}

function onTabUp(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (document.activeElement === document.getElementById("input")) {
        document.getElementById("input")?.blur()
    } else {
        document.getElementById("input")?.focus()
    }
    console.log("pront")
}

export { onTabDown, onTabUp }