(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{821:function(t,e,n){var i=n(822);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(51).default)("f9949f8e",i,!1,{})},822:function(t,e,n){(t.exports=n(47)(!1)).push([t.i,"\n.component-wrapper[data-v-47fb7308] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  width: 10rem;\n}\n.component-wrapper .timer[data-v-47fb7308] {\n  width: 100%;\n  padding: 0.32rem 0;\n  text-align: center;\n}\n.component-wrapper .timer .timer-title[data-v-47fb7308] {\n  display: inline-block;\n  font-size: 0.53333333rem;\n  line-height: 0.72rem;\n  height: 0.72rem;\n}\n.component-wrapper .timer .timer-right[data-v-47fb7308] {\n  font-size: 0.42666667rem;\n}\n.component-wrapper .timer span.timer-text[data-v-47fb7308] {\n  margin-right: 0.16rem;\n}\n.component-wrapper .timer span.timer-spiner[data-v-47fb7308] {\n  display: inline-block;\n  height: 0.48rem;\n  line-height: 0.48rem;\n  padding: 0 0.06666667rem;\n  text-align: center;\n  font-size: 0.32rem;\n  border-radius: 0.08rem;\n}\n",""])},835:function(t,e,n){"use strict";n.r(e);var i=n(106),r=n.n(i),s=n(137),a=n.n(s),o=function(){var t=this.styles,e=t.margin_top,n=t.margin_bottom,i=t.bg_color,r=t.text_color,s=t.time_text_bg_color,a=t.time_text_color;return"\n        .component-"+this.id+" {\n            margin-top: "+this.$px2rem(e)+";\n            margin-bottom: "+this.$px2rem(n)+";\n            background-color: "+(i||"#FFFFFF")+";\n            font-size: "+this.$px2rem(24)+";\n        }\n        .component-"+this.id+" .timer .timer-title {\n            color: "+r+";\n        }\n        .component-"+this.id+" .timer .timer-right {\n            color: "+s+";\n        }\n        .component-"+this.id+" .timer span.timer-spiner {\n            background-color: "+s+";\n            color: "+a+";\n        }\n    "},m=function(t){var e=t-(new Date).getTime();return e=Math.abs(e),parseInt(e/1e3)},p={props:["id","datas","styles"],data:function(){return{timer_id:null,spiner:["00","00","00","00"],spiner_text:"",status:0}},computed:{css:function(){return"<style>"+o.call(this)+"</style>"},is_set_time:function(){return this.datas.time.length>0},start_time:function(){return 1==this.is_set_time?new Date(this.datas.time[0]).getTime():(new Date).getTime()},end_time:function(){return 1==this.is_set_time?new Date(this.datas.time[1]).getTime():(new Date).getTime()}},watch:{is_set_time:function(t){1==t&&this.init()},start_time:function(){this.init()},end_time:function(){this.init()}},methods:{init:function(){var t=this;return a()(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.timer(t.start_time,t.end_time),clearInterval(t.timer_id),t.timer_id=setInterval((function(){t.timer(t.start_time,t.end_time)}),1e3);case 3:case"end":return e.stop()}}),e,t)})))()},timer:function(t,e){this.status=function(t,e){var n=(new Date).getTime();return n<t?0:n>=t&&n<e?1:n>=e?2:void 0}(t,e);var n=0;switch(this.status){case 0:n=m(t),this.spiner_text="Start In";break;case 1:n=m(e),this.spiner_text="End In";break;case 2:clearInterval(this.timer_id),this.spiner_text="Allready Ended"}this.spiner=function(t){var e=["00","00","00","00"];if(t>-1){e=[];var n=Math.floor(t/3600/24),i=Math.floor(t/3600)%24,r=Math.floor(t/60)%60,s=t%60;e.push(n+"D"),i<10?e.push("0"+i):e.push(i),r<10?e.push("0"+r):e.push(r),s<10?e.push("0"+s):e.push(s)}return e}(n)}},mounted:function(){this.init(),this.$emit("loaded")}},c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:["component-wrapper","component-"+this.id]},[n("div",{domProps:{innerHTML:t._s(t.css)}}),t._v(" "),n("div",{staticClass:"timer"},[t.datas.title?n("div",{staticClass:"timer-title bold"},[t._v("\n            "+t._s(t.datas.title)+"\n        ")]):t._e(),t._v(" "),n("div",{staticClass:"timer-right"},[n("span",{staticClass:"timer-text bold"},[t._v(t._s(t.spiner_text))]),t._v(" "),n("span",{staticClass:"timer-spiner"},[t._v(t._s(t.spiner[0]))]),t._v("\n            :\n            "),n("span",{staticClass:"timer-spiner"},[t._v(t._s(t.spiner[1]))]),t._v("\n            :\n            "),n("span",{staticClass:"timer-spiner"},[t._v(t._s(t.spiner[2]))]),t._v("\n            :\n            "),n("span",{staticClass:"timer-spiner"},[t._v(t._s(t.spiner[3]))])])])])};c._withStripped=!0;var l=n(27);var d=function(t){n(821)},h=Object(l.a)(p,c,[],!1,d,"data-v-47fb7308",null);h.options.__file="src/ui-component/U000004/m/index.vue";e.default=h.exports}}]);