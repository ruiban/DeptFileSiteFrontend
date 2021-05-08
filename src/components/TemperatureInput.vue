<template>
	<div class="main" >
		<el-form :model="form" :rules="rules" ref="form">
			<el-table :data="form.temperatures" max-height="630" border style="width: 100%;">
				<el-table-column  label="科室" style="width: 25%;" >
					<template slot-scope="scope">
						<span>{{scope.row.office}}</span>
					</template>
				</el-table-column>
				<el-table-column  label="姓名" style="width: 25%;">
					<template slot-scope="scope">
						<span>{{scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column v-if="currentTime<forenoon" label="上午温度" style="width: 25%;">
					<template slot-scope="scope">
						<el-form-item :prop="'temperatures.' + scope.$index + '.temperatureAM'" 
						:rules="rules.temperatureAM" >
							<el-input :ref="scope.row.id" v-model="scope.row.temperatureAM"  />
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column v-if="currentTime>forenoon" label="下午温度" style="width: 25%;">
					<template slot-scope="scope">
						<el-form-item :prop="'temperatures.' + scope.$index + '.temperaturePM'"
						:rules="rules.temperaturePM">
							<el-input :ref="scope.row.id" v-model="scope.row.temperaturePM"  />
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column  label="备注" style="width: 25%;">
					<template slot-scope="scope">
						<el-form-item>
							<el-select v-model="scope.row.note" >
								<el-option v-for="(item , index) in options"
									:key="index" :label="item.label"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</template>
				</el-table-column>
			</el-table>
			<el-form-item>
				<el-button v-if="isShow" type="primary" @click="onSumbit('form')" >保存</el-button>
				<el-button v-if="isShow" @click="resetForm('form')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import {postRequest} from '../api/api'
import {putRequest} from '../api/api'
import {getRequest} from '../api/api'
import {nameToId} from '../util/common'
import {idToName} from '../util/common'
import {getCookie} from '../util/common'

export default{

	data(){
		return{
			form:{
				temperatures: []
			},
			rules: {
				temperatureAM: [{required: true,message: "请输入上午温度", trigger: 'blur'}],
				temperaturePM: [{required: true,message: "请输入下午温度", trigger: 'blur'}],
			},
			options:[
				{label:"正常",value: "正常"},
				{label:"上午请假",value:"上午请假"},
				{label:"下午请假",value:"下午请假"},
				{label:"请假一天",value:"请假一天"},
				{label:"通宵调休",value:"通宵调休"},
				{label:"出差",value:"出差"}
			],
			forenoon:1145,
			afternoon:1730,
			currentTime:0,
			isShow:true,
			role: '',
			focus: 1,
			offices: []
		}
	},
	mounted: function(){
		//this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
		this.currentUser = JSON.parse(getCookie("currentUser"));
		this.loadOffices();
		this.getRole();
		this.getCurrentTime();
		this.initForm();
		
		
	},
	methods:{
		getRole(){
			for(let i = 0 ; i < this.currentUser.roles.length; i++){
				if(this.currentUser.roles[i].name === '超级管理员' || this.currentUser.roles[i].name === '体温管理员' ){
					this.role = this.currentUser.roles[i].name;
					break;
				}
			}
		},
		getCurrentTime(){
			let currentDate = new Date();
			let hours = currentDate.getHours();
			let min = currentDate.getMinutes();
			if(min < 10){
				min=0+''+min;
			}
			this.currentTime =  hours+''+min;
			
		},
		onSumbit(formName){
			var _this = this;
			this.$refs[formName].validate((valid) => {
				if(valid){
					_this.save();
				}else{
					_this.$notify.error({
						title: '表单错误',
						message: '必填项没有填写!'
					});
					return false;
				}
			})
			
		},
		resetForm(formName) {
	       this.$refs[formName].resetFields();
	    },
		initForm(){
			var _this = this;
			var url = "/temperature/initForm";
			// if (this.currentTime > this.forenoon) {
			// 	url = "/temperature/updateForm";
			// }
			getRequest(url).then(resp => {
				if(resp.status == 200){
					_this.form.temperatures = idToName(resp.data.data, _this.offices);
					
					//这段时间不能提交
					if(_this.currentTime > _this.forenoon && _this.currentTime < 1200 || _this.currentTime > _this.afternoon){
						_this.isShow = false;
					}
					if(_this.role === '体温管理员' || _this.role === '超级管理员'){
						_this.isShow = true;
					}
				}else{
					_this.$message({type:"error",message:"初始化表单失败!"});
				}
			}).catch(resp => {
				_this.$message({type:"error",message:"服务器响应异常!"});
			})
		},
		nextFocus(row,index,e){
			
			e.target.blur();
			if(Object.keys(this.$refs)[index+1] === 'form'){
				index = -1;
			}
			this.$refs[Object.keys(this.$refs)[index+1]].focus();
			
		},
		save(){
			var _this = this;
			var url = "/temperature/insert";
			//id不为0,说明是数据库中的数据，进行更新操作
			if (this.form.temperatures[0].id != 0) {
				url = "/temperature/update";
			}
			this.form.temperatures = nameToId(this.form.temperatures,this.offices);

			putRequest(url,this.form.temperatures).then(resp => {
				if(resp.status == 200){
					if(resp.data.code === 1000){
						_this.$message({type:"success",message: resp.data.data});
						//更新表单
						_this.initForm();
						window.bus.$emit('mask_statistical');
						window.bus.$emit('temperature_query');
						//_this.isShow = false;
					}else{
						_this.$message({type:"error",message: resp.data.data});
					}
				}else{
					_this.$message({type:"error",message: "提交失败！"});
				}
			}).catch(resp => {
				_this.$message({type: "error",message: "服务器异常！"});
			});

		},
		loadOffices(){
			var _this = this;
			var url = "/office/all";
			getRequest(url,null).then(resp=> {
				if(resp.status == 200){
					_this.offices = resp.data.data;
					
					
				}else{
					_this.$message({type: 'error', message: '科室目录加载失败！'});
				}
			},resp=> {
				_this.$message({type: 'error', message: '科室目录加载失败！'});
			})
		},
		
	},
}
</script>