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
### 渲染循环
渲染有两种方式：实时渲染和离线渲染 。 
实时渲染：就是需要不停的对画面进行渲染，即使画面中什么也没有改变，也需要重新渲染。下面就是一个渲染循环： 
```javascript
function render() {
 cube.rotation.x += 0.1;
 cube.rotation.y += 0.1;
 renderer.render(scene, camera);
 requestAnimationFrame(render);
}
```
其中一个重要的函数是requestAnimationFrame，这个函数就是让浏览器去执行一次参数中的函数，这样通过上面render中调用 requestAnimationFrame()函数，requestAnimationFrame()函数又让rander()再执行一次，就形成了我 们通常所说的游戏循环了。 
### 在Threejs中定义一个点
```javascript
THREE.Vector3 = function ( x, y, z ) {
 this.x = x || 0;
 this.y = y || 0;
 this.z = z || 0;
};
```
如何定义一个点:
```javascript
var point1 = new THREE.Vecotr3(4,8,9);
```
也可以使用set方法:
```javascript
var point1 = new THREE.Vector3();
point1.set(4,8,9);
```
### 画一条彩色线
```javascript
var geometry = new THREE.Geometry();
var material = new THREE.LineBasicMaterial( { vertexColors: true } );
var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

var p1 = new THREE.Vector3( -100, 0, 100 );
var p2 = new THREE.Vector3(  100, 0, -100 );
geometry.vertices.push(p1);
geometry.vertices.push(p2);
geometry.colors.push( color1, color2 );

var line = new THREE.Line( geometry, material, THREE.LinePieces );
scene.add(line);
```
1. 首先，我们声明了一个几何体geometry，如下:
```javascript
var geometry = new THREE.Geometry();
```
2. 定义一种线条的材质，使用THREE.LineBasicMaterial类型来定义，它接受一个集合作为参数，其原型如下：
LineBasicMaterial( parameters )
Parameters是一个定义材质外观的对象，它包含多个属性来定义材质，这些属性是：
 * Color：线条的颜色，用16进制来表示，默认的颜色是白色。
 * Linewidth：线条的宽度，默认时候1个单位宽度。
 * Linecap：线条两端的外观，默认是圆角端点，当线条较粗的时候才看得出效果，如果线条很细，那么你几乎看不出效果了。
 * Linejoin：两个线条的连接点处的外观，默认是“round”，表示圆角。
 * VertexColors：定义线条材质是否使用顶点颜色，这是一个boolean值。意思是，线条各部分的颜色会根据顶点的颜色来进行插值。
 * Fog：定义材质的颜色是否受全局雾效的影响。
这里使用了顶点颜色vertexColors: THREE.VertexColors，就是线条的颜色会根据顶点来计算。
```javascript
var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
```
3. 接下来，定义两种颜色，分别表示线条两个端点的颜色，如下所示：
```javascript
var color1 = new THREE.Color( 0x444444 ),
color2 = new THREE.Color( 0xFF0000 );
```
4. 定义2个顶点的位置，并放到geometry中，代码如下：
```javascript
var p1 = new THREE.Vector3( -100, 0, 100 );
var p2 = new THREE.Vector3( 100, 0, -100 );
geometry.vertices.push(p1);
geometry.vertices.push(p2);
```
5. 为4中定义的2个顶点，设置不同的颜色，代码如下所示：
```javascript
geometry.colors.push( color1, color2 );
```
geometry中colors表示顶点的颜色，必须材质中vertexColors等于THREE.VertexColors时，颜色才有效，如果vertexColors等于THREE.NoColors时，颜色就没有效果了。那么就会去取材质中color的值。
6. 定义一条线
定义线条，使用THREE.Line类，代码如下所示：
```javascript
var line = new THREE.Line( geometry, material, THREE.LinePieces );
```
第一个参数是几何体geometry，里面包含了2个顶点和顶点的颜色。第二个参数是线条的材质，或者是线条的属性，表示线条以哪种方式取色。第三个参数是一组点的连接方式。
然后，将这条线加入到场景中，代码如下：
```javascript
scene.add(line);
```
这样，场景中就会出现刚才的那条线段了。
