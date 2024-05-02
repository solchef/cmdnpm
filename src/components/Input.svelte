<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { history } from "../stores/history";
  import { theme } from "../stores/theme";
  import { commands } from "../utils/commands";
  import { track } from "../utils/tracking";

  let command = "";
  let historyIndex = -1;

  let input: HTMLInputElement;

  function typeCommandOnClick(navigation: any) {
    input.focus();
    document.getElementById("command-input")?.onkeydown?.bind(navigation);

    const command = commands[navigation] as () => string;

    if (command) {
      const output = command();

      $history = [...$history, { command: navigation, outputs: [output] }];
    }

    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: true,
    });

    // Dispatch the event
    dispatchEvent(event);
  }

  onMount(() => {
    // input.focus();
    history.set([]);

    if ($history.length === 0) {
      const command = commands["home"] as () => string;

      if (command) {
        const output = command();

        $history = [...$history, { command: "home", outputs: [output] }];
      }
    }
  });

  afterUpdate(() => {
    input.scrollIntoView({ behavior: "smooth", block: "end" });
  });

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const [commandName, ...args] = command.split(" ");

      if (import.meta.env.VITE_TRACKING_ENABLED === "true") {
        track(commandName, ...args);
      }

      const commandFunction = commands[commandName];

      if (commandFunction) {
        const output = await commandFunction(args);

        if (commandName !== "clear") {
          $history = [...$history, { command, outputs: [output] }];
        }
      } else {
        const output = `${commandName}: command not found`;

        $history = [...$history, { command, outputs: [output] }];
      }

      command = "";
    } else if (event.key === "ArrowUp") {
      if (historyIndex < $history.length - 1) {
        historyIndex++;

        command = $history[$history.length - 1 - historyIndex].command;
      }

      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      if (historyIndex > -1) {
        historyIndex--;
        command =
          historyIndex >= 0
            ? $history[$history.length - 1 - historyIndex].command
            : "";
      }
      event.preventDefault();
    } else if (event.key === "Tab") {
      event.preventDefault();

      const autoCompleteCommand = Object.keys(commands).find((cmd) =>
        cmd.startsWith(command)
      );

      if (autoCompleteCommand) {
        command = autoCompleteCommand;
      }
    } else if (event.ctrlKey && event.key === "l") {
      event.preventDefault();

      $history = [];
    }
  };
</script>

<svelte:window
  on:click={() => {
    input.focus();
  }}
/>

<div class="flex w-full">
  <p class="visible md:hidden">❯</p>

  <input
    id="command-input"
    name="command-input"
    autocomplete="off"
    aria-label="Command input"
    class="w-full px-2 bg-transparent outline-none"
    type="text"
    style={`color: ${$theme.foreground}`}
    bind:value={command}
    on:keydown={handleKeyDown}
    bind:this={input}
  />
</div>

<div><div><button on:click={() => typeMemeOnClick("home")} class="buy-btn">Buy $BROS</button></div></div>


