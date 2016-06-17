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

在Three中场景只有一种，用THREE.Scene来表示，要构建一个场景， 代码如下:
```javascript
 var scene = new THREE.Scene();
```
在Threejs中有多种相机，我们用透视相机(PerspectiveCamera)，定义一个相机的代码如下:
```javascript
 var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
```
渲染器决定了渲染的结果应该画在页面的什么元素上面，并且以怎样的方式来绘制，我们定义一个WebRenderer渲染器，代码如下所示:
```javascript
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);
```
渲染器renderer的domElement元素，表示渲染器中的画布，所有的渲染都是画在domElement上的，所以这里的appendChild表示将这个domElement挂接在body下面，这样渲染的结果就能够在页面中显示了。
渲染应该使用渲染器，结合相机和场景来得到结果画面。实现这个功能的函数是
```javascript
 renderer.render(scene, camera);
```
