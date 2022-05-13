export const initialState = {
  isWalletConnected: false,
  account: "",
  provider: null,
  signer: null,
  displayNetworks: false,
  balance: 0,
  avaxMarketPrice: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WALLET_CONNECTED":
      return {
        ...state,
        isWalletConnected: action?.payload?.isWalletConnected,
        account: action?.payload?.account,
        provider: action?.payload?.provider,
        signer: action?.payload?.signer,
        balance: action?.payload?.balance,
        avaxMarketPrice: action?.payload?.avaxMarketPrice,
      };

    case "DISCONNECT_WALLET":
      return {
        ...state,
        ...initialState,
      };

    case "TOGGLE_NETWORKS":
      return {
        ...state,
        displayNetworks: !state.displayNetworks,
      };

    default:
      return state;
  }
};
