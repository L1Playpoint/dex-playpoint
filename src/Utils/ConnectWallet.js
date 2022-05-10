export const ConnectWallet = async (dispatch) => {

  if (typeof window.ethereum !== "undefined") {
    const { ethereum } = window;

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xA86A" }],
      });

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      dispatch({
        type: "SET_WALLET_CONNECTED",
        payload: { isWalletConnected: true, account: accounts[0] },
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

          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          dispatch({
            type: "SET_WALLET_CONNECTED",
            payload: { isWalletConnected: true, account: accounts[0] },
          });
        } catch (error) {
          throw new Error({
            error,
            msg: "Error while adding Avalanche C-Chain to MetaMask!",
          });
        }
    }
  } else throw new Error({ msg: "Metamask not found!" });
};
