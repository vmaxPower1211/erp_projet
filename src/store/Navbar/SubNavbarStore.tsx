import { useStore } from ".."
import { stateTitleNavbar } from "../../lib/localStorage";

export const useSubNavbarStore = () => {
    const [{titleStore}, setState] = useStore();

    const changeSubTitleNavbar = (title: string) => {
        console.log('ini perbahan subtitle ', title);
        setState("titleStore", { title_subnavbar: title });
    }

    return [
        titleStore,
        {
            changeSubTitleNavbar
        }
   ]
}