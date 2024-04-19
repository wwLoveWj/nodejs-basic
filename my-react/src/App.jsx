/*
 * @Description:
 * @Author: Wu Wei
 * @Date: 2024-04-13 17:43:39
 * @LastEditTime: 2024-04-19 19:43:57
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\my-react\src\App.jsx
 */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  // 1. 测试单点登录方法
  // const token = location.search.split("=")[1];

  // if(!token){
  //   fetch("http://localhost:3000/login?appId=9LQ8Y3mB").then(res=> {
  //     debugger
  //     location.href = res.url;
  //   })
  // }

  async function testMiddleWare() {
    // 测试中间件方法：
    // 设置请求选项，包括请求方法和请求头
    const formData = {
      id: "123",
      name: "John Doe",
      email: "john.doe@example.com",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 如果发送JSON数据
        // 或者如果是表单数据：
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(formData), // 如果是JSON格式
      // 或者如果是表单数据：
      // body: new URLSearchParams(formData).toString()
    };

    await fetch("http://localhost:3001/user", options);
    fetch("http://localhost:3001/user?name=张三").then((res) => {
      console.log("测试跨域", res);
    });
  }
  testMiddleWare();
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
