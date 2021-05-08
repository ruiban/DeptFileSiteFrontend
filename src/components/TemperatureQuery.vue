<template>
	<div class="main_div">
		<div class="search_div" style="display: flex; justify-content: flex-start">
			<el-form inline ref="form" :model="form" 
			class="search_form" label-width="80px" size="mini">
			  <el-col  :md="12" :lg="8" >
				  <el-form-item label="姓名">
				  		<el-input v-model="form.name"></el-input>
				  </el-form-item>
			  </el-col>
			  
			  <el-col :md="12" :lg="8">
				  <el-form-item label="科室">
				  		<el-select v-model="form.office" v-if=" role === '体温管理员' || role === '超级管理员' || role === '公司领导' || role === '部门领导' " clearable style="width: 100%;" placeholder="请选择科室">
					     <el-option v-for="(item, index) in offices" :label="item.name" :value="item.id" :key="index"></el-option>
					    </el-select>
					    <el-select v-model="form.office" v-else clearable style="width: 100%;" placeholder="请选择科室">
					    	<el-option :label="currentOffice" :value="currentUser.office"></el-option>
					    </el-select>
				  </el-form-item>
			  </el-col>

			  <el-col  :md="12" :lg="8">
				  <el-form-item label="上午温度">
				  		<el-input v-model="form.temperatureAM"></el-input> 
				  </el-form-item>
			  </el-col>

			  <el-col :md="12" :lg="8">
				  <el-form-item label="下午温度">
				  		<el-input v-model="form.temperaturePM"></el-input>
				  </el-form-item>
			  </el-col>
			  
			  <el-col :md="12" :lg="8">
				  <el-form-item label="日期" >
				  		<el-date-picker type="date"  placeholder="选择日期" v-model="form.today" value-format="yyyy-MM-dd" style="width: 100%;" ></el-date-picker>
				  </el-form-item>
			  </el-col>

			  <el-col :md="12" :lg="8">
				  <el-form-item>
				  		<el-button type="primary" icon="el-icon-search" size="mini" style="" @click="onSubmit" round>查询</el-button>
				  </el-form-item>
			  </el-col>
			</el-form>
		</div>
		<el-table ref="multipleTable" 
			    :data="temperatures"
			    style="width: 100%;" max-height="520"  tooltip-effect="dark" >
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
			      label="姓名"
			      style="width: 10%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.name }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="上午" 
			      style="width: 5%;" align='center' >
			      <template slot-scope="scope">
			        <span :class="scope.row.temperatureAM > 37.1 ?'temp_color':''">{{ scope.row.temperatureAM }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="下午" 
			      style="width: 5%;" align='center' >
			      <template slot-scope="scope">
			        <span :class="scope.row.temperaturePM > 37.1 ?'temp_color':''">{{ scope.row.temperaturePM }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="口罩发放"
			      style="width: 10%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.mask }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="备注"
			      style="width: 20%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.note }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="时间"
			      style="width: 10%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.today }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column label="操作" v-if="role === '科室主任' || role === '体温记录员' || role === '体温管理员' || role === '超级管理员'" width="150"  align='center'>
			    	<template slot-scope="scope">
			    		<el-button
						  size="mini" type="primary" @click="handleEidt(scope.$index,scope.row)"  round>修改</el-button>
						  <el-button
						  size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)"  round>删除</el-button>
			    	</template>
			    </el-table-column>
			</el-table>

			<el-dialog title="修改" :visible.sync="isShowDiglog" width="30%" center>
				<el-form :model="updateForm"  ref="updateForm">
					<el-form-item label="科室:" label-width="80px">
						<span>{{updateForm.office}}</span>
					</el-form-item>
					<el-form-item label="姓名:" label-width="80px">
						<span>{{updateForm.name}}</span>
					</el-form-item>
					<el-form-item label="时间:" label-width="80px">
						<span>{{updateForm.today}}</span>
					</el-form-item>
					<el-form-item label="上午温度" label-width="80px" >
						<el-input v-model="updateForm.temperatureAM" ></el-input>
					</el-form-item>
					<el-form-item label="下午温度" label-width="80px" >
						<el-input v-model="updateForm.temperaturePM" ></el-input>
					</el-form-item>
					<el-form-item label="备注" label-width="80px">
						<el-select v-model="updateForm.note" >
							<el-option v-for="(item , index) in options"
								:key="index" :label="item.label"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>
					
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="isShowDiglog = false">取消</el-button>
					<el-button type="primary" @click="save('updateForm')">保存</el-button>
				</div>
			</el-dialog>
		<div class="list_footer">
	      <el-pagination
	        @current-change="handleCurrentChange"
	        :current-page.sync="currentPageNum"
	        :page-size="pageSize"
	        layout="total,prev, pager, next, jumper"
	        :total="totalCount"
	         v-show="temperatures.length>0">
	      </el-pagination>
    	</div>
	</div>
</template>

<script>
	import {postRequest} from '../api/api'
	import {getRequest} from '../api/api'
	import {putRequest} from '../api/api'
	import {idToName} from '../util/common'
	import {getCookie} from '../util/common'

	export default{
		data(){
			return{
				form: {
					office:'',
					name:'',
					temperatureAM:'',
					temperaturePM:'',
					note:'',
					today:''
				},
				temperatures:[],
				offices:[],
				currentUser:'',
				role:'',
				currentPageNum: 1,
				totalCount: -1,
				pageSize: 10,
				isShowDiglog: false,
				updateForm:{},
				options:[
				{label:"正常",value: "正常"},
				{label:"上午请假",value:"上午请假"},
				{label:"下午请假",value:"下午请假"},
				{label:"请假一天",value:"请假一天"},
				{label:"通宵调休",value:"通宵调休"},
				],
				currentOffice:''
			}
		},
		beforeDestroy: function(){
			//组件之间使用emit,on,要先手动移除bus总线上的on事件监听器,避免重复绑定
			window.bus.$off('temperature_query'); 
		},
		mounted:function(){
			var _this = this;
			//this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
			this.currentUser = JSON.parse(getCookie("currentUser"));
			this.getRole();
			//console.log(this.role);
			this.loadOffices();
			this.loadTemperatures();
			//接收数据
			window.bus.$on('temperature_query',function(){
				_this.loadTemperatures();
			});
		},
		methods:{
			onSubmit(){
				this.loadTemperatures();
			},
			
			loadTemperatures(){
				
				let params = {
					office: this.form.office,
					name: this.form.name,
					temperatureAM: this.form.temperatureAM,
					temperaturePM: this.form.temperaturePM,
					note: this.form.note,
					today: this.form.today,
					currentPageNum: this.currentPageNum,
					pageSize: this.pageSize
				}
				if(this.role !== '体温管理员' && this.role !== '超级管理员' && this.role !== '公司领导' && this.role !== '部门领导'){
					params.office = this.currentUser.office;
				}
				if (params.today == null) {
					params.today = ''
				}
				let url = "/temperature/page";
				var _this = this;
				postRequest(url,params).then(resp => {
					if(resp.status == 200){
						_this.temperatures = resp.data.data.records;
						if (_this.offices != null) {
							_this.temperatures = idToName(resp.data.data.records,_this.offices);
						}
						
						_this.totalCount = resp.data.data.totalCount;
					}else{
						_this.$message({type:"error",message:"加载数据失败!"});
					}
				}).catch(resp => {
					_this.$message({type:"error",message:"服务器响应异常!"});
				})
			},
			loadOffices(){
				var _this = this;
				var url = "/office/all";
				getRequest(url).then(resp=> {
					if(resp.status == 200){
						_this.offices = resp.data.data;
						if (_this.temperatures != null) {
							_this.temperatures = idToName(_this.temperatures,_this.offices);
						}
						let temp = [{office:_this.currentUser.office}];
						_this.currentOffice = idToName(temp,_this.offices)[0].office;
					}else{
						_this.$message({type: 'error', message: '科室目录加载失败！'});
					}
				},resp=> {
					_this.$message({type: 'error', message: '科室目录加载失败！'});
				})
			},
			getRole(){
				for(let i = 0 ; i < this.currentUser.roles.length; i++){
					if(this.currentUser.roles[i].name === '超级管理员' || this.currentUser.roles[i].name === '公司领导' || this.currentUser.roles[i].name === '部门领导' || this.currentUser.roles[i].name === '体温管理员' || this.currentUser.roles[i].name === '科室主任' ){
						this.role = this.currentUser.roles[i].name;
						break;
					}
				}
			},
			handleCurrentChange(currentPageNum){
				//翻页
				this.currentPageNum = currentPageNum;
				//this.loading = true;
				this.loadTemperatures();

			},
			handleEidt(index,row){
				this.updateForm = row;
				this.isShowDiglog = true;
			},
			handleDelete(index,row){
				
				this.$confirm('是否继续?','提示',{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delete(row.id);
				}).catch(() => {
							
				})
				
			},
			save(updateForm){
				this.$refs[updateForm].validate((valid) => {
				if (valid) {
					var _this = this;
					var list = new Array();
					list.push(this.updateForm);
				  	putRequest('/temperature/update',list).then(resp=> {
				  		if (resp.status == 200) {
				  			if(resp.data.code === 1000){
				  				_this.isShowDiglog = false;
				  				_this.userForm= '';
				  				_this.$message({type:"success",message:resp.data.data});
				  				_this.loadTemperatures();
				  			}else{
				  				_this.$message({type:"error",message:resp.data.data});
				  			}
				  		}else{
				  			_this.$message({type:"error", message:"提交失败"});
				  		}
				  	},resp=> {
						
						if (resp.response.status == 403) {
							_this.$message({type: 'error', message: resp.response.data});
						}else{
							_this.$message({type: 'error', message: '根本找不到服务器'});
						}
					});
				  } else {
				    this.$message({type: 'error', message: '请完整填写信息！！！'});
				    return false;
				  }
				});
			},
			delete(id){
				var _this = this;
				let url = '/temperature/delete/'+id;
				getRequest(url).then(resp => {
					if (resp.status == 200) {
				  			if(resp.data.code === 1000){
				  				_this.$message({type:"success",message:resp.data.data});
				  				_this.loadTemperatures();
				  			}else{
				  				_this.$message({type:"error",message:resp.data.data});
				  			}
				  		}else{
				  			_this.$message({type:"error", message:"删除失败"});
				  		}
				})
			}
			
		}
	}
</script>

<style type="text/css">
.list_footer {
    
    padding-top: 10px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    justify-content: space-between;
  }

.main_div {
  	//height:600px;
  	overflow-y:auto;
  }

  .search_div {
  	padding-top: 20px;
  	//background-color: #ececec;
  }

 .search_form .el-form-item__content {
  	width: 220px;
  }

  .temp_color {
  	color: #F56C6C;
	}

.el-table {
	//box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	border:1px solid #E4E7ED;
	border-radius: 4px;
	//background-color: #ececec;
}

.main_div::-webkit-scrollbar{
	width: 10px;
}

.main_div::-webkit-scrollbar-thumb{
	background-color: #e6e6e6;
	border-radius: 3px;
}

  /* 滚动条的宽度   火狐的滚动条不支持修改*/

 .el-table .el-table__body-wrapper::-webkit-scrollbar {
 width: 17px; /*对垂直流动条有效*/
 height: 10px; /*对水平流动条有效*/
}
/* 滚动条的滑块 */

 .el-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #e6e6e6 !important;
  border-radius: 3px;
}
</style>