<template>
	<div>
		<div class="main_div">
			<div class="search_div" style="display: flex; justify-content: flex-start">
				<el-form inline ref="form" :model="form" 
				class="other_form" label-width="80px" :label-position="labelPosition" size="mini">
				  <el-col  :md="12" :lg="8" >
					  <el-form-item label="文档编号">
					  		<el-input v-model="form.fileNo"></el-input>
					  </el-form-item>
				  </el-col>
				  <el-col  :md="12" :lg="8">
					  <el-form-item label="文档名称">
					  		<el-input v-model="form.fileName"></el-input> 
					  </el-form-item>
				  </el-col>
				  <el-col :md="12" :lg="8">
					  <el-form-item label="编制单位">
					  		<el-select v-model="form.editOffice" clearable style="width: 100%;" placeholder="请选择科室">
						     <el-option v-for="(item, index) in offices" :label="item.name" :value="item.id" :key="index"></el-option>
						    </el-select>
					  </el-form-item>
				  </el-col>
				  <el-col :md="12" :lg="8">
					  <el-form-item label="编制人">
					  		<el-input v-model="form.editPerson"></el-input>
					  </el-form-item>
				  </el-col>
				  <el-col :md="12" :lg="8">
					  <el-form-item label="文档类型">
					  		<el-select v-model="form.fileType" clearable style="width: 100%;" placeholder="请选择文档类型">
						      <el-option label="综合类" value="综合类" ></el-option>
						      <el-option label="管理类" value="管理类"></el-option>
						      <el-option label="专业类" value="专业类"></el-option>
						      <el-option label="模板" value="模板"></el-option>
						    </el-select>
					  </el-form-item>
				  </el-col>
				  <el-col :md="12" :lg="8">
					  <el-form-item label="职能" >
					  		<el-select v-model="form.major" clearable style="width: 100%;" placeholder="请选择职能">
						      <el-option label="质量类" value="质量类"></el-option>
						      <el-option label="体系类" value="体系类"></el-option>
						      <el-option label="综合类" value="综合类"></el-option>
						      <el-option label="项目管理" value="项目管理"></el-option>
						    </el-select>
					  </el-form-item>
				  </el-col>
				  <el-col :md="12" :lg="8">
					  <el-form-item label="下发日期" >
					  		<el-date-picker type="month"  placeholder="选择日期" v-model="form.issueDate" value-format="yyyy-MM" style="width: 100%;" ></el-date-picker>
					  </el-form-item>
				  </el-col>
				  <el-col :md="12" :lg="8">
					  <el-form-item label="受控状态">
					  		<el-select v-model="form.status" clearable style="width: 100%;" placeholder="请选择状态">
						      <el-option label="受控" value="受控"></el-option>
						      <el-option label="过期报废" value="过期报废"></el-option>
						      <el-option label="替代报废" value="替代报废"></el-option>
						    </el-select>
					  </el-form-item>
				  </el-col>
				  <el-col :md="12" :lg="8">
					  <el-form-item label="版块" >
					  		<el-select v-model="form.plate" clearable style="width: 60%;" placeholder="请选择版块">
						      <el-option label="电气" value="电气"></el-option>
						      <el-option label="结构" value="结构"></el-option>
						      <el-option label="系统" value="系统"></el-option>
						      <el-option label="整机" value="整机"></el-option>
						      <el-option label="图文" value="图文"></el-option>
						      <el-option label="体系类" value="体系类"></el-option>
						      <el-option label="调度类" value="调度类"></el-option>
						      <el-option label="综合类" value="综合类"></el-option>
						      <el-option label="包装策划" value="包装策划"></el-option>
						      <el-option label="产品成本" value="产品成本"></el-option>
						      <el-option label="成本管理" value="成本管理"></el-option>
						      <el-option label="外购样机" value="外购样机"></el-option>
						      <el-option label="控制器软件" value="控制器软件"></el-option>
						      <el-option label="控制器硬件" value="控制器硬件"></el-option>
						    </el-select>
						    <el-button type="primary" icon="el-icon-search" size="mini" style="" @click="onSubmit" round>查询</el-button>
					  </el-form-item>
				  </el-col>
				</el-form>
			</div>
			
			<el-table ref="multipleTable" 
			    :data="list"
			    style="width: 100%;" max-height="470"  tooltip-effect="dark" 
			    v-loading="loading" 
	    		@selection-change="handleSelectionChange" >
	    		<el-table-column type="selection" width="55" align='center' v-if="$_has('deletePerm')"  >
	    		</el-table-column>
			    <!--<el-table-column v-if="$_has('deletePerm')"
			      label="序号"
			      width="80" align='center' >
			      <template slot-scope="scope">
			        <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
			      </template>
			    </el-table-column>-->
			    <el-table-column
			      label="文档编号" fixed
			      width="250" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.fileNo }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="文档名称"
			      width="300" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.fileName }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="文档类型"
			      width="100" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.fileType }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="编制人"
			      width="80" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.editPerson }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="编制单位"
			      width="150" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.editOffice }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="下发日期"
			      width="150" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.issueDate }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="状态"
			      width="150" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.status }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="职能"
			      width="150" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.major }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="版块"
			      width="80" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.category }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="工作项"
			      width="80" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.plate }}</span>
			      </template>
			    </el-table-column>
			   <el-table-column label="操作" fixed="right" align="center" width="180" height="100%">
					<template slot-scope="scope">
						<el-tooltip class="item" v-if="$_has('editPerm') || (scope.row.editPerson === currentUser.username)" effect="dark" content="修改" placement="top">
							<el-button
						  size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)" icon="el-icon-edit" round></el-button>
						</el-tooltip>
						<el-tooltip class="item" v-has="'deletePerm'" effect="dark" content="删除" placement="top">
							<el-button
						  size="mini" type="danger"  @click="handleDelete(scope.$index,scope.row)" icon="el-icon-delete" round></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="下载" placement="top">
							<el-button
						  size="mini" type="success" @click="handleDownload(scope.$index,scope.row)" icon="el-icon-download" round></el-button>
						</el-tooltip>  
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="table_list_footer">
	      <el-button type="danger" size="mini" style="margin: 0px;" v-has="'deletePerm'" v-show="this.list.length>0 "
	                :disabled="this.selItems.length == 0"  @click="deleteMany">批量删除
	      </el-button>
	      <el-pagination
	        @current-change="handleCurrentChange"
	        :current-page.sync="currentPageNum"
	        :page-size="pageSize"
	        layout="total,prev, pager, next, jumper"
	        :total="totalCount"
	         v-show="this.list.length>0">
	      </el-pagination>
    	</div>

  	</div>

		
