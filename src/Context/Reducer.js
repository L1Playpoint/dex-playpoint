export const initialState = {
    isWalletConnected: false,
    account: ""
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_WALLET_CONNECTED':
            return {
                ...state,
                isWalletConnected: action?.payload?.isWalletConnected,
                account: action?.payload?.account
            }
        default:
            return state;
    }
}