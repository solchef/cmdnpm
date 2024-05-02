import packageJson from "../../package.json";
import themes from "../../themes.json";
import { history } from "../stores/history";
import { theme } from "../stores/theme";

const hostname = window.location.hostname;

export const commands: Record<
	string,
	(args: string[]) => Promise<string> | string
> = {
	help: () => `  
  * Type any of the following commands below to activate.
  
  * Basic commands: 

    home           roadmap           buy_tokens 
    utilities      smart_contract    chart
    tokenomics     whitepaper        faq       
	
  * Advanced commands:
	
    clear         whoami              hostname 
    date          weather [city]      email
    sudo		  theme ls            themes set [name]   
         
 

   Type any command above in terminal  
   `,

	home: () => `

	We are a dedicated community running through through a forum
	powered by a token. Altenen is a forum dedicated to making money
	on the Internet, various earning schemes, IT issues and much more.
	This is a forum about making money on the Internet, Also we share 
	knowledge about earning fast,malware modification,  hacking, security, 
	programming, cracking, among many other things. Also of tools related 
	to the above. 
	 

	

	Token:$BROS
	Token Supply: 10,000,000
	Smart Contract:
	0x0F5D2f0..0298f468908cC942

	
	Join our **FREE PUBLIC TELEGRAM**. for community help and support!
	
	We also have an exclusive *PAID* Discord channel where 
	community create hype, and many members are pumping their own bags.

	Discord Channels:
	
	Public BROS
	100K $BROS HOLDERS
	   
	VIP BROS Channel
	100K $BROS HOLDERS + 
	*PAID* 10,000 $BROS 1 time fee

	BIG BROS Channel
	1 MILLION $BROS HOLDERS + 
    *PAID* 50,000 $BROS 1 time fee
	
	* Type 'help' to see the list of all the options.

  `,

	utilities: () => `
	Access & Unlocking:

	Holders of $BROS tokens will gain access to locked Discord channels
	based on their token holdings.
	
	Governance:

	Token holders will have the opportunity to participate in governance proposals
	and decision-making processes within the $BROS community.

	Staking & Rewards:

	Holders can stake their $BROS tokens to earn additional rewards, participate in 
	liquidity mining, and contribute to the ecosystem's growth.
	
	Exclusive Features & Benefits:

	Holders of specific token amounts will unlock exclusive features, benefits, and 
	perks within the $BROS community and Discord channels.
	
      `,

	tokenomics: () => `
	Total Supply

	Total Supply: 100,000,000 $BROS

	Distribution

	Community Pool: 97% (97,000,000 $BROS)
	DegeniousOne: 1% (1,000,000 $BROS)
	Solchef: 1% (1,000,000 $BROS)
	ALEX: 1% (1,000,000 $BROS)
	Leftover & Miscellaneous: 2% (2,000,000 $BROS) split between the three

	Taxes and Fees Breakdown:
	
	50% Taxes: Split with DegeniousOne and Solchef
	50% VIP Fees: Split with DegeniousOne and Solchef
	50% BIG BROS Fees: Split with DegeniousOne and Solchef
	`,

	roadmap: () => `
	Phase 1

	Smart Contract Deployment
	Initial Discord Channel Setup
	Public BROS
	VIP BROS Channel
	BIG BROS Channel

	Phase 2

	Content Marketplace Launch
	Marketing and Promotion
	CoinGecko and CMC Listings

	Phase 3

	Educational Content and Courses
	Escrow Service Implementation

	Phase 4

	Decentralized Autonomous Organization (DAO) Formation
	Bros Badge NFT Creation
	Community Awards and Recognition
	`,

	faq: () => `

     What happens if I fail the token ownership check?

	If you fail the token ownership check, you may receive an error message 
	indicating that you will automatically be kicked out of the channels.

	What payment methods are accepted for exclusive discord channels access?

	Currently, only $BROS tokens are accepted. You can buy $BROS tokens on Uniswap.

	How can I join the community and participate in discussions?
	
	We have a FREE PUBLIC TELEGRAM for any questions you may have. 
	We also have an exclusive *PAID* Discord channel where members are
	actively engaged in discussions and promotions.
	
			
		
		`,

	whitepaper: (args: string[]) => {
		window.open(
			"/whitepaper.pdf",
			"_blank",
			"location=yes,height=570,width=520,scrollbars=yes,status=yes",
		);

		return `File Integrity Checksum MD5 Hash '${args[0]}' sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==" VERIFIED`;
	},

	curl: async (args: string[]) => {
		if (args.length === 0) {
			return "curl: no URL provided";
		}

		const url = args[0];

		try {
			const response = await fetch(url);
			const data = await response.text();

			return data;
		} catch (error) {
			return `curl: could not fetch URL ${url}. Details: ${error}`;
		}
	},

	date: () => new Date().toLocaleString(),
	hostname: () => hostname,
	whoami: () => "guest",
	echo: (args: string[]) => args.join(" "),
	sudo: (args: string[]) => {
		return `Connecting wallet ...... '${args[0]}'. Ensure to be a holder of $Bros Token then check back for a reward.`;
	},

	theme: (args: string[]) => {
		const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
		if (args.length === 0) {
			return usage;
		}

		switch (args[0]) {
			case "ls": {
				let result = themes.map((t) => t.name.toLowerCase()).join(", ");
				result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

				return result;
			}

			case "set": {
				if (args.length !== 2) {
					return usage;
				}

				const selectedTheme = args[1];
				const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

				if (!t) {
					return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
				}

				theme.set(t);

				return `Theme set to ${selectedTheme}`;
			}

			default: {
				return usage;
			}
		}
	},

	buy_tokens: () => {
		window.open(
			"https://app.uniswap.org",
			"_blank",
			"location=yes,height=570,width=520,scrollbars=yes,status=yes",
		);

		return "Swap Protocol Launched on new tab...";
	},

	email: () => {
		window.open(`mailto:anonymous@broscams`);

		return `Opening mailto:${packageJson.author.email}...`;
	},

	discord: () => {
		window.open(
			"https://discord.com",
			"_blank",
			"location=yes,height=570,width=520,scrollbars=yes,status=yes",
		);

		return "Discord Launch...";
	},

	chart: () => {
		window.open(
			"https://dextools.io",
			"_blank",
			"location=yes,height=570,width=520,scrollbars=yes,status=yes",
		);

		return "Discord Launch...";
	},

	clear: () => {
		history.set([]);

		return "";
	},

	kill: () => {
		return "Please close the tab to exit.";
	},
};


