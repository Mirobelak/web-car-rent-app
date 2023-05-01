import { useState, useCallback } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: 'e11ccc8f69c94150a86e1cad4eabde78', // Replace with your Infura project ID
    },
  },
};

export default function useWeb3Modal() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);
      setAccount((await web3Instance.eth.getAccounts())[0]);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    try {
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
            providerOptions,
            });
        await web3Modal.clearCachedProvider();
        setWeb3(null);
        setAccount(null);
    } catch (error) {
        console.error('Failed to disconnect wallet:', error);
    }
    }, []);



  return { web3, connectWallet, account, disconnectWallet };
}
