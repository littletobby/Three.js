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
1.首先，我们声明了一个几何体geometry，如下:
```javascript
var geometry = new THREE.Geometry();
```

2.定义一种线条的材质，使用THREE.LineBasicMaterial类型来定义，它接受一个集合作为参数，其原型如下：
```javascript
LineBasicMaterial( parameters )
```
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

3.接下来，定义两种颜色，分别表示线条两个端点的颜色，如下所示：
```javascript
var color1 = new THREE.Color( 0x444444 ),
color2 = new THREE.Color( 0xFF0000 );
```

4.定义2个顶点的位置，并放到geometry中，代码如下：
```javascript
var p1 = new THREE.Vector3( -100, 0, 100 );
var p2 = new THREE.Vector3( 100, 0, -100 );
geometry.vertices.push(p1);
geometry.vertices.push(p2);
```

5.为4中定义的2个顶点，设置不同的颜色，代码如下所示：
```javascript
geometry.colors.push( color1, color2 );
```
geometry中colors表示顶点的颜色，必须材质中vertexColors等于THREE.VertexColors时，颜色才有效，如果vertexColors等于THREE.NoColors时，颜色就没有效果了。那么就会去取材质中color的值。

6.定义一条线

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

### 右手坐标系

Threejs使用的是右手坐标系，这源于opengl默认情况下，也是右手坐标系。

x轴正方向向右，y轴正方向向上，z轴由屏幕从里向外。 

### 线条的深入理解

Threejs中，一条线由点，材质和颜色组成。

点由THREE.Vector3表示，Threejs中没有提供单独画点的函数，它必须被放到一个THREE.Geometry形状中，这个结构中包含一个数组vertices，这个vertices就是存放无数的点（THREE.Vector3）的数组。

### 性能监视器Stats

