import { ethers } from "ethers";

export const ConnectWallet = async (dispatch) => {
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

      fetch("https://api.coingecko.com/api/v3/coins/avalanche-2", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (provider !== null) {
            const balance = await provider.getBalance(accounts[0]);

            dispatch({
              type: "SET_WALLET_CONNECTED",
              payload: {
                isWalletConnected: true,
                account: accounts[0],
                provider,
                signer,
                avaxMarketPrice: data.market_data.current_price.usd,
                balance: parseInt(balance._hex, 16) / 10 ** 18,
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
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

          fetch("https://api.coingecko.com/api/v3/coins/avalanche-2", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(async (data) => {
              if (provider !== null) {
                const balance = await provider.getBalance(accounts[0]);

                dispatch({
                  type: "SET_WALLET_CONNECTED",
                  payload: {
                    isWalletConnected: true,
                    account: accounts[0],
                    provider,
                    signer,
                    avaxMarketPrice: data.market_data.current_price.usd,
                    balance: parseInt(balance._hex, 16) / 10 ** 18,
                  },
                });
              }
            })
            .catch((err) => {
              console.log(err);
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
