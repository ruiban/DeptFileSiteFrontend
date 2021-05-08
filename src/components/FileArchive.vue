<template>
	<div >
		<div style="margin:10px 0 10px 0;">
			<span style="padding-right:50px;color:#909399;">当前路径:{{path.substring(path.indexOf("\\"))}}</span>
			<el-button  type="primary" size="mini" @click="topDir">顶层</el-button>
			<el-button v-if="topPath !== path" type="primary" size="mini"  @click="upDir">后退</el-button>
			<el-button type="primary" size="mini" @click="isShowDiglog = true">上传文件</el-button>
			<el-button type="primary" size="mini" @click="isShowMkdir = true">创建文件夹</el-button>
			<el-button type="primary" size="mini" @click="isShowMove = true">移动文件</el-button>
		</div>
		<el-table ref="multipleTable" border
			    :data="fileList"
			    style="width: 100%;" max-height="600"  tooltip-effect="dark" 
			    v-loading="loading" @selection-change="handleSelectionChange" >
			    <el-table-column type="selection" style="width: 5%;" align='center' >
	    		</el-table-column>
			    <el-table-column
			      label="文件类别"
			      style="width: 10%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.fileType }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="文件名"
			      style="width: 40%;" align='left'  >
			      <template slot-scope="scope">
			        
			        <el-link type="primary" :underline="false"  @click="handListFile(scope.row)">
			        	<i v-if="scope.row.dir" class="el-icon-folder" />
			        	<i v-else class="el-icon-document" />
			    		{{ scope.row.fileName }}
			    	</el-link>
			    	
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="文件大小"
			      style="width: 15%;" align='center' >
			      <template slot-scope="scope">
			        <span v-if="scope.row.dir">文件夹</span>
			        <span v-else >{{ scope.row.fileSize }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="上传时间"
			      style="width: 10%;" align='center' >
			      <template slot-scope="scope">
			        <span>{{ scope.row.uploadTime }}</span>
			      </template>
			    </el-table-column>
			   
			    <el-table-column label="操作" style="width: 20%;" align='center'>
			    	<template slot-scope="scope">
			    		<el-button type="primary" size="mini" @click="showRename(scope.$index,scope.row)">重命名</el-button>
			    		<el-button type="success" size="mini" v-if="!scope.row.dir" @click="handleDownload(scope.$index,scope.row)"  >下载</el-button>
			    		<el-button type="danger" size="mini" @click="handleDelte(scope.$index,scope.row)"  >删除</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-dialog title="上传文件" :visible.sync="isShowDiglog" width="50%" center>
				<el-form :model="uploadForm"  ref="uploadForm">
					<el-form-item label="文件归档到: (当前路径作为父目录，填入文件夹名;若归档到当前目录下无需填写)" >
						<el-input v-model="uploadForm.path" />
					</el-form-item>
					<el-form-item label="上传文件" >
					   	<el-upload
						  class="upload-demo"
						  ref="upload"
						  action=""
						  :limit="1"
						  :on-change = "handleChange"
						  :file-list="uploadFile"
						  :auto-upload="false">
						  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						</el-upload>
			  		</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel('uploadForm')">取消</el-button>
					<el-button type="primary" @click="saveUpload('uploadForm')">保存</el-button>
				</div>
			</el-dialog>
			<el-dialog title="重命名" :visible.sync = "isShowRename" width="50%" center>
				<el-form :model="renameForm" ref="renameForm" :rules="rules">
					<el-form-item label="文件新名称: (不需要加后缀)" prop="newName" >
						<el-input v-model="renameForm.newName" />
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel('renameForm')">取消</el-button>
					<el-button type="primary" @click="saveRename('renameForm')">保存</el-button>
				</div>
			</el-dialog>
			<el-dialog title="创建文件夹" :visible.sync = "isShowMkdir" width="50%" center>
				<el-form :model="dirForm" ref="dirForm" :rules="rules">
					<el-form-item label="新文件夹名称: (不要含有\ / 双引号)" prop="dirName" >
						<el-input v-model="dirForm.dirName" />
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel('dirForm')">取消</el-button>
					<el-button type="primary" @click="saveDir('dirForm')">保存</el-button>
				</div>
			</el-dialog>
			<el-dialog title="移动文件" :visible.sync = "isShowMove" width="50%" center>
				<el-form :model="moveForm" ref="moveForm" :rules="rules">
					<el-form-item label="输入目标路径: (如\abc\)" prop="newPath" >
						<el-input v-model="moveForm.newPath" />
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancel('moveForm')">取消</el-button>
					<el-button type="primary" @click="saveMove('moveForm')">保存</el-button>
				</div>
			</el-dialog>
			
		</div>
	</div>
</template>

<script>
import {getRequest} from '../api/api'
import {postRequest} from '../api/api'
import {uploadFileRequest} from '../api/api'
import {downloadRequest} from '../api/api'
 
	export default{
		data(){
			return{
				fileList:[],
				loading:true,
				topPath: "F:\\归类测试",
				path: "F:\\归类测试",
				isShowDiglog: false,
				isShowRename: false,
				isShowMkdir: false,
				isShowMove: false,
				uploadFile:[],
				uploadForm:{
					path:'',
					file:null
				},
				renameForm:{
					oldPath:'',
					newName:''
				},
				dirForm:{
					dirName:'',
				},
				moveForm:{
					oldPaths:[],
					newPath:''
				},
				rules:{
					newName:[
						{required:true,message:"文件新名称不能为空",trigger:"blur"}
					],
					dirName:[
						{required:true,message:"新文件夹名称不能为空",trigger:"blur"}
					],
					newPath:[
						{required:true,message:"目标路径不能为空",trigger:"blur"}
					]
				},
				selItems:[]
				
			}
		},
		mounted:function(){
			this.loadFiles(this.path);
		},
		methods: {
			loadFiles(path){
				var _this = this;
				var url = "/archive/fileList";
				var params = {path: path}
				postRequest(url,params).then(resp => {
					if (resp.status == 200) {
						//console.log(resp.data.fileList);
						if(resp.data.fileList){
							_this.fileList = resp.data.fileList;
							_this.loading = false;
							_this.path = path;
						}
						
					}
				}).catch(resp => {

				})
			},
			handListFile(row){
				//console.log(this.path);
				if (row.dir) {
					this.loadFiles(this.path+"\\"+row.fileName);
				}else{
					//下载操作
				}
				
			},
			upDir(){
				//console.log("当前路径:"+this.path);
				var temp = this.path.substring(0,this.path.lastIndexOf("\\"));
				//console.log("上一级："+temp);
				this.loadFiles(temp);
			},
			topDir(){
				this.loadFiles(this.topPath);
			},
			handleChange(file){
				//console.log(file);
				this.uploadFile = [];
				this.uploadForm.file = file.raw;
				this.uploadFile.push({
					name: file.name,
					url: ''
				});
				
			},
			saveUpload(uploadForm){
				var _this = this;
				this.$refs[uploadForm].validate((valid) => {
					if (valid) {
						if(_this.uploadForm.file == null){
							_this.$notify.error({
								title: '表单错误',
								message: '请选择文件!'
							});
							return false;
						}
						var params = new FormData();
						params.append("path",_this.path+"\\"+_this.uploadForm.path);
						params.append("file",_this.uploadForm.file);
						//console.log(params);
						let url = "/archive/upload";
						uploadFileRequest(url,params).then(resp => {
							if (resp.status == 200) {
								if (resp.data.status === 'success') {
									_this.uploadForm.path = '';
									_this.uploadForm.file = null;
									_this.uploadFile = [];
									_this.isShowDiglog = false;
									_this.loadFiles(_this.path);
									_this.$message({type:"success",message:resp.data.msg});

								}
							}
						})
					}
				})
				
			},
			cancel(form){
				console.log(this.$refs[form]);
				this.$refs[form].resetFields();
				this.isShowDiglog = false;
				this.isShowRename = false;
				this.isShowMove = false;
				this.isShowMkdir = false;
			},
			// cancelUpload(){
			// 	this.uploadForm.path = '';
			// 	this.uploadForm.file = null;
			// 	this.uploadFile = [];
			// 	this.isShowDiglog = false;
			// },
			showRename(index,row){
				this.isShowRename = true;
				this.renameForm.oldPath = this.path + "\\" + row.fileName;
				console.log(this.renameForm.oldPath);
			},
			saveRename(renameForm){
				var _this = this;
				this.$refs[renameForm].validate((valid) => {
					if(valid){
						let url = "/archive/rename";
						//console.log(_this.renameForm);
						postRequest(url,_this.renameForm).then(resp => {
							if (resp.status == 200) {
								if (resp.data.status === 'success') {
									_this.renameForm.oldPath = '';
									_this.renameForm.newName = '';
									_this.isShowRename = false;
									_this.loadFiles(_this.path);
									_this.$message({type:"success",message:resp.data.msg});
								}
							}
						})
					}else{
						_this.$notify.error({
							title: '表单错误',
							message: '红色星号标记项必须填写!'
						});
						return false;
					}
				});
				
			},
			cancelRename(){
				this.renameForm.oldPath = '';
				this.renameForm.newName = '';
				//this.$refs.renameForm.resetFields();
				this.isShowRename = false;
			},
			handleDelte(index,row){
				var _this = this;
				this.$confirm('此操作将会删除该文件，一旦删除就不能恢复，建议你重新检查一次选中的文件，或者使用重命名代替删除，是否继续?','提示',{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let url = "/archive/delete";
					let params = {path: _this.path + "\\" + row.fileName}
					postRequest(url,params).then(resp => {
						if (resp.status === 200) {
							if (resp.data.status === "success") {
								_this.$message({type:"success",message:resp.data.msg});
								_this.loadFiles(_this.path);
							}
						}
					})
				}).catch(() => {
						
					})
			},
			handleDownload(index,row){
				var _this = this;
				let url = "archive/download";
				let params = {path:this.path + "\\" + row.fileName}
				downloadRequest(url,params).then(resp => {
					if(resp.status === 200){
						if (resp.data.size == 0) {
							_this.$message({type: 'error', message: '不存在该文档'});
							return;
						}
						let url = window.URL.createObjectURL(new Blob([resp.data]));
						let a = document.createElement('a');
						a.style.display = 'nono';
						a.href = url;
						a.setAttribute('download',row.fileName);
						document.body.appendChild(a);
						a.click();
						//释放对象
						window.URL.revokeObjectURL(url);
						_this.$message({type:"success",message:"正在下载"});
					}else{
						_this.$message({type:"error",message:"下载失败"});
					}
				},resp => {
					_this.$message({type:"error",message:"服务器异常"});
				})
			},
			saveDir(dirForm){
				var _this = this;
				this.$refs[dirForm].validate((valid) => {
					if(valid){
						let url = "/archive/mkdirs";
						let params = {path: _this.path + "\\" + _this.dirForm.dirName}

						postRequest(url,params).then(resp => {
							if (resp.status == 200) {
								if (resp.data.status === 'success') {
									_this.dirForm.dirName = '';
									_this.isShowMkdir = false;
									_this.loadFiles(_this.path);
									_this.$message({type:"success",message:resp.data.msg});
								}else{
									_this.$message({type:"error",message:resp.data.msg});
								}
							}
						})
					}else{
						_this.$notify.error({
							title: '表单错误',
							message: '红色星号标记项必须填写!'
						});
						return false;
					}
				});
				
			},
			cancelDir(){
				this.dirForm.dirName = '';
				this.isShowMkdir = false;
			},
			handleSelectionChange(val){
				this.selItems = val;
			},
			saveMove(moveForm){
				var _this = this;
				console.log(this.topPath +  this.moveForm.newPath);
				this.$refs[moveForm].validate((valid) => {
					if(valid){
						let url = "/archive/move";
						var len = _this.selItems.length;
						if (len < 1) {
							_this.$message({type:"error",message:"请选择要移动的文件"});
							_this.isShowMove = false;
							return;
						}
						for(let i = 0; i < len; i++){
							_this.moveForm.oldPaths[i] =_this.path + "\\" + _this.selItems[i].fileName
						}
						let params = {
							oldPaths: _this.moveForm.oldPaths,
							newPath: _this.topPath + _this.moveForm.newPath
						}
						console.log(params);
						postRequest(url,params).then(resp => {
							if (resp.status == 200) {
								if (resp.data.status === 'success') {
									_this.selItems = [];
									_this.moveForm.newPath = '';
									_this.moveForm.oldPaths = [];
									_this.isShowMove = false;
									_this.$refs.multipleTable.clearSelection();
									_this.loadFiles(_this.path);
									_this.$message({type:"success",message:resp.data.msg});
								}else{
									_this.$message({type:"error",message:resp.data.msg});
								}
							}
						})
					}else{
						_this.$notify.error({
							title: '表单错误',
							message: '红色星号标记项必须填写!'
						});
						return false;
					}
				});
				
			},
			cancelMove(){
				this.moveForm.oldPaths = [];
				this.moveForm.newPath = '';
				//取消选择
				this.$refs.multipleTable.clearSelection();
				this.isShowMove = false;
			},
		}
	}
</script>