'use strict';

const cookie = {
  get(key){
    if(document.cookie){
      let cookies = document.cookie.split('; ');
      cookies = cookies.reduce((o,curr)=>{
        let [key,value] = curr.split('=');
        o[key] = value;
        return o;
      },{});

      return key in cookies ? cookies[key] : null;
    }
  },
  set(key,value,expires,path='/'){
    if(Number.isInteger(expires)){
      let d = new Date();
      d.setMinutes(d.getMinutes()+expires);
      document.cookie = `${key}=${value};expires=${d};path=${path}`;
    }else{
      document.cookie = `${key}=${value};path=${path}`;
    }

    return this;
  },
  remove(key,path='/'){
    this.set(key,'',-1,path);
    return this;
  }
};

export default cookie;