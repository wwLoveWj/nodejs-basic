<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import Upload from "./views/Upload.vue"
import Editor from "./views/editor/index.vue"
// 登陆成功之后后端重定向的时候会携带token
// const token = location.search.split("=")[1];
// debugger
// if(!token){
//   fetch("http://localhost:3000/login?appId=Rs6s2aHi").then(res=>{
//     location.href = res.url;
//   })
// }
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <Upload />
  <Editor/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
