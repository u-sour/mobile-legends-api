import{d as f,y as l,q as _,o as d,c as u,s as t,j as c,b as s,x as b,J as h,K as w,l as r}from"./index-0aec7abd.js";import{S as g}from"./static-select-options-4e61c4c9.js";import{_ as v,c as S}from"./ImagePreview.vue_vue_type_script_setup_true_lang-404813a9.js";import{A as x}from"./alert-message-757f299f.js";import{H as y}from"./heroRolesMethod-0096a980.js";const V={class:"create-hero-roles"},k={class:"row"},C={class:"col-12"},F={class:"col-12 col-md-6 col-lg-6"},q={class:"col-12 col-md-6 col-lg-6"},I=f({__name:"CreateHeroRolesView",setup(B){const i=l({icon_file_name:"",icon_base:"",name:"",status:"active"}),n=l(!1),m=async e=>{if(e.icon_file){const o=await S(e.icon_file[0].file),a=await h.toBase64(o);e.icon_file_name=e.icon_file[0].name,e.icon_base=a}await y.create(e).then(()=>{n.value=!0,w("create-hero-roles"),r.success(x.createSuccess)}).catch(o=>r.error(o.message))};return(e,o)=>{const a=_("FormKit");return d(),u("div",V,[t(a,{type:"form",id:"create-hero-roles",modelValue:i.value,"onUpdate:modelValue":o[0]||(o[0]=p=>i.value=p),onSubmit:m},{default:c(()=>[s("div",k,[s("div",C,[t(a,{type:"file",label:"Icon",name:"icon_file","file-item-icon":"","no-files-icon":"fileImage",accept:".jpg,.jpeg,.png","wrapper-class":{"formkit-wrapper":!1},validation:"required",autocomplete:"off"},{prefix:c(()=>[t(v,{imageFile:i.value.icon_file},null,8,["imageFile"])]),_:1})]),s("div",F,[t(a,{type:"text",name:"name","wrapper-class":{"formkit-wrapper":!1},label:"Name",validation:"required",autocomplete:"off"})]),s("div",q,[t(a,{type:"select",name:"status",label:"Status",placeholder:"Select One","wrapper-class":{"formkit-wrapper":!1},options:b(g).status,validation:"required",autocomplete:"off"},null,8,["options"])])])]),_:1},8,["modelValue"])])}}});export{I as default};