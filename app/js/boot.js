﻿/*
 * 這裏是整支程式的進入點，它負責建立 root view，
 * 也就是 MainApp 元件，將它建立起來放到畫面上
 *
 * boot.js 存在的目地，是因為通常 app 啟動時有許多先期工作要完成，
 * 例如預載資料到 store 內、檢查本地端 db 狀態、切換不同語系字串、
 * 這些工作都先在 boot.js 內做完，再啟動 root view 是比較理想的流程
 * 
 */

// v0.12 開始要用 createFactory 包一次才能使用元件
// 如果不希望這麼麻煩，只要在每份 js 裏都加下面這句即可，但它有缺點
// var React = require('react');
// 
// 因為 require('...') 只是拿到一份元件定義檔，無法直接使用
// 要用它建立一個 factory，之後才能產出 instance，下面 createFactory() 就是在建立工廠
var AdWall = React.createFactory(require("./views/AdWall.jsx"));
//引入資料
var adLoader = require('./stores/adloader.js');

$(function(){
	//執行function，發送api抓資料處理後存到TagtooAdWall.adDate.itemList中
	adLoader.loadJQ()

	// create container dom element
	var body = document.getElementsByTagName("body")[0],
		node = document.createElement("section"),
		id = document.createAttribute("id");
	id.value = "container";
	node.setAttributeNode(id);
	body.insertBefore(node, body.childNodes[0]);

	var t = setInterval(function () {
		//確認api抓的資料有存到TagtooAdWall.adData.itemList之中
		var complete = TagtooAdWall.adData.itemList.row_1 && TagtooAdWall.adData.itemList.row_2 && TagtooAdWall.adData.itemList.row_3;
		
		if(complete){

			// 幫我建立mainapp元件，放到container中
			React.render( AdWall(), document.getElementById("container") );

			//停止setInterval中的function
			clearInterval(t);
		}
	}, 500);

})
