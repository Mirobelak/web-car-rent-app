import React from 'react';
import useWeb3Modal from '../lib/useWeb3Modal';
import { useRouter } from 'next/router';


const Navbar: React.FC = () => {
  const menuItems = [
    { id: 'free-cars', label: 'Free Cars' },
    { id: 'rent-earn', label: 'Rent and Earn' },
    { id: 'faq', label: 'FAQ' },
  ];

  const { web3, connectWallet, account, disconnectWallet } = useWeb3Modal();

  const router = useRouter();
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #ccc',
      }}
    >
      {/* Logo */}
      <div>
        <img src='/images/logo.png' className='w-20 h-20 cursor-pointer' onClick={()=> router.push("/") } />
      </div>

      {/* Menu items */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              textDecoration: 'none',
              color: '#333',
              margin: '0 1rem',
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Web3 wallet button */}
      {!account ? (
        <button
        style={{
          background: '#1b75bc',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '3px',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
      ) : (
        <button
        style={{
          background: '#1b75bc',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '3px',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={disconnectWallet}
      >
        {`${account}`.substring(0, 6)}...{`${account}`.substring(38, 42)}
      </button>
      )}
    </header>
  );
};

export default Navbar;
