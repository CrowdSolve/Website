"use strict";(self["webpackChunkcrowdsolve_website"]=self["webpackChunkcrowdsolve_website"]||[]).push([[443],{5592:function(t,e,s){s.r(e),s.d(e,{default:function(){return Y}});var i=s(3396);function a(t,e,s,a,o,n){const l=(0,i.up)("QuestionView");return(0,i.wg)(),(0,i.j4)(l,{isAndroid:s.Android,md:s.md},null,8,["isAndroid","md"])}var o=s(7139),n=s(9242);const l=t=>((0,i.dD)("data-v-64a01656"),t=t(),(0,i.Cn)(),t),d={key:0,id:"backGround",class:"bg-slate-800 p-4 m-auto text-white rounded-lg"},r={id:"questionHead",class:"text-white text-left mb-5"},c=["src"],m={id:"user-name",class:"inline-block text-base"},h={class:"inline-block text-xs text-slate-500"},u={id:"title",class:"text-left text-3xl font-bold mb-5"},w={class:"theBody",style:{overflow:"auto"}},b=["innerHTML"],v={class:"text-right mt-2 text-slate-400 text-sm"},k=l((()=>(0,i._)("hr",{class:"mb-2 mt-2 hori-sep border-slate-500"},null,-1))),p={class:"text-xl"},x=l((()=>(0,i._)("div",{class:"material-symbols-outlined"}," phone_android ",-1))),_=(0,i.Uk)(" View in app "),g=[x,_],D=l((()=>(0,i._)("div",{class:"material-symbols-outlined"}," chat_bubble ",-1))),y=(0,i.Uk)(" Comments "),f=[D,y],C=l((()=>(0,i._)("div",{class:"material-symbols-outlined"}," share ",-1))),A=(0,i.Uk)(" Share "),M=[C,A],V=l((()=>(0,i._)("hr",{class:"hori-sep mt-2 border-slate-500"},null,-1))),q={key:0,id:"commentsTitle",class:"text-left mt-5 text-4xl text-white mb-5"},B={key:1,class:"text-center text-base text-slate-400 mt-5"},H={id:"questionHead",class:"text-white text-left"},L={class:"m-auto"},S=["src"],z={id:"user-name",class:"inline-block text-base"},I={class:"inline-block text-xs text-slate-500"},T={class:"theBody scrollbar-thumb-custom scrollbar-track-custom-light overflow-y-scroll scrollbar-thin",style:{overflow:"auto"}},U=["innerHTML"],j={key:0,class:"mb-5 mt-5 border-slate-700"};function Q(t,e,s,a,l,x){return null!=l.daData?((0,i.wg)(),(0,i.iD)("div",d,[(0,i._)("table",r,[(0,i._)("tr",null,[(0,i._)("td",null,[(0,i._)("img",{class:"rounded-full h-7 w-7 inline-block ml-2 mr-2",src:l.daData["user"]["avatar_url"]},null,8,c)]),(0,i._)("td",null,[(0,i._)("div",m,[(0,i.Uk)((0,o.zw)(l.daData["user"]["login"])+"  ●  ",1),(0,i._)("span",h,(0,o.zw)(l.daDate),1)])])])]),(0,i._)("div",u,(0,o.zw)(l.daData["title"]),1),(0,i._)("div",w,[(0,i._)("div",{id:"body",class:"text-justify",innerHTML:l.daMarkDown},null,8,b)]),(0,i._)("div",v,(0,o.zw)(l.daData["comments"])+" Comments  ",1),k,(0,i._)("div",p,[s.isAndroid?((0,i.wg)(),(0,i.iD)("button",{key:0,onClick:e[0]||(e[0]=(...t)=>x.viewInApp&&x.viewInApp(...t)),id:"commentsHead",class:"inline-block text-slate-400 hover:text-white rounded-xl hover:bg-slate-700 w-4/12"},g)):(0,i.kq)("",!0),(0,i._)("button",{onClick:e[1]||(e[1]=(...t)=>x.getComments&&x.getComments(...t)),id:"commentsButton",class:"inline-block text-slate-400 hover:text-white rounded-xl hover:bg-slate-700"},f),(0,i._)("button",{onClick:e[2]||(e[2]=(...t)=>x.share&&x.share(...t)),id:"shareButton",class:"inline-block text-slate-400 hover:text-white rounded-xl hover:bg-slate-700"},M)]),V,l.isVisible&&"0"!=l.daData["comments"]?((0,i.wg)(),(0,i.iD)("div",q," Comments ")):(0,i.kq)("",!0),l.isVisible&&"0"==l.daData["comments"]?((0,i.wg)(),(0,i.iD)("div",B," No comments on this question yet! ")):(0,i.kq)("",!0),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.daComments,((t,e)=>(0,i.wy)(((0,i.wg)(),(0,i.iD)("div",{id:"commentsSection",key:t,class:"ml-5 text-white text-left"},[(0,i._)("table",H,[(0,i._)("tr",L,[(0,i._)("td",null,[(0,i._)("img",{class:"rounded-full h-7 w-7 inline-block mr-2",src:t["user"]["avatar_url"]},null,8,S)]),(0,i._)("td",null,[(0,i._)("div",z,[(0,i.Uk)((0,o.zw)(t["user"]["login"])+"  ●  ",1),(0,i._)("span",I,(0,o.zw)(t["created_at"]),1)])])])]),(0,i._)("div",T,[(0,i._)("div",{id:"body",class:"text-base text-left mt-3",innerHTML:x.createCommentsMarkdown(e)},null,8,U)]),e<l.daComments.length-1?((0,i.wg)(),(0,i.iD)("hr",j)):(0,i.kq)("",!0)])),[[n.F8,l.isVisible]]))),128))])):(0,i.kq)("",!0)}var E=0,$={name:"QuestionView",props:["isAndroid","md"],data(){return{daData:null,daMarkDown:null,daDate:null,daComments:null,daCommentsMarkDown:null,isVisible:!1}},async created(){const t=window.location.href.split("/");E=t[t.length-1],console.log(),this.$emit("Android",this.isAndroid);try{const t=await fetch("https://api.github.com/repos/CrowdSolve/data/issues/"+E);this.daData=await t.json(),this.daDate=new Date(this.daData["created_at"]).toDateString(),this.daMarkDown=this.daData["body"],this.daMarkDown=this.md.render(this.daMarkDown)}catch(e){console.log(e)}document.title=this.daData["title"]},updated(){const t=document.getElementById("commentsButton"),e=document.getElementById("shareButton");this.isAndroid?(t.classList.add("w-4/12"),e.classList.add("w-4/12")):(t.classList.add("w-6/12","h-12"),e.classList.add("w-6/12","h-12"))},methods:{recieveShow(t){this.notificationShowing=t},async getComments(){if(this.isVisible=!this.isVisible,this.isVisible){const t=await fetch(this.daData["comments_url"]);this.daComments=await t.json(),window.scrollBy({top:5e3,left:0,behavior:"smooth"})}},createCommentsMarkdown(t){return this.md.render(this.daComments[t]["body"])},share(){const t=document.createElement("textarea");document.body.appendChild(t),t.textContent=window.location.href,t.select(),document.execCommand("copy"),document.body.removeChild(t),this.isAndroid?this.$toast.show("Share link copied to clipboard",{type:"default",position:"bottom",duration:1e3}):this.$toast.show("Share link copied to clipboard",{type:"default",position:"bottom-right",duration:1e3})},viewInApp(){window.open("https://csolve.page.link/?link=https://crowdsolve.lasheen.dev/questions/"+E+"&apn=dev.lasheen.crowdsolve")}}},Z=s(89);const F=(0,Z.Z)($,[["render",Q],["__scopeId","data-v-64a01656"]]);var G=F,K={name:"QuestionsView",props:["Android","md"],components:{QuestionView:G},methods:{checkDevice(t){this.isAndroid=t}}};const N=(0,Z.Z)(K,[["render",a]]);var Y=N}}]);
//# sourceMappingURL=about.381646aa.js.map