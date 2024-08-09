import { Component, JSX, JSXElement, createContext, createSignal, useContext } from "solid-js";


type SessionData = {
    username: string;
}

type SessionContextType = [SessionData | null, (data: SessionData | null) => void];

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const useSession = () => {
    const context = useContext(SessionContext);
    if(context == undefined){
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}

interface SessionProvicerProps {
    children: JSX.Element;
}

const SessionProvider: Component<SessionProvicerProps> = (props) => {
    const [session, setSession] = createSignal<SessionData | null>(null);

    return (
        <SessionContext.Provider value = {[session(), setSession]}>
            {props.children}
        </SessionContext.Provider>
    )
}

export {
    useSession,
    SessionProvider
}