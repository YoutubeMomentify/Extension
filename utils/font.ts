export function setFont(){
    const fontLink: HTMLLinkElement = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
}