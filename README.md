# Three.js

three.js是源自github的一个[开源项目](https://github.com/mrdoob/three.js)

### three.js的源目录结构

 * build
  * three.js
  * three.min.js
 * docs *documents of api*
 * editor *just like the editor in maya*
 * examples *several interesting demo*
 * src *source code*
 * test *test code*
 * utils *script*

### 配置开发环境

##### 浏览器 Chrome

#####开发工具 WebStorm

#####调试工具 Chrome

######调试技巧 Developer tools -> Source 单击代码行的数字即可添加断点

### 三大组件

场景(scene)、相机(camera)和渲染器(renderer)

```javascript
 var scene = new THREE.Scene();  // 场景
 var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);// 透视相机
 var renderer = new THREE.WebGLRenderer();   // 渲染器
 renderer.setSize(window.innerWidth, window.innerHeight);    // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
 document.body.appendChild(renderer.domElement);
```
