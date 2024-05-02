<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Ps1 from './components/Ps1.svelte';
  import Input from './components/Input.svelte';
  import History from './components/History.svelte';
  import { theme } from './stores/theme';
	import DiscordCheck from "./components/DiscordCheck.svelte";
	import { commands } from "./utils/commands";

  function emelateTerminal() {
  const inputElement = document.getElementById('command-input');

  if (!inputElement) {
    alert('No input element found.');
    return;
  }

  const command = commands['faq'] as () => string;


}


</script>

<svelte:head>
  {#if import.meta.env.VITE_TRACKING_ENABLED === 'true'}
    <script
      async
      defer
      data-website-id={import.meta.env.VITE_TRACKING_SITE_ID}
      src={import.meta.env.VITE_TRACKING_URL}
    ></script>
  {/if}
</svelte:head>
<iframe src="/music.mp3" title="music" allow="autoplay" style="display:none" id="iframeAudio">
</iframe> 
<div class="overlay"></div>

<div class="scanline"></div>

  
<main class="h-full border-2 rounded-md p-1 overflow-auto text-xs sm:text-sm md:text-base" style={`background-color: ${$theme.background}; color: ${$theme.foreground}; border-color: ${$theme.green};`}>

  <div class="wrapper">

  
  <div class="content">
    <Router>
   
    <header class="site clearfix">
      <div class="col one">
        <img src="/logo.svg" alt="591 Systems" width="740" height="729" id="logo-v" />
      </div>
      <div class="col two">
        <h4>BroScams ERC-20 $BROS v 1.0.3 x64</h4>
       
        <p>(c)2024 Degenius1 Systems (tm)</p>
        <div class="broscams_hero ">
          <img src="/logo-text.svg" alt="591 Systems"id="logo-6" />
        </div>
      </div>
    </header>
   
    <Route path='/'>
      <History />
      <div class="flex  flex-col md:flex-row ">
        <Ps1 />
        <Input />
      </div>
    </Route>
     
      <div class="flex flex-col md:flex-row">
      <Route path="/verify" component={DiscordCheck} />
      </div>
    </Router>
    </div> 
  </div>
</main>
