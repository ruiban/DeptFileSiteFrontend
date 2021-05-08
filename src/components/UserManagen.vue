<template>
	<div>
		<div class="search_div" style="display: flex;display: -webkit-flex; justify-content: flex-start">
			<el-form inline ref="form" :model="searchForm" 
			class="search_form" label-width="80px"  size="mini">
			  <el-col :md="8" :lg="6" :xl="5">
			  	<el-form-item label="姓名">
				    <el-input v-model="searchForm.username"></el-input>
				</el-form-item>
			  </el-col>
			  <el-col :md="8" :lg="6" :xl="5">
			  	<el-form-item label="邮箱">
				    <el-input v-model="searchForm.mail"></el-input>
				  </el-form-item>
			  </el-col>
			  <el-col :md="8" :lg="6" :xl="5">
			  	<el-form-item label="员工编号">
			  	  <el-input v-model="searchForm.employeeId"></el-input>
			  	</el-form-item>
			  </el-col>
			  <el-col :md="8" :lg="6" :xl="5">
			  	<el-form-item label="科室">
				    <el-select v-model="searchForm.office" clearable style="width: 100%;" placeholder="请选择科室" v-if="role !== '科室主任' ">
				      <el-option v-for="(item, index) in offices" :label="item.name" :value="item.id" :key="index"></el-option>
				    </el-select>
				    <el-select v-model="userForm.office" placeholder="请选择科室"
					  v-else >
					  <el-option :label="currentOffice" :value="currentUser.office"></el-option>
					</el-select> 
				  </el-form-item>
			  </el-col>
			  <el-col :md="8" :lg="12" :xl="2">
			  	<el-form-item label="">
				    <el-button type="primary" icon="el-icon-search" size="mini" style="" @click="onSubmit" round>查询</el-button>
				  </el-form-item>
			  </el-col>
			  <el-col :md="8" :lg="12" :xl="2">
			  	<el-form-item label="">
				  	<el-button type="success" icon="el-icon-plus" size="mini" style="" @click="dialogFormVisible = true" round>添加</el-button>
				  </el-form-item>
			  </el-col>
			</el-form>
			<!--  弹框添加用户 -->
			<el-dialog title="添加用户" :visible.sync="dialogFormVisible" center>
				<el-form :model="userForm" :rules="rules" ref="userForm">
					<el-form-item label="员工姓名" label-width="80px" prop="username">
						<el-input v-model="userForm.username" ></el-input>
					</el-form-item>
					<el-form-item label="员工编号" label-width="80px" prop="employeeId">
						<el-input v-model="userForm.employeeId" ></el-input>
					</el-form-item>
					<el-form-item label="员工邮箱" label-width="80px" prop="mail">
						<el-input v-model="userForm.mail"></el-input>
					</el-form-item>
					<el-form-item label="科室" label-width="80px" prop="office">
						<el-select v-model="userForm.office" placeholder="请选择科室"
						  v-if="role !== '科室主任' " >
						  <el-option v-for="(item,index) in offices" :label="item.name" :value="item.id" :key="index"></el-option>
						</el-select>
						<el-select v-model="userForm.office" placeholder="请选择科室"
						  v-else  >
						  <el-option :label="currentOffice" :value="currentUser.office"></el-option>
						</el-select> 
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="saveUser('userForm')">提交</el-button>
				</div>
			</el-dialog>
		</div>
		<div  style="display: flex;justify-content: space-around;flex-wrap: wrap"  >
	      <el-card style="width:330px;margin-top: 10px;" v-for="(user,index) in users" :key="index"
	               >
	        <div >
		        <div slot="header" style="text-align: left">
		          <span>{{user.username}}</span>
		          <el-button style="float: right; padding: 3px 0;color: #ff0509" type="text" icon="el-icon-delete" v-if="!isDisabled(user.roles)" @click="deleteUser(user.id)" >删除
		          </el-button>
		        </div>
		        <div>
		          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
		            <span>员工编号:</span><span>{{user.employeeId}}</span>
		          </div>
		          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
		            <span>邮箱:</span><span>{{user.mail}}</span>
		          </div>
		          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
		            <span>科室:</span><span>{{user.office}}</span>
		          </div>
		          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
		            <span>注册时间:</span><span>{{formatDate(user.gmtCreate)}}</span>
		          </div>
		          <div
		            style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px;display: flex;align-items: center">
		            <span>用户状态:</span>
		            <el-switch
		              v-model="user.enabled"
		              active-text="启用"
		              active-color="#13ce66"
		              :disabled="isDisabled(user.roles)"
		              @change="enabledChange(user,user.enabled,user.id,index)"
		              inactive-text="禁用" style="font-size: 12px">
		            </el-switch>
		          </div>
		          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
		            <span>用户角色:</span>
		            <el-tag
		              v-for="role in user.roles"
		              :key="role.id"
		              size="mini"
		              style="margin-right: 8px"
		              type="success">
		              {{role.name}}
		            </el-tag>
		            <el-popover
		              placement="right"
		              title="角色列表"
		              width="200"
		              :key="index+''+user.id"
		              @hide="saveRoles(user.id,index)"
		              trigger="click" >
		              <el-select v-model="roles" :key="user.id" multiple placeholder="请选择" size="mini">
		                <el-option
		                  v-for="(item,index) in allRoles" 
		                  :disabled="isDisabled_item(item)"
		                  :key="user.id+'-'+item.id"
		                  :label="item.name"
		                  :value="item.id">
		                </el-option>
		              </el-select>
		              <el-button type="text" icon="el-icon-more" style="padding-top: 0px" slot="reference" :disabled="isDisabled(user.roles)"
		                         @click="showRole(user.roles,index)"></el-button>
		            </el-popover>
		          </div>
		        </div>
	        </div>
	      </el-card>
	    </div>
	    <div class="page_footer">
	    	<el-pagination
	        @current-change="handleCurrentChange"
	        :current-page.sync="currentPageNum"
	        :page-size="pageSize"
	        layout="total,prev, pager, next, jumper"
	        :total="totalCount"
	         v-show="this.users.length>0">
	      </el-pagination>
	    </div>
	</div>
