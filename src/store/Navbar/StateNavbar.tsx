import { TITLE_NAVBAR } from '../../config/app';

export interface NavbarStoreState {
    title_navbar : string;
    changeTitleNavbar : (title: string) => void;
}

export const NavbarInitiateState = (): NavbarStoreState => ({
    // TITLE_NAVBAR bisa diganti dengan "", tidak harus import darp config app
    title_navbar : TITLE_NAVBAR,
    changeTitleNavbar: (title: string) => {},
})
