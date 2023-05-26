# 本地音乐播放器

## 功能

- 指定文件路径，读取音乐文件，生成播放列表；
- 根据播放模式（单曲，循环，顺序，随机），播放音乐文件；

## 实现思路

前端选择文件路径，node读取文件路径下所有音乐文件，并以列表的形式呈现。
选择音乐文件播放，node读取对应文件，以流的形式将音乐文件内容传到前端，用隐式`audio`标签播放媒体流。

## 技术难点

### audio标签不能直接用src读取音乐文件，会跨域

- electron主进程通过node读取音乐文件，以Buffer的形式传入渲染进程；
- 渲染进程将Buffer转为Blob；
- 前端通过`URL.createObjectURL()`为Blob生成文件链接，传入`audio.src`;

### 怎么实现一首播放完自动播放另一首？

1. 利用`audio.onended()`事件，当audio播放结束，根据播放模式，生成下一首歌曲的播放链接，并通过`musicSrc`传入`PlayBar`组件；
2. 通过`useEffect`监听`musicSrc`变量，当`musicSrc`发生变化时，触发组件挂载effect函数，令`audio.src = musicSrc`，重新加载audio，并定时改变时间和进度条显示；
3. 如果是单曲循环，不需要再由外部重新生成url，由`PlayBar`组件自己实现：同时监听播放模式state变量，audio播放结束时，重新执行组件挂载effect函数。单曲播放同理。
  
### 音乐播放进度条怎么实现？

定时监听audio的播放进度，并更新`currTime, currPercent`的state变量；

## 项目踩坑

- css transform会改变元素的z-index
