import { stacks } from "./stacks";

const h2 = document.createElement("h2");
h2.classList.add("section-title");
h2.setAttribute("id", "stack-name");

const p = document.createElement("p");
p.setAttribute("id", "stack-description");

let checkedStack: HTMLButtonElement | null = null;

export function Mobile(): Node {
    const fragment = document.createDocumentFragment();

    const hr = document.createElement("hr");
    const ul = document.createElement("ul");
    ul.classList.add("projects-list");

    const div = document.createElement("div");
    div.classList.add("description-box");

    div.appendChild(p);
    
    stacks.forEach((stack, index) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.setAttribute("id", stack.name);
        button.textContent = stack.name;

        if (index === 0) {
            button.classList.add("selected-project");
            checkedStack = button;
            
            h2.textContent = stack.name;
            p.textContent = stack.description;
        }

        button.addEventListener('click', updateStack);

        li.appendChild(button);
        ul.appendChild(li);
    });

    checkedStack = ul.firstElementChild!.querySelector("button");

    fragment.appendChild(h2);
    fragment.appendChild(hr);
    fragment.appendChild(ul);
    fragment.appendChild(div);
    
    return fragment;
}

function updateStack(e: Event) {
    const btn = e.currentTarget as HTMLButtonElement;

    if (checkedStack) {
        checkedStack.classList.remove("selected-project");
    }

    checkedStack = btn;
    checkedStack.classList.add("selected-project");

    const stackData = stacks.find(s => s.name === btn.getAttribute("id"));
    if (stackData) {
        h2.textContent = stackData.name;
        p.textContent = stackData.description;
    }
}
