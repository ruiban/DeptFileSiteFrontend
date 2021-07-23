
import {getRequest} from '../api/api'

export const idToName_anounce = (values,offices) => {
	for (var i = 0; i < values.length; i++) {
			for(var j = 0; j < offices.length; j++){
				if (values[i].editOffice == offices[j].id) {
					values[i].editOffice = offices[j].name;
					break;
				}
			}
		}
	return values;
    
}

export const idToName = (values,offices) => {
	for (var i = 0; i < values.length; i++) {
			for(var j = 0; j < offices.length; j++){
				if (values[i].office == offices[j].id) {
					values[i].office = offices[j].name;
					break;
				}
			}
		}
	return values;
    
}

export const nameToId = (values,offices) => {
	for (var i = 0; i < values.length; i++) {
			for(var j = 0; j < offices.length; j++){
				if (values[i].office == offices[j].name) {
					values[i].office = offices[j].id;
					break;
				}
			}
		}
	return values;
}

export const loadCurrentUser = (_this) => {
	
    getRequest('/user/currentUser').then(resp=> {
      if (resp.status == 200) {
        let currentUser = {id:resp.data.data.id,
          username:resp.data.data.username,
          office:resp.data.data.office,
          roles:resp.data.data.roles}
        //sessionStorage.setItem('currentUser',JSON.stringify(currentUser));
        window.document.cookie = "currentUser" + "=" + JSON.stringify(currentUser);
        let permissions = [];
        let permissions_user = [];
        let roles = JSON.stringify(resp.data.data.roles);
        //文档的编辑删除权限
        if(roles.toString().indexOf("超级管理员") > -1 || roles.toString().indexOf("体系管理员") > -1){
          permissions.push("deletePerm");
          permissions.push("editPerm");
        }

        //sessionStorage.setItem('permissions',permissions);
        window.document.cookie = "permissions"+"="+permissions;
        //sessionStorage.setItem('permissions_user',permissions_user);
        _this.$router.replace({path: '/workbeach'});
      }else{
        _this.$alert('登陆失败，获取不到该用户的信息!', '失败!');
      }
    });
}

export const getCookie = (key) => {
	var temp;
	if (document.cookie.length > 0) {
      var arr = document.cookie.split("; "); 
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("="); //再次切割
        //判断查找相对应的值
        if (arr2[0] == key) {
          temp = arr2[1];
        }
      }
    }
    return temp;
}