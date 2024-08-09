import { TITLE_SUBNAVBAR } from "../../config/app";

export interface SubNavbarStoreState {
    title_subnavbar : string;
    changeSubTitleNavbar : (title: string) => void;
}

export const SubNavbarInitiateState = (): SubNavbarStoreState => ({
    // TITLE_NAVBAR bisa diganti dengan "", tidak harus import darp config app
    title_subnavbar : TITLE_SUBNAVBAR,
    changeSubTitleNavbar: (title: string) => {},
})