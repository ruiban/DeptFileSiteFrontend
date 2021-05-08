<template>
	<div class="main_div">
		
		<el-table ref="multipleTable" 
			    :data="maskList"
			    style="width: 100%;" max-height="630"  tooltip-effect="dark" >
			    <el-table-column
			      label="序号"
			      style="width: 5%;" align='center' >
			      <template slot-scope="scope">
			        <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="科室" 
			      style="width: 10%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.office }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="总人数" 
			      style="width: 10%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.persons }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="上午"
			      style="width: 5%;" align='center' >
			      <template slot-scope="scope" >
			        <span :class="scope.row.submitAM === '未提交'?'temp_color':''" >
			        {{scope.row.submitAM}}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="下午"
			      style="width: 5%;" align='center' >
			      <template slot-scope="scope" >
			        <span :class="scope.row.submitPM === '未提交'?'temp_color':''">
			        	{{scope.row.submitPM}}
			    	</span>
			        
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="口罩发放"
			      style="width: 10%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.maskTotal }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="时间"
			      style="width: 10%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.today }}</span>
			      </template>
			    </el-table-column>
			    
			</el-table>
			<div style="margin-top:20px;" v-if="isShow">
				<el-button type="primary" @click="handleDownload">导出</el-button>
			</div>
			
	</div>
</template>

<script>
	import {getRequest} from '../api/api'
	import {downloadRequest} from '../api/api'
	import {idToName} from '../util/common'
	import {getCookie} from '../util/common'
	

	export default{
		data(){
			return{
				maskList:[],
				currentUser:'',
				role:'',
				isShow:false,
				offices: []
			}
		},
		mounted:function(){
			var _this = this;
			this.currentUser = JSON.parse(getCookie("currentUser"));
			this.loadOffices();
			this.getRole();
			this.loadMasks();
			//接收数据
			window.bus.$on('mask_statistical',function(){
				_this.loadMasks();
			});
		},
		methods:{
			loadMasks(){
				var _this = this;
				let url = "/temperature/sum/";
				if(this.role !== '超级管理员' && this.role !== '公司领导' && this.role !== '部门领导'  && this.role !== '体温管理员' ){
					url+=this.currentUser.office;
				}else{
					url+="all";
					_this.isShow = true;
				}
				//console.log(url);
				getRequest(url).then(resp => {
					if(resp.status == 200){
						if (_this.offices.length > 0) {
							_this.maskList = idToName(resp.data.data,_this.offices);
						}
						

					}else{

					}
				})
			},
			getRole(){
				for(let i = 0 ; i < this.currentUser.roles.length; i++){
					if(this.currentUser.roles[i].name === '超级管理员' || this.currentUser.roles[i].name === '公司领导' || this.currentUser.roles[i].name === '部门领导' ||this.currentUser.roles[i].name === '体温管理员' ){
						this.role = this.currentUser.roles[i].name;
						break;
					}
				}
			},
			handleDownload(){
			
				let url = '/temperature/export';
				var _this = this;
				downloadRequest(url,'').then(resp=> {
					
					if(resp.status == 200){
						if (resp.data.size == 0) {
							_this.$message({type: 'error', message: '导出失败'});
							return;
						}
						//由服务端返回的文件流构成直接下载的链接,创建下载的链接
						let url = window.URL.createObjectURL(new Blob([resp.data]));
						//创建a标签
						let link = document.createElement('a');
						link.style.display = 'none';
						link.href = url;
						link.setAttribute('download',"体温记录.xlsx");
						document.body.appendChild(link);
						link.click();
						window.URL.revokeObjectURL(link.href);
						_this.$message({type: 'success', message: '正在下载！'});
					}else{
						_this.$message({type: 'error', message: '导出失败'});
					}
				})

			},
			loadOffices(){
				var _this = this;
				var url = "/office/all";
				getRequest(url,null).then(resp=> {
					if(resp.status == 200){
						_this.offices = resp.data.data;	
						if (_this.maskList.length > 0) {
							_this.maskList = idToName_anounce(_this.maskList, _this.offices);
						}
						
					}else{
						_this.$message({type: 'error', message: '科室目录加载失败！'});
					}
				},resp=> {
					_this.$message({type: 'error', message: '科室目录加载失败！'});
				})
			},
			
		}
	}
</script>

<style type="text/css">
.temp_color {
  	color: #F56C6C;
	}
</style>