<template>
	<div>
		<div class="upload_div" style="display: flex; justify-content: flex-start">
			<el-form  ref="form"  :model="form" :rules="rules"  class="upload-form" label-width="80px" :label-position="labelPosition" size="mini" >
			  <el-form-item label="文档编号" prop="fileNo">
			    <el-input v-model="form.fileNo"></el-input>
			  </el-form-item>
			  <el-form-item label="旧版编号" >
			    <el-input  v-model="form.oldFileNo"></el-input>
			  </el-form-item>
			   <el-form-item label="">
			    <el-button type="primary" @click="handChangeVersion" v-if="!changeVersion" round>换版</el-button>
			  </el-form-item>
			  <div class="upload-file">
			  	<el-form-item label="上传文件"  v-if="changeVersion">
			   	<el-upload
				  class="upload-demo"
				  ref="upload"
				  action=""
				  :limit="1"
				  :on-change = "handleChange"
				  :file-list="filelist"
				  :auto-upload="false">
				  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				</el-upload>
			  </el-form-item>
			  </div>
			  <el-form-item label="授权给">
			  	 <el-popover
		              placement="bottom"
		              title="科室列表"
		              width="200"
		              trigger="click" >
		              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
		                <el-checkbox-group v-model="form.authorization" @change="handleCheckedOfficesChange" >
						    <el-checkbox v-for="(item, index) in offices" :label="item.name" :key="index"></el-checkbox>
					  	</el-checkbox-group>
					  	<el-button type="text" icon="el-icon-more" style="padding-top: 0px" slot="reference" ></el-button>
		            </el-popover>
			  	
			  </el-form-item>
			  <el-form-item label="文档名称" prop="fileName">
			    <el-input v-model="form.fileName"></el-input>
			  </el-form-item>
			  <el-form-item label="编制人" prop="editPerson">
			  	  <el-input v-model="form.editPerson" @blur="defaultOffice"></el-input>
			  </el-form-item>
			  <el-form-item label="编制单位" prop="editOffice">
			    <el-select v-model="form.editOffice" style="width: 100%;" placeholder="请选择科室">
			      <el-option v-for="(item, index) in offices" :label="item.name" :value="item.id" :key="index"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="文档类型" prop="fileType">
			  	<el-select v-model="form.fileType" style="width: 100%;" placeholder="请选择文档类型">
			      <el-option label="表扬通报" value="表扬通报"></el-option>
			      <el-option label="管理规定" value="管理规定"></el-option>
			      <el-option label="管理标准" value="管理标准"></el-option>
			      <el-option label="红头文件" value="红头文件"></el-option>
			      <el-option label="技术标准" value="技术标准"></el-option>
			      <el-option label="内部通报" value="内部通报"></el-option>
			      <el-option label="体系通报" value="体系通报"></el-option>
			      <el-option label="质量黑榜" value="质量黑榜"></el-option>
			      <el-option label="体系规范" value="体系规范"></el-option>
			      <el-option label="职能通报" value="职能通报"></el-option>
			      <el-option label="作业指导书" value="作业指导书"></el-option>
			      <el-option label="任务单" value="任务单"></el-option>
			      <el-option label="综合类" value="综合类"></el-option>
			      <el-option label="管理类" value="管理类"></el-option>
			      <el-option label="专业类" value="专业类"></el-option>
			      <el-option label="分析报告" value="分析报告"></el-option>
			      <el-option label="培训资料" value="培训资料"></el-option>
			      <el-option label="模板" value="模板"></el-option>
			      <el-option label="通知" value="通知"></el-option>
			      <el-option label="其他" value="其他"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="职能">
			    <el-select v-model="form.major" style="width: 100%;" placeholder="请选择职能">
			      <el-option label="质量类" value="质量类"></el-option>
			      <el-option label="体系类" value="体系类"></el-option>
			      <el-option label="综合类" value="综合类"></el-option>
			      <el-option label="项目管理" value="项目管理"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="下发日期" prop="issueDate">
			      <el-date-picker type="date"  placeholder="选择日期"  v-model="form.issueDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
			  </el-form-item>
			  
			  <el-form-item label="受控状态">
			    <el-select v-model="form.status" style="width: 100%;" placeholder="请选择状态">
			      <el-option label="受控" value="受控"></el-option>
			      <el-option label="过期报废" value="过期报废"></el-option>
			      <el-option label="替代报废" value="替代报废"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="版块">
			    <el-select v-model="form.plate" style="width: 100%;" placeholder="请选择版块">
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
			   
			  </el-form-item>
			  <el-form-item label="PDM编号">
			  	<el-input v-model="form.pdmNo" />
			  </el-form-item>
			  <el-form-item label="备注">
			  	<el-input v-model="form.note" />
			  </el-form-item>
			  <el-form-item label=" ">
			     <el-button type="primary" icon="el-icon-thumb" size="mini" style="" @click="onSubmit('form')" round>提交</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import {getRequest} from '../api/api'
