(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{660:function(n,t,e){"use strict";e.r(t);var a=e(106),i=e.n(a),o=e(137),s=e.n(o),r=e(12),c=e.n(r),p=e(400),l={props:["pageNo","pageSize","site","reflesh"],data:function(){return{current_search_key:"keywords",search_value:"",search_key_optinos:[{key:"keywords",label:"页面名称"}]}},computed:{platform:function(){return"wap"},current_search_placeholder:function(){var n=this;return"请输入需要搜索的"+this.search_key_optinos.filter((function(t){return t.key==n.current_search_key}))[0].label}},watch:{pageNo:function(){this.handle_search()},platform:function(){this.handle_search()},reflesh:function(){this.handle_search()}},methods:{handle_new:function(){},handle_search:function(){if(""==this.platform||""==this.site)return!1;this.$emit("beforeResponse",!0),0==p.code&&(this.$emit("response",p.data),this.$emit("beforeResponse",!1))}},mounted:function(){this.handle_search()}},d=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"list-filter"},[e("a-input-group",{attrs:{compact:"",size:"large"}},[e("a-select",{staticStyle:{width:"140px"},model:{value:n.current_search_key,callback:function(t){n.current_search_key=t},expression:"current_search_key"}},[n._l(n.search_key_optinos,(function(t){return[e("a-select-option",{key:t.key,attrs:{value:t.key}},[n._v(n._s(t.label))])]}))],2),n._v(" "),e("a-input",{attrs:{placeholder:n.current_search_placeholder},on:{pressEnter:n.handle_search},model:{value:n.search_value,callback:function(t){n.search_value=t},expression:"search_value"}})],1),n._v(" "),e("a-button",{attrs:{size:"large",type:"primary"},on:{click:n.handle_new}},[n._v("+新增页面")])],1)};d._withStripped=!0;var u=e(27);var g=function(n){e(697)},h=Object(u.a)(l,d,[],!1,g,null,null);h.options.__file="src/views/home/unit/list-filter.vue";var f=h.exports,v={props:{info:{type:Object}},methods:{handle_design:function(){this.$router.push({path:"/design?id="+this.info.pageId})}}},_=function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"sub-page-controller"},[t("button",{on:{click:this.handle_design}},[t("a-icon",{attrs:{theme:"filled",type:"edit"}}),this._v(" "),t("label",[this._v("装修")])],1),this._v(" "),t("button",[t("a-icon",{attrs:{theme:"filled",type:"eye"}}),this._v(" "),t("label",[this._v("预览")])],1)])};_._withStripped=!0;var b=function(n){e(701)},x=Object(u.a)(v,_,[],!1,b,"data-v-ad513d08",null);x.options.__file="src/views/home/unit/list-item-controller.vue";var m=x.exports,y={props:{info:{type:Object},site:{type:String,required:!0},platform:{type:String},disabled:{type:Boolean,default:!1}},components:{controller:m},data:function(){return{create_name:"Cullen",update_name:"Cullen"}},methods:{handle_delete:function(){var n=this;this.$confirm({title:"提示",content:"确定删除首页列表信息吗？删除后，不可恢复，请谨慎操作！",okText:"删除",okType:"danger",cancelText:"取消",onOk:function(){n.$message.success("页面删除成功")}})}}},k=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"sub-page-item"},[n.info.pageId?[e("div",{staticClass:"sub-page-tag grey"},[n._v("草稿")]),n._v(" "),"wap"==n.info.platform?e("div",{staticClass:"sub-page-native-tag"},[e("a-icon",{attrs:{type:"mobile"}})],1):n._e(),n._v(" "),e("img",{staticClass:"sub-page-image",attrs:{src:n.info.banner}}),n._v(" "),e("div",{staticClass:"sub-page-info"},[e("div",{staticClass:"sub-page-id"},[n._v("\n                ID: "+n._s(n.info.pageId)+" \n            ")]),n._v(" "),e("div",{staticClass:"sub-page-title"},[n._v(n._s(n.info.pageTitle))]),n._v(" "),e("div",[e("span",{staticClass:"sub-page-create-time"},[e("a-icon",{attrs:{type:"file-add"}}),n._v("2020-06-18 18:18:04\n                ")],1),n._v(" "),e("span",{staticClass:"sub-page-creator"},[n._v(n._s(n.create_name))])]),n._v(" "),e("div",[e("span",{staticClass:"sub-page-update-time"},[e("a-icon",{attrs:{type:"form"}}),n._v("2020-06-18 18:18:04\n                ")],1),n._v(" "),e("span",{staticClass:"sub-page-updator"},[n._v(n._s(n.update_name))])]),n._v(" "),e("a",{staticClass:"sub-page-view",attrs:{href:"javascript:;"}},[n._v("\n                查看访问地址\n            ")]),n._v(" "),e("div",{staticClass:"sub-page-more"},[e("a-dropdown",[e("a",{staticClass:"ant-dropdown-link",on:{click:function(n){return n.preventDefault()}}},[e("a-icon",{attrs:{type:"ellipsis"}})],1),n._v(" "),e("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[e("a-menu-item",{attrs:{disabled:n.disabled},on:{click:n.handle_delete}},[n._v("删除")])],1)],1)],1)]),n._v(" "),n.disabled?e("div",{staticClass:"sub-page-item-lock"},[e("a-icon",{attrs:{type:"lock"}}),n._v(" "),e("label",[n._v("已锁定")])],1):n._e(),n._v(" "),n.disabled?n._e():e("controller",{attrs:{info:n.info}})]:n._e()],2)};k._withStripped=!0;var w=function(n){e(699)},C=Object(u.a)(y,k,[],!1,w,"data-v-01c87cc6",null);C.options.__file="src/views/home/unit/list-item.vue";var z={data:function(){return{platform:"",site_support_pipelines:{},loading:!1,main_page_list:[],main_page_pagination:{current:1,pageSize:10,total:1}}},computed:{site_platform_list:function(){var n=[];return n=n.filter((function(n){return"app"!=n.code}))},site:function(){return"zf"}},components:{listFilter:f,listItem:C.exports},methods:{handle_loading:function(n){this.loading=n},handle_show_dialog:function(n){var t=n.name,e=n.data,a=void 0===e?{}:e;this.$refs[t].show(a)},handle_search:function(){this.$refs.filter.handle_search()},handle_get_main_page:function(n){this.main_page_list=[].concat(c()(n)),this.main_page_pagination.total=parseInt(n.length),this.handle_loading(!1)},handle_device_tab_change:function(n){this.$store.commit("home/update_platform",n),this.main_page_pagination.current=1},handle_page_change:function(n){this.main_page_pagination.current=n},handle_delete:function(n){var t=this;return s()(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ZF_deleteIndex({group_id:n});case 2:0==(a=e.sent).code&&(t.handle_search(),t.$message.success(a.message));case 4:case"end":return e.stop()}}),e,t)})))()}}},F=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticStyle:{background:"#F0F2F5"},attrs:{id:"page-activity"}},[e("list-filter",{ref:"filter",attrs:{site:n.site,platform:n.platform,pageNo:n.main_page_pagination.current,pageSize:n.main_page_pagination.pageSize},on:{showDialog:n.handle_show_dialog,beforeResponse:n.handle_loading,response:n.handle_get_main_page}}),n._v(" "),e("a-tabs",{staticClass:"main-page-device-tabs",on:{change:n.handle_device_tab_change}},n._l(n.site_platform_list,(function(n){return e("a-tab-pane",{key:n.code,attrs:{tab:n.name}})})),1),n._v(" "),e("a-spin",{attrs:{spinning:n.loading}},[e("div",{staticClass:"main-page-list"},[e("ul",{staticClass:"page-list"},n._l(n.main_page_list,(function(t){return e("li",{key:t.id},[e("list-item",{attrs:{info:t,site:n.site},on:{onDelete:n.handle_delete}})],1)})),0),n._v(" "),e("a-pagination",{staticClass:"page-pagination",attrs:{showQuickJumper:"",current:n.main_page_pagination.current,total:n.main_page_pagination.total},on:{change:n.handle_page_change}})],1)])],1)};F._withStripped=!0;var $=function(n){e(693),e(695)},S=Object(u.a)(z,F,[],!1,$,"data-v-5954443c",null);S.options.__file="src/views/home/index.vue";t.default=S.exports},693:function(n,t,e){var a=e(694);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);(0,e(51).default)("41b96e1c",a,!1,{})},694:function(n,t,e){(n.exports=e(47)(!1)).push([n.i,"\n#page-activity {\n  position: relative;\n}\n#page-activity .main-page-device-tabs {\n  height: 50px;\n}\n#page-activity .main-page-device-tabs .ant-tabs-nav-container {\n  font-size: 18px !important;\n}\n",""])},695:function(n,t,e){var a=e(696);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);(0,e(51).default)("6fcf08e6",a,!1,{})},696:function(n,t,e){(n.exports=e(47)(!1)).push([n.i,"\n.main-page-list[data-v-5954443c] {\n  width: 100%;\n  flex-shrink: 0;\n}\n.main-page-list ul.page-list[data-v-5954443c] {\n  list-style: none;\n  padding: 0px;\n  margin: 0px;\n  padding-left: 40px;\n  padding-top: 40px;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n}\n.main-page-list ul.page-list li[data-v-5954443c] {\n  width: 290px;\n  height: 272px;\n  margin-right: 40px;\n  margin-bottom: 36px;\n  background-color: #fff;\n  border-radius: 10px;\n}\n.main-page-list ul.page-list li[data-v-5954443c]:hover {\n  box-shadow: 0px 2px 20px 0px #b9c3cd;\n}\n.main-page-list .ant-pagination[data-v-5954443c] {\n  text-align: center;\n  margin-top: 24px;\n}\n",""])},697:function(n,t,e){var a=e(698);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);(0,e(51).default)("9c90a6be",a,!1,{})},698:function(n,t,e){(n.exports=e(47)(!1)).push([n.i,"\n.list-filter {\n  position: absolute;\n  right: 0px;\n  top: -50px;\n  display: flex;\n  flex-wrap: nowrap;\n}\n.list-filter .ant-input-group {\n  width: 700px;\n  display: flex;\n  margin-right: 16px;\n}\n.list-filter .ant-input-group .ant-select-selection {\n  border-radius: 20px 0 0px 20px !important;\n}\n.list-filter .ant-input-group .ant-select-selection-selected-value {\n  line-height: 40px;\n}\n.list-filter .ant-input-group .ant-input {\n  border-radius: 0 20px 20px 0px;\n}\n.list-filter > .ant-btn {\n  margin-left: 8px;\n  border-radius: 20px;\n  font-size: 14px;\n}\n.list-filter .ant-select-selection-selected-value {\n  width: 100%;\n  text-align: center;\n}\n",""])},699:function(n,t,e){var a=e(700);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);(0,e(51).default)("60d59b24",a,!1,{})},700:function(n,t,e){(n.exports=e(47)(!1)).push([n.i,"\n.sub-page-item[data-v-01c87cc6] {\n  position: relative;\n}\n.anticon-plus[data-v-01c87cc6] {\n  display: block;\n  text-align: center;\n  width: 100%;\n  font-size: 56px;\n  color: #949AA1;\n  margin-top: 94px;\n}\n.anticon-plus + label[data-v-01c87cc6] {\n  display: block;\n  text-align: center;\n  margin-top: 20px;\n  color: #949AA1;\n}\n.sub-page-image[data-v-01c87cc6] {\n  display: grid;\n  width: 290px;\n  height: 108px;\n  border-radius: 10px 10px 0px 0px;\n}\n.sub-page-tag[data-v-01c87cc6] {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  padding-left: 8px;\n  padding-right: 8px;\n  height: 24px;\n  line-height: 24px;\n  border-radius: 10px 0px 10px 0px;\n  color: #fff;\n  font-size: 12px;\n}\n.sub-page-tag.warn[data-v-01c87cc6] {\n  background: #ffa11d;\n}\n.sub-page-tag.green[data-v-01c87cc6] {\n  background: #00CB93;\n}\n.sub-page-tag.grey[data-v-01c87cc6] {\n  background: #949AA1;\n}\n.sub-page-native-tag[data-v-01c87cc6] {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  color: #1e9fff;\n  font-size: 24px;\n}\n.activity-tag[data-v-01c87cc6] {\n  position: absolute;\n  right: 0px;\n  width: 50px;\n  height: 24px;\n  border-radius: 12px 0px 0px 12px;\n  top: 142px;\n  text-align: center;\n  font-size: 12px;\n  line-height: 24px;\n}\n.activity-tag.green[data-v-01c87cc6] {\n  color: #02C5BC;\n  background-color: rgba(2, 197, 188, 0.15);\n}\n.activity-tag.pink[data-v-01c87cc6] {\n  color: #A476FF;\n  background-color: rgba(164, 118, 255, 0.15);\n}\n.sub-page-info[data-v-01c87cc6] {\n  padding: 16px;\n  padding-bottom: 0px;\n}\n.sub-page-id[data-v-01c87cc6] {\n  color: #409EFF;\n  margin-bottom: 4px;\n}\n.sub-page-title[data-v-01c87cc6] {\n  font-size: 16px;\n  color: #3F4245;\n  height: 22px;\n  line-height: 22px;\n  margin-bottom: 12px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.sub-page-creator[data-v-01c87cc6],\n.sub-page-create-time[data-v-01c87cc6],\n.sub-page-update-time[data-v-01c87cc6],\n.sub-page-updator[data-v-01c87cc6] {\n  color: #949AA1;\n  font-size: 12px;\n}\n.sub-page-creator[data-v-01c87cc6],\n.sub-page-updator[data-v-01c87cc6] {\n  float: right;\n}\n.sub-page-view[data-v-01c87cc6] {\n  display: inline-block;\n  clear: both;\n  margin-top: 8px;\n  min-height: 21px;\n  color: #6B7075;\n}\n.sub-page-view[data-v-01c87cc6]:hover {\n  color: #409EFF;\n}\n.sub-page-view-ids[data-v-01c87cc6] {\n  color: #6B7075;\n}\n.sub-page-item:hover .sub-page-controller[data-v-01c87cc6] {\n  opacity: 1;\n}\n.sub-page-item-lock[data-v-01c87cc6] {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  right: 0px;\n  height: 108px;\n  background-color: rgba(255, 255, 255, 0.88);\n  text-align: center;\n  border-radius: 10px 10px 0 0;\n}\n.sub-page-item-lock i[data-v-01c87cc6] {\n  font-size: 30px;\n  margin-top: 25px;\n}\n.sub-page-item-lock label[data-v-01c87cc6] {\n  display: block;\n  line-height: 2em;\n}\n.sub-page-more[data-v-01c87cc6] {\n  position: absolute;\n  right: 10px;\n  bottom: 22px;\n}\n.ant-dropdown-link[data-v-01c87cc6] {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  font-weight: bold;\n  height: 28px;\n  line-height: 28px;\n}\n.ant-dropdown-link .anticon[data-v-01c87cc6]:hover {\n  background-color: #409EFF;\n  border-radius: 100%;\n}\n.ant-dropdown-link .anticon:hover svg[data-v-01c87cc6] {\n  color: #fff;\n}\n.ant-dropdown-link svg[data-v-01c87cc6] {\n  font-size: 28px;\n}\n",""])},701:function(n,t,e){var a=e(702);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);(0,e(51).default)("dca78822",a,!1,{})},702:function(n,t,e){(n.exports=e(47)(!1)).push([n.i,"\n.sub-page-controller[data-v-ad513d08] {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  right: 0px;\n  line-height: 108px;\n  background-color: rgba(255, 255, 255, 0.88);\n  text-align: center;\n  border-radius: 10px 10px 0 0;\n  opacity: 0;\n}\n.sub-page-controller > button[data-v-ad513d08] {\n  display: inline-block;\n  width: 48px;\n  height: 32px;\n  line-height: 30px;\n  margin: 0 6px;\n  border-radius: 16px;\n  vertical-align: middle;\n  border: 1px solid #409eff;\n  background-color: #fff;\n  cursor: pointer;\n  outline: none;\n}\n.sub-page-controller > button i[data-v-ad513d08] {\n  display: block;\n  color: #409EFF;\n  font-size: 22px;\n}\n.sub-page-controller > button label[data-v-ad513d08] {\n  display: none;\n}\n.sub-page-controller > button[data-v-ad513d08]:hover {\n  background: #409eff;\n}\n.sub-page-controller > button:hover label[data-v-ad513d08] {\n  display: block;\n  color: #fff;\n  font-size: 12px;\n  cursor: pointer;\n}\n.sub-page-controller > button:hover i[data-v-ad513d08] {\n  display: none;\n}\n",""])}}]);