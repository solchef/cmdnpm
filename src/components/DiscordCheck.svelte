<script>
    // @ts-nocheck
    import { ethers } from 'ethers' 
    import Web3Modal from './Web3Modal.svelte'
	import MonoChain from './MonoChain.svelte';

let name
let example = MonoChain

$: metamaskConnected = window.ethereum ? window.ethereum.isConnected() : false;
  
    let isWalletConnected = false;
    // @ts-ignore
    let connectedAddress = null;
    // @ts-ignore
    let tokenBalance = null;
  
    async function connectWallet() {
      // @ts-ignore
      if (typeof window.ethereum !== 'undefined') {
        try {
          // @ts-ignore
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          const account = accounts[0];
          const balance = await provider.getBalance(account);
          const formattedBalance = ethers.utils.formatEther(balance);
          
          connectedAddress = account;
          tokenBalance = formattedBalance; // Adjust this to fetch the actual token balance
          
          isWalletConnected = true;
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        alert('Please install MetaMask to connect your wallet.');
      }
    }
  
    // @ts-ignore
    function goToDiscord(channel) {
      // Logic to redirect user to the respective Discord channel based on the card clicked
      console.log(`Redirecting to ${channel} Discord channel...`);
    }
  </script>
  
  <div class="container mx-auto p-8">
    <h1 class="text-2xl mb-4">Discord  Access Pass</h1>

    <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li class:is-active={/MonoChain/.test(example.toString())}>
          <a href="#cmd" on:click={() => {example = MonoChain}}>
            <span class="icon is-small"><i class="fas fa-image"></i></span>
            <span>MonoChain</span>
          </a>
        </li>
        <li class:is-active={/Web3Modal/.test(example.toString())}>
          <a href="#cmd" on:click={() => {example = Web3Modal}} >
            <span class="icon is-small"><i class="fas fa-music"></i></span>
            <span>Web3Modal</span>
          </a>
        </li>
        <!-- <li on:click={() => {example = MultiChain}}  class:is-active={/MultiChain/.test(example.toString())}>
          <a>
            <span class="icon is-small"><i class="fas fa-music"></i></span>
            <span>MultiChains</span>
          </a>
        </li> -->
      </ul>
  
    {#if !isWalletConnected}
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={connectWallet}>Connect to Wallet</button>
    {:else}
      <p class="mb-2">Connected Wallet Address: {connectedAddress}</p>
      <p class="mb-4">Your Token Balance: {tokenBalance} $BROS</p>
    {/if}
  
    <h2 class="text-2xl mb-4 mt-4">Select the channel to access</h2>
  
    <div class="flex flex-row space-x-4">
      <button class="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer transition duration-300 hover:bg-gray-100" on:click={() => goToDiscord('Public BROS')} aria-label="Go to Public BROS Discord">
        <h3 class="text-xl mb-2">Public BROS</h3>
        <p>For all holders of 100K $BROS and more.</p>
      </button>
  
      <button class="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer transition duration-300 hover:bg-gray-100" on:click={() => goToDiscord('VIP BROS Channel')} aria-label="Go to VIP BROS Channel Discord">
        <h3 class="text-xl mb-2">VIP BROS Channel</h3>
        <p>Exclusive for 100K $BROS HOLDERS.</p>
      </button>
  
      <button class="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer transition duration-300 hover:bg-gray-100" on:click={() => goToDiscord('BIG BROS Channel')} aria-label="Go to BIG BROS Channel Discord">
        <h3 class="text-xl mb-2">BIG BROS Channel</h3>
        <p>Exclusive for 1 MILLION $BROS HOLDERS.</p>
      </button>
    </div>
  </div>
  