export const initialState = {
    isWalletConnected: false,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_WALLET_CONNECTED':
            return {
                ...state,
                isWalletConnected: action?.payload?.isWalletConnected,
            }
        default:
            return state;
    }
}