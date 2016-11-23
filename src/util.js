const util = {
	addNode(id) {
		var node = document.createElement('div');
		node.id = id;
		document.body.appendChild(node);
		return node;
	}
};

export default util;