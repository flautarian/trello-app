// Global imports
import React, {
    createContext,
    useReducer,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";

// Project dependencies
import { trelloReducer, TrelloState, defaultTrelloState } from "../../reducers/TrelloReducer";

// trello actionEnums
import { TrelloActionEnum } from "../../action/TrelloActions";

// auth state interface
import { AuthState } from '../../../auth/reducers/AuthReducer';

// useApi middleware
import useApi from '../../../auth/hooks/api/useApi';
import useSocket from '../../../auth/hooks/websocket/useSocket';
import { initialBoards, initialColors } from "../../utils";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type TrelloProviderProps = {
    children: React.ReactElement;
};

export type TrelloData = {
    type: TrelloActionEnum,
    payload: any
};

export interface TrelloContext {
    isLoading: boolean,
    isSocketConected: boolean,
    trelloState: TrelloState;
    currentBoardIndex: number,
    currentCardIndex: string,
    updateState: (props: TrelloData) => void;
    pullState: () => void;
    setCurrentBoardIndex: (props: number) => void;
    setCurrentCardIndex: (props: string) => void;
    roomClientNumber: number;
    logOutDispatch: () => void;
};

// Trello context
const trelloCtx = createContext<TrelloContext>({
    isLoading: false,
    isSocketConected: false,
    trelloState: defaultTrelloState,
    currentBoardIndex: 0,
    currentCardIndex: "",
    updateState: () => { },
    pullState: () => { },
    setCurrentBoardIndex: () => { },
    setCurrentCardIndex: () => { },
    roomClientNumber: 0,
    logOutDispatch: () => { },
});

export const TrelloContextProvider = (props: TrelloProviderProps) => {

    // inner tag children
    const { children } = props;

    // is loading state
    const [isLoading, setIsLoading] = useState(false);

    // current board indicator state
    const [currentBoardIndex, setCurrentBoardIndex] = useState(0);

    // current board indicator state
    const [currentCardIndex, setCurrentCardIndex] = useState("");

    // initial load security indicator
    const [initialChange, setInitialChange] = useState(true);

    const defaultTrelloData: TrelloData = {
        type: TrelloActionEnum.PULL,
        payload: ""
    }

    // Security save board boolean
    const [propsToSave, setPropsToSave] = useState(defaultTrelloData);

    // main object reducer
    const [trelloState, trelloDispatch] = useReducer(trelloReducer, defaultTrelloState);

    // request api connection
    const { request, setError, globalLogOutDispatch } = useApi();

    // socketIO api connection
    const { isSocketConected, initiateSocket, disconnectSocket, sendMessage, roomRef, roomClientNumber, room } = useSocket();

    // useNavigate
    const navigate = useNavigate();

    // I18n const
    const { t } = useTranslation(['home']);

    type CallbackFunction = () => void;

    const logOutDispatch = useCallback(() => {
        // disconnect socket before logout
        console.log("logging out");
        if (isSocketConected)
            disconnectSocket();
        // logout
        globalLogOutDispatch();
    }, [isSocketConected, request, roomRef]);


    const pullState = useCallback(async () => {
        try {
            setIsLoading(true);
            const user = localStorage.getItem("user");
            const userData: AuthState = JSON.parse(user || '');
            const params = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${userData.authToken}`,
                }
            };
            const endpoint = '/pull';
            await request(endpoint, params, (result) => {
                const requestData = result.data;
                const boards = requestData?.boards || initialBoards;
                const colors = requestData?.colors || initialColors;
                trelloDispatch({
                    type: TrelloActionEnum.PULL,
                    payload: {
                        boards,
                        colors
                    }
                })
            });
        } catch (error: any) {
            setError(error?.message || error);
            if ((error?.message || error) === "Unauthorized")
                logOutDispatch();
            toast.error(error.message, { duration: 2000 });
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    // Check for first pull of data to get the trello's info at first rendering
    useEffect(() => {
        if (initialChange) {
            setInitialChange(false);
            pullState();
        }
    }, [navigate, trelloState]);

    // Check for first pull of data to get the trello's info at first rendering
    useEffect(() => {
        let roomName = localStorage.getItem("user") || null;
        if (!isSocketConected) {
            if (!!roomName && roomName.length > 0)
                initiateSocket(JSON.parse(roomName), updateFromSocket);
        }
        return () => {
            if (isSocketConected) {
                if (!!roomRef.current && roomRef.current.length > 0)
                    disconnectSocket();
            }
        }
    }, [navigate]);

    if (typeof window !== "undefined") {
        window.addEventListener('beforeunload', () => {
            disconnectSocket(roomRef.current);
            window.removeEventListener('beforeunload', () => disconnectSocket(roomRef.current));
        });
    }

    useEffect(() => {
        roomRef.current = room;
    }, [room]);

    const updateFromSocket = useCallback((msg: any) => {
        try {
            // get and parse message to change locally
            if (typeof msg == 'object')
                return;

            let jsonProps = JSON.parse(msg);
            if (!!jsonProps["result"])
                return;

            let props: TrelloData = {
                payload: jsonProps["payload"],
                type: jsonProps["type"] || 'EDIT_BOARD' as keyof typeof TrelloActionEnum
            };
            if (!props.payload || !props.type)
                throw new Error("data bad format");

            // dispatch change locally
            trelloDispatch(props);
            toast.success(t("data_updated"), { duration: 1500 });
        }
        catch (e) {
            console.log(e);
        }
    }, [isSocketConected, trelloDispatch]);

    const updateState = (props: TrelloData) => {
        // reduce new state
        trelloDispatch(props);
        // signal to upload new state
        setPropsToSave(props);
    }

    useEffect(() => {
        if (JSON.stringify(propsToSave) !== JSON.stringify(defaultTrelloData)) {
            // upload new state
            pushState(myCallbackFunction);
            // restart signal
            setPropsToSave(defaultTrelloData);
        }
    }, [trelloState, propsToSave]);

    const myCallbackFunction: CallbackFunction = useCallback(() => {
        // after successful upload of new state we send socketIO msg to other instances of trello in this account
        if (isSocketConected)
            sendMessage(JSON.stringify(propsToSave));
      }, [trelloState, propsToSave]);


    const pushState = useCallback(async (callback?: CallbackFunction) => {
        try {
            // block pushing in use
            if (isLoading)
                return;
            // block loading
            setIsLoading(true);
            const user = localStorage.getItem("user");
            const userData: AuthState = JSON.parse(user || '');

            // fetch update to server
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${userData.authToken}`,
                },
                body: JSON.stringify({
                    data: { boards: trelloState.boards, colors: trelloState.colors },
                    appcode: "trelloapp"
                }),
            };

            // request send
            const endpoint = '/push';
            await request(endpoint, params, (result) => {
                // if a callback is given, we execute it
                if(callback)
                    callback();
                // sooner toast
                toast.success(t("data_updated"), { duration: 1500 });
            });

        } catch (error: any) {
            setError(error.message || error);
            // if an error occurs, we undo changes
            trelloDispatch({ type: TrelloActionEnum.UNDO, payload: trelloState.prev });
            if (error?.message === "Unauthorized")
                logOutDispatch();
            toast.error(error.message || error.error || error, { duration: 2000 });
        }
        finally {
            setIsLoading(false);
        }
    }, [trelloState, roomRef]);

    // context values to be passed down to children
    const ctx = {
        isLoading,
        isSocketConected,
        trelloState,
        currentBoardIndex,
        currentCardIndex,
        updateState,
        pullState,
        setCurrentBoardIndex,
        setCurrentCardIndex,
        roomClientNumber,
        logOutDispatch,
    };

    return <trelloCtx.Provider value={ctx}>
        {}
        {children}
    </trelloCtx.Provider>;
};

export default trelloCtx;