</template>
<script>
import {getRequest} from '../api/api'
import {postRequest} from '../api/api'
import {putRequest} from '../api/api'
import {downloadRequest} from '../api/api'
import {idToName_anounce} from '../util/common'
import {getCookie} from '../util/common'
 
export default{
	data(){
		return {
			form: {
				fileNo: '',
				fileName: '',
				editOffice: '',
				editPerson: '',
				fileType: '',
				issueDate: '',
				major: '',
				plate: '',
				status: '受控',
				newVersion: []
				
			},
			labelPosition: 'left',
			list: [],
			selItems: [],
			loading: false,
			currentPageNum: 1,
			totalCount: -1,
			pageSize: 10,
			hasConditions: false,
			deleteData: [],
			offices: [],
			currentUser:'',
			tab:'table'
		}
	},
	beforeDestroy: function(){
		//组件之间使用emit,on,要先手动移除bus总线上的on事件监听器,避免重复绑定
		window.bus.$off('table_list'); 
	},
	mounted: function(){
		
		//this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
		this.currentUser = JSON.parse(getCookie("currentUser"));


		//加载科室目录
		this.loadOffices();
		var _this = this;
		this.loading = true;
		let params = {
			fileNo: this.form.fileNo,
			fileName: this.form.fileName,
			editOffice: this.form.editOffice,
			editPerson: this.form.editPerson,
			fileType: this.form.fileType,
			issueDate: this.form.issueDate,
			major: this.form.major,
			plate: this.form.plate,
			status: this.form.status,
			tab: this.tab, 
			currentPageNum:this.currentPageNum, 
			pageSize:this.pageSize
		}
		
		this.loadList(params);
		var _this = this;

		//接收数据
		window.bus.$on('table_list',function(){
			_this.loading = true;
			let params = {
				fileNo: _this.form.fileNo,
				fileName: _this.form.fileName,
				editOffice: _this.form.editOffice,
				editPerson: _this.form.editPerson,
				fileType: _this.form.fileType,
				issueDate: _this.form.issueDate,
				major: _this.form.major,
				plate: _this.form.plate,
				status: _this.form.status,
				tab: _this.tab,
				currentPageNum: _this.currentPageNum,
				pageSize: _this.pageSize
			};
			if (params.issueDate == null) {
				params.issueDate = '';
			}
			
			_this.loadList(params);
		});
		
		
	},
	methods: {
		onSubmit(){
			
			this.loading = true;
			let params = {
				fileNo: this.form.fileNo,
				fileName: this.form.fileName,
				editOffice: this.form.editOffice,
				editPerson: this.form.editPerson,
				fileType: this.form.fileType,
				issueDate: this.form.issueDate,
				major: this.form.major,
				plate: this.form.plate,
				status: this.form.status,
				tab: this.tab,
				currentPageNum: this.currentPageNum,
				pageSize: this.pageSize
			};
			if (params.issueDate == null) {
				params.issueDate = '';
			}
			
			this.loadList(params);
			

		},
		deleteMany(){
			//批量删除
			this.$confirm('此操作将会删除该文件，是否继续?','提示',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let selItems = this.selItems;
				for (var i = 0; i < selItems.length; i++) {
					this.deleteData.push(selItems[i].id);
				}
				let params = {aids: this.deleteData};
				this.deleteDocs(params);
			}).catch(() => {
						
			})
			
		},
		handleCurrentChange(currentPageNum){
			//翻页
			this.currentPageNum = currentPageNum;
			this.loading = true;
			let params = {
				fileNo: this.form.fileNo,
				fileName: this.form.fileName,
				editOffice: this.form.editOffice,
				editPerson: this.form.editPerson,
				fileType: this.form.fileType,
				issueDate: this.form.issueDate,
				major: this.form.major,
				plate: this.form.plate,
				status: this.form.status,
				tab: this.tab,
				currentPageNum: this.currentPageNum,
				pageSize: this.pageSize
			};
			if (params.issueDate == null) {
				params.issueDate = '';
			}

			this.loadList(params);

		},
		
		handleSelectionChange(val){
			this.selItems = val;
			
		},
		handleEdit(index,row){
			//跳转
			this.$router.push({name: '上传文档', params: {row: row,flag: true,changeVersion: false,isReload:false}});
			
		},
		handleDelete(index,row){
			this.$confirm('此操作将会删除该文件，是否继续?','提示',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				//请求删除一条数据
				this.deleteData.length = 0;
				this.deleteData.push(row.id);
				let params = {aids: this.deleteData};
				this.deleteDocs(params);
			}).catch(() => {
						
					})
			
		},
		handleDownload(index,row){
			
			var url = '/anounce/download';
			var _this = this;
			let params = {filePath: row.filePath};
			downloadRequest(url,params).then(resp=> {
				
				if(resp.status == 200){
					if (resp.data.size == 0) {
						_this.$message({type: 'error', message: '不存在该文档'});
						return;
					}
					//由服务端返回的文件流构成直接下载的链接
					let url = window.URL.createObjectURL(new Blob([resp.data]));
					let link = document.createElement('a');
					link.style.display = 'none';
					link.href = url;
					let str = params.filePath;
					let lastIndex = str.lastIndexOf("\\");
					link.setAttribute('download',str.substring(lastIndex,str.length));
					document.body.appendChild(link);
					link.click();
					window.URL.revokeObjectURL(link.href);
					_this.$message({type: 'success', message: '正在下载！'});
				}else{
					_this.$message({type: 'error', message: '下载失败'});
				}
			})

		},
		loadOffices(){
			var _this = this;
			var url = "/office/all";
			getRequest(url,null).then(resp=> {
				if(resp.status == 200){
					_this.offices = resp.data.data;
					if (_this.list != null) {
						_this.list = idToName_anounce(_this.list, _this.offices);
					}
					
				}else{
					_this.$message({type: 'error', message: '科室目录加载失败！'});
				}
			},resp=> {
				_this.$message({type: 'error', message: '科室目录加载失败！'});
			})
		},
		loadList(params){
			var _this = this;
			var url = "/anounce/all";
			//异步请求获取数据
			postRequest(url,params).then(resp=> {
				_this.loading = false;
				if(resp.status == 200){
					_this.list = resp.data.data.records;
					if(_this.offices != null){
						_this.list = idToName_anounce(resp.data.data.records, _this.offices);
					}
					_this.totalCount = resp.data.data.totalCount;
					
				}else{
					_this.$message({type: 'error', message: '数据加载失败！'});
				}
			},resp=> {
				_this.loading = false;
				if (resp.response.status == 403) {
					_this.$message({type: 'error', message: resp.response.data});
				}else{
					_this.$message({type: 'error', message: '数据加载失败！'})
				}
			}).catch(resp=> {
				_this.loading = false;
				_this.$message({type: 'error', message: '数据加载失败！'})
			})
		},
		deleteDocs(params){
			var _this = this;
			var url = "/anounce/delete";
			postRequest(url,params).then(resp=> {
				_this.loading = false;

				if(resp.status == 200){
					if(resp.data.code === 1000){
						_this.$message({type: 'success', message: '删除成功！'});
						window.bus.$emit('table_list');

					}
					else{
						_this.$message({type: 'error', message: '删除失败！'});
					}
					_this.deleteData.length = 0;
				}else{
					_this.$message({type: 'error', message: '删除失败！'});
				}
			},resp=> {
				_this.loading = false;
				if (resp.response.status == 403) {
					//_this.$message({type: 'error', message: resp.response.data});
					_this.$alert("无权限进行删除操作","权限不足",{
						confirmButtonText: '确定',
						type:'warning'
					})
				}else{
					_this.$message({type: 'error', message: '删除失败！'})
				}
			})
		
		},
		

	},
	
}
</script>
<style type="text/css">
  .table_list_footer {
    display: flex;
    box-sizing: content-box;
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

 .other_form .el-form-item__content {
  	width: 220px;
  }

  .report_form .el-form-item__content {
  	width: 150px;
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

.el-table__fixed,
.el-table__fixed-right {
	/*保证固定列的与底部滚动条之间没有空隙*/
	height: 100% !important; 
	/*保证固定列与右边滚动条之间没有空隙，right的值等于滚动条大小  不兼容火狐*/
	/*right:10px !important;*/
	
}

</style>