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

    // I18n const
    const { t } = useTranslation(['home']);


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
                const boards = requestData?.boards || initialBoards;
                const colors = requestData?.colors || initialColors;
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
            request(endpoint, params, (result) => {
                setIsLoading(false);
                toast.success(t("data_updated"), {duration: 1500});
            });

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
