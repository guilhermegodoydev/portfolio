export function renderComponent(selector: string, renderFn: (el?: HTMLElement) => Node) {
    const containers = document.querySelectorAll(selector);
    containers.forEach(container => {
        container.innerHTML = ''; 
        container.appendChild(renderFn(container as HTMLElement));
    });
}