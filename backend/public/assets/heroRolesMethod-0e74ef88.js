import{M as t,J as a}from"./index-fcb8af74.js";const s={findOne:async e=>{try{const{data:r}=await t().get(`/api/v1/hero-roles/${e}`),o=await a.fromUrl(r.icon_url,r.icon_file_name);return r.icon_file=[{name:r.icon_file_name,file:o}],r}catch(r){throw r.response}},find:async e=>{try{const{data:r}=await t().get(`/api/v1/hero-roles?selector=${JSON.stringify(e||{})}`);return r}catch(r){throw r.response}},create:async e=>{try{const{data:r}=await t().post("/api/v1/hero-roles",e);return r}catch(r){throw r.response}},edit:async e=>{try{const r=e._id,{data:o}=await t().patch(`/api/v1/hero-roles/${r}`,e);return o}catch(r){throw r.response}},delete:async e=>{try{const{data:r}=await t().delete(`/api/v1/hero-roles/${e}`);return r}catch(r){throw r.response}}};export{s as H};