
function setObject(key,obj){
  localStorage.setItem(key,JSON.stringify(obj));
}

function getObject(key){
  return JSON.parse(localStorage.getItem(key));
}
function setItem(key,val){
  console.log(key+":"+val);
  localStorage.setItem(key,val);
}
function getItem(key,val){
  return localStorage.getItem(key,val);
}
function remove(key){
  localStorage.removeItem(key);
}
const StorageAdaptor = {setObject,getObject,setItem,getItem,remove};
export default StorageAdaptor;
