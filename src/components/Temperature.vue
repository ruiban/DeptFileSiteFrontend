<template>
	<el-container class="temperature" >
		<el-main class="main" >
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane  label="温度录入" name="temperatureInput">
					<temperature_input  key="t1"></temperature_input>
				</el-tab-pane>
				<el-tab-pane label="口罩统计" name="maskStatistical">
					<mask_statistical  key="t2"></mask_statistical>
				</el-tab-pane>
				<el-tab-pane label="温度查看" name="temperatureQuery">
					<temperature_query  key="t3"></temperature_query>
				</el-tab-pane>
			</el-tabs>
		</el-main>
	</el-container>
</template>

<script>
	import TemperatureInput from '@/components/TemperatureInput'
	import TemperatureQuery from '@/components/TemperatureQuery'
	import MaskStatistical from '@/components/MaskStatistical'
	
	export default {
		data(){
			return {
				activeName:'temperatureInput'
				
			}
		},
		mounted: function(){

		},
		methods: {
			handleClick(tab, event){
				
			}
		},
		components: { 
			'temperature_input': TemperatureInput,
			'temperature_query': TemperatureQuery,
			'mask_statistical': MaskStatistical
		},
		
	};
</script>
<style>
	.temperature > .header {
		background-color: #ececec;
		margin-top: 10px;
		padding-left: 5px;
		display: flex;
		justify-content: flex-start;
	}

	.temperature > .main {
		display: flex;
		flex-direction: column;
		padding-left: 0px;
		background-color: #fff;
		padding-top: 0px;
		margin-top: 8px;
	}
</style>