export const initialState = {
  userPublicAddress: "",
};

const Reducer = async (state, action) => {
  switch (action.type) {
    case "CONNECT_WALLET":
      let tempUserPublicAddress = await ethereum.request({
        method: "eth_requestAccounts",
      });

      /**
       * @dev check if metamask is installed or not
       */
      if (typeof window.ethereum !== "undefined") {
        const { ethereum } = window;

        ethereum.autoRefreshOnNetworkChange = true;
        /**
         * @dev check if avalache c chain already exists
         * in the metamask network list else create one
         */
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xA86A" }],
          });
        } catch (switchError) {
          /**
           * @dev This error code 4902 indicates that the chain
           * has not been added to MetaMask.
           * */
          if (switchError.code === 4902)
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0xA86A",
                    nativeCurrency: {
                      name: "Avalanche",
                      symbol: "AVAX",
                      decimals: 18,
                    },
                    chainName: "Avalanche Mainnet C-Chain",
                    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                    blockExplorerUrls: ["https://snowtrace.io/"],
                  },
                ],
              });
            } catch (error) {
              window.alert("Error while adding Avalanche C-Chain to MetaMask!");
            }
        }

      } else throw new Error({ msg: "Metamask not found!" });

      return {
        userPublicAddress: tempUserPublicAddress[0],
      };

    case "DISCONNECT_WALLET":
      return {
        ...state,
        userPublicAddress: "123",
      };

    default:
      return state;
  }
};

export default Reducer;
