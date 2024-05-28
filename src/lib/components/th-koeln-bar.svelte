<div class="th-koeln-bar">
	<div class="red"></div>
	<div class="orange"></div>
	<div class="purple"></div>
</div>

<style>
	.th-koeln-bar {
		display: flex;
		flex-direction: row;
		height: 4px;
		& div {
			flex-grow: 1;
			&.red {
				background-color: #c81e0f;
			}
			&.orange {
				background-color: #ea5b0d;
			}
			&.purple {
				background-color: #b43092;
			}
		}
	}
</style>
