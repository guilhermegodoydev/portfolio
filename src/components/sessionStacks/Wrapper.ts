import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";

export function Wrapper(): Node {
    if (window.innerWidth < 768) {
        return Mobile();
    } else {
        return (Desktop());
    }
}