(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[964],{4830:function(e,l,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin",function(){return t(958)}])},958:function(e,l,t){"use strict";t.r(l),t.d(l,{default:function(){return en}});var n,i,a=t(5893),s=t(9837),r=t(1359),d=t(5493),c=t(7294),o=t(244),u=t(9807),h=t(5605),x=t(3978),j=t(9417);let Z=e=>{let l=new Date(e);return"".concat(l.getDate(),".").concat(l.getMonth()+1,".").concat(l.getFullYear())};var m={formatDate:Z},p=t(5084),v=t(9530),f=t(60);function g(e){let{label:l,items:t}=e,[n,i]=c.useState(null),s=Boolean(n),r=e=>{i(e.currentTarget)},d=()=>{i(null)};return(0,a.jsxs)("div",{children:[(0,a.jsx)(p.Z,{variant:"text","aria-haspopup":"true","aria-expanded":s?"true":void 0,onClick:r,children:l}),(0,a.jsx)(v.Z,{anchorEl:n,open:s,onClose:d,children:t.map(e=>(0,a.jsx)(f.Z,{onClick:e.onClick,children:e.label},e.label))})]})}var S=t(1160),b=t(1890),E=t(6779),C=t(5398),U=t(2741),w=t(7745),k=t(7169),y=t(8316),D=t(5343),I=t(6541),P=t(562),L=t(3772);let T=e=>{let{onClick:l,...t}=e;return(0,a.jsx)(P.Z,{"aria-label":"close",onClick:l,sx:{position:"absolute",right:8,top:8},...t,children:(0,a.jsx)(L.Z,{})})};(n=i||(i={})).USER="user",n.ADMIN="admin";var N=t(6678);let _=N.h.injectEndpoints({endpoints:e=>({updateUser:e.mutation({query(e){let{id:l,role:t}=e;return{url:"/admin/users/".concat(l),method:"post",data:{role:t}}}}),addTemplate:e.mutation({query(e){let{title:l,image:t,status:n}=e;return{url:"/admin/templates",method:"post",data:{title:l,image:t,status:n}}}}),editTemplate:e.mutation({query:e=>({url:"/admin/templates/".concat(e.id),method:"put",data:e})})}),overrideExisting:!1}),{useUpdateUserMutation:B,useAddTemplateMutation:R,useEditTemplateMutation:W}=_,H=e=>{let{open:l,user:t,handleClose:n}=e,[s,r]=(0,c.useState)(""),[d,o]=(0,c.useState)(i.USER),[u,{isLoading:h,error:x}]=B(),j=async()=>{let e=await u({id:t.id,role:d});"data"in e&&n()};return(0,c.useEffect)(()=>{l&&t&&(r(t.email),o(t.role))},[l]),(0,a.jsxs)(b.Z,{open:l,onClose:n,maxWidth:"xs",fullWidth:!0,children:[(0,a.jsxs)(w.Z,{children:["Edit User",(0,a.jsx)(T,{onClick:n})]}),(0,a.jsxs)(C.Z,{children:[x?(0,a.jsx)(U.Z,{severity:"error",children:x.data}):null,(0,a.jsx)(D.Z,{fullWidth:!0,children:(0,a.jsx)(k.Z,{fullWidth:!0,disabled:!0,margin:"dense",label:"Email",variant:"standard",value:s,onChange:e=>r(e.target.value)})}),(0,a.jsxs)(D.Z,{fullWidth:!0,children:[(0,a.jsx)(y.Z,{variant:"standard",id:"demo-simple-select-label",children:"Role"}),(0,a.jsxs)(I.Z,{labelId:"demo-simple-select-label",id:"demo-simple-select",variant:"standard",value:d,margin:"dense",label:"Role",onChange:e=>o(e.target.value),children:[(0,a.jsx)(f.Z,{value:i.USER,children:i.USER}),(0,a.jsx)(f.Z,{value:i.ADMIN,children:i.ADMIN})]})]})]}),(0,a.jsx)(E.Z,{children:(0,a.jsx)(p.Z,{onClick:j,disabled:h,children:"Save"})})]})};function K(){let[e,l]=(0,c.useState)(null),[t,n]=(0,c.useState)(!1),[i]=(0,S.d4)(S.vb.GET_USERS);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(o.Z,{sx:{minWidth:650},"aria-label":"simple table",children:[(0,a.jsx)(x.Z,{children:(0,a.jsxs)(j.Z,{children:[(0,a.jsx)(h.Z,{children:"Id"}),(0,a.jsx)(h.Z,{children:"Email"}),(0,a.jsx)(h.Z,{children:"Role"}),(0,a.jsx)(h.Z,{children:"Creation date"}),(0,a.jsx)(h.Z,{children:"More"})]})}),(0,a.jsx)(u.Z,{children:null==i?void 0:i.map(e=>(0,a.jsxs)(j.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,a.jsx)(h.Z,{component:"th",scope:"row",children:e.id}),(0,a.jsx)(h.Z,{children:e.email}),(0,a.jsx)(h.Z,{children:e.role}),(0,a.jsx)(h.Z,{children:m.formatDate(e.createdAt)}),(0,a.jsx)(h.Z,{children:(0,a.jsx)(g,{label:"More",items:[{label:"Edit",onClick(){n(!0),l(e)}}]})})]},e.email))})]}),(0,a.jsx)(H,{open:t,handleClose:()=>n(!1),user:e})]})}var A=t(9144),M=t(9630),F=t(1953),q=t(2177),O=t(3053),G=t(2416),X=t(2841),z=t(1362),Y=t(952),J=t(1950),Q=t(9321);let V=e=>{let{open:l,handleClose:t}=e,[n,i]=(0,c.useState)(O.K.PUBLISHED),[s,r]=(0,c.useState)(null),[d,o]=(0,c.useState)(null),[u,h]=(0,c.useState)(""),[x,{isLoading:j,error:Z}]=R(),m=async e=>{if(!e.target.files)return;let l=e.target.files[0];if(l){let t=URL.createObjectURL(l);o(t),r(l)}},v=async()=>{let e=await x({title:u,status:n,image:await (0,J.Z)(s)});"data"in e&&t()};return(0,c.useEffect)(()=>{l&&(r(null),o(null),h(null))},[l]),(0,a.jsxs)(b.Z,{open:l,onClose:t,maxWidth:"md",fullWidth:!0,children:[(0,a.jsxs)(w.Z,{children:["Add meme",(0,a.jsx)(T,{onClick:t})]}),(0,a.jsxs)(C.Z,{children:[Z?(0,a.jsx)(U.Z,{severity:"error",children:Z.data}):null,(0,a.jsxs)(p.Z,{variant:"contained",component:"label",sx:{mb:2},children:["Upload",(0,a.jsx)("input",{hidden:!0,accept:"image/*",type:"file",onChange:m})]}),d&&(0,a.jsxs)(A.Z,{direction:"row",gap:2,children:[d&&(0,a.jsx)("img",{src:d,style:{maxWidth:Q.v}}),(0,a.jsxs)(A.Z,{children:[(0,a.jsx)(k.Z,{fullWidth:!0,id:"template-title",margin:"dense",label:"Title",variant:"standard",value:u,onChange:e=>h(e.target.value)}),(0,a.jsx)(G.Z,{children:(0,a.jsx)(X.Z,{control:(0,a.jsx)(z.Z,{onChange:(e,l)=>i(l?O.K.PUBLISHED:O.K.UNPUBLISHED)}),label:"Publish"})})]})]})]}),(0,a.jsx)(E.Z,{children:(0,a.jsx)(Y.Z,{onClick:v,loader:j,disabled:j,children:"Save"})})]})};var $=t(709);let ee={topLeft:{x:0,y:0},text:"Type here",bottomRight:{x:100,y:50},styles:{fontFamily:"Arial",fontSize:40,bold:!1,italic:!1,underline:!1,color:"#000000",shadowColor:"#ffffff",textAlign:"center"}},el=e=>{let{open:l,template:t,handleClose:n}=e,[i,s]=(0,c.useState)(O.K.PUBLISHED),[r,d]=(0,c.useState)(""),[o,u]=(0,c.useState)([]),[h,{isLoading:x,error:j}]=W(),Z=async()=>{let e=await h({id:t.id,status:i,texts:o,title:r});"data"in e&&n()};(0,c.useEffect)(()=>{l&&t&&(d(t.title),s(t.status),u(t.texts||[]))},[l]);let m=e=>{u([...e])};return(0,a.jsxs)(b.Z,{open:l,onClose:n,maxWidth:"md",fullWidth:!0,children:[(0,a.jsxs)(w.Z,{children:["Edit meme",(0,a.jsx)(T,{onClick:n})]}),(0,a.jsxs)(C.Z,{children:[j?(0,a.jsx)(U.Z,{severity:"error",children:j.data}):null,t&&(0,a.jsxs)(A.Z,{direction:"row",gap:2,children:[(0,a.jsx)(F.Z,{position:"relative",marginTop:2,children:(0,a.jsx)($.Z,{template:t,texts:o,onChange:m})}),(0,a.jsx)(A.Z,{direction:"column",gap:2,children:(0,a.jsxs)(A.Z,{children:[(0,a.jsx)(k.Z,{fullWidth:!0,id:"template-title",margin:"dense",label:"Title",variant:"standard",value:r,onChange:e=>d(e.target.value)}),(0,a.jsx)(G.Z,{children:(0,a.jsx)(X.Z,{control:(0,a.jsx)(z.Z,{checked:i===O.K.PUBLISHED,onChange:(e,l)=>s(l?O.K.PUBLISHED:O.K.UNPUBLISHED)}),label:"Publish"})}),(0,a.jsx)(p.Z,{variant:"contained",onClick:()=>u([...o,ee]),children:"Add text"})]})})]})]}),(0,a.jsx)(E.Z,{children:(0,a.jsx)(Y.Z,{onClick:Z,loader:x,children:"Save"})})]})};function et(){let[e,l]=(0,c.useState)(null),[t,n]=(0,c.useState)(!1),[i,s]=(0,c.useState)(!1),[r,d]=(0,c.useState)(""),[o]=(0,S.d4)(S.vb.GET_TEMPLATES,{...r?{status:r}:{}}),u=e=>{s(!0),l(e)};return(0,a.jsxs)(F.Z,{children:[(0,a.jsxs)(A.Z,{direction:"row",justifyContent:"space-between",children:[(0,a.jsxs)(D.Z,{sx:{width:150},children:[(0,a.jsx)(y.Z,{variant:"standard",id:"demo-simple-select-label",children:"Status"}),(0,a.jsxs)(I.Z,{labelId:"demo-simple-select-label",id:"demo-simple-select",variant:"standard",value:r,margin:"dense",label:"Status",onChange:e=>d(e.target.value),children:[(0,a.jsx)(f.Z,{value:"",children:"None"}),(0,a.jsx)(f.Z,{value:O.K.PUBLISHED,children:O.K.PUBLISHED}),(0,a.jsx)(f.Z,{value:O.K.UNPUBLISHED,children:O.K.UNPUBLISHED})]})]}),(0,a.jsx)(p.Z,{variant:"contained",onClick:()=>n(!0),children:"Add new meme"})]}),(0,a.jsx)(A.Z,{direction:"row",marginTop:3,gap:2,children:null==o?void 0:o.map(e=>(0,a.jsxs)(F.Z,{position:"relative",onClick:()=>u(e),children:[(0,a.jsx)("img",{src:e.url,width:128}),e.status===O.K.UNPUBLISHED&&(0,a.jsxs)(A.Z,{alignItems:"center",direction:"row",justifyContent:"center",children:[(0,a.jsx)(q.Z,{color:"warning"}),(0,a.jsx)(M.Z,{children:"Unpublished"})]})]},e.id))}),(0,a.jsx)(V,{open:t,handleClose:()=>n(!1)}),(0,a.jsx)(el,{open:i,handleClose:()=>s(!1),template:e})]})}function en(){return(0,a.jsx)(s.Z,{children:(0,a.jsx)(r.Z,{children:(0,a.jsx)(d.Z,{items:[{label:"Users",render:()=>(0,a.jsx)(K,{})},{label:"Templates",render:()=>(0,a.jsx)(et,{})}]})})})}},1950:function(e,l){"use strict";let t=e=>new Promise((l,t)=>{let n=new FileReader;n.readAsDataURL(e),n.onload=()=>l(n.result),n.onerror=e=>t(e)});l.Z=t}},function(e){e.O(0,[269,169,866,268,352,406,774,888,179],function(){return e(e.s=4830)}),_N_E=e.O()}]);