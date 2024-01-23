// Global imports
import React, {
    createContext,
    useReducer,
    useCallback,
    useEffect,
    useState,
    Dispatch,
} from "react";
import { useNavigate } from "react-router-dom";

// Project dependencies
import { trelloReducer, TrelloState, defaultTrelloState } from "../reducers/TrelloReducer";

// trello actionEnums
import { TrelloActionEnum } from "../action/TrelloActions";

// auth state interface
import { AuthState } from '../../auth/reducers/AuthReducer';

// useApi middleware
import useApi from '../../auth/hooks/api/useApi';

type TrelloProviderProps = {
    children: React.ReactElement;
};

export type TrelloData = {
    type: TrelloActionEnum,
    payload: any
};

export interface TrelloContext {
    isLoading: boolean,
    trelloState: TrelloState;
    currentBoardIndex: number,
    updateState: (props: TrelloData) => void;
    pullState: () => void;
    setCurrentBoardIndex: (props: number) => void;
};

// Trello context
const trelloCtx = createContext<TrelloContext>({
    isLoading: false,
    trelloState: defaultTrelloState,
    currentBoardIndex: 0,
    updateState: () => { },
    pullState: () => { },
    setCurrentBoardIndex: () => { },
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

    // main object reducer
    const [trelloState, trelloDispatch] = useReducer(trelloReducer, defaultTrelloState);

    // request api connection
    const { request, setError } = useApi();

    // useNavigate
    const navigate = useNavigate();


    const pullState = useCallback(() => {
        try {
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
                const boards = requestData?.boards;
                const colors = requestData?.colors;
                trelloDispatch({
                    type: TrelloActionEnum.PULL,
                    payload: {
                        boards,
                        colors
                    }
                })
                setIsLoading(false);
            });
        } catch (error: any) {
            setError(error.message || error);
            setIsLoading(false);
            //navigate('user/login');
        }
    }, [navigate]);

    // Check for first pull of data to get the trello's info at first rendering
    useEffect(() => {
        if (initialChange) {
            setInitialChange(false);
            pullState();
        }
    }, []);

    const updateState = (props: TrelloData) => {
        trelloDispatch(props);
        setTimeout(() => {
            pushState();
        }, 0);
    }

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
            request(endpoint, params, (result) => setIsLoading(false));

        } catch (error: any) {
            setError(error.message || error);
            setIsLoading(false);
            //navigate('user/login');
        }
    }, [trelloState]);

    // context values to be passed down to children
    const ctx = {
        isLoading,
        trelloState,
        currentBoardIndex,
        updateState,
        pullState,
        setCurrentBoardIndex,
    };

    return <trelloCtx.Provider value={ctx}>{children}</trelloCtx.Provider>;
};

export default trelloCtx;