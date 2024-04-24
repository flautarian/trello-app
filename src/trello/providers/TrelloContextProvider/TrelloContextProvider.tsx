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
import { loadingSpinnerStyle } from "../../../utils/components/globalUtils/globalutils";

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
    updateState: (props: TrelloData) => void;
    pullState: () => void;
    setCurrentBoardIndex: (props: number) => void;
    roomClientNumber: number;
    logOutDispatch: () => void;
};

// Trello context
const trelloCtx = createContext<TrelloContext>({
    isLoading: false,
    isSocketConected: false,
    trelloState: defaultTrelloState,
    currentBoardIndex: 0,
    updateState: () => { },
    pullState: () => { },
    setCurrentBoardIndex: () => { },
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

    // initial load security indicator
    const [initialChange, setInitialChange] = useState(true);

    // Security save board boolean
    const [ableToSave, setAbleToSave] = useState(false);

    // main object reducer
    const [trelloState, trelloDispatch] = useReducer(trelloReducer, defaultTrelloState);

    // request api connection
    const { request, setError, globalLogOutDispatch } = useApi();

    // socketIO api connection
    const { isSocketConected, initiateSocket, disconnectSocket, sendMessage, room, roomClientNumber } = useSocket();

    // useNavigate
    const navigate = useNavigate();

    // I18n const
    const { t } = useTranslation(['home']);

    const logOutDispatch = useCallback(() => {
        // disconnect socket before logout
        if(isSocketConected)
            disconnectSocket();
        // logout
        globalLogOutDispatch();
    }, [isSocketConected, request]);


    const pullState = useCallback(() => {
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
            request(endpoint, params, (result) => {
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
            console.log(error?.message);
            if(error?.message === "Unauthorized")
                logOutDispatch();
            toast.error(error.message || error.error || error, { duration: 2000 });
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
        if (!!roomName) {
            initiateSocket(JSON.parse(roomName), updateFromSocket);
            // event to disconnect on page chnage of refresh
            window.addEventListener('beforeunload', disconnectSocket);
        }
        return () => {
            window.removeEventListener('beforeunload', disconnectSocket);
        }
    }, [navigate, room]);

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
    },[isSocketConected, trelloDispatch]);

    const updateState = (props: TrelloData) => {
        trelloDispatch(props);
        // send socketIO msg to other instances of trello in this account
        sendMessage(JSON.stringify(props))
        setAbleToSave(true);
    }

    useEffect(() => {
        if(ableToSave){
            // This effect will run after trelloState has been updated
            pushState(); // Now pushState will receive the updated state
            setAbleToSave(false);
        }
    }, [trelloState, ableToSave]);


    const pushState = useCallback(async () => {
        try {
            // block loading
            if (isLoading)
                return;
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

            const endpoint = '/push';
            request(endpoint, params, (result) => {
                toast.success(t("data_updated"), { duration: 1500 });
            });

        } catch (error: any) {
            setError(error.message || error);
            if(error?.message === "Unauthorized")
                logOutDispatch();
            toast.error(error.message || error.error || error, { duration: 2000 });
        }
        finally {
            setIsLoading(false);
        }
    }, [trelloState, room]);

    // context values to be passed down to children
    const ctx = {
        isLoading,
        isSocketConected,
        trelloState,
        currentBoardIndex,
        updateState,
        pullState,
        setCurrentBoardIndex,
        roomClientNumber,
        logOutDispatch,
    };

    return <trelloCtx.Provider value={ctx}>
        {
            isLoading &&
            <div style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <style>{loadingSpinnerStyle}</style>
                <span className="loader"></span>
            </div>
        }
        {children}
    </trelloCtx.Provider>;
};

export default trelloCtx;

