# Redux

* 单一不变state树
* 通过action描述state的变化
* reducer


# store

`getState()` 

`dispatch()` 

`subscribe()`


# 数组、对象的处理
	
```
const addCounter = (list) => {
	return [...list, 0];	
};

const removeCounter = (list, index) => {
	return [
		...list.slice(0, index),
		...list.slice(index+1)
	];	
};

const incrementCounter = (list, index) => {
	return [
		...list.slice(0, index),
		list[index] + 1,
		...list.slice(index+1)
	];	
};

```

```
const toggleTodo = (todo) => {
	return {
		...todo,
		completed: !todo.completed
	};	
};
```

# 同构


# 避免通过chunk避免race conditions
	
```
	const chunk = (store) => (state) => (action) =>
		typeof action === 'function' ?
			action(store.dispatch, store.getState) : 
			next(action);
```

# normolizr


# Fractal项目结构

小项目使用扁平的文件结构
	components
	contianers
	etc
这种结构伸缩性不好，随着项目增长，会影响开发效率

从第一天开始，就使用Fractal项目结构，运行项目驱动架构

！但是
	保持store扁平



# 优化
```
plugins: [
	new webpack.DefinePlugin({ // <-- key to reducing React's size
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(), //dedupe similar code 
  new webpack.optimize.UglifyJsPlugin(), //minify everything
  new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
]
```