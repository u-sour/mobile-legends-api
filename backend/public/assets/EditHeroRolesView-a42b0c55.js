import{S as h}from"./static-select-options-4e61c4c9.js";import{d as v,n as w,a as g,y as c,h as x,l as n,q as y,o as S,c as V,s as a,j as r,b as i,x as k,J as F}from"./index-504de134.js";import{_ as q,c as B}from"./ImagePreview.vue_vue_type_script_setup_true_lang-0ab98d38.js";import{A as C}from"./alert-message-757f299f.js";import{H as m}from"./heroRolesMethod-9b2be70a.js";const R={class:"edit-hero-roles"},j={class:"row"},H={class:"col-12"},M={class:"col-12 col-md-6 col-lg-6"},N={class:"col-12 col-md-6 col-lg-6"},D=v({__name:"EditHeroRolesView",setup(O){const d=w(),f=g(),p=d.params.id,s=c({icon_file_name:"",icon_base:"",name:"",status:"active"}),u=c(!1),l=c(!1);x(async()=>{l.value=!0,await m.findOne(p).then(e=>{l.value=!1,s.value=e}).catch(e=>{n.error(`${e.status} : ${e.statusText}`)})});const _=async e=>{if(e.icon_file){const o=await B(e.icon_file[0].file),t=await F.toBase64(o);e.icon_file_name=e.icon_file[0].name,e.icon_base=t}await m.edit(e).then(()=>{u.value=!0,n.success(C.editSuccess),f.go(-1)}).catch(o=>n.error(o.message))};return(e,o)=>{const t=y("FormKit");return S(),V("div",R,[a(t,{type:"form",id:"edit-hero-roles",modelValue:s.value,"onUpdate:modelValue":o[0]||(o[0]=b=>s.value=b),onSubmit:_,disabled:l.value},{default:r(()=>[i("div",j,[i("div",H,[a(t,{type:"file",label:"Icon",name:"icon_file","file-item-icon":"","no-files-icon":"fileImage",accept:".jpg,.jpeg,.png","wrapper-class":{"formkit-wrapper":!1},validation:"required",autocomplete:"off"},{prefix:r(()=>[a(q,{imageFile:s.value.icon_file},null,8,["imageFile"])]),_:1})]),i("div",M,[a(t,{type:"text",name:"name","wrapper-class":{"formkit-wrapper":!1},label:"Name",validation:"required",autocomplete:"off"})]),i("div",N,[a(t,{type:"select",name:"status",label:"Status",placeholder:"Select One","wrapper-class":{"formkit-wrapper":!1},options:k(h).status,validation:"required",autocomplete:"off"},null,8,["options"])])])]),_:1},8,["modelValue","disabled"])])}}});export{D as default};