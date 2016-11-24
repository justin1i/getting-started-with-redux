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