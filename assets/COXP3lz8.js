import{_ as b,o as n,c as g,a as e,t as u,s as c,v as i,n as y,d as k,x,q as _,F as w,y as v}from"./C9_Dt2PN.js";import{n as m}from"./CevjBdXS.js";import{M as p}from"./Ct04BUsa.js";import{v as P}from"./CQkTLCs1.js";const T={props:{title:String,target:String,item:Object},data(){return{form:{name:"",code:"",barcode:"",category:"",price:""}}},methods:{submitEmiting(){this.$emit("submitProduct",this.form)}},mounted(){console.log("opened"),this.target!="create"&&(console.log(this.item),this.form.name=this.item.name,this.form.code=this.item.code,this.form.category=this.item.category,this.form.price=this.item.price,this.form.barcode=this.item.barcode)}},B={class:"relative bg-white rounded-lg shadow dark:bg-gray-700"},E={class:"flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"},M={class:"text-lg font-semibold text-gray-900 dark:text-white"},C=e("svg",{class:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),D=e("span",{class:"sr-only"},"Close modal",-1),S=[C,D],I={class:"grid gap-4 mb-4 grid-cols-2"},$={class:"col-span-2"},V=e("label",{for:"name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"Nama Produk",-1),F={class:"col-span-2"},N=e("label",{for:"code",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"Kode Produk",-1),q={class:"col-span-2"},K=e("label",{for:"category",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"Kategori Produk",-1),j={class:"col-span-2"},U=e("label",{for:"name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"Nomor Barcode",-1),H={class:"col-span-2"},A=e("label",{for:"name",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"Harga",-1),z=e("button",{type:"submit",class:"text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"},[e("svg",{class:"me-1 -ms-1 w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z","clip-rule":"evenodd"})]),k(" Submit ")],-1);function L(t,r,l,h,o,d){return n(),g("div",B,[e("div",E,[e("h3",M,u(l.title)+" Barang Baru ",1),e("button",{onClick:r[0]||(r[0]=a=>t.$emit("closeModal")),type:"button",class:"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white","data-modal-toggle":"crud-modal"},S)]),e("form",{onSubmit:r[6]||(r[6]=y((...a)=>d.submitEmiting&&d.submitEmiting(...a),["prevent"])),class:"p-4 md:p-5"},[e("div",I,[e("div",$,[V,c(e("input",{"onUpdate:modelValue":r[1]||(r[1]=a=>o.form.name=a),type:"text",name:"name",id:"name",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Masukan Nama Produk",required:""},null,512),[[i,o.form.name]])]),e("div",F,[N,c(e("input",{"onUpdate:modelValue":r[2]||(r[2]=a=>o.form.code=a),type:"text",name:"code",id:"code",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Masukan Kode Produk",required:""},null,512),[[i,o.form.code]])]),e("div",q,[K,c(e("input",{"onUpdate:modelValue":r[3]||(r[3]=a=>o.form.category=a),type:"text",name:"category",id:"category",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Masukan Kategroi Produk",required:""},null,512),[[i,o.form.category]])]),e("div",j,[U,c(e("input",{"onUpdate:modelValue":r[4]||(r[4]=a=>o.form.barcode=a),type:"text",name:"barcode",id:"barcode",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Scan/Masukan Nomor Barcode",required:""},null,512),[[i,o.form.barcode]])]),e("div",H,[A,c(e("input",{"onUpdate:modelValue":r[5]||(r[5]=a=>o.form.price=a),type:"number",name:"barcode",id:"barcode",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Masukan Harga",required:""},null,512),[[i,o.form.price]])])]),z],32)])}const O=b(T,[["render",L]]),G={data(){return{products:[],formTarget:"create",formTargetItem:{},formTitle:"Buat Produk Baru",formTargetId:"",renderComponent:!0}},methods:{async rerender(){this.renderComponent=!1,await this.$nextTick(),this.renderComponent=!0},fetchData(){let t=m.localStorage.getData("products");this.products=t,console.log(this.products)},async openFormAddProduct(){console.log("add");const t=document.getElementById("crud-modal"),r=new p(t);this.formTarget="create",this.formTitle="Buat Produk Baru",await this.rerender(),r.show()},async openFormEditProduct(t){console.log("edit");const r=document.getElementById("crud-modal"),l=new p(r);this.formTarget="update",this.formTitle="Edit Produk Baru",this.formTargetId=t.id,this.formTargetItem=t,await this.rerender(),l.show()},closeModal(){const t=document.getElementById("crud-modal");new p(t).hide()},formProduk(t){let r=m.localStorage.getData("products");r||(r=[]),this.formTarget=="create"?r.push({id:P(),...t}):r=this.updateData(this.formTargetId,t),m.localStorage.setData("products",r,9999,"d"),this.products=r},removeData(t){m.localStorage.setData("products",this.products.filter(r=>r.id!==t),9999,"d"),this.fetchData()},updateData(t,r){return this.products.map(l=>l.id===t?{...l,...r}:l)},searchById(t){return this.products.find(r=>r.id===t)}},mounted(){this.fetchData()}},J=e("button",{"data-modal-target":"crud-modal",style:{display:"hidden"}},null,-1),Q={id:"crud-modal",tabindex:"-1","aria-hidden":"true",class:"hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"},R={class:"relative p-4 w-full max-w-lg max-h-full"},W={class:"relative overflow-x-auto shadow-md sm:rounded-lg"},X={class:"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"},Y=e("thead",{class:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"},[e("tr",null,[e("th",{scope:"col",class:"p-4"},[e("div",{class:"flex items-center"},[e("input",{id:"checkbox-all",type:"checkbox",class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),e("label",{for:"checkbox-all",class:"sr-only"},"checkbox")])]),e("th",{scope:"col",class:"px-6 py-3"}," Nama Produk "),e("th",{scope:"col",class:"px-6 py-3"}," Kode Produk "),e("th",{scope:"col",class:"px-6 py-3"}," Barcode "),e("th",{scope:"col",class:"px-6 py-3"}," Kategori "),e("th",{scope:"col",class:"px-6 py-3"}," Harga "),e("th",{scope:"col",class:"px-6 py-3"})])],-1),Z={class:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"},ee=e("td",{class:"w-4 p-4"},[e("div",{class:"flex items-center"},[e("input",{id:"checkbox-table-1",type:"checkbox",class:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),e("label",{for:"checkbox-table-1",class:"sr-only"},"checkbox")])],-1),re={scope:"row",class:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"},te={class:"px-6 py-4"},oe={class:"px-6 py-4"},ae={class:"px-6 py-4"},se={class:"px-6 py-4"},de=["onClick"],le=["onClick"];function ce(t,r,l,h,o,d){const a=O;return n(),g("div",null,[e("button",{onClick:r[0]||(r[0]=(...s)=>d.openFormAddProduct&&d.openFormAddProduct(...s)),class:"block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-4",type:"button"}," Tambah Produk "),J,e("div",Q,[e("div",R,[o.renderComponent?(n(),x(a,{key:0,title:o.formTitle,target:o.formTarget,item:o.formTargetItem,onSubmitProduct:r[1]||(r[1]=s=>d.formProduk(s)),onCloseModal:d.closeModal},null,8,["title","target","item","onCloseModal"])):_("",!0)])]),e("div",W,[e("table",X,[Y,e("tbody",null,[(n(!0),g(w,null,v(o.products,(s,ie)=>(n(),g("tr",Z,[ee,e("th",re,u(s.name),1),e("td",te,u(s.code),1),e("td",oe,u(s.category),1),e("td",ae,u(s.price),1),e("td",se,[e("button",{type:"button",onClick:f=>d.openFormEditProduct(s),class:"text-blue-400 bg-transparent ms-4"}," EDIT ",8,de),e("button",{type:"button",onClick:f=>d.removeData(s.id),class:"text-red-400 bg-transparent ms-4"}," DELETE ",8,le)])]))),256))])])])])}const pe=b(G,[["render",ce]]);export{pe as default};