在Three.js中，性能由一个[性能监视器](https://github.com/mrdoob/stats.js)来管理可以看到。

性能监视器Stats的使用
```javascript
function animation() {
 renderer.render(scene, camera);
 requestAnimationFrame(animation);

 stats.update();
}
```
1.new 一个stats对象，代码如下
```javascript
stats = new Stats();
```

2.将这个对象加入到html网页中去，代码如下
```javascript
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
```

3.调用stats.update()函数来统计时间和帧数。代码如下
```javascript
stats.update();
```

### 使用动画引擎Tween.js来创建动画

为了使程序编写更容易一些，我们可以使用动画引擎来实现动画效果。和three.js紧密结合的动画引擎是[Tween.js](https://github.com/sole)。

对于快速构件动画来说，Tween.js是一个容易上手的工具。首先，你需要引擎js文件，如下：
```javascript
<-script src="../js/tween.min.js" data-ke-src="../js/tween.min.js"><-/script>
```
第二步，就是构件一个Tween对象，对Tween进行初始化，本例的代码是:
```javascript
function initTween() {
 new TWEEN.Tween( mesh.position).to( { x: -400 }, 3000 ).repeat( Infinity ).start();
}
```
TWEEN.Tween的构造函数接受的是要改变属性的对象，这里传入的是mesh的位置。Tween的任何一个函数返回的都是自身，所以可以用串联的方式直接调用各个函数。

to函数，接受两个参数，第一个参数是一个集合，里面存放的键值对，键x表示mesh.position的x属性，值-400表示，动画结束的时候需要移动到的位置。第二个参数，是完成动画需要的时间，这里是3000ms。

repeat( Infinity )表示重复无穷次，也可以接受一个整形数值，例如5次。

Start表示开始动画，默认情况下是匀速的将mesh.position.x移动到-400的位置。

第三步是，需要在渲染函数中去不断的更新Tween，这样才能够让mesh.position.x移动位置:
```javascript
function animation()
{
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
    stats.update();
    TWEEN.update();
}
```

### 光源基类


在Threejs中，光源用Light表示，它是所有光源的基类。它的构造函数是：
```javascript
THREE.Light ( hex )
```
它有一个参数hex，接受一个16进制的颜色值。例如要定义一种红色的光源，我们可以这样来定义：
```javascript
var redLight = new THREE.Light(0xFF0000);
```
由基类派生出来的其他种类光源

THREE.Light只是其他所有光源的基类，要让光源除了具有颜色的特性之外，我们需要其他光源。

### 环境光

环境光用THREE.AmbientLight来表示，它的构造函数如下所示：
```javascript
THREE.AmbientLight( hex )
```
它仍然接受一个16进制的颜色值，作为光源的颜色。环境光将照射场景中的所有物体，让物体显示出某种颜色。环境光的使用例子如下所示：
```javascript
var light = new THREE.AmbientLight( 0xff0000 );
scene.add( light );
```
只需要将光源加入场景，场景就能够通过光源渲染出好的效果来了。

### 点光源

点光源用PointLight来表示，它的构造函数如下所示：
```javascript
PointLight( color, intensity, distance )
```

 * Color：光的颜色
 * Intensity：光的强度，默认是1.0,就是说是100%强度的灯光，
 * distance：光的距离，从光源所在的位置，经过distance这段距离之后，光的强度将从Intensity衰减为0。

默认情况下，这个值为0.0，表示光源强度不衰减。

### 聚光灯

聚光灯的构造函数是：
```javascript
THREE.SpotLight( hex, intensity, distance, angle, exponent )
```
函数的参数如下所示：
 * Hex：聚光灯发出的颜色，如0xFFFFFF
 * Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些。和上面点光源一样。
 * Distance：光线的强度，从最大值衰减到0，需要的距离。默认为0，表示光不衰减，如果非0，则表示从光源的位置到Distance的距离，光都在线性衰减。到离光源距离Distance时，光源强度为0.
 * Angle：聚光灯着色的角度，用弧度作为单位，这个角度是和光源的方向形成的角度。
 * exponent：光源模型中，衰减的一个参数，越大衰减约快。

### 方向光（平行光）

方向光的构造函数如下所示：
```javascript
THREE.DirectionalLight = function ( hex, intensity )
```
其参数如下：

 * Hex：关系的颜色，用16进制表示
 * Intensity：光线的强度，默认为1。因为RGB的三个值均在0~255之间，不能反映出光照的强度变化，光照越强，物体表面就更明亮。它的取值范围是0到1。如果为0，表示光线基本没什么作用，那么物体就会显示为黑色。

### 纹理由图片组成

在threejs中，纹理类由THREE.Texture表示，其构造函数如下所示：
```javascript
THREE.Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {
 var geometry = new THREE.PlaneGeometry( 500, 300, 1, 1 );
 geometry.vertices[0].uv = new THREE.Vector2(0,0);
 geometry.vertices[1].uv = new THREE.Vector2(2,0);
 geometry.vertices[2].uv = new THREE.Vector2(2,2);
 geometry.vertices[3].uv = new THREE.Vector2(0,2);

 var texture = THREE.ImageUtils.loadTexture("textures/a.jpg",null,function(t) {});
 var material = new THREE.MeshBasicMaterial({map:texture});
 var mesh = new THREE.Mesh( geometry,material );
 scene.add( mesh );
```

### 画一个平面

通过PlaneGemotry可以画一个平面，代码如下：
```javascript
var geometry = new THREE.PlaneGeometry( 500, 300, 1, 1 );
```
这个平面的宽度是500，高度是300.

### 为平面赋予纹理坐标

平面有4个顶点，所以我们只需要指定4个纹理坐标就行了。纹理坐标由顶点的uv成员来表示，uv被定义为一个二维向量THREE.Vector2()，我们可以通过如下代码来为平面定义纹理：
```javascript
geometry.vertices[0].uv = new THREE.Vector2(0,0);
geometry.vertices[1].uv = new THREE.Vector2(1,0);
geometry.vertices[2].uv = new THREE.Vector2(1,1);
geometry.vertices[3].uv = new THREE.Vector2(0,1);
```

注意，4个顶点分别对应了纹理的4个顶点。还要注意（0,0），（1,0），（1,1），（0,1）他们之间的顺序是逆时针方向。

### 加载纹理

这里加载纹理使用了loadTexture函数，代码如下：
```javascript
var texture = THREE.ImageUtils.loadTexture("textures/a.jpg",null,function(t) {});
```

这个函数的第一个参数是一个相对路径，表示与您的网页之间的相对路径。相对路径对应了一个纹理图片textures/a.jpg。

第二个参数为null，表示时候要传入一个纹理坐标参数，来覆盖前面在geometry中的参数。

第三个表示一个回调函数，表示成功加载纹理后需要执行的函数，参数t是传入的texture。

最后，这个函数的返回值是加载的纹理。

### 将纹理应用于材质

加载好纹理之后只需要将纹理映射到材质就可以了。我们这里使用了一个普通的材质THREE.MeshBasicMaterial，材质中有一个map属性，可以直接接受纹理，我们可以这样定义一个带纹理的材质：
```javascript
var material = new THREE.MeshBasicMaterial({map:texture});
```
将纹理和geometry，用于Mesh：
```javascript
var mesh = new THREE.Mesh( geometry,material );
```
将这个mesh加入场景中：
```javascript
scene.add( mesh );
```
