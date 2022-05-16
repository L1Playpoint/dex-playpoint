export const initialState = {
  isWalletConnected: false,
  account: "",
  provider: null,
  signer: null,
  balance: 0,
  avaxMarketPrice: 0,
  contract: null
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
      };

    case "DISCONNECT_WALLET":
      return {
        ...state,
        ...initialState,
      };

      case "SET_MARKET_PRICE":
        return {
          ...state,
          avaxMarketPrice: action?.payload?.avaxMarketPrice,
        };

    case "SWAP_AMOUNT":


    default:
      return state;
  }
};
