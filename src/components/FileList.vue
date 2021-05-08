<template>
	<el-container class="file_list" >
		<el-main class="main" >
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane  label="管理/技术标准/执行通知" name="manage">
					<manage-list></manage-list>
				</el-tab-pane>
				<el-tab-pane label="常用表格/模板" name="table">
					<table-list ></table-list>
				</el-tab-pane>
				<el-tab-pane label="红头文件/通报" name="redtape">
					<redtape-list ></redtape-list>
				</el-tab-pane>
				<el-tab-pane label="任务单" name="task">
					<task-list></task-list>
				</el-tab-pane>
				<el-tab-pane label="作业指导书" name="work">
					<work-list ></work-list>
				</el-tab-pane>
				<el-tab-pane label="分析报告" name="analysis">
					<analysis-list ></analysis-list>
				</el-tab-pane>
				<el-tab-pane label="培训资料" name="train">
					<train-list ></train-list>
				</el-tab-pane>
			</el-tabs>
		</el-main>
	</el-container>
</template>

<script>
	import ManageList from '@/components/ManageList'
	import TableList from '@/components/TableList'
	import RedTapeList from '@/components/RedTapeList'
	import TaskList from '@/components/TaskList'
	import WorkList from '@/components/WorkList'
	import AnalysisList from '@/components/AnalysisList'
	import TrainList from '@/components/TrainList'
	
	
	export default {
		data(){
			return {
				activeName: 'manage',//初次加载先显示部门发文Tab
			
				
			}
		},
		mounted: function(){

		},
		methods: {
			handleClick(tab, event){
				
			}
		},
		components: { 
			'manage-list': ManageList,
			'table-list': TableList,
			'redtape-list': RedTapeList,
			'task-list': TaskList,
			'work-list': WorkList,
			'analysis-list': AnalysisList,
			'train-list': TrainList
		},
		
	};
</script>
<style>
	.file_list > .header {
		background-color: #ececec;
		margin-top: 10px;
		padding-left: 5px;
		display: flex;
		justify-content: flex-start;
	}

	.file_list > .main {
		display: flex;
		flex-direction: column;
		padding-left: 0px;
		background-color: #fff;
		padding-top: 0px;
		margin-top: 8px;
	}
</style>