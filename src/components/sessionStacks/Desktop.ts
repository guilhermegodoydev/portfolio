import styles from "./styleDesktop.module.css";
import { stacks } from "./stacks";

export function Desktop(): Node {
    const fragment = document.createDocumentFragment();
    const div1 = document.createElement("div");
    div1.classList.add(styles.empty1);

    const div2 = document.createElement("div");
    div2.classList.add(styles.empty2);

    stacks.map(stack => {
        const div = document.createElement("div");
        div.classList.add(styles.cardStack);
        div.classList.add(styles[stack.style]);

        const h2 = document.createElement("h2");
        h2.classList.add("title");
        h2.textContent = stack.name;

        const hr = document.createElement("hr");

        const p = document.createElement("p");
        p.textContent = stack.description;

        div.appendChild(h2);
        div.appendChild(hr);
        div.appendChild(p);

        fragment.appendChild(div);
    });

    fragment.appendChild(div1);
    fragment.appendChild(div2);

    return fragment;
}