import {uploadFileRequest} from '../api/api'
import {postRequest} from '../api/api'
import {getCookie} from '../util/common'
import { Notification } from 'element-ui'

export default{

	data(){
		return {
			form: {
				id: 0,
				fileNo: '',
				oldFileNo: '',
				file: null,
				fileName: '',
				editOffice: '',
				editPerson: '',
				fileType: '',
				issueDate: '',
				major: '',
				plate: '',
				status: '受控',
				note:'',
				pdmNo:'',
				authorization: []
			},
			rules: {
				fileNo: [
					{required: true,message: '请输入文档编号', trigger: 'blur'}
				],
				fileName: [
					{required: true, message: '请输入文档名称', trigger: 'blur'}
				],
				editOffice: [
					{required: true, message: '请选择编制单位', trigger: 'blur'}
				],
				editPerson: [
					{required: true, message: '请输入编制人', trigger: 'blur'}
				],
				fileType: [
					{required: true, message: '请选择文档类型', trigger: 'blur'}
				],
				issueDate: [
					{required: true, message: '请选择下发日期', trigger: 'blur'}
				]
			},
			labelPosition: 'right',
			filelist:[],
			flag: false, //false: 上传, true: 换版
			changeVersion: true,
			offices: [],
			currentUser:'',
			isReloadBak:true,
			checkAll: false,
			isIndeterminate: true
		}
	},
	mounted: function(){

		this.form.issueDate = this.getNowFormatDay();
		this.currentUser = JSON.parse(getCookie("currentUser"));
		//console.log(this.$route)
		//console.log("isReload:"+this.isReload)
		//加载科室目录
		this.loadOffices();
		if(this.$route.params.isReload !== undefined){
			this.isReloadBak = this.$route.params.isReload;

		}
		
		if(!this.isReloadBak && !this.isReload){
			//若是更新动作，赋值form
			if(this.$route.params.changeVersion != undefined){
				this.changeVersion = this.$route.params.changeVersion;
			}
			this.flag = this.$route.params.flag;
			if(this.flag){
				//组件间传递对象，直接赋值会导致双向绑定，应该将对象转为字符串后再转回对象
				this.form = JSON.parse(JSON.stringify(this.$route.params.row));
				
			}
		}
		
	},
	methods: {
		handleChange(file){
			console.log(file);
			this.filelist = [];
			this.form.file = file.raw;
			this.filelist.push({
				name: file.name,
				url: ''
			});
			var tempName = file.name.substring(0,file.name.lastIndexOf("."));
			this.form.fileName = tempName;
			
		},
		handChangeVersion(){
			this.changeVersion = true;
		},
		onSubmit(formName){
			//表单校验
			var _this = this;
			this.$refs[formName].validate((valid) => {
				if(valid){
					if(_this.form.file == null && _this.changeVersion == true){
					_this.$notify.error({
						title: '表单错误',
						message: '请选择文件!'
					});
					return false;
				}
					_this.handleSubmit();
				}else{
					_this.$notify.error({
						title: '表单错误',
						message: '红色星号标记项必须填写!'
					});
					return false;
				}
			})
			
		},
		handleSubmit(){
			if(this.form.authorization.length == 1 && this.form.authorization[0] == "" ){
				this.form.authorization[0] = this.currentUser.office;
			}else{
				this.form.authorization = this.nameToId(this.form.authorization);
			}
			
			//带文件的表单数据不能直接用JSON格式发送，需要放进表单类型对象中
			var params = new FormData();
			params.append("id",this.form.id);
			params.append("fileNo",this.form.fileNo);
			params.append("oldFileNo", this.form.oldFileNo);
			params.append("file",this.form.file);
			params.append("fileName", this.form.fileName);
			params.append("editOffice", this.form.editOffice);
			params.append("editPerson", this.form.editPerson);
			params.append("fileType", this.form.fileType);
			params.append("issueDate", this.form.issueDate);
			params.append("major", this.form.major);
			params.append("plate", this.form.plate);
			params.append("status", this.form.status);
			params.append("pdmNo",this.form.pdmNo);
			params.append("note",this.form.note);

			params.append("authorization",this.form.authorization);
			//console.log(this.form.file);
			//因为是更新操作的参数，需要移除文件字段，所以不能直接赋值this.form
			let updateParams = {id:this.form.id,fileNo:this.form.fileNo,oldFileNo: this.form.oldFileNo,fileName: this.form.fileName,editOffice: this.form.editOffice,editPerson: this.form.editPerson, fileType: this.form.fileType, issueDate: this.form.issueDate, major: this.form.major, plate: this.form.plate, status: this.form.status, pdmNo: this.form.pdmNo, note: this.form.note, authorization: this.form.authorization};
			if(this.form.file == null && this.changeVersion == false){
				this.updateAnounce(updateParams); //更新基本信息
			}
			if(this.form.file != null){
				this.uploadFile(params); //新文件或换版
			}

		},
		loadOffices(){
			var _this = this;
			var url = "/office/all";
			getRequest(url,null).then(resp=> {
				if(resp.status == 200){
					_this.offices = resp.data.data;
					
					if (_this.form.authorization != null) {
						
						var ids = _this.form.authorization.toString().split(",");
						//通过id,换成名称
						_this.form.authorization = _this.idToName(ids);
						
						
					}else{
						_this.form.authorization = [];
					}
					
					
				}else{
					_this.$message({type: 'error', message: '科室目录加载失败！'});
				}
			},resp=> {
				_this.$message({type: 'error', message: '科室目录加载失败！'});
			})
		},
		uploadFile(params){
			var _this = this;
			var url = "/anounce/insert";
			if((this.form.file.size/1024/1024) > 30){
				_this.$alert("文件大小超过30M,不能上传!","失败");
				return;
			}
			//异步请求获取数据
			uploadFileRequest(url,params).then(resp=> {
				
				if(resp.status == 200 ){
					if (resp.data.code == 1000) {
						_this.$message({type: 'success', message: resp.data.data});
						//跳转首页
						let manage = "管理规定,管理标准,技术标准,体系规范,通知";
						let table = "综合类,管理类,专业类,模板";
						let redtape = "红头文件,体系通报,表扬通报,质量黑榜,内部通报,职能通报,其他";
						let task = "任务单";
						let work = "作业指导书";
						let analysis = "分析报告";
						let train = "培训资料";
						let flag = '';
						if (manage.indexOf(params.get("fileType")) > -1) {
							flag = "manage_list";
						}else if (table.indexOf(params.get("fileType")) > -1) {
							flag = "table_list";
						}else if (redtape.indexOf(params.get("fileType")) > -1) {
							flag = "redtape_list";
						}else if (task.indexOf(params.get("fileType")) > -1) {
							flag = "task_list";
						}else if (work.indexOf(params.get("fileType")) > -1) {
							flag = "work_list";
						}else if (analysis.indexOf(params.get("fileType")) > -1) {
							flag = "analysis_list";
						}else if (train.indexOf(params.get("fileType")) > -1) {
							flag = "train_list"
						}
						window.bus.$emit(flag);
						this.$router.push("/fileList");
					}else{
						_this.$message({type: 'error', message: resp.data.data});
					}
					
					
				}else{
					_this.$message({type: 'error', message: resp.data.msg});
				}
			})
		},
		updateAnounce(params){
			var _this = this;
			var url = "/anounce/update"
			postRequest(url,params).then(resp=> {
				if(resp.status == 200 ){
					if(resp.data.code == 1000){
						_this.$message({type: 'success', message: '更新成功！'});
						let manage = ["管理规定","管理标准","技术标准","体系规范","执行通知"];
						let table = ["综合类","管理类","专业类","模板"];
						let redtape = ["红头文件","体系通报","表扬通报","质量黑榜","内部通报","职能通报","其他"];
						let task = ["任务单"];
						let work = ["作业指导书"];
						let analysis = ["分析报告"];
						let train = ["培训资料"];
						let flag = '';
						if (manage.indexOf(params.fileType) > -1) {
							flag = "manage_list";
						}else if (table.indexOf(params.fileType) > -1) {
							flag = "table_list";
						}else if (redtape.indexOf(params.fileType) > -1) {
							flag = "redtape_list";
						}else if (task.indexOf(params.fileType) > -1) {
							flag = "task_list";
						}else if (work.indexOf(params.fileType) > -1) {
							flag = "work_list";
						}else if (analysis.indexOf(params.fileType) > -1) {
							flag = "analysis_list";
						}else if (train.indexOf(params.fileType) > -1) {
							flag = "train_list"
						}
						window.bus.$emit(flag);
						this.$router.push("/fileList");
					}else{
						_this.$message({type: 'error', message: resp.data.data});
					}
					
				}else{
					_this.$message({type: 'error', message: '更新失败'});
				}
			})
		},
		defaultOffice(){
			var _this = this;
			var url = "/office/"+this.form.editPerson;
			if(this.form.editPerson !== ""){
				getRequest(url).then(resp => {
					if(resp.status == 200 ){
						_this.form.editOffice = Number(resp.data.data);
					}
				})
			}
			
		},
		getNowFormatDay(nowDate) {
	        var char = "-";
	        if(nowDate == null){
	            nowDate = new Date();
	        }
	        var day = nowDate.getDate();
	        var month = nowDate.getMonth() + 1;//注意月份需要+1
	        var year = nowDate.getFullYear();
	        //补全0，并拼接
	        return year + char + this.completeDate(month) + char +this.completeDate(day);
	    },
	    completeDate(value) {
        	return value < 10 ? "0"+value:value;
    	},
    	idToName(values){
    		
    		if(values != null && values.length > 0){
    			for (var i = 0; i < values.length; i++) {
					for(var j = 0; j < this.offices.length; j++){
						if (values[i] == this.offices[j].id) {
							values[i] = this.offices[j].name;
							break;
						}
					}
				}
    		}else{
    			values = [];
    		}
    		
			return values;
    	},
    	nameToId(values){
    		
    		if (values != null && values.length > 0) {
    			for (var i = 0; i < values.length; i++) {
					for(var j = 0; j < this.offices.length; j++){
						if (values[i] == this.offices[j].name) {
							values[i] =  this.offices[j].id;
							break;
						}
					}
				}
    		}
    		
			return values;
    	},
    	handleCheckAllChange(val) {
    		console.log("handleCheckAllChange")
    		var temp = [];
    		for(var i = 0; i < this.offices.length; i++){
    			temp[i] = this.offices[i].name;
    		}
    		
	        this.form.authorization = val ? temp : [];
	        this.isIndeterminate = false;
	     },
	    handleCheckedOfficesChange(value) {

	        let checkedCount = value.length;
	        this.checkAll = checkedCount === this.offices.length;
	        this.isIndeterminate = checkedCount > 0 && checkedCount < this.offices.length;
	    }
	    

	},
	props: ['isReload']
}
</script>
<style type="text/css">
 
  .upload_div {
  	padding-top: 50px;
  	//border: 1px solid #E4E7ED;
    //border-radius: 4px;
    //width: 100%;
    text-align: center;
  }

  .upload_div .el-form {
  	
  	text-align: center;
  	margin: auto;
  }

  .upload-file  .el-form-item__label::before{
  	content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }
  .upload-form .el-form-item__content {
  	//width: 100%;
  }

</style>