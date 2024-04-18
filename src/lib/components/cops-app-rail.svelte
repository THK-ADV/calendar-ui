<script lang="ts">
  import AppRail from '$lib/components/app-rail.svelte'

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

  const railItems: CopsAppRailItem[] = [
    {
      type: 'LINK',
      text: 'Modules',
      image: '/assets/icons/modules.svg',
      url: 'http://lwivs49.gm.fh-koeln.de:8081/',
      disabled: false,
      active: false
    },
    {
      type: 'LINK',
      text: 'Schedule',
      image: '/assets/icons/schedule.svg',
      url: '',
      disabled: false,
      active: true
    },
    { type: 'LINK', text: 'Rooms', image: '/assets/icons/rooms.svg', url: '', disabled: true },
    { type: 'LINK', text: 'Exams', image: '/assets/icons/exams.svg', url: '', disabled: true },
    { type: 'DIVIDER' },
    { type: 'SPACER' },
    { type: 'LINK', text: 'Feedback', icon: 'feedback', url: '#', disabled: true },
    {
      type: 'LINK',
      text: 'Impressum',
      icon: 'info',
      url: 'https://www.th-koeln.de/hochschule/impressum_8159.php',
      disabled: false
    }
  ];
</script>

<AppRail {railItems}></AppRail>