</template>
<script>
	
	import {postRequest} from '../api/api'
	import {getRequest} from '../api/api'
	import {idToName} from '../util/common'
	import {getCookie} from '../util/common'

	export default{
		 data(){
	      return {
	        loading: false,
	        currentPageNum: 1,
	        pageSize:6,
	        totalCount: -1,
	        dialogFormVisible: false,
	        searchForm:{
	        	username: '',
	        	mail: '',
	        	employeeId: '',
	        	office: ''
	        },
	        userForm: {
	        	username: '',
	        	mail: '',
	        	employeeId: '',
	        	office: '',
	        },
	        rules: {
				username: [
					{required: true,message: '请输入员工姓名', trigger: 'blur'}
				],
				employeeId: [
					{required: true, message: '请输入员工编号', trigger: 'blur'}
				],
				mail: [
					{required: true, message: '请输入邮箱号', trigger: 'blur'}
				],
				office: [
					{required: true, message: '请选择科室', trigger: 'blur'}
				]
			},
	        users: [],
	        allRoles: [],
	        roles:[],
	        rolesBak: [],
	        currentUser: '',
	        offices: [],
	        role:'',
	        currentOffice: ''
	        //version:false
	      }
	    },
		mounted: function () {
		  //加载科室目录
		  this.loadOffices();
		  var _this = this;
		  if(window.screen.width >= 1920){
		  	_this.pageSize = 10;
		  }else{
		  	_this.pageSize = 6;
		  }
		  
		  //this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
		  this.currentUser = JSON.parse(getCookie("currentUser"));
		  this.getRole();
	      this.firstLoadUserList(); 
	    },
	    methods: {
	      saveUser(userForm){
		      this.$refs[userForm].validate((valid) => {
	          if (valid) {
            	var _this = this;
		      	postRequest('/reg',this.userForm).then(resp=> {
		      		if (resp.status == 200) {
		      			if(resp.data.code === 1000){
		      				_this.dialogFormVisible = false;
		      				_this.userForm.username = '';
		      				_this.userForm.mail = '';
		      				_this.userForm.employeeId = '';
		      				_this.userForm.office = '';
		      				_this.$message({type:"success",message:"注册成功！"});
		      				_this.firstLoadUserList();
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
	      onSubmit(){
		    this.firstLoadUserList();
	      },
	      handleCurrentChange(currentPageNum){
	      	this.currentPageNum = currentPageNum;
	      	this.firstLoadUserList();
	      },
	      saveRoles(id, index){
	      	var selRoles = [];
	      	//保存目前用户选中的角色
	      	for(let rid of this.roles){
	      		selRoles.push(rid);
	      	}
	      	var _this = this;
	      	var delRoles=[]
	      	console.log("selRoles:"+selRoles)
      		for(var i = 0; i < this.rolesBak.length; i++){
      			if(selRoles.length !== 0){
      				for(var j = 0; j < selRoles.length; j++){
	      				if(this.rolesBak[i] == selRoles[j]){
	      					selRoles.splice(j, 1);  //移除用户已拥有的角色，剩下的就是要添加的角色
	      					break;
	      				}else{
	      					delRoles.push(this.rolesBak[i]); //要删除的角色
	      					break;
	      				}
	      			}
      			}else{

      				delRoles.push(this.rolesBak[i]);
      			}
      			
      		}
      		
      		
      		if(selRoles.length > 0){
      			let params = {
		        	rids: selRoles,
		        	uid: id,
		        }
		        let url = '/role/add';
		    	// postRequest(url,params).then(resp=>{
		    	// 	_this.loadOneUserById(id,index);
		    	// });
		    	postRequest(url,params);
		    	if(delRoles == 0){
		    		this.loadOneUserById(id,index);
		    	}
      		}
      		if (delRoles.length > 0) {
      			let params = {
	        	rids: delRoles,
	        	uid: id
		        }
		        let url = '/role/delete';
		        postRequest(url,params).then(resp=>{
		        	_this.loadOneUserById(id,index);
		        });
		        delRoles = []
      		}
      		

      		//重新加载该用户
		    //this.loadOneUserById(id,index);

	      	
	      },
	      showRole(uRoles,index){
	      	
	      	//清空
	      	this.roles = [];
	      	this.rolesBak = [];
	      	//加载所有角色
	      	this.loadRoles();
	      	//标记用户所拥有的角色
	      	for (var i = 0; i < uRoles.length; i++) {
	      		//角色列表中不显示普通用户
	      		if(uRoles[i].id != 4){
	      			this.roles.push(uRoles[i].id);
	      			//备份该用户的所有角色,除普通用户
	      			this.rolesBak.push(uRoles[i].id);
	      		}
	          
	        }
	        
	      },
	      deleteUser(id){
	        var _this = this;
	        this.$confirm("此操作将会删除该用户，是否继续?","提示",{
	        	confirmButtonText:'确定',
	        	cancelButtonText:'取消',
	        	type:'warning'
	        }).then(()=>{
	        	getRequest('/user/delete/'+id).then(resp=> {
		        	if (resp.status == 200) {
		        		if (resp.data.code === 1000) {
		        			_this.$message({type:'success',message: '删除成功'});
		        			_this.firstLoadUserList();
		        		}else{
		        			_this.$message({type:'error',message: '删除失败'})
		        		}
		        	}
	        	});
	        })
	        
	      },
	      enabledChange(user,enabled, id, index){
	      	
	      		var _this = this;
		        let params = {
		        	id: id,
		        	enabled: enabled
		        }
		        let url = '/user/enabled'
		        postRequest(url,params).then(resp=> {
		        	if (resp.status == 200) {
		        		_this.$message({type:'success',message:'更新成功'});
		        		_this.loadOneUserById(id,index);
		        	}else{
		        		_this.$message({type:'success',message:'更新失败'});
		        	}
		        },resp=> {

		        })
	      	
	        
	      },
	      loadOffices(){
			var _this = this;
			var url = "/office/all";
			getRequest(url,null).then(resp=> {
				if(resp.status == 200){
					_this.offices = resp.data.data;
					if (_this.users != null ) {
						_this.users = idToName(_this.users, _this.offices);
					}
					let temp = [{office:_this.currentUser.office}];
					_this.currentOffice = idToName(temp,_this.offices)[0].office;
					
					
				}else{
					_this.$message({type: 'error', message: '科室目录加载失败！'});
				}
			},resp=> {
				_this.$message({type: 'error', message: '科室目录加载失败！'});
			}).catch(e=>{})
		  },
	      loadRoles(){
	      	var _this = this;
	        getRequest('/role/list').then(resp=> {
	        	if (resp.status == 200) {
	        		_this.allRoles = resp.data.data;
	        	}else{
	        		_this.$message({type:'error',message:'角色列表加载失败'});
	        	}
	        },resp=> {
	        	_this.$message({type:'error',message:'角色列表加载失败'})
	        });
	      },
	      loadOneUserById(id, index){
	        var _this = this;
	        let url = "/user/"+id
	        getRequest(url).then(resp=> {
	        	if (resp.status == 200) {
	        		_this.users.splice(index,1,resp.data.data);
	        		
	        		//_this.$message({type:'success', message: '添加成功'});
	        	}else{
	        		_this.$message({type:'error', message: '加载失败'});
	        	}
	        })
	      },
	      loadUserList(params){
	        var _this = this;
	        var url = '/user/list';
	        postRequest(url,params).then(resp=> {
	        	if (resp.status == 200) {
	        		
	        		_this.users = resp.data.data.records;
	        		if(_this.users == null){
	        			_this.users = [];
	        			_this.$message({type:'success',message:'暂无数据'});
	        		}else{
		        		if (_this.offices != null ) {
		        			_this.users = idToName(resp.data.data.records,_this.offices);
		        		}
	        		}
	        		_this.totalCount = resp.data.data.totalCount;
	        		
	        	}else{
	        		_this.$message({type:'error',message:'数据加载失败'});
	        	}
	        }).catch(e=>{});
	      },
	      firstLoadUserList(){
	      	let params = {
	      		username: this.searchForm.username,
	      		mail: this.searchForm.mail,
	      		employeeId: this.searchForm.employeeId,
	      		office: this.searchForm.office,
	      		currentPageNum: this.currentPageNum,
	      		pageSize: this.pageSize
		      }
		      if (this.currentUser.roles[0].name === '科室主任') {
		      	params.office = this.currentUser.office;
		      }
		      this.loadUserList(params);
		   },
		  getRole(){
		  	
		  	var roles = this.currentUser.roles;
		  	for(let i = 0; i < roles.length; i++){
		  		if(roles[i].name === '超级管理员' || roles[i].name === '公司领导' || roles[i].name === '部门领导' || roles[i].name === '科室主任'){
		  			this.role = roles[i].name;
		  			break;
		  		}
		  	}
		  },
		  isDisabled(roles){
		  	//(user.roles[0].id < currentUser.roles[0].id) ? false : true
		  	var flag = false;
		  	for(let i = 0; i < roles.length; i++){
		  		if(this.role === '超级管理员'){
		  			if (roles[i].name === '超级管理员') {
		  				flag = true;
		  				break;
		  			}
		  			
		  		}
		  		if(this.role === '公司领导'){
		  			if(roles[i].name === '公司领导' || roles[i].name === '超级管理员' ){
		  				flag = true;
		  				break;
		  			}
		  		}
		  		if(this.role === '部门领导'){
		  			if (roles[i].name === '部门领导' || roles[i].name === '超级管理员' || roles[i].name === '公司领导') {
		  				flag = true;
		  				break;
		  			}
		  			
		  		}
		  		if(this.role === '科室主任'){
		  			if (roles[i].name === '科室主任' || roles[i].name === '超级管理员' || roles[i].name === '公司领导' || roles[i].name === '部门领导') {
		  				flag = true;
		  				break;
		  			}
		  			
		  		}
		  	}
		  	return flag;
		  },
		  isDisabled_item(item){
		  	//(user.roles[0].id < currentUser.roles[0].id) ? false : true
		  
		  	var flag = false;
		  	
		  		if(this.role === '超级管理员'){
		  			if (item.name === '超级管理员') {
		  				flag = true;
		  				
		  			}
		  			
		  		}
		  		if(this.role === '公司领导'){
		  			if(item.name === '公司领导' || item.name === '超级管理员' ){
		  				flag = true;
		  				
		  			}
		  		}
		  		if(this.role === '部门领导'){
		  			if (item.name === '部门领导' || item.name === '超级管理员' || item.name === '公司领导') {
		  				flag = true;
		  				
		  			}
		  			
		  		}
		  		if(this.role === '科室主任'){
		  			if (item.name === '科室主任' || item.name === '超级管理员' || item.name === '公司领导' || item.name === '部门领导') {
		  				flag = true;
		  				
		  			}
		  			
		  		}
		  	
		  	return flag;
		  },
		  formatDate(date) {
				if (date != null && date != '') {
					var date = new Date(date);
					var YY = date.getFullYear() + '-';
					var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
					
					return YY + MM + DD;
				}else{
					return '';
				}
			},
	    },
	    
	   }
</script>

<style type="text/css">

.search_div {
  	padding-top: 20px;
  	//background-color: #ececec;
  }

.search_form .el-form-item__content {
  	width: 150px;
  }

/*
.card_list {
	margin-top:100px !important;
}
*/
.page_footer{

    box-sizing: content-box;
    padding-top: 10px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    justify-content: space-between;
}
</style>

