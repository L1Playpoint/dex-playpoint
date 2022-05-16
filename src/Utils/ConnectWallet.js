import { ethers } from "ethers";

export const ConnectWallet = async (dispatch) => {
  /**
   * @dev Avalanche Network
   */
  if (typeof window.ethereum !== "undefined") {
    const { ethereum } = window;

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        // params: [{ chainId: "0xA86A" }], mainnet
        params: [{ chainId: "0xA869" }],
      });

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      if (provider !== null) {
        const balance = await provider.getBalance(accounts[0]);

            dispatch({
              type: "SET_WALLET_CONNECTED",
              payload: {
                isWalletConnected: true,
                account: accounts[0],
                provider,
                signer,
                balance: parseInt(balance._hex, 16) / 10 ** 18,
              },
            });
      }
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
              // {
              //   chainId: "0xA86A",
              //   nativeCurrency: {
              //     name: "Avalanche",
              //     symbol: "AVAX",
              //     decimals: 18,
              //   },
              //   chainName: "Avalanche Mainnet C-Chain",
              //   rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
              //   blockExplorerUrls: ["https://snowtrace.io/"],
              // },
              {
                chainId: "0xA869",
                chainName: "Avalanche Testnet C-Chain",
                nativeCurrency: {
                  name: "Avalanche",
                  symbol: "AVAX",
                  decimals: 18,
                },
                rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
                blockExplorerUrls: ["https://testnet.snowtrace.io/"],
              },
            ],
          });

          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          if (provider !== null) {
            const balance = await provider.getBalance(accounts[0]);

            dispatch({
              type: "SET_WALLET_CONNECTED",
              payload: {
                isWalletConnected: true,
                account: accounts[0],
                provider,
                signer,
                balance: parseInt(balance._hex, 16) / 10 ** 18,
              },
            });
          }
        } catch (error) {
          throw new Error({
            error,
            msg: "Error while adding Avalanche C-Chain to MetaMask!",
          });
        }
    }
  } else window.alert({ msg: "Metamask not found!" });
};
