<script lang="ts">
	import { Icon } from '@smui/common';

	type CopsAppRailLink = {
		type: 'LINK';
		text: string;
		icon?: string;
		image?: string;
		url: string;
		disabled: boolean;
		active?: boolean;
	};

	type CopsAppRailDivider = {
		type: 'DIVIDER';
	};

	type CopsAppRailSpacer = {
		type: 'SPACER';
	};

	type CopsAppRailItem = CopsAppRailLink | CopsAppRailDivider | CopsAppRailSpacer;

	export let railItems: CopsAppRailItem[] = [];

	let themeIcon = 'dark_mode';

	const toggleTheme = () => {
		const root = document.querySelector('body');
		const currentTheme = root?.getAttribute('data-theme');
		if (currentTheme === null || currentTheme === undefined || currentTheme === 'dark') {
			root?.setAttribute('data-theme', 'light');
			themeIcon = 'light_mode';
		}

		if (currentTheme === 'light') {
			root?.setAttribute('data-theme', 'dark');
			themeIcon = 'dark_mode';
		}
	};
</script>

<div class="app-rail">
	<ul>
		{#each railItems as railItem}
			{#if railItem.type === 'DIVIDER'}<hr />{/if}
			{#if railItem.type === 'SPACER'}<div class="spacer"></div>{/if}
			{#if railItem.type === 'LINK'}
				<li class:disabled={railItem.disabled} class:active={railItem.active}>
					<a href={railItem.url}>
						{#if railItem.icon}<Icon class="material-icons">{railItem.icon}</Icon>{/if}
						{#if railItem.image}
							<object class="cops-icons" data={railItem.image} title={'icon of' + railItem.text}>
							</object>
						{/if}
						<span>{railItem.text}</span>
					</a>
				</li>
			{/if}
		{/each}
		<li>
			<div class="action" on:click={toggleTheme}>
				<Icon class="material-icons">{themeIcon}</Icon>
				<span>Theme</span>
			</div>
		</li>
	</ul>
</div>

<style>
	.cops-icons {
		fill: var(--on-surface);
		width: 1.618em;
	}

	.app-rail {
		min-width: 7.5em;
		font-size: 0.9em;
		padding: 0.5em;
		background-color: var(--surface-1);
		color: var(--color-on-surface);
		height: 100%;
		& ul {
			display: flex;
			gap: 1em;
			flex-direction: column;
			width: 100%;
			height: 100%;
			list-style-type: none;
			padding: 0;
			& hr {
				margin: 0;
				border-width: 1px;
				background-color: rgba(0, 0, 0, 0.1);
				color: rgba(0, 0, 0, 0.1);
			}
			& div.spacer {
				height: 100%;
			}
		}
		& li {
			transition: all 0.1s ease-in-out;
			&.disabled {
				opacity: .8;
				pointer-events: none;
				background-color: transparent;
			}

			&.active {
				background-color: var(--surface-0);
				border-radius: 10px;
			}

			&:hover {
				background-color: var(--surface-0);
				border-radius: 5px;
			}

			& a,
			.action {
				color: inherit;
				user-select: none;
				display: flex;
				flex-direction: column;
				text-decoration: none;
				list-style-type: none;
				height: 6em;
				align-items: center;
				justify-content: center;
				gap: 0.6em;
			}

			& span {
				margin-bottom: -7px;
			}
			& img {
				width: 2.2em;
				margin-bottom: 0.5em;
			}
		}
	}

/* todo: fill-color for svgs a bit darker*/ 
</style>
