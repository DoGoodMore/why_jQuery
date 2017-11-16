/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {//整个jQuery可以理解为是一个函数的自调用(匿名函数自调用) 定义的该函数需要两个参数 第一个参数为全局的对象(即window) 第二个参数为一个函数 factory

	"use strict";//声明使用严格模式编码

	if ( typeof module === "object" && typeof module.exports === "object" ) {//判断是否使用CommonJS规范

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) ://暴露的对象中的如果有document则直接执行上面传入的factory函数
			function( w ) {//如果没有document对象 即非浏览器环境 则暴露一个函数
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );//该函数会对传入的参数进行判定 如果没有document对象 则抛错
				}
				return factory( w ); //如果有document对象 那么就执行factory函数
			};
	} else {//如果没有使用CommonJS规范  则直接执行factory函数
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {//传入实参 第一个参数为window  如果window的指向发生改变 则直接传入this 第二个参数为一个函数 即jQuery具体函数
		//该函数也需要两个参数 第一个参数为全局对象 第二个参数为一个布尔值 : 若为true则表示没有全局对象  若为false 则表示有全局对象

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";//声明使用严格模式编码

var arr = [];//声明一个为空的数组

var document = window.document;//将变量document指向为全局的上下文对象

//Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。
var getProto = Object.getPrototypeOf;

//Array.prototype.slice方法返回一个从开始到结束(不包含结束)选择的数组的一部分
	//返回值是一个新数组 原数组不会被改变且不会受影响
var slice = arr.slice;

//Array.prototype.concat方法用于合并两个或多个数组 此方法不会更改现有数组 而是返回一个新数组
var concat = arr.concat;

//Array.prototype.push 方法用于向数组的末端加入一个新的元素 该方法会影响原数组
	//该方法的返回值是传入的参数 即添加过后的新数组的最后一个元素
var push = arr.push;

//Array.prototype.indexOf 方法用于搜索给定参数在数组中的下标, 如果不存在 则返回-1
	//引用数据类型必须指向完全相同才会返回下标 若是指向不同那么返回-1
var indexOf = arr.indexOf;

var class2type = {};//将变量class2type指向为一个为空的对象

//Object.prototype.toString 方法返回一个表示该对象的字符串
	//[object type]
var toString = class2type.toString;

//Object.prototype.hasOwnProperty 方法返回一个布尔值
	//用于指示对象是否具有指定的属性(自身的属性而不是继承的属性)
var hasOwn = class2type.hasOwnProperty;

//函数的toString方法 函数/对象/基本数据类型的toString方法都是不一样的
var fnToString = hasOwn.toString;

//使用变量ObjectFunctionString 来表示函数执行对象toString方法结果
var ObjectFunctionString = fnToString.call( Object );

//将变量support指向为一个为空的对象
var support = {};



	function DOMEval( code, doc ) {//466
		//如果没有传入doc则将其指向为document对象
		doc = doc || document;
		//生成一个script标签用变量script变量指向
		var script = doc.createElement( "script" );
		//向script标签中添加文字 文字内容是我们传入的code参数
		script.text = code;
		//将生成的script标签添加到document的head中然后将其移除
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// 译 :在.eslintrc.json中定义这个全局将会造成使用全局的危险
// unguarded in another place, it seems safer to define global only for this module
// 译 : 在另一个地方没有保护，对于此模块定义全局似乎更安全



var
	version = "3.2.1",//声明版本号

	// Define a local copy of jQuery 译 : 定义jQuery的本地副本
	jQuery = function( selector, context ) {//定义jQuery函数 Jquery = window.onready()

        // The jQuery object is actually just the init constructor 'enhanced' 译 : jQuery对象实际上只是init构造函数'enhanced'
        // Need init if jQuery is called (just allow error to be thrown if not included)
        return new jQuery.fn.init( selector, context );//返回一个实例对象 构造函数为jQuery.fn.init
    },

	// Support: Android <=4.0 only 译 : 只支持安卓4.0以下的版本
	// Make sure we trim BOM and NBSP 译 : 确保我们修剪BOM和NBSP
	//即匹配所有的空格
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	//译 : ↑ 匹配拼凑的虚线
	rmsPrefix = /^-ms-/, //478处引用
	rdashAlpha = /-([a-z])/g,//xxx-xxx-xxx

	// Used by jQuery.camelCase as callback to replace()
	//译 : ↑ 由jQuery.camelCase用作回调替换（）
	fcamelCase = function( all, letter ) {//定义替换小写字母 用于后面的replace函数做调用
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {//定义fn  fn指向的就是jQuery的原型对象

	// The current version of jQuery being used
	//译 : ↑ 正在使用当前版本的jQuery
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {//定义toArray方法
		//该方法可以用来将一个伪数组转换成为一个真数组
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	//译 : ↑ 获取匹配元素集合中的第N个元素
	// Get the whole matched element set as a clean array
	//译 : ↑ 将整个匹配的元素集合设置为干净的数组
	get: function( num ) {//定义xxx.get方法
		//该方法用于获取指定传入参数下标位置的元素

		// Return all the elements in a clean array
		//译 : ↑ 返回一个干净的数组中的所有元素
		if ( num == null ) {//如果没有传入参数 那么就返回调用方法的对象
			return slice.call( this );
		}

		// Return just the one element from the set
		//译 : ↑ 从集合中只返回一个元素
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	//译 : ↑ 拿一些元素并将其推到堆栈上
	// (returning the new matched element set)
	//译 : ↑ （返回新的匹配元素集）
	pushStack: function( elems ) {//定义pushStack方法
		// Build a new jQuery matched element set
		//译 : ↑ 构建一个新的jQuery匹配元素集
		//创建一个新的空jQuery对象  并将传入的元素添加入该对象中
		//并将变量ret指向整合后的对象
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		//译 : ↑ 将旧对象添加到堆栈（作为参考）
		ret.prevObject = this;

		// Return the newly-formed element set
		//译 :↑ 返回新形成的元素集
		return ret;
	},

	// Execute a callback for every element in the matched set.
	//译 : ↑ 对匹配集合中的每个元素执行回调。
	each: function( callback ) {//定义each方法
		return jQuery.each( this, callback );
	},

	//
	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		//即返回最后一个保存下来的jQuery对象 就是上述通过pushStack方法调用的方法之后的方法都适用
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,//调用原生的push方法  push方法用于向数组的最后添加一个新的元素
	sort: arr.sort,//调用原生的sort方法 sort用于对数组按照一定得顺序进行重新排序
	splice: arr.splice//调用原生的splice splice 用于删除现有元素或添加新元素来更改一个数组的内容
};

jQuery.extend = jQuery.fn.extend = function() {//定义extend方法
	//extend方法用于给指定对象添加指定的方法
	//即添加新的插件
	var options, name, src, copy, copyIsArray, clone,
		//使用target变量获取到第一个参数
		//若是没有传入参数 那将其指向为一个为空的对象
		target = arguments[ 0 ] || {},
		i = 1,
		//使用length变量保存实参的个数
		//获取到传入参数的个数
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation 译 : 处理深层复制情况
	if ( typeof target === "boolean" ) {//判断第一个参数是否为布尔值
		//如果第一个参数是一个布尔值 那么将deep变量指向为该布尔值
		deep = target;

		// Skip the boolean and the target 译 : 跳过布尔值和目标值
		//即如果第一个参数是一个布尔值 那么将target变量指向为第二个实参
		//且将i变量的值自增一个单位
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	// 译 : ↑当目标是字符串或某些东西（可能在深层复制中）处理情况
	//继续对实参进行判定 如果第一个实参不是布尔值
	//即既不是对象也不是函数就将变量target指向为一个为空的对象
	//不是对象就返回true 是对象就返回false  是函数就返回false 不是函数就返回true
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	//译 : ↑如果只传递一个参数，则扩展jQuery本身
	//即如果实参的个数只有一个 那么就让target变量指向为Jquery本身
	if ( i === length ) {
		target = this;
		i--;
	}

	//遍历实参
	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		//译 : ↑ 只处理非空/未定义的值
		//对每个参数进行判定 判定每个实参是true还是false
		//并将每一个实参保存到变量options中
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			//译 : ↑ 扩展基础对象
			//遍历实参对象
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				//译 : ↑ 防止永无止境的循环
				//即防止对象的属性值指向的是对象本身 就造成了死循环
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				//译 : ↑如果我们合并了普通的对象或数组，就会重新出现
				//如果有传入第一个参数为true 即 需要深层复制
				//即一层一层都添加到指定对象上

				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					//译 : ↑永远不要移动原始对象，克隆它们

					//即如果需要深层复制 就将deep(此处应为true) clone(要添加的对象) copy被添加的对象传入
					//进行递归试调用
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
					//译 : ↑ 不要带入未定义的值
				} else if ( copy !== undefined ) {
					//即如果没有需要深层复制 那么就直接将需要添加属性的对象数值对应的属性值
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {//想jQuery中添加方法

	// Unique for each copy of jQuery on the page
	//译 : 每个页面上的jQuery副本都是唯一的
	//生成一个随机数 即 生成一段随机字串
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	//译 : ↑ 假定没有ready模块，jQuery就绪
	isReady: true,

	//定义报错函数 传入一个msg字串作为参数
	error: function( msg ) {
		throw new Error( msg );
	},

	//定义$.noop函数  可以传入一个为空的函数
	noop: function() {},

	//定义$.isFunction方法
	//该方法是调用的$.type 并具体化
	//即调用$.type方法 并对其返回值是否为function进行判定 如果是则返回true  如果不是则返回false
	isFunction: function( obj ) {//定义isFunction方法 238处引用
		return jQuery.type( obj ) === "function";
	},

	//定义$.isWindow方法 该方法用于对传入参数是否为window对象进行判定
	isWindow: function( obj ) {//623引用 定义isWindow方法 该方法用于判定一个变量是否是window对象
		return obj != null && obj === obj.window;
	},

	//定义$.isNumeric方法 该方法的作用确定其参数是否为一个数值
	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		//译 :↑ 从jQuery 3.0开始，isNumeric是受限制的
		// strings and numbers (primitives or objects)
		//译 : ↑字符串和数字（​​基元或对象）
		// that can be coerced to finite numbers (gh-2662)
		//译 : ↑ 可以被强制为有限的数字（gh-2662）
		//首先获取到参数的type值是什么
		var type = jQuery.type( obj );
		//要求传入参数必须是Number类型 或是string类型
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				//译 : ↑ ...但曲解前导数字字符串，特别是十六进制文字（“0x ...”）
			// subtraction forces infinities to NaN
			//译: ↑ 减法势力的无穷大
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {//274处引用 298处引用 //定义isPlainObject方法
		//isPlainObject方法用于检测一个对象是否是一个纯粹的对象
		//是否是用{}创建或是 new Object 创建
		var proto, Ctor;

		// Detect obvious negatives 译 : 检测明显的负面影响
		// Use toString instead of jQuery.type to catch host objects
		//译 : ↑使用toString而不是jQuery.type来捕获主机对象
		//使用对象的toString方法来对对象的类型进行判定
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;//即 如果不是一个对象就返回false
		}

		proto = getProto( obj );//获取到传入参数的原型对象 并将其保存在变量proto中

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
        //译 : ↑没有原型的对象（例如`Object.create（null）`）是简单的
		if ( !proto ) {
			return true;//如果没有原型对象 那么返回true
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		//译 : ↑ 具有原型的对象是普通的，如果它们是由全局对象函数构造的
		//获取到传入参数的原型对象中的constructor对象并将其指向为变量Ctor
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		//判定Ctor是否为一个函数且调用其toString方法 要求返回值必须(即构造函数)
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	//添加$.isEmptyObject方法  该方法主要是用来判定传入参数是否为一个为空的对象
	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		//译:↑ eslint-禁止不使用-VARS
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {//就是对传入参数进行遍历  如果有可遍历属性就返回false
			return false;
		}
		return true;//如果没有可遍历属性 那么就返回true
	},

	type: function( obj ) {//定义jQuery中的type方法
		if ( obj == null ) {
			return obj + "";//如果没有传参 返回字符串undefined
		}

		// Support: Android <=2.3 only (functionish RegExp) 译 : 支持：Android <= 2.3（功能RegExp）
        //如果传入的是一个对象就返回true  如果传入的是一个函数则返回"object"字符串
		/*
		* 运算符的优先级 :
		* 	. [] ()	字段访问、数组下标、函数调用以及表达式分组
		*	 ++ -- - ~ ! delete new typeof void			一元运算符、返回数据类型、对象创建、未定义值
        *	 * / %										乘法、除法、取模
		*	 + - +										加法、减法、字符串连接
		*	 << >> >>>									移位
		*	 < <= > >= instanceof						小于、小于等于、大于、大于等于、instanceof
		*	 == != === !==								等于、不等于、严格相等、非严格相等
		*	 &											按位与
		*	 ^											按位异或
		*	 |											按位或
		*	 &&											逻辑与
		*	 ||											逻辑或
		*	 ?:											条件
		*	 = oP=										赋值、运算赋值
		*	 ,											多重求值
		*
		 typeof obj === "object" || typeof obj === "function" ? class2type[ toString.call( obj ) ] || "object" : typeof obj;
		 		1.typeof obj === "object" || typeof obj === "function"
		 		2.class2type[ toString.call( obj ) ] || "object" : typeof obj;
		 		3.class2type[ toString.call( obj ) ] || "object"
		*		4.class2type[ toString.call( obj ) ]
		* */
		return typeof obj === "object" || typeof obj === "function" ? class2type[ toString.call( obj ) ] || "object" : typeof obj;
	},

	// Evaluates a script in a global context
	//译 :↑ 在全局上下文中评估脚本
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	//译 : ↑ 将虚线转换为camelCase;由css和数据模块使用
	// Support: IE <=9 - 11, Edge 12 - 13
	//译 : ↑ 支持：IE <= 9 - 11，Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	// 译 :↑ 微软忘记了他们的供应商前缀（＃9572）
	camelCase: function( string ) {
		//rmsPrefix = /^-ms-/
		//rdashAlpha = /-([a-z])/g,//xxx-xxx-xxx
		//将xxx-xxx-xxx 转换成 xxxXxxXxx  即background-color => backgroundColor
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {//定义遍历的方法 //定义each方法
		var length, i = 0;

		if ( isArrayLike( obj ) ) {//对传入对象进行判断 判定是否是一个数组或伪数组
			length = obj.length;//获取到传入参数的长度
			for ( ; i < length; i++ ) {//对其进行遍历
				//将每个回调函数中的this指向为遍历数组(维数组)中的每一个数组
				//且 如果 期间某个函数返回值为false就跳出each循环
				//即符合在jquery中使用return false 就可以终止循环
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {//如果遍历的参数是一个对象 那么就使用key in obj的方式来遍历
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}
		//最终返回obj 符合链式调用的原则
		return obj;
	},

	// Support: Android <=4.0 only
	//支持：Android <= 4.0
	//定义$.trim方法
	trim: function( text ) {
		//rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
		//如果没有传入参数  那么就返回一个空串
		return text == null ?
			"" ://如果有传入参数 那么就将其首尾的空格用空串替代
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	// 译 :↑ 结果仅供内部使用
	//定义$.makeArray方法
	//该方法主要用于将一个伪数组对象转换成为一个真正的js数组 如果传入两个参数那么将第一个数组合并到第二个数组中
	makeArray: function( arr, results ) {
		//判定是否有传入第二个参数
		//如果有则将其指向为变量ret 如果没有 则将变量ret指向为一个为空的数组
		var ret = results || [];
		//对传入的arr变量参数进行判定 确认其有值
		if ( arr != null ) {
			//
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	//定义$.inArray方法 该方法用于确定第一个参数在数组中的位置 从0开始计数(如果没找到则返回-1)
	inArray: function( elem, arr, i ) {//4877 定义jQuery中的inArray方法
		//调用的是原生的indexOf方法
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	//译 : ↑支持：仅Android <= 4.0，仅限PhantomJS 1
	// push.apply(_, arraylike) throws on ancient WebKit
	//译 : ↑ push.apply（_，arraylike）抛在古代的WebKit上
	merge: function( first, second ) {//定义merge merge方法是用来合并两个数组
		var len = +second.length,//获取到第二个数组的长度
			j = 0,
			i = first.length;//获取第一个数组的长度

		for ( ; j < len; j++ ) {//遍历第二个数组
			first[ i++ ] = second[ j ];//并将第二个数组中的所有元素添加到第一个数组中
		}

		first.length = i;//指定合并后数组的长度

		return first;//将整合后的数组返回出去
	},

	//定义$.grep方法 该方法是使用过滤函数来过滤数组元素
	//过滤函数必须返回true以保留元素 返回false以删除元素
	grep: function( elems, callback, invert ) {
		//第一个参数为要过滤的数组 第二个参数过滤元素的函数 第三个参数是决定返回true还是为false的结果数组
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		//译 : ↑ 通过数组，只保存项目
		// that pass the validator function
		//译 : ↑ 通过验证器功能
		for ( ; i < length; i++ ) {
			//通过对函数结果的返回值判定来决定新数组的值
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}
		//将过滤后的数组反出去
		return matches;
	},

	// arg is for internal usage only
	// 译 : ↑ arg 仅限内部使用
	//定义$.map方法 该方法用于将一个数组中的元素转移到另一个数组中
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		//译 :↑ 通过数组，将每个项目转换为其新值
		//首先对传入参数进行判定 判定其是否为可遍历型对象
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {//遍历参数
				//讲每个元素和下标传入函数中
				//并将返回值指向为value变量
				value = callback( elems[ i ], i, arg );
				//对变量进行判定
				if ( value != null ) {
					//如果有返回值 那么将其保存到新数组中
					ret.push( value );
				}
			}

		// Go through every key on the object,
			//译 : ↑遍历对象
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		// 译 : ↑ 平铺任何嵌套数组
		//最后将所有嵌套型数组或是对象平铺并返回 !!!因为是用的apply
		//TODO : 所以平铺也只能平铺一层
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	//译 : ↑ 对象的全局GUID计数器
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	//译 : ↑ 将函数绑定到上下文，可选地应用部分任何
	// arguments.
	//定义$.proxy方法 该方法主要用于更改函数中的this的指向
	proxy: function( fn, context ) {
		var tmp, args, proxy;
		//先对上下文对象判定 判断其是否为一个字串
		//即第二个情况  第一个参数是要设置上下文对象的对象名称 第二个参数是要改变this指向的函数名
		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// 译 : ↑ 快速检查，以确定目标是否可调用，在规范
		// this throws a TypeError, but we will just return undefined.
		//译 :↑ 这会抛出一个TypeError，但是我们只会返回undefined。
		if ( !jQuery.isFunction( fn ) ) {//对函数进行判定 如果其不是一个函数
			return undefined;//返回undefined
		}

		// Simulated bind
		//译 : ↑ 模拟绑定
		//对实参数组截取 值保留前两位之后的 并将截取后的数组并将变量args指向该数组
		args = slice.call( arguments, 2 );

		proxy = function() {//将proxy变量指向为一个函数
			//该函数 返回绑定了this对象以后的函数, 冰江arguments转换为真数组后传入函数中
			//如果上下文对象不可用就指向为this即jQuery对象上
			//并将获取到的参数数组传入到函数中
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		//译 : ↑ 将独特处理程序的guid设置为原始处理程序的guid，因此可以将其删除
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	//定义now方法 使用原生的now  该方法用于获取到当前的时间戳
	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	//译 :↑ Core中不使用jQuery.support，但其他项目附加它们
	// properties to it so it needs to exist.
	//译 : ↑ 属性，所以它需要存在。
	support: support
} );

if ( typeof Symbol === "function" ) {//判定Symbol是否为一个函数
	//如果是函数那么就向原型上添加Symbol.iterator方法
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),//给class2type添加属性和方法 用于jQuery.type方法中使用 即对输入不同的参数返回不同的类型
function( i, name ) {
	/*
	*
	* [object Array]:"array"
	* [object Boolean]:"boolean"
	* [object Date]:"date"
	* [object Error]:"error"
	* [object Function]:"function"
	* [object Number]:"number"
	* [object Object]:"object"
	* [object RegExp]:"regexp"
	* [object String]:"string"
	* [object Symbol]:"symbol"
	*
	* */
	class2type[ "[object " + name + "]" ] = name.toLowerCase();//对所有类型的字符串标识进行遍历  并按照该格式给class2type添加属性 属性名为[object xxx]的格式 属性值为xxx 即对应的type的值
} );

function isArrayLike( obj ) {//435引用

	// Support: real iOS 8.2 only (not reproducible in simulator)
	//译 : ↑ 支持：只有真正的iOS 8.2（在模拟器中不可重现）
	// `in` check used to prevent JIT error (gh-2145)
	//译: ↑`in`检查用于防止JIT错误（gh-2145）
	// hasOwn isn't used here due to false negatives
	//译 : ↑ hasOwn由于假阴性而不在这里使用
	// regarding Nodelist length in IE
	//译: ↑关于IE中的Nodelist长度
	//判断传入的参数中是否有length属性
	var length = !!obj && "length" in obj && obj.length,
		//获取到传入参数的type类型并用变量type保存
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		//对传入参数的类型进行判定 如果是函数或window对象 则返回false
		return false;
	}

	return type === "array" || length === 0 ||
		//即要求传入参数中必须有length属性 且length属性的属性值必须是一个Number类型的
		//长度必须大于0 且length - 1 必须要存在
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * 译 : ↑ 版权jQuery基金会和其他贡献者
 * Released under the MIT license
 * 译 : ↑ 根据MIT许可证发布
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {//定义一次匿名函数自调用

	//为什么在上面定义的某些方法在函数的内部还要定义一次?
	//这是因为函数内部定义变量时 函数内部在使用这些变量不用再一层一层的向全局去寻找该变量
	//而直接从自身的作用域中拿来即用 这是对性能的优化 时这个函数在调用起来时可以运行得更快

var i,
	support,//1226引用 //1366处引用
	Expr,//1282处引用
	getText,
	isXML,
	tokenize,//969引用
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,//1588  840调用
	document,//838有引用
	docElem,//1275出引用 1459引用
	documentIsHTML,//1305处引用
	rbuggyQSA,//924处引用
	rbuggyMatches,//1426处引用
	matches, //1593处引用
	contains, //890处引用

	// Instance-specific data 译 : 实例特定的数据
	expando = "sizzle" + 1 * new Date(),//1276处引用
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),//即使用闭包实现了缓存机制 即只有使用定义返回值指向的变量才能访问到期间的值
	tokenCache = createCache(),
	compilerCache = createCache(),//923引用
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	//将变量hasOwn指向为原生js对象的hasOwnProperty方法
	// hasOwnProperty方法用于检测调用对象中是否有传入参数的属性(非继承) 是自身的属性
	hasOwn = ({}).hasOwnProperty,
	//将变量arr 指向为一个为空的数组
	arr = [],
	//将变量pop指向为js原生数组的pop方法
		//pop方法用于向数组删除并返回数组的最后一个元素 且该方法会影响原数组
	pop = arr.pop,
	//将变量push_native指向为原生js的push方法
		//push方法用于向数组的末尾添加一个元素 并返回该元素 该方法也会影响原数组
	push_native = arr.push,
	//将变量push指向为原生js的push方法 同上
	push = arr.push,
	//将变量slice指向为原生js数组的slice方法
		//该方法用于截取数组的一段长度并返回 接受两个有效参数 参数类型为Number
			//第一个参数表示开始搜寻的下标 第二个参数表示结束搜索时候的下标 (不包含结束下标自身)
				//该方法不会影响原数组 而是将截取后的数组返回
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	//译 : ↑ 使用精简的indexOf，因为它比native更快
	// https://jsperf.com/thor-indexof-vs-for/5
	//定义indexOf方法
	indexOf = function( list, elem ) {//该方法需要两个有效参数 即要搜寻的数组和我们要搜寻下标的那个元素
		var i = 0,
			len = list.length;//获取到传入参数的数组的长度
		for ( ; i < len; i++ ) {//对传入数组进行遍历
			if ( list[i] === elem ) {
				return i;//如果某个数组的元素和我们传入的元素全等 那么返回这个下标
			}
		}
		return -1;//如果一直到整个循环都结束还有匹配到理想元素 那么就返回-1
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
    //1489引用 ↑ 保存的是可以在js中通过布尔值控制的html标签属性
	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	//用于匹配[\x20\t\r\n\f]
	whitespace = "[\\x20\\t\\r\\n\\f]",//716处引用 此为正则表达式中的一部分 用于匹配各种空格

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	// 译 : ↑ 属性选择器 http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
			//译 : ↑ 操作员（捕捉2）
			//捕获到*= ^= |= != ~= = 即属性选择器在css选择器的具体实现
			//[ xxx ~= \x 或者 除了 \
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			//译 : ↑ “属性值必须是CSS标识符[capture 5]或字符串[capture 3或capture 4]”
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 译 : ↑ 为了减少preFilter中需要标记化的选择器的数量，首选参数：
		// 1. quoted (capture 3; capture 4 or capture 5)
			//译 : ↑ 1.引用（捕获3;捕获4或捕获5）
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
			// 译 : ↑ 2.简单（捕获6）
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
			//译 : ↑ 其他（捕获2）
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	//译 : ↑ 引导和不转义的尾随空格，捕获后面的一些非空白字符
	rwhitespace = new RegExp( whitespace + "+", "g" ),

	//对字串中的开始或结束时候的空格进行匹配
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),//2519处引用

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	//该正则表示匹配   +    >    ~  即css关系选择器字串的选择符
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),//2510处引用

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {//2870
		//identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
		"ID": new RegExp( "^#(" + identifier + ")" ),//用于匹配以#开头的字串  即 id选择器
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),//用于匹配以.开头的字串 即 类选择器
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),//用于匹配以字母开头的字串 即 标签选择器 或者 * 即通配选择器
		//attr 正则匹配的捕获列表如 0.匹配的所有字符 1.捕获的对应的属性名 2.等式运算符 3.匹配的属性的属性值
		"ATTR": new RegExp( "^" + attributes ),//用于匹配属性选择器 如 [xxx ~= xxx]
		"PSEUDO": new RegExp( "^" + pseudos ),//用于匹配伪元素选择器 即选择:xxxx
		//定义后代元素选择器 包括 :only :first :last :nth ..... 且其后可以跟(even 或 odd 或 +(-)4n ) 或 +(-)
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		//定义布尔值属性值可控的html标签属性
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		//译 :↑ 用于实现.is（）的库中
		// We use this for POS matching in `select`
		//译 : ↑ 我们在`select`中使用这个POS匹配
		//用于匹配对应字串的正则表达式 如 +(>~) 或者 odd(或 eq 或 gt .... )(-1)8
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,//1262引用  1279处引用
	//除了{开头可匹配多个 后面的内容必须是{ [native x

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	//译 : ↑ 易于解析/可检索的ID或TAG或CLASS选择器
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,//851处引用
	//用于检测#xxx 或 xxxx 或.xxxx

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	//1283处引用 ↓
	//可写为 /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/gi
	//匹配\000000 \aaaaaa 类似的通过十六进制获取到对应编码的字符的字串
	//2320
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),


	//↓ 该函数是用于替换字符串中的执行函数 replace中的第二个参数
	funescape = function( _, escaped, escapedWhitespace ) {//定义funescape方法 1295处引用
		//escaped = [\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.
		//escapedWhitespace = [\x20\t\r\n\f]
		var high = "0x" + escaped - 0x10000;//如果传入的是转数字为NaN的类型 那么high的值就为NaN
		// NaN means non-codepoint 译 : NaN表示非码点
		// Support: Firefox<24 译 : 支持火狐24以下
		// Workaround erroneous numeric interpretation of +"0x" 译 : 解决方法+“0x”的错误数字解释
		return high !== high || escapedWhitespace ?//如果转为的值为NaN那么返回true
			//如果high为NaN那么进入下面判断 对传入的第三个参数进行判定
			//如果传入的第三个参数为true 那么就返回传入的第二个参数

			escaped ://如果有筛选到第二个参数 即[\x20\t\r\n\f]  那么就返回第二个晒选到的十六进制的串
			//如果第三个参数传入为false 就对high的值进行判断
			high < 0 ?
				//如果其小于0 那就返回一个字符串 如果大于0就返回两个字符串
				// BMP codepoint 译 : BMP代码点
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair) 译 : 补充平面代码点（代理对）
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization 译 : CSS字符串/标识符序列化
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,//949引用
	fcssescape = function( ch, asCodePoint ) {//952处引用
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			//译 : ↑ U + 0000 NULL变为U + FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			//译 : ↑ 控制字符和（取决于位置）数字作为代码点被转义
			/*charCodeAt() 方法返回0到65535之间的整数，
			表示给定索引处的UTF-16代码单元
			(在 Unicode 编码单元表示一个单一的 UTF-16
			编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。
			但在——例如 Unicode 编码单元 > 0x10000 的这种——不能被一个 UTF-16 编码单元单独表示的情况下，
			只能匹配 Unicode 代理对的第一个编码单元) 。如果你想要整个代码点的值，使用 codePointAt()。*/
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		//译 : 其他可能特殊的ASCII字符得到反斜杠转义
		return "\\" + ch;
	},

	// Used for iframes
	//译 : 用于iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	//译 : ↑ 删除函数包装会导致“权限被拒绝”
	// error in IE
	//在Ie中会抛错
	//将变量unloadHandler 指向为setDocument函数调用的结果
	unloadHandler = function() {//1208引用
		setDocument();//再调用setDocument
	},

	/*将变量disabledAncestor指向为函数
		function( elem, context, xml ) {
	 		var oldCache, uniqueCache, outerCache,
	 		newCache = [ dirruns, doneName ];

		 if ( xml ) {
		 while ( (elem = elem[ dir ]) ) {
		 if ( elem.nodeType === 1 || checkNonElements ) {
		 if ( matcher( elem, context, xml ) ) {
		 return true;
		 }
		 }
		 }
		 } else {
		 while ( (elem = elem[ dir ]) ) {
		 if ( elem.nodeType === 1 || checkNonElements ) {
		 outerCache = elem[ expando ] || (elem[ expando ] = {});

		 // Support: IE <9 only
		 // Defend against cloned attroperties (jQuery gh-1709)
		 //译 : ↑ 防御克隆的attroperties（jQuery gh-1709）
		 uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

		 if ( skip && skip === elem.nodeName.toLowerCase() ) {
		 elem = elem[ dir ] || elem;
		 } else if ( (oldCache = uniqueCache[ key ]) &&
		 oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

		 // Assign to newCache so results back-propagate to previous elements
		 return (newCache[ 2 ] = oldCache[ 2 ]);
		 } else {
		 // Reuse newcache so results back-propagate to previous elements
		 uniqueCache[ key ] = newCache;

		 // A match means we're done; a fail means we have to keep checking
		 if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
		 return true;
		 }
		 }
		 }
		 }
		 }
		 return false;
	 };*/
	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
	//译 : ↑ 优化push.apply（_，NodeList）
try {
	push.apply(
		//将变量arr改指向为document的后台节点集合 之前的指向为一个为空的数组
		//dhildNodes的返回值是一个伪数组 有length属性
		//因为对伪数组调用[].push.call 会报错
		//所以需要进行优化
		(arr = slice.call( preferredDoc.childNodes )),

		preferredDoc.childNodes
	);
	// Support: Android<4.0
	//译 : ↑ 支持安卓4.0以下
	// Detect silently failing push.apply
	//译 : ↑ 默默地检测失败的push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	//如果报错
	//改变push.apply的指向
	push = { apply: arr.length ?//对arr的length属性进行判定

		// Leverage slice if possible
		//译 : ↑ 如果可能的话，利用切片
		//如果arr.length有值 那么将push.apply指向改为原生的apply方法
		//但是传入的参数是封装过来传入的一个转换为真数组的伪数组
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		//译 : ↑  支持Ie9以下
		// Otherwise append directly
		//译 : ↑ 否则直接追加
		//如果arr.length不可用
		//那么就使用循环将传入的参数添加到指定的数组或是维数组的最后
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}


//定义Sizzle方法
	//该函数可以接受四个有效的参数 1.选择器字串 2.上下文对象 3.结果数组 4.必须是在seed参数对应的节点中筛选
function Sizzle( selector, context, results, seed ) {//1739处引用
	//定义Sizzle函数
	var m, i, elem, nid, match, groups, newSelector,
		//将newContext指向我们传入的上下文对象
		//如果没传那么就指向其undefined(null)
		//ownerDocument 只读属性 用于返回当前节点的顶层的document对象
		// document.ownDocument = null
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		//译  :↑ nodeType默认为9，因为context默认为document
		//即将nodeType指向为上下文对象的节点指数 如果没有传入那么就将其指向为9
		nodeType = context ? context.nodeType : 9;

	//对传入的results进行判定 如果有传入就指向为其 如果没有传入就指向为一个为空的数组
	results = results || [];

	// Return early from calls with invalid selector or context
	//译 : ↑ 从无效选择器或上下文的调用中提前返回
	//判定传入的选择器字符串是否符合标准
	//即如果传入的selector不是字符串或是为undefined(null, 0, ""等等)且要求其nodeType的指数为1 |9 |11
	//&&的运算符优先级高于||
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		//如果选择器不满足以上要求 就直接返回results
		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	//译 : ↑ 尝试在HTML文档中快速找到操作（而​​不是过滤器）
	if ( !seed ) {//如果没有传入seed参数
		//如果没有传入上下文对象 使用document进行对比判断
		//即判断传入的上下文对象是否是在本文档中 即是否和全局的document对象全等
		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			//调用setDocument方法 对其兼容性的相关方法进行设定
			setDocument( context );
		}
		context = context || document;//判定context的指向 即没有传入的话就将其指向为document对象

		if ( documentIsHTML ) {//判断文档类型是否为HTML5(h5)的规范

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			//译 : ↑ 如果选择器非常简单，请尝试使用“get * By *”DOM方法
			// (excepting DocumentFragment context, where the methods don't exist)
			//译 : ↑ （除了DocumentFragment上下文，方法不存在）
			//对变量nodeType进行判定
			//对传入的选择器字串进行一次简单的正则匹配 判定其是id选择器或者是类选择器
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			//nodeType为11表示目标节点是一个documentfragment节点
				//进入此判定则说明传入的上下文对象不是一个文档碎片对象
				// 且 选择器字符串是一个标签名字符串或是id或是类名字符串
				// ID selector
				if ( (m = match[1]) ) {//如果是id字符串 即#xxxx

					// Document context
					if ( nodeType === 9 ) {//判断上下文对象是否是document对象
						//进入此判定就说明传入的上下文对象是document对象
						if ( (elem = context.getElementById( m )) ) {
							//↑ 将elem指向为通过选择器字符串查找到的dom节点

							// Support: IE, Opera, Webkit
							//译 : ↑ 支持ie Opera webkit
							// TODO: identify versions
							//译 ↑ : 待办事项 确定版本
							// getElementById can match elements by name instead of ID
							//译 : ↑ getElementById可以通过名称而不是ID匹配元素
							if ( elem.id === m ) {//对筛选的节点进行判定 判断其id属性是否和我们传入的id值一样
								results.push( elem );//如果符合即两个值全等 就将起推入数组中返回出去
								return results;//返回结果数组
							}
						} else {//如果没有筛选到对应元素
							return results;//就返回一个为空的数组
						}

					// Element context 元素上下文
					} else {//如果上下文对象不是document类型

						// Support: IE, Opera, Webkit 译 : 支持ie Opera webkit
						// TODO: identify versions 待办事项 确定版本
						// getElementById can match elements by name instead of ID
						//译 : ↑ getElementById可以通过名称而不是ID匹配元素
						// 如果传入的context不是document
						//对其ownerDocument进行判定  此处的newContext指向为传入context上下文对象对应的document对象
						//因为单节点是没有getElementById的方法 所以需要借助document对象才能获取到对应id值的节点
						//要求newContext即传入节点的document对象 必须有值
						//通过newContext上下文查找ID节点的方法查到的dom节点有值
						//查找到的元素必须被传入的上下文所包含
						//查找到的元素的id属性必须和我们传入的id值全等
						//    ---- 如果满足以上的条件则将elem推入数组中并返回
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector 译 : 类选择器
				} else if ( match[2] ) {//如果筛选到的字串是xxxx
					//直接调用getElementsByTagName方法并将其推入数组中返回
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector 译 : class 选择器
					//先判断getElementsByClassName是否可用
					//且我们传入的上下文对象中有getElementsByClassName方法
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {
					//如果可用  就直接调用getElementsByClassName方法并将其推入到结果数组中返回
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll 译 : 利用 QSA
			//1.如果querySelectorAll可用
			//2.缓存中没有过传入选择器字串的值
			//3.浏览器兼容所有方法 或是选择器字串中所涉及的兼容性问题都不存在
			if ( support.qsa &&//如果querySelectorAll可用
				!compilerCache[ selector + " " ] &&//查看缓存中是否存在我们传入的选择器字串
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {//查看选择器中是否有当前浏览器不可用的某种字符

				if ( nodeType !== 1 ) {//判断context上下文对象是否为一个元素节点
					//如果元素节点不是一个元素节点
                    newContext = context; //将newContext指向为context上下文对象
					newSelector = selector;//将变量newSelector指向为传入的选择器字串

				// qSA looks outside Element context, which is not what we want
				//译 : ↑qSA看起来外部元素上下文，这不是我们想要的
				// Thanks to Andrew Dupont for this workaround technique
				// 译 : ↑感谢Andrew Dupont的这种解决方法
				// Support: IE <=8 译 : 支持ie8及以下
				// Exclude object elements 译 : 排除对象元素
					//nodeName 返回节点的名字
				} else if ( context.nodeName.toLowerCase() !== "object" ) {
					//进入此处判定 说明上下文对象不是object标签
					// Capture the context ID, setting it first if necessary
					//译 : ↑ 捕获上下文ID，如果需要，先设置它
					//将变量nid指向context上下文对象的id值并对其进行判定
					if ( (nid = context.getAttribute( "id" )) ) {
						//如果上下文对象的id值存在 进入此判定处
						//     /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g
						//即如果有ID属性值
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						//如果上下文对象没有id属性
						//为其设置id属性 为一个随机生成的字串
						//并将其赋值给nid变量
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					//译 ↑ 前缀列表中的每个选择器
					//将选择器字串传入tokenize函数中 即 如果同时有多个选择器字串 需要将其剥离出来
					//并将剥离后的选择器指向给groups变量
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {//对剥离后的选择器字串数组进行遍历
						//在每个选择器前方添加一个#id  给上下文对象添加一个id属性 然后让每个选择器都是在该选择器下查找
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					//译 : ↑ 展开兄弟选择器的上下文
					//rsibling = /[+~]/
					//即对选择器字串进行判定 判定其是否包含+或~ 即是否包含兄弟选择器的css标识符
					//再上下文对象的父节点传入testContext方法中 即判定其是否有父节点 且父节点中是否有getElementsByTagName
					//由于&&的优先级高于 || todo : 有待考擦
					//即如果有兄弟元素 比方说 div~p 那么我们添加了id前缀之后就变成 #nid div~p
					// 那么就需要将上下文对象变成其父节点
					//如果没有兄弟选择器即+~ 那么就将newContext的指向为原来的上下文对象
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {//对剥离后且分隔的选择器字串进行判定 如果存在
					try {
						push.apply( results,//就在每个上下文对象下调用qsa方法查找对应的节点
							//并将节点添加到结果数组中
							newContext.querySelectorAll( newSelector )
						);
						return results;//将结果数组返回
					} catch ( qsaError ) {//如果报错  那么抛错错误
					} finally {
						if ( nid === expando ) {//最后删除上下文对象的id属性
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}
	//如果有传入seed参数 那么就调用select方法 并将选择器字串去除收尾空格后传入
	// All others
	//将选择器字串去除首尾空格 传入的上下文对象 结果数组 seed参数一同传入到select函数中
	//并将其调用的结果返回
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size 译 : 建有限大小的键值缓存
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 * 译 : ↑@returns {function（string，object）}将对象数据存储在自身上后返回
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *译 : ↑ 属性名称（空格后缀）字符串和（如果缓存大于Expr.cacheLength）
 *	deleting the oldest entry
 *译 : ↑ 删除最旧的条目
 */

//使用了闭包的原理  每一次指向的keys都不一样 必须用变量保存起来才能访问到
function createCache() {//定义createCache方法
	var keys = [];//声明一个为空的数组

	function cache( key, value ) {//声明内部函数cache
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		//译 : 使用（key+" "）避免与原生原型属性相冲突（参见问题＃157）
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries 译 : 只保留最近的条目
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {//定义函数markFunction 1470
	//该函数用于给传入的函数添加一个表示符 即以约定的名字作为属性名并将其属性值设置为true
	fn[ expando ] = true;
	//然后将函数返回出去
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	//assert 断言 即调试器的函数
	var el = document.createElement("fieldset");//在内存中创建一个fieldset标签

	try {
		return !!fn( el );//测试函数是否可用 如果可用返回执行结果(隐式类型转换 将其转换为布尔值)
	} catch (e) {
		return false;//报错即不可用则返回false
	} finally {
		// Remove from its parent by default 译 : 默认情况下从其父项中删除
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );//删除创建的节点
		}
		// release memory in IE 译 : 在IE中释放内存
		el = null;//指向null清除内存
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {//定义方法addHandle
	var arr = attrs.split("|"),//将传入的字符串以 | 做为分隔符将其分成一个数组
		i = arr.length;//获取到分隔之后的数组的长度

	while ( i-- ) {//对数组进行遍历
		Expr.attrHandle[ arr[i] ] = handler;//并向Expr.attrHandle添加对应的以每个数组的元素为属性名以传入的参数函数为属性值的属性
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	//译 : ↑ 如果两个节点都可用，请使用IE sourceIndex
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		//nextSibling是一个只读属性 返回其父元素的childNodes\liebiao种紧跟在其后面的节点
		//如果指定的节点为最后一个节点 则返回null
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
//定义createInputPseudo方法
function createInputPseudo( type ) {//2790
	return function( elem ) {
		//该函数的返回值是一个函数
		//返回函数需要传入一个节点作为参数
		//且要求传入的节点的节点名称必须是input类型
		//而其type类型必须和外层函数传入的type字串全等
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
//2802
	//定义createButtonPseudo  该函数用对按钮的伪元素字串进行匹配
function createButtonPseudo( type ) {
	return function( elem ) {
		//调用createButtonPseudo返回一个函数
		//返回函数通过传入的一个节点
		//来确认其是否为一个按钮的元素 且其type值由和外层函数有全等关系
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {//定义createPositionalPseudo方法 该函数需要传入一个函数作为参数
	/*function markFunction( fn ) {
		 fn[ expando ] = true;
			 return fn;
	 }*/
	return markFunction(function( argument ) {//该函数调用首先返回一个标记的函数=
		argument = +argument;//做隐式类型转换
		return markFunction(function( seed, matches ) {//返回的函数中需要传入两个参数
			var j,
                //在调用外部传入的函数 并传入一个空数组 以及传入seed的长度 和 所有实参数字的和 即上处运算后的argument的值 传入
				//并将函数运行的结果指定给变量matchIndexes
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			//译 : ↑ 匹配在指定索引处找到的元素
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {//定义testContext方法 该方法接受一个有效参数 即 上下文对象context
	//即判定上下文对象是否存在 且该上下文对象有getElementsByTagName方法 该方法返回上下文对象
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};//将变量和 Sizzle.support关联起来 并初始化设置

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {//定义isXML方法
	// documentElement is verified for cases where it doesn't yet exist
	//译 ↑ : 在尚不存在的情况下对documentElement进行验证
	// (such as loading iframes in IE - #4833)
	//译 ↑ : 比方说在IE中加载iframes时
	//声明变量documentElement的值, 如果传入的值为null或是不传那么就指向null或undefined本身
	//  如果传入的值是document 那么则会指向html根标签

	/*
	在XML中的实现
	xmlDoc=loadXMLDoc("/example/xdom/books.xml");
	var x=xmlDoc.documentElement;
	document.write("Nodename: " + x.nodeName + "<br />");
	document.write("Nodevalue: " + x.nodeValue + "<br />");
	document.write("Nodetype: " + x.nodeType);
	输出：
	Nodename: bookstore
	Nodevalue: null
	Nodetype: 1
	*/
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;

	//node.nodeName 返回当前节点的节点名称
	//返回值依据documentElement的类型决定 如果其为false 那么久直接返回false
	//如果为一个XML文档元素中 那么久会返回true
	//如果是在h5的页面中 那么会返回false
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document 译 : 根据当前文档设置文档相关变量一次
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * 译 ↑ : @param {Element | Object} [doc]用于设置文档的元素或文档对象
 * @returns {Object} Returns the current document
 * 译 ↑ : @returns {Object}返回当前document 对象
 */
	//定义变量setDocument同Sizzle.setDocument一同指向为一个函数
setDocument = Sizzle.setDocument = function( node ) {//602处有引用
	//定义setDocument方法;
	//---首次调用未传入参数
	var hasCompare, subWindow,
        //Node.ownerDocument 只读属性会返回当前节点的顶层的 document 对象。
        //如果没有传入node参数 那么将其指向为document
		//--- 首次调用即将doc指向为window.document对象 即本文档的document对象
		//即默认为当前document对象
		doc = node ? node.ownerDocument || node : preferredDoc;//preferredDoc = document

	// Return early if doc is invalid or already selected 译 : 如果doc无效或已选择，请尽早返回
	//对doc进行判定 如果他的值为undefined 或是不是document节点类型  又或者不含根标签 那么直接返回undefined
	//即筛选掉不是节点却能转换为布尔值为true的类型 如字符串 不为0的Number等等
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {//变量document当前的指向为undefined
		return document;
	}

	// Update global variables 译 : 更新全局变量
	document = doc;//将变量document的指向改为传入节点的document对象如果没有传入对应的节点那么就将其指向为全局document对象
	docElem = document.documentElement;//将docElem指向为html根标签
	documentIsHTML = !isXML( document );//判断document变量是否为XML格式 如果是那么documentISHTML的值就是false

	// Support: IE 9-11, Edge 译 : 支持IE 9-11，Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	//译 ↑ : 卸载后访问iframe文件抛出“permission denied”错误（jQuery＃13936）
	if ( preferredDoc !== document &&//preferredDoc = document(当前文档的document对象)
		// 变量document是传入节点的document对象
		//即判断传入节点和document是否处于同一个document对象中
			//将subWindow指向为传入节点的window对象上 如果不是当前文档中的document对象那么其指向为null
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {
		//subWindow指向传入节点的document对象
//document.defaultView在浏览器中，该属性返回当前 document 对象所关联的 window 对象，如果没有，会返回 null。
		//window.top 返回最顶层的窗口对象。
		//即判断当前对象是否是处于当前文档中的document对象

		//进入下面的逻辑即表示当前节点是在框架中的节点
		// Support: IE 11, Edge 译 : 支持 IE11 Edge
		if ( subWindow.addEventListener ) {//IE不支持addEventListener
			//给传入节点的window对象上绑定关闭页面的监听事件
			//事件名是unloadHandler
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only 译 : 仅支持ie9-10
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */


	//如果不是框架中的节点
	// Support: IE<8 译 : 支持ie9及以下
	// Verify that getAttribute really returns attributes and not properties
	//	译↑ : 验证getAttribute真的返回attributes而不是返回properties
	// (excepting IE8 booleans) 译 : IE8布尔除外
	//assert 用于测试函数是否可用的方法 如果可用返回true 如果不可用则返回false
	/*
	 function assert( fn ) {
	 var el = document.createElement("fieldset");
	 try {
	 return !!fn( el );
	 } catch (e) {
	 return false;
	 } finally {
	 if ( el.parentNode ) {
	 el.parentNode.removeChild( el );
	 }
	 el = null;
	 }
	 }

	*/
	//开始对浏览器对各方法的兼容性进行检测
	//support  即 $.support 用于检测浏览器对各获取DOM元素方法的检测的布尔值 即可用那么该属性的属性值就为true 反之false

	support.attributes = assert(function( el ) {
		el.className = "i";
		//因为通过节点.的形式设置的属性值无法通过节点.getAttribute的形式获取到
		//所以在对返回值判定的时候需要进行取反
		return !el.getAttribute("className");
	});//检测浏览器是否支持getAttribute方法
	//如果可用那么support.attributes 的值为true 如果不可用那么support.attributes的值为false

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	//译 ↑ : 检查getElementsByTagName（“*”）是否只返回元素
	//support.getElementsByTagName 用于表示getElementsByTagName是否可用 且该方法是否会返回其中的注释节点
	//如果会返回注释节点那么就为false 如果不会返回注释节点那么就返回true
	support.getElementsByTagName = assert(function( el ) {//1368处引用
        //document.createComment用来在内存中创建一个注释节点
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});//同理 support.getElementsByTagName是用于检测getElementsByTagName方法是否可用
	//可用的话那么support.getElementsByTagName的值为true 如果不可用的话那么其值为false

	// Support: IE<9 译 : 支持：IE <9
    //1407处引用
	//support.getElementsByClassName 即直接使用正则表达式判定其是否为一个函数 如果是一个函数那么就返回true 反之false
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	//用于检测getElementsByClassName是否可用
	//同理 可用的话support.getElementsByClassName指向为true 不可用那么其指向为false

	// Support: IE<10 译 : 支持 : IE < 10
	// Check if getElementById returns elements by name
	//译↑ : 检查getElementById是否按名称返回元素
	// The broken getElementById methods don't pick up programmatically-set names,
	//译 ↑: 不符合的getElementById方法不会以编程方式设置名称，
	// so use a roundabout getElementsByName test
	//译↑ : 所以使用回旋处getElementsByName测试

	//用于显示getElementsByName是否会获取到id为对应参数的节点
	//如果也获取到或者是getElementsByName方法不可用那么就为false
	//如果可用且不会返回id值为对应参数的节点的话那么对应的指向就是true
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;//添加标签并设置id属性
		//1191处将docElem指向为根标签
		//该属性用于检测getElementsByName是否会获取到id值为对应的参数的节点
		//首先对浏览器是否支持getElementsByName进行判定 若是不支持那么就直接返回true;
		//如果支持就对其获取的节点的长度进行判定 及如果获取的节点数组为空 那么就返回true 如果有获取到节点 那么就false
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find  译 : ID过滤并查找
	if ( support.getById ) {//即通过support.getById的判定来设置对应的ID选择器的使用函数的方法
		//如果getElementsByName不会获取到id为对应属性的节点
		//那么将Expr.filter["ID"]设置为以下函数
		Expr.filter["ID"] = function( id ) {
			///\\\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/gi
			//首先对传入id值进行处理 如果传入id中含有unicode编码的内容 首先对其进行转换的解析
			var attrId = id.replace( runescape, funescape );
			//返回函数 即该函数传入对应的节点 并用节点的id属性值和我们解析后的id值进行全等对比
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
        //如果getElementsByName不会获取到id为对应属性的节点
		//那么将Expr.find["ID"]设置为以下函数
		Expr.find["ID"] = function( id, context ) {
			//该函数可以传入id值和对应的上下文对象
			//1.如果可用那么就返回true 2.如果不可用就返回false
			//先判定传入的上下文对象有getElementById方法 且文档的编码格式是h5
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				//再调用上下文对象的getElementById方法
				var elem = context.getElementById( id );
				//返回查找的元素 如果没有找到那么就返回一个为空的数组
				return elem ? [ elem ] : [];
				//返回值即是按照getelementbyid筛选后代元素 如果有就返回一个数组 如果没有就返回一个为空的数组
			}
		};
	} else {//表示如果getElementsByName也能获取对应的id属性值是参数的对应节点
		//那么就将Expr.filter["ID"]设置为以下函数
		Expr.filter["ID"] =  function( id ) {//该函数可以传入一个id作为参数
			//对传入的id值进行解码或编译
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {//然后返回一个函数
				//改函数可以传入一个节点作为参数
				//首先判定节点是否有getAttributeNode方法
				//然后调用其getAttributeNode方法传入"id"即获取其id属性
				var node = typeof elem.getAttributeNode !== "undefined" &&

					elem.getAttributeNode("id");
				//再将其获取到的id属性的value值和外层传入的id参数进行对比并将结果返回
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only 只支持IE6-7
		// getElementById is not reliable as a find shortcut 译 : getElementById作为查找快捷方式不可靠
		Expr.find["ID"] = function( id, context ) {//定义find传入ID的函数
			//↓ 判断是否支持getElementById方法且文档是H5的编码规范
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {

				var node, i, elems,
					//将elem指向为在传入的上下文对象中按照ID找到的DOM元素
					elem = context.getElementById( id );

				if ( elem ) {//如果查找到的DOM元素有值

					// Verify the id attribute 译 : 验证id属性
					//将变量node指向为其id属性
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {//确保node变量的指向 即getAttributeNode方法可用
						return [ elem ];//如果都指向正确 那么就返回包含DOM元素的数组
						//↑ 即getElementById getAttributeNode 都可用
					}

					// Fall back on getElementsByName 译 : 回到getElementsByName
					//如果getAttributeNode不能获取到节点的id属性
					//那么使用上下文对象的getElementsByName方法 (因为进入此判断 就说明使用getElementsByName方法
						//也能找到对应的id属性值的对应节点
					elems = context.getElementsByName( id );
					i = 0;//给i进行赋值
					while ( (elem = elems[i++]) ) {
						// ↑将elem指向为按照getElementsByName获取的每一个节点(包括name属性和id值)
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {//筛选掉name属性的值的节点
							return [ elem ];//返回获取到的节点的数组
						}
					}
				}
				//如果通过getElementById没有找到对应的节点 那么就返回一个为空的数组
				return [];
			}
		};
	}

	// Tag
	//检测getElementsByTagName的可用性
	//support.getElementsByTagName根据上文中的判定可检测处是否可用 如果可用就为true
	//如果不可用就为false
	//即根据浏览器的getElementsByTagName是否可用来定义Expr.find["TAG"]方法
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {//此为getElementsByTagName可用的情况
			if ( typeof context.getElementsByTagName !== "undefined" ) {
                //如果可用 就直接返回getElementsByTagName的执行结果
                return context.getElementsByTagName( tag );
			// DocumentFragment nodes don't have gEBTN 译 : 文档碎片没有getElementsByTagName方法
			} else if ( support.qsa ) {
				//如果不可用 就返回上下文的querySelectorAll方法的执行结果
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {//此为getElementsByTagName不可用的情况
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                //译 : ↑ 巧合的是 一个(不完整)getElementsByTagName出现在文档碎片的节点上
                //将getElementsByTagName获取的值保存到变量result中
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
            //译 : ↑ 过滤掉注释标签
			if ( tag === "*" ) {//判断传入的查询参数的取值 如果为通配符
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {//就过滤出其中的元素节点
						tmp.push( elem );//并将过滤之后的节点添加到变量tmp中
					}
				}

				return tmp;//然后在将其返回出去
			}
			return results;//如果不是传入通配符 那么就将result返回出去 因为其方法不可用 所以也有可能是undefined
            //如果不可用那么就返回undefined
		};

	// Class
    //对getElementsByClassName的方法支持进行判定
    //即如果不支持getElementsByClassName方法就返回false
    //如果支持 就返回一个函数
    //该函数会对上下文的getElementsByClassName方法进行判断  并且文档的编码规范是按照h5的规范
    //才会返回上下文的getElementsByClassName方法
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	QSA = querySelectorAll
	//matchesSelector 是元素节点的方法  传入一个css字符串 返回值是一个布尔值 即如果纯在该元素就返回true,反之false
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support
    //译 : ↑对于支持QSA和matchesSelector的情况
	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
    //译 : ↑ matchesSelector（：active）在true时报告为false（IE9 / Opera 11.5）
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
    //译 ↑ :qSa（：focus）在true时报告错误（Chrome 21）
	// We allow this because of a bug in IE8/9 that throws an error
    //译 : ↑我们允许这样做是因为IE8 / 9中的bug会引发错误
	// whenever `document.activeElement` is accessed on an iframe
    //译 : ↑ 每当在iframe上访问`document.activeElement`时
    //document.activeElement : 返回当前页面中获得焦点的元素,也就是说,如果此时用户按下了键盘上某个键,会在该元素上触发键盘事件.该属性是只读的.

	// So, we allow :focus to pass through QSA all the time to avoid the IE error
    //译 ↑ : 所以我们允许：焦点通过QSA，以避免IE的错误
    // See https://bugs.jquery.com/ticket/13378
    //译 : ↑ 详情咨询 https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];//将变量rbuggyQSA指向为一个为空的数组


    //1.将qsa指向为QSA是否可用的布尔值指标
    //  2.对qsa的值取向进行判定
	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex 译 : 构建querySelector正则表达式
		// Regex strategy adopted from Diego Perini 译 : 来自Diego Perini的正则表达策略
		assert(function( el ) {//对传入函数进行试运行
			// Select is set to empty string on purpose
            //译 : ↑ Select被设置为空字符串
            // This is to test IE's treatment of not explicitly
            //译 : 这是为了不明确地测试IE的治疗
			// setting a boolean content attribute,
            //译 :设置一个布尔内容属性，
			// since its presence should be enough
            //译: 因为它的存在应该是足够的
            // https://bugs.jquery.com/ticket/12359

            //对querySelectorAll进行测试 首先向根标签添加一个el元素 el为assert函数中创建的fieldset标签
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
            //译 : ↑支持 ie8 Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
            //译 : ↑空字符串跟随^=或 $= 或 *=时，不会选择任何内容
			// The test attribute must be unknown in Opera but "safe" for WinRT
            //译 : ↑ 测试属性在Opera中一定是未知的，而对于WinRT来说，测试属性是“安全的”
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section

            //[attr^=value] 表示带有以 attr 命名的，且值是以"value"开头的属性的元素。
			//即如果无法通过属性选择器来选择属性值为""情况
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
			    //如果querySelectorAll 能够筛选到属性名msallowcapture的元素
                //即上文中向el中添加的select 标签
                //然后在rbuggyQSA中添加一个正则表达式
                //该正则是用来匹配以^= *= $= 空格 或"" ''的串
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8译: 支持ie8
			// Boolean attributes and "value" are not treated correctly
            //译 : ↑ 布尔属性和“值”不正确对待
			//即无法通过[selected]选中被选中节点的情况 (也包括变量booleans中所有的布尔值属性的情况)
            if ( !el.querySelectorAll("[selected]").length ) {
			    //如果querySelectorAll 在筛选selected中没有筛选到指定元素的时候
                //那么就在rbuggyQSA中新加入一个正则表达式
                //该表达式用于匹配[空格*(value|selected...)]
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
            //译 : ↑ 支持：Chrome <29，Android <4.4，Safari <7.0+，iOS <7.0+，PhantomJS <1.9.8+
			//即无法通过~=选中属性值中包含某个变量的节点的情况
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
			    //即如果通过属性名的形式查找id属性中包含某指定字符串失败的时候
                //向rbuggyQSA中添加"~=" 即属性值中包含指定值的css选择器
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
            //译 : ↑Webkit / Opera - ：checked应该返回所选的选项元素
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
            // 译 : ↑IE8在这里抛出错误，不会再看到以后的测试
			//即无法通过:checked选中指定的属性的节点
            if ( !el.querySelectorAll(":checked").length ) {
			    //即无法通过querySelectorAll选中伪元素 :checked
                //:checked css3中的选择器 只支持Opera 表示选择被选中的input元素
                //如果不支持那么向rbuggyQSA中添加 ":checked"
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+ 译 : Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
            //译 : ↑ 页内`selector＃id sibling-combinator selector`失败
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				//该表达式是为了鉴定对兄弟选择器的兼容性
				//如果不能选中指定的元素那么就向数组中添加正则
				//该正则是用来匹配a#xxxx+(~)即兄弟元素的选择器
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {//使用判错函数对传入函数进行判定
			//el为assert函数中创建的fieldset标签  向该标签中加入a标签
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps 译 : 支持：Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			//译 ↑ : 在.innerHTML分配期间，类型和名称属性受到限制

			//在内存中创建一个input标签
			var input = document.createElement("input");
			//给input元素设置type属性为hidden 使其不可见
			input.setAttribute( "type", "hidden" );
			//将创建的添加到测试标签中 并为其设置name属性(input) appendChild的返回值是被添加的子元素
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8 译 : 支持ie8
			// Enforce case-sensitivity of name attribute 译 :强制名称属性的区分大小写
			if ( el.querySelectorAll("[name=d]").length ) {
				//为了测试属性名值选择器是否区分大小写 如果区分 那么直接跳过 如果不区分
				//进入此逻辑 并向数组中添加字串
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			//译 : ↑ FF 3.5 - :enabled/:disabled（隐藏元素仍然启用）
			// IE8 throws error here and will not see later tests
			//译 : ↑ IE8在这里抛出错误，不会再看到以后的测试
			//:enabled 选择器匹配每个已启用的元素（大多用在表单元素上） 与 :disabled相反
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				//测试:enabled 伪类选择器是否可用 如果不可用进入此逻辑
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+ 译 : 支持ie8-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			//译 : ↑IE的：禁用的选择器不接收禁用字段集的子节点
			//将新创建的元素添加到根标签中 并设置其为禁用状态
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				//将创建的fieldset设置为disabled再查看:disabled选择的数量
				//即查看:disabled在浏览器中的实现方式不同
				//因为有的浏览器只会选择其两个 而有的浏览会选择三个等
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			//译 : ↑ Opera10-11不会引用逗号后无效伪造
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	//matchesSelector如果元素将被指定的选择器字符串选择，Element.matches()  方法返回true; 否则返回false。

	//support.matchesSelector指向为判定浏览器的Matches是否可用的指标
	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
				//添加前缀用于兼容不同版本的浏览器
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		//即 如果兼容matchesSelector方法 进入下面的逻辑
		//调用判错函数进行检测
		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			//译 : ↑检查是否可以做matchSelector
			// on a disconnected node (IE 9)
			//译 : ↑ 在断开连接的节点（IE 9）
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			//译 : ↑ 这应该失败，例外
			// Gecko does not error, returns false instead
			// 译 : ↑ 壁虎不会错误，而是返回false
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	// rbuggyQSA的值为false 或是每个元素以|分隔的正则表达式
	//即对浏览不支持的Qsa的类型进行正则修正 并以|连接作为字符串展示
	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	//rbuggyMatches同理 若是都支持 那么rbuggyMatches的值为0
	//若是有某种方法不被支持 那么就将其通过|连接作为字串传入正则构造函数中 生成一个正则表达式
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	//node.compareDocumentPosition => 比较当前节点与任意文档中的另一个节点的位置关系
	//将变量hasCompare指向为检测compareDocumentPosition是否可用的布尔值
	//如果可用 则其值为true 如果不可用则其值为false
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another 译 : 元素包含另一个
	// Purposefully self-exclusive 译 : 有意独立的
	// As in, an element does not contain itself 译 : 如同，元素不包含自身

	//contains方法用于判断传入的两个参数之间是否存在包含关系
	contains = hasCompare || rnative.test( docElem.contains ) ?//890处应用
		//如果hasCompare为true的话  将contains的值也指向为true 即compareDocumentPosition可用
		//如果hasCompare为false, 那么就对contains进行判定
		//如果判定符合目标正则 将其指向为一个函数
		function( a, b ) {//contains可用
			//对传入的a的类型进行判定 如果其nodeType指数为9 声明adown并将其指向为传入a所在文档对象的根标签
			//如果不是document指数 就将adown指向为a
			var adown = a.nodeType === 9 ? a.documentElement : a,
				//将bup指向为传入b参数的父节点
				bup = b && b.parentNode;
			//
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) ://判断adown中是否包含bup
                    //如果contains方法不可用
                    //那么久调用compareDocumentPosition(由于该方法的返回值是一个16进制的字段 所以需要&16)
					//compareDocumentPosition方法用于比较当前节点与任意文档中的另一个节点的位置关系
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {//contains不可用
			if ( b ) {//进行循环调用 不断让b指向为其父元素 如果在某次循环全等于a 那就说明a包含b 就返回true
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;//如果到最后也不全等 则说明a中不包含b  就返回false
		};

	/* Sorting  //译 排序
	---------------------------------------------------------------------- */

	// Document order sorting
	//译 : ↑ 文件顺序排序
	sortOrder = hasCompare ?//将变量sortOrder依据contains方法是否可用重新定义
	function( a, b ) {//如果contains方法可用

		// Flag for duplicate removal 译 : 标记为重复删除
		if ( a === b ) {//对两个参数进行全等比较如果全等
			hasDuplicate = true;//如果全等将变量hasDuplicate指向为true
			return 0;//并返回0
		}

		// Sort on method existence if only one input has compareDocumentPosition
		//译 : ↑ 如果只有一个输入有compareDocumentPosition，则排序方法存在
		//即如果只有一个可用 那么一个值为true 一个值为false 那么其相减得到的值不为0
		//那么返回值不是1 就是 -1
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {//若是两个参数的compareDocumentPosition方法都可用 那么跳过此判定
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		//译 : ↑ 如果两个输入都属于同一文档，则计算位置
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?//如果两个值同处于一个document对象之下
			a.compareDocumentPosition( b ) ://那么就将变量compare指向两个值之间的位置关系

			// Otherwise we know they are disconnected
			//译 : ↑ 否则，我们知道他们断开连接
			1;//即如果传入的两个参数之间不是在同一个document之下  那么就将变量compare指向为1

		// Disconnected nodes
		//译 : ↑ 断开连接的节点
		if ( compare & 1 ||// & 1用于对一个Number类型的变量进行奇偶判定 如果是偶数那么返回1  如果是奇数那么返回0
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			//译 : ↑ 选择与我们首选文档相关的第一个元素
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				//即判定a是否是在当前document对象之中的 如果是在当前的document对象中且被当前的document对象包含
				//那么就返回-1
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				//同理判定节点b是否是在当前的document对象中
				//如果是  那么就返回1
				return 1;
			}

			// Maintain original order
			//译 : ↑ 保持原来的秩序
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {//如果contains方法不可用 那么就将变量sortOrder指向为以下函数
		// Exit early if the nodes are identical
		// 译 : ↑ 如果节点相同，请提前退出
		if ( a === b ) {//即如果传入的两个节点相同
			hasDuplicate = true;//将hasDuplicate变量指向为true
			return 0;//那么直接返回0
		}

		var cur,
			i = 0,
			aup = a.parentNode,//获取到传入第一个节点的父节点
			bup = b.parentNode,//获取到传入第二个节点的父节点
			ap = [ a ],//将变量ap指向为 数组(包含了节点a)
			bp = [ b ];//将变量bp指向为 数组(包含了节点b)

		// Parentless nodes are either documents or disconnected
		// 译 : ↑ 无父节点是文档或断开连接
		if ( !aup || !bup ) {//如果其中一个节点没有父节点 那么直接返回
			return a === document ? -1 ://确定是哪个节点没有父节点 若是节点a 那么返回-1
				b === document ? 1 ://如果是节点b没有父节点 那么返回1
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
			//译 : ↑ 如果节点是兄弟姐妹，我们可以做一个快速检查
		} else if ( aup === bup ) {//即两个节点的父节点全等
			return siblingCheck( a, b );//那么就调用siblingCheck方法并将两个节点传入
		}

		// Otherwise we need full lists of their ancestors for comparison
		//译 : ↑ 否则，我们需要完整列出他们的祖先进行比较
		cur = a;
		while ( (cur = cur.parentNode) ) {//将变量不断指向为a的父节点一直到祖先元素为止
			ap.unshift( cur );//将节点的繁殖链保存到ap中(数组)
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );//同理将b到其祖先节点的繁殖链保存到数组bp中
		}

		// Walk down the tree looking for a discrepancy
		//译 : ↑ 走下树寻找差异
		while ( ap[i] === bp[i] ) {//通过两个节点的繁殖链进行对比
			i++;//若是哪次其父节点全等 那么就让i的值自增一个单位
		}

		return i ?//最后在根据i的值 确定下来他们的最亲系长辈元素
			// Do a sibling check if the nodes have a common ancestor
			//译 : ↑ 做一个兄弟姐妹检查，如果节点有一个共同的祖先
			siblingCheck( ap[i], bp[i] ) ://将这两个长辈元素传入到siblingCheck函数中

			// Otherwise nodes in our document sort first
			//译 : ↑ 否则，我们的文档中的节点首先排序
			ap[i] === preferredDoc ? -1 ://如果i的值为0 即 没有同一个的祖先元素 那么对传入两个节点的祖先节点进行判定
			bp[i] === preferredDoc ? 1 ://判定哪个是在当前的document中 如果是a 那么就返回-1  反之则是1
			0;//如果两个节点的祖先节点都不在当前的document对象之中 那么就直接返回0
	};

	return document;//最后返回document对象
};

//定义Sizzle.matches方法 该方法即调用了Sizzle方法
Sizzle.matches = function( expr, elements ) {//1579处有引用
	//定义matches方法
	//该方法的调用就是调用Sizzle方法
	return Sizzle( expr, null, null, elements );
};

//定义Sizzle.matchesSelector方法
	//该方法主要用于判定传入的节点是否能被传入的选择器字串选中
Sizzle.matchesSelector = function( elem, expr ) {//该函数接受两个有效参数 1. 节点 2.选择器字串
	// Set document vars if needed
	//译 : ↑ 如果需要，设置文件变量
	if ( ( elem.ownerDocument || elem ) !== document ) {//先对元素是否在当前document对象中进行判定
		//如果不是在当前的document对象之中 或者 不是当前的document对象
		setDocument( elem );//那么调用setDocument方法 即对相应的方法进行设定
	}

	// Make sure that attribute selectors are quoted
	//译 : ↑ 确保引用属性选择器
	// =    不能以\开头的属性值 且有'或" ] 即要求是属性选择器 且不能有引号
	//rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	//对传入的选择器字串进行正则匹配 如果是属性选择器 那么将其的属性值加上单引号
	expr = expr.replace( rattributeQuotes, "='$1']" );

	//要求matchesSelector方法可用 文档是按照HTML编码规范编码 字串中没有不符合rbuggyMatches中内容的部分 字串中没有不符合rbuggyQSA中内容的部分
	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {//调用matches方法 并将节点和 属性选择器字串作为参数传入 将返回的结果地址复制给变量ret
			//matches变量当前的指向是docElm的matches方法
			//matches方法用于显示元素能否被指定的选择器字符串选中 可以则返回true 反之则返回false
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			// 译 : ↑ IE 9的matchesSelector在断开连接的节点上返回false
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					//译 : ↑ 同样，断开的节点被认为是在一个文档中
					// fragment in IE 9
					//译 : ↑ 片段在IE 9中
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}
	//expr 为传入的选择器字串  document为当前文档中的document对象 elem为对应的节点
	//调用Sizzle核心函数 并将选择器字串和当前的document null 将节点封装成数组后将其四个传入
	//并将其返回值 即返回的节点组合长度是否大于0的结果返回 即 判断按照该选择器字符串是否能在单钱的document对象中寻找到对应的节点
	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {//定义contains方法
	//jquery.contains 主要是用来检测在一个节点中是否包含另一个节点
	// Set document vars if needed 译 : 如果需要，设置文档vars
	if ( ( context.ownerDocument || context ) !== document ) {//先对传入的节点是否在当前的document对象中判定
		//如果不在此document对象中
		//那么先调用setDocument方法
		setDocument( context );
	}
	//再讲设置了document对象的上下文对象 和指定元素传入到contains函数中
	return contains( context, elem );
};

//定义Sizzle.attr方法
Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	// 译 : 如果有必要 先设置其document独享
	if ( ( elem.ownerDocument || elem ) !== document ) {
		//先对传入的节点是否在当前的document对象中进行判定
		//如果不在此document对象中那么就先调用setDocument方法进行设置
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		//译 : ↑ 不要被Object.prototype属性所迷惑（jQuery＃13807）
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

//定义Sizzle.escape方法
Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

//定义Sizzle.escape方法
Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
//定义Sizzle.uniqueSort方法
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	//译 : ↑ 除非我们知道*我们可以检测到重复，假设他们的存在
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );//按照数组中节点的位置对数组进行重新排序

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {//对传入数组进行遍历
			if ( elem === results[ i ] ) {//对彼此之间的元素进行判定 因为是重新排序过后的数组
				//如果上一个元素和下一个元素之间有全等关系 就将这个元素的下标添加到数组duplicates中
				//因为push的返回值是添加过后数组的长度
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {//再对添加过后的数组进行遍历
			//并删除数组中存储的下标的对应元素
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	//译 : ↑ 排序后清除输入以释放对象
	// See https://github.com/jquery/sizzle/pull/225
	//指向为null  释放内存
	sortInput = null;

	//将去重之后的数组返回出去
	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
//定义 Sizzle.getText方法
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;//获取到传入节点的nodeType指数

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		//译 : ↑ 如果没有nodeType，那么这个应该是一个数组
		while ( (node = elem[i++]) ) {//如果没有nodeType 那么说传入的参数是一个数组
			// Do not traverse comment nodes
			//译 : ↑ 不要遍历注释节点
			ret += getText( node );
		}
		//对节点的类型进行判定 如果是一个元素节点 如果是一个document节点 如果是一个文档碎片的节点
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		//译 : ↑ 使用textContent作为元素
		// innerText usage removed for consistency of new lines (jQuery #11153)
		// 译 : ↑ 为了保持新行的一致性，删除了innerText用法（jQuery＃11153）
		if ( typeof elem.textContent === "string" ) {//判定传入的节点textContent属性值是一个字串
			return elem.textContent;//如果有且为字串 那么就将该字串返回出去
		} else {//如果元素的textContent不是一个字串 即可能传入的是document节点或者是文档碎片的集合
			// Traverse its children
			//译 : ↑ 遍历它的孩子
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {//那么就对其进行遍历
				ret += getText( elem );//并将每一个子节点传入getText函数中递归调用
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {//如果传入的节点的节点类型是文本节点类型的内容
		return elem.nodeValue;//那么就直接返回该节点的nodeValue值
	}
	// Do not include comment or processing instruction nodes
	//译 : ↑ 不要包含注释或处理指令节点

	return ret;//将最后累加起来的字串返回
};

//定义Expr变量 指向为Sizzle.selectors对象
	//Expr 意为表达式的意思
Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	//译 : ↑ 可以由用户调整
	cacheLength: 50,//定义缓存的长度 即上面使用的闭包实现缓存的数组中最大的长度数

	createPseudo: markFunction,//即添加一个随机的属性名 该属性的属性值为true

	match: matchExpr,//将变量match指向为matchExpr 即匹配各选择器字串的一个正则表达式的集合类对象

	attrHandle: {},//定义属性操作的集合对象

	find: {},

	relative: {//定义选择器字串的标识集 如 #test > #btn 即表示后代元素 前面的#test是父元素
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {//即对对应的选择器字串再进行进一步的过滤  2854
		"ATTR": function( match ) {//定义过滤属性选择器的方法
//runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
			//即匹配是否有通过\xxxxx格式编码的字符 如果有 那么先将其转换为我们可识的字串
	//"\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"
			//将匹配的属性进行编码转换 即将其中如果有\xxxx编码格式的编码编译为可识的字串
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			//译 : ↑ 无论是引用还是不引用，移动给定值以匹配[3]
			//对属性值进行转义 即可能是\xxxx的格式 也可能是'xxxx'的格式 也可能是"xxxx"的格式 将其转为我们可识的字串
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			//对属性选择器的运算符进行判定 如果运算符是~=
			//因为 ~= 的含义为包含某个单词的属性值的标签 所以需要添加空格
			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			//将筛选之后的数组返回
			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {//定义过滤后代元素的选择选定指定元素的方法
			/* matches from matchExpr["CHILD"] 译 : matchExpr [“CHILD”]的匹配
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component

				因为我们可以传入类似于 xn + y 的类型来筛选对应格式的子节点 所以我们还需要对x 和 y 的取值进行确定
			*/
			//将type的值转换为小写 并重新赋值给其
			match[1] = match[1].toLowerCase();

			//判定type类型是否为nth
			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument 译 : nth- *需要论证
				//即 如果type的类型是nth
				if ( !match[3] ) {//即nth-child(of-type)后面必须跟参数
					Sizzle.error( match[0] );//倘若没有跟入参数 那么抛错
				}

				// numeric x and y parameters for Expr.filter.CHILD
				//译 : ↑ Expr.filter.CHILD的数字x和y参数
				// remember that false/true cast respectively to 0/1
				//译 : ↑ 记住假/真 投给0/1
				//因为我们可以传入类似于 xn + y 的类型来筛选对应格式的子节点 所以我们还需要对x 和 y 的取值进行确定
				//取值表达式 match[6] 就相当于x 如果没有捕获到对应的x值 那么就取1  *1相当于不乘
					//相反则对match[3]进行判定 判定用户使用时传入的是偶数还是奇数 如果是奇数偶数 那么match[4]的值为2 如果没有传入则为0
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				//即根据符号和数字来确定match[5]的值  如果没有传入或是没有捕获到 那么就将其指向为1(奇数) 或 0(偶数)
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
				//译 : ↑ 其他类型禁止参数
			} else if ( match[3] ) {//即如果type的类型不是nth 但是如果有传入参数的话 也会报错
				Sizzle.error( match[0] );//报错
			}
			//将处理之后的数组返回
			return match;
		},

		"PSEUDO": function( match ) {//对伪元素的正则处理程序的定义
			var excess,
				//将变量unquoted指向为捕获的括号中没有用引号引起来的值  如eq(2) 的2
				unquoted = !match[6] && match[2];

			//再将所有匹配到的字串传入到matchExpr["CHILD"]函数中 如果能匹配 就直接返回null
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			// 译 : ↑ 接受引用的参数
			//match[3]表示引号
			//即将除去引号外的值(match[4]赋给match[2]
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
				//译 : ↑ 从未加引号的参数中删除多余的字符
				/*
				 * rpseudo.test(unquoted)：用来测试unquoted是否包含伪类，
				 * 若包含伪类，则说明有可能存在伪类嵌套的可能性，需要进一步对unquoted进行解析
				 * 例如：  :not(:eq(3))
				 */
			} else if ( unquoted && rpseudo.test( unquoted ) &&
                // Get excess from tokenize (recursively)
				//译 : 从标记大小（递归）
				//获取unquoted中连续有效地选择器最后一个字符所在位置
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				//译 : ↑ 前进到下一个右括号
				/*
				 * unquoted.indexOf(")", unquoted.length - excess)
				 *     从之前获得的连续有效地选择器最后一个字符所在位置之后找到")"所在位置，
				 *     通常就在当前位置之后。
				 * 再减去unquoted.length，用来获得match[0]中的有效完整的伪类字符串最后位置，
				 *     注意，此时excess是一个负值
				 *
				 */
                (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
				//todo : -------------------- ↓ _------------------------
				// excess is a negative index
				//译 : ↑ excess是一个负面的指标
                // 获取有效的完整伪类match[0]和伪类括号内的数据match[2]
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {//3327

		"TAG": function( nodeNameSelector ) {
			//先将传入的参数字串进行转码(如果有)
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			//再根据传入的字串是否为统配选择器*进行返回值的确定
			//如果传入的字串是统配选择器
			return nodeNameSelector === "*" ?
				//那就返回一个返回值为布尔值true的函数
				function() { return true; } :
				//如果传入的字串不是统配选择器* 那就返回函数
				function( elem ) {//该函数需要传入一个DOM节点作为参数
					//再对传入的don节点的NodeName和外层的选择器字串进行匹配
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			//先查看缓存中是否有存在对应的类选择器
			var pattern = classCache[ className + " " ];
			//如果缓存中有那嘛就返回缓存中的值
			return pattern ||
			//如果缓存中不存在该值 1.先创建匹配类选择器的正则表达式 2.并将结果存入缓存中
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					//将正则匹配的结果作为返回值返回 1.先对传入的节点的className进行判定
					// 如果不可用 那就使用getAttribute方法获取到其对应的类名并匹配
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos 译 : 可能复杂的伪装
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),
		/*"Whether an element is represented by a :lang() selector
		 is based solely on the element's language value
		 being equal to the identifier C,
		 or beginning with the identifier C immediately followed by "-".
		 The matching of C against the element's language value is performed case-insensitively.
		 The identifier C does not have to be a valid language name."
		 http://www.w3.org/TR/selectors/#lang-pseudo*/
		 /*“一个元素是否由一个：lang（）选择符表示，完全基于元素的语言值等于标识符C
		 ，还是以标识符C开头，紧接着是” - “。C与元素语言值的匹配是不区分大小写的，
		 标识符C不一定是有效的语言名称。
		  http://www.w3.org/TR/selectors/#lang-pseudo*/
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			//判定传入的节点是否为本页面的根节点
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties 译 : 布尔值属性
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
	//译 : ↑ 添加按钮/输入类型伪
	//遍历对象来添加对应的设置表单的伪元素选择器
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
//遍历对象来添加对按钮的伪元素的相关的选择器字串匹配
for ( i in { submit: true, reset: true } ) {
	//将每一个对象的名称作为参数传入到函数createButtonPseudo
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
	// 译 : ↑ 简单的API用于创建新的setFilters
//定义函数setFilters
function setFilters() {}
//向setFilters的原型指向为Expr.filters 并将Expr.filters的指向同Expr.pseudos
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

//定义tokenize 方法
tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	//该方法需要两个参数 1. 选择器字串  2.是否只解析
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];//将该选择器字串存入缓存对象中

	if ( cached ) {//判定缓存中是否已存在该选择器字串
		return parseOnly ? 0 : cached.slice( 0 );
		//存在该选择器字串的缓存且parseOnly为true 那么返回0,
		//如果传入的parseOnly 为false 那么返回缓存中的该值
	}
	// console.log(selector);
	//将soFar值复制于selector 因为是参数变量不可直接改变其指向
	soFar = selector;//将变量soFar指向为选择器字串
	groups = [];//groups指向为一个为空的数组
	//ATTR CHILD PSEUDO
	preFilters = Expr.preFilter;//将变量preFilters指向为Expr.preFilter对象

	while ( soFar ) {//依据soFar的值进行循环

		// Comma and first run 译 逗号和第一次跑
		//rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		if ( !matched || (match = rcomma.exec( soFar )) ) {//第一次循环进入判断 因为matched = undefined
			if ( match ) {//第一次循环 不会进入判断 因为match = undefined
				// Don't consume trailing commas as valid
				//译 : ↑ 不要使用尾随逗号作为有效的
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );//第一次循环将tokens指向为一个为空的数组 并将其推入groups指向的空数组中
		}

		matched = false;//第一次进入时 matched指向为true 将其指向改为false

		// Combinators 译 组合子
		// new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" )
        //rcombinators.exec( soFar )即为了检测 选择器字串中是否包含 > + ~ 开头
		//rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" )
		if ( (match = rcombinators.exec( soFar )) ) {
			//第一次循环 将match指向为rcombinators.exec( soFar )的结果数组
			//即如果选择器字串中含有+~> 那么
			//shift 方法从数组中删除第一个元素 并返回该元素的值 此方法更改数组的长度
			matched = match.shift();//shift 删除并返回数组的第一个元素 将matched指向为筛选到的关系选择器字串
			tokens.push({//将筛选到的选择器关系字串保存到一个对象并推入token数组中
				value: matched,//matched 为 +~> 符号 有空格
				// Cast descendant combinators to space
				// 译 : 将后代组转换为空格
				//"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"
				type: match[0].replace( rtrim, " " )//无空格的符号+~>
			});
			//将soFar指向为去掉>+~ 后的字串
			soFar = soFar.slice( matched.length );
		}

		// Filters
		//遍历Expr.filter对象来对match进行匹配
		// TAG CLASS ATTR CHILD  PSEUDO
            for ( type in Expr.filter ) {
			//通过对正则对象中的每一个属性来匹配
				//1.首先将soFar传入到matchExpr对应属性的函数中并将其返回值赋值给match变量
				//2.在函数中进行正则匹配若是匹配正确的话
				//3.再将匹配正确的对应函数的属性值与preFilters中对应的属性值判定
					//因为matchExpr中的某些属性 在preFilters中是不具有的 如CLASS
				//4.如果是preFilters中没有的属性值 那么就直接判定为true
					//如果是preFilters中有的属性值 那么就将变量match指向为调用该属性值函数返回的结果
				// 总的来说就是要求传入的soFar字串能够匹配matchExpr中某个属性所对应的正则匹配
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				//将选择器字串进行正确的正则匹配的函数处理之后 获取到其处理之后的返回值
				matched = match.shift();
				tokens.push({
					value: matched,//一般为匹配的完整的选择器字串
					type: type,//指向为具体的type类型 如 CLASS, ATTR 等等
					matches: match//筛选的各个捕获的参数和信息
				});
				//然后将选择器字串将刚刚读取之后的截取掉
				soFar = soFar.slice( matched.length );
			}
		}

		/*
		 * 若matched==false，
		 * 则说明本次循环没有有效的选择器（包括关系符和id、class等类型选择器）
		 * 因此，解析到当前位置遗留下来的soFar是非法的选择器字符串
		 * 跳出while循环体
		 */
        if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	//译 : ↑ 返回excess超出的长度
	// if we're just parsing
	//译 : ↑ 如果我们只是解析
	// Otherwise, throw an error or return tokens
	//译 : ↑ 否则，抛出一个错误或返回标记
	return parseOnly ?//根据参数parseOnly来确定返回值
		soFar.length ://如果是只解析 那么就返回解析到最后的选择器字串的长度
		soFar ?//如果不是只读 且 soFar到最后变成false转换值  那么将抛错
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );//如果还有只 那么将选择器和解析的group数组返回出去
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

//定义函数内部的addCombinator方法
function addCombinator( matcher, combinator, base ) {//3307
	/*function( elem ) {
	 return elem.disabled === true && ("form" in elem || "label" in elem);
	 },
	 { dir: "parentNode", next: "legend" }*/
	var dir = combinator.dir,//将变量dir指向为传入对象的dir属性
		skip = combinator.next,//将变量skip指向为传入对象的skip属性
		key = skip || dir,//对变量key进行动态赋值 优先取值skip
		//对第三个参数进行判定 如果有传入那么就将变量checkNonElement指向为该参数
		//如果没有传入第三个参数 那么将其指向为key值是否为parentNode的判定
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		//译 : ↑ 检查最接近的祖先/前面的元素
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		//译 : ↑ 检查所有的祖先/前面的元素
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						//译 : ↑ 防御克隆的attroperties（jQuery gh-1709）
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}
//定义matcherFromTokens方法 该方法接收一个有效参数token
function matcherFromTokens( tokens ) {//3481
	var checkContext, matcher, j,
		len = tokens.length,//获取到传入的选择器字串解析详情的长度
		leadingRelative = Expr.relative[ tokens[0].type ],//获取到选择器字串的type值 如"ID" , "CLASS" 等
		//将变量implicitRelative也指向为选择器字串的type值 若是该选择器字串没有type值那么就将其指向为Expr.relative[" "]
		implicitRelative = leadingRelative || Expr.relative[" "],
        //对leadingRelative(即选择器字串的type值)进行判定 如果其有值那么就将变量i指向为1, 反之则将其指向为0
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		//译 : 基础匹配器确保元素可以从顶层上下文（s）
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}
//定义compile方法
compile = Sizzle.compile = function( selector, match /* Internal Use Only 译 : 仅限内部使用*/ ) {
	//该方法接收两个有效参数 1.选择器字串 2.筛选的选择器字串的type value 等集合的数组 或是不存在的那么就是false TODO : 待考擦
	var i,
		setMatchers = [],
		elementMatchers = [],
        //查看缓存中是否存在选择器字串所对应的值 有则将其保存在变量cached中 如果没有那么将其指向为false
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {//如果缓存中不存在对应的值
		// Generate a function of recursive functions that can be used to check each element
		//译 : ↑ 生成可用于检查每个元素的递归函数的函数
		if ( !match ) {//对传入的match参数进行判定 如果其为false 那么进入以下逻辑
			match = tokenize( selector );//对选择器字串进行剥离解读
		}
		i = match.length;//获取到剥离之后的数组的长度 即选择器字串中有几个能解析的选择器字串
		while ( i-- ) {//对剥离后的数组进行遍历
            //将当前用来表示字符串解析详情的对象传入函数matcherFromTokens中, 并将结果保存在变量cached中
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 * 译 : ↑  与Sizzle编译的低级选择函数
 *  selector functions 译 : 选择器功能
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
//定义select方法 该方法接收四个有效参数 选择器字串 上下文对象 结果数组 seed
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		//对传入的选择器字串进行类型判定 如果是一个函数 那么就将该函数指向为compiled变量
		//如果不是一个函数 compiled 的指向就是false
		compiled = typeof selector === "function" && selector,
		//对传入的seed参数进行判定 如果其为false 调用tokenize函数
		//并对selector的取值进行判定 即如果是函数类型的那么将其指向为其selector属性 反之即指向传入的selector即字串
		//如果传入的seed参数为false 那么就将其调用的结果指向为变量match
		//如果传入的seed参数为true 那么就将match变量指向为false
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];//将results指向为传入的results 如果没传那么就指向为一个为空的数组

	// Try to minimize operations if there is only one selector in the list and no seed
	//译 :↑ 如果列表中只有一个选择器并且没有种子，则尽量减少操作
	// (the latter of which guarantees us context)
	// 译 : ↑ （后者保证我们的背景）
	if ( match.length === 1 ) {//对match的取值进行判定 如果剥离后返回的数组的长度为1

		// Reduce context if the leading compound selector is an ID
		//译 : ↑ (简体)如果前导化合物选择符是一个ID，则减少上下文
		//[[]] => []
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			//译 : ↑ 预编译的匹配程序仍然会验证血统，因此升一级
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		// 译 : ↑ 获取从右到左匹配的种子集
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			//译 : ↑ 如果我们碰到一个combinator就中止
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				// 译 : ↑ 搜索，扩大领导兄弟联合的上下文
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					//译 : ↑ 如果种子是空的或者没有代币，我们可以提前回来
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	//译 : ↑ 编译并执行过滤功能，如果没有提供
	// Provide `match` to avoid retokenization if we modified the selector above
	//译 : ↑ 如果我们修改了上面的选择器，提供`match`来避免重复使用
	//即如果compiled为false 那么就调用compile方法
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
	//译 : ↑ 根据默认文档进行初始化
	//首次调用setDocument方法 即对浏览器对应的兼容性问题进行检测和处理
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
	//support.sortDetached定义 用来检测compareDocumentPosition是否可用 如果可用那么其值为true 如果不可用那么其值为false
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	//译 : ↑ 应该返回1，但返回4（以下）。
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8 译 : 支持ie8及以下
// Prevent attribute/property "interpolation"
	//译 : ↑ 防止属性/属性“插值”
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {//执行断错函数
	el.innerHTML = "<a href='#'></a>";//检验通过节点的getAttribute方法能否得到href属性的属性值
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {//如果getAttribute不能获取到节点的href属性则进入此逻辑
	//向Expr.attrHandle添加type href height width 方法
	addHandle( "type|href|height|width", function( elem, name, isXML ) {//属性值为传入的此函数 该函数可以传入三个有效参数 节点 名称 是否为XML文档
		if ( !isXML ) {//先对文档是否为XML类型进行判定
			//在调用节点的getAttribute方法 传入第二个参数是因为要兼容ie7
			/*0：默认值。搜索属性时大小写不敏感
			 1：搜索属性时大小写敏感，大小和小写字母必须完全匹配。
			 2：返回BSTR形式的属性值？此标识对事件属性无效。（不知道第一句的具体意义，但是设置属性为2可以用来返回原始值）
			 4：返回完整路径URL地址。只对URL属性有效。（参数为4的情况，我还没有找到使用它的场景。。。）*/
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9 译 : 支持ie9及以下
// Use defaultValue in place of getAttribute("value") 译 :使用defaultValue代替getAttribute（“value”）
	//即 判定support.attributes是否为真 如果为真 执行判错函数
if ( !support.attributes || !assert(function( el ) {
	//即对浏览器不支持getAttribute做处理
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	//向Expr.attrHandle添加value方法
	addHandle( "value", function( elem, name, isXML ) {
		//该方法可以传入三个有效参数 分别是 节点 和 属性名 以及是否为XML文档类型
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {//对文档类型进行判定 即要求文档类型必须是XML文档类型的
			//且节点的nodeName的名称必须是input
			//即返回节点的defaultValue
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
//译 : ↑ 当getAttribute存在时，使用getAttributeNode来获取布尔值
if ( !assert(function( el ) {
	//执行判错函数 检测检测浏览器是否能用getAttribute检测到disabled属性
	return el.getAttribute("disabled") == null;
}) ) {//即如果不能检测到 进入此逻辑
	//向Expr.attrHandle添加checked selected 等方法
	addHandle( booleans, function( elem, name, isXML ) {//添加的方法可传入三个有效参数 分别是 节点 属性名 是否为XML文档类型
		var val;
		if ( !isXML ) {//对文档类型进行判定
			//首先获取到对应的属性名的属性值 再对其取值进行判定 若是取值为true 那么就将其属性名调用toLowerCase后返回 (比如 返回checked = checked)
			//相反 若是取值不为true 首先获取其属性值并将其指向为变量val 若是没有获取到对应的的值 那么就返回null
			// 若是有获取到对应的属性值 再对val.specified进行取值 如果为true那么就返回其属性的value值
			//若是并没有定义该属性 那么返回null
			/*specified 属性返回 true，如果已规定某个属性。
			 如果已创建该属性但尚未添加到元素中，也会返回 true。
			 否则返回 false。*/
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}


//最后将Sizzle返回 即将Sizzle对象指向为函数调用返回值的变量Sizzle
return Sizzle;

})( window );


//将Sizzle的引用地址复制给jQuery.find
	//即$.find 该方法用于搜索所有与指定表达式匹配的元素 这个函数是找出正在处理的元素的后代元素的好方法
	//所有搜索都依靠jQuery表达式来完成 这个表达式可以使用CSS1-3的选择器语法来写
jQuery.find = Sizzle;
//将Sizzle.selectors指向的函数地址复制给jQuery.expr
	//
jQuery.expr = Sizzle.selectors;

// Deprecated 译 : 弃用
	//即为Sizzle.selectors指向的那个对象添加属性 添加:属性 其属性值是 用于匹配伪元素的正则表达式
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
//将Sizzle.uniqueSort的内存地址复制给jQuery.uniqueSort
	//即 $.uniqueSort  该方法用于通过搜索的数组对象 排序数组 并移除任何重复的节点 如果一个节点已经在和数组中的节点完全相同
	//那么它被认为是重复的 两个不同的节点具有相同的属性是被认为不重复的
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
//Sizzle.getText的地址复制给jQuery.text
	//即 $.text 该方法用于取得所有匹配元素的内容
	//结果是由所有匹配元素包含的文本组合起来的文本内容 这个方法对XML和HTML都有效
jQuery.text = Sizzle.getText;
//Sizzle.isXML的地址复制给jQuery.isXMLDoc 该方法用于判定当前文档是否为XML编码格式编写或是HTML格式编码格式编写
jQuery.isXMLDoc = Sizzle.isXML;
//将Sizzle.contains地址复制给jQuery.contains
	//即 $,contains 该方法用于只是传入的第一个节点是否包含第二个节点 如果包含那么该函数返回布尔值true 反之false
jQuery.contains = Sizzle.contains;//4884
//将Sizzle.escape地址复制给jQuery.escapeSelector
	//即$.escapeSelector 该方法用于在类选择器或者ID选择器中包含一些css特殊字符的时候
	//这个方法基本上与CSS.escape()方法类似 唯一的区别是jquery中的这个方法支持所有的浏览器
jQuery.escapeSelector = Sizzle.escape;



//该函数用于以当前节点为原点获取到传入参数的节点的集合
var dir = function( elem, dir, until ) {//该函数接受三个有效参数 1.节点 2.获取的规则 如所有前面的兄弟 后面的兄弟等等
	//3.获取到什么条件为止 可以是一个判断条件 也可以是一个节点
	var matched = [],//声明获取结果的空数组 为将其保存在变量matched中
		//如果没有传入终止条件那么truncate的值就是为false
		truncate = until !== undefined;//判断是否有传入条件 并将其是否有传入的判定布尔值保存在变量truncate中
 	//不断将elem指向为他的获取规则的节点 比如不断指向其前一个兄弟节点 直到其指向为空或是指向为document对象
	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {//如果当前的节点的nodeType的值为元素节点
            //对终止条件进行判定 如果是一个节点 那么将当前节点封装成jQuery对象后和终止节点进行比较 查看两个节点是否是同一个节点
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;//如果符合了终止条件 那么终止循环
			}
			matched.push( elem );//将符合条件的节点添加到结果数组中
		}
	}
	return matched;//最后将筛选之后的结果数组返回
};

//定义siblins方法
var siblings = function( n, elem ) {//该方法可以接受两个有效参数 要剔除的对象元素   需要被剔除的元素
	var matched = [];//声明接收结果的数组

	for ( ; n; n = n.nextSibling ) {//将变量n不断指向其兄弟元素
		if ( n.nodeType === 1 && n !== elem ) {//然后对其兄弟元素进行判定 如果不全等于传入的要剔除的元素
			matched.push( n );//那么就将该元素推入到结果数组中
		}
	}
	//最后将筛选到的结果数组返回出去
	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {//定义nodeName方法 该方法可以接受两个有效参数 1.节点 2.节点名称
	//该函数用于判定传入节点是否为传入的name参数
	//即当前节点的标签名是否是name参数
  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );//\x20 表示空格  该正则表示解析一个成对出现的标签体 且标签中不能有任何属性 任何内容
// [^\/\0>:\x20\t\r\n\f]  除开 / 0 > : 空格 制表符 回车符 换行符 换页符



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
	//译 : ↑  实现相同的功能，即 filter 个 not
function winnow( elements, qualifier, not ) {//该方法接受三个有效参数 1.节点的集合 2.节点或是函数或是字串 3.是保留符合条件或是不符合条件的
	if ( jQuery.isFunction( qualifier ) ) {//对传入的第二个参数进行是否函数判定
		return jQuery.grep( elements, function( elem, i ) {//如果传入的筛选条件是一个函数的话那么就直接调用$.grep方法进行筛选匹配
			return !!qualifier.call( elem, i, elem ) !== not;//在它内部对传入的节点集合进行遍历 并将每个节点传入到对应的函数中
			//在将结果数组返回  且要求返回的可是是符合条件的或者是不符合条件的 通过传入的第三个参数进行判定
		} );
	}

	// Single element 译 : 单个元素
	if ( qualifier.nodeType ) {//即判定传入的判定标准如果是一个节点
		return jQuery.grep( elements, function( elem ) {//那么也调用$.grep方法对elements进行匹配
			return ( elem === qualifier ) !== not;//最后在将符合或是不符合的节点的数组返回出去
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array) : 伪数组节点 (jQuery对象, 参数, 数组)
	if ( typeof qualifier !== "string" ) {//即判定传入的判定标准如果不是一个字符串 也不是一个单节点 也不是函数
		//那么就只可能是一个数组的节点集合
		return jQuery.grep( elements, function( elem ) {//调用$.grep方法对节点数组进行遍历对传入的字串进行判定
			//返回对应的每一个元素中是否包含标准数组对象中的每一个元素
			// 并按照需求返回结果为true或是为false的结果数组集合
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	//译 : ↑ 简单的选择器，可以直接过滤，删除非元素
	// var risSimple = /^.[^:#\[\.,]*$/;
	if ( risSimple.test( qualifier ) ) {//对传入的参数进行正则匹配
		//那就调用jQuery.filter方法并将传入的判定标准 和 要筛选的对象节点集合
		// 以及判定标准返回true或是false传入到filter函数中
		return jQuery.filter( qualifier, elements, not );//并将其调用的结果返回
	}

	// Complex selector, compare the two sets, removing non-Elements
	//译 : ↑ 复杂的选择器，比较两个集合，删除非元素
	//即将传入的筛选字串以及节点集合传入的filter中并将结果赋值给qualifier
	//那么qualifier保存的就变成了在elemnts下对对应字串的所有节点的集合 也包含了elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		//在对每个元素进行判定 判定其elements中的每个元素是否包含在qualifier中 且 必须是一个元素节点
		//根据not的取值判定是删除选中的元素 或者是只保留删除的元素
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {//定义jQuery.filter方法
	//该方法接受三个有效参数 1.要筛选的标准 2.要被筛选的节点的集合 3.返回的是符合标准的节点或是不符合标准的节点
	var elem = elems[ 0 ];//将传入的节点的第一位节点地址复制给elem

	if ( not ) {//在对指示返回结果为true或是false的传入参数进行判定
		expr = ":not(" + expr + ")";//如果传入的标准是要求返回false的集合 那么就在标准前面添加:not方法
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {//对传入的节点的长度进行判定且要求elem即传入节点的nodeType的值为1
		//即如果要筛选的节点只有一个的话 那么就调用jQuery.find.matchesSelector方法
		//并将筛选的那一个节点 和对应的选择器字串传入
		//并将结果返回 如果结果是false 那么就返回一个为空的数组
		//jQuery.find指向为Sizzle函数
		//即如果调用find的节点本来只有一个 那么就只需要查看标准字符串是否能选到该节点即可 如果可以选到那么就返回该节点
		//如果不能选中该节点那么就返回一个为空的数组
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}
		//调用jQuery.find函数 将筛选节点的标准字串或是函数传入
		//内部调用grep函数 grep对调用数组对象的每个元素进行筛选要求其必须是一个元素节点
			//然后再将筛选为元素节点的数组传入到matches函数中
	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};
//调用jQuery.extend为jQuery添加方法
jQuery.fn.extend( {
//添加find方法  即$.find
	//该方法用于搜索与指定表达式匹配的元素 这个函数是找出正在处理的元素的后代元素的好方法
	//所有的搜索都依靠jQuery表达式来完成 这个表达式可以使用CSS1-3的选择器语法来写
	find: function( selector ) {//该函数接收一个有效参数 即选择器字串
		var i, ret,
			len = this.length,//获取调用数组对象的长度
			self = this;//获取到调用该方法的对象

		if ( typeof selector !== "string" ) {//判定传入的选择器字串是否是一个字符串
			//如果不是字串 那么可能就是一个数组对象
			//将传入的数组对象传入到jQuery核心函数中 将其封装成jQuery对象后调用filter方法
				//filter方法是原生的filter方法 该方法用于对数组进行过滤
				// 传入一个函数作为参数 并对数组中的每一个元素调用该函数 将函数中返回为true的元素组成一个新数组并返回
			return this.pushStack( jQuery( selector ).filter( function() {
				//在函数内部遍历调用find方法的数组对象
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {//并对调用数组对象的每个元素调用jQuery.contains方法
						//如果调用数组对象中的某个元素包含了传入的数组对象中的某个元素
						return true;//那么返回true
					}
				}
			} ) );//最后将过滤之后的数组传入pushStack方法中 并返回
		}

		ret = this.pushStack( [] );//如果传入的对象是一个字符串的话 将变量ret指向为推入栈中的空数组对象

		for ( i = 0; i < len; i++ ) {//遍历调用的数组对象
			//调用Sizzle核心函数 将选择器字串 每个调用数组对象的元素作为上下文对象 以及用于接受结果的数组ret传入
			//调用该方法后会将调用数组对象的每个元素中查找对应的选择器的节点 并将节点保存到ret所指向的空数组中
			jQuery.find( selector, self[ i ], ret );
		}
		//最后对调用数组对象的长度进行判定 如果其长度大于1 那么就调用去重函数将ret所指向的数组中的指向相同的节点进行删减
		//如果长度不大于1 即只有一个 那么就直接返回ret所指向的数组
		//因为只有一个的话就不会存在有相同的节点即Sizzle只调用了一次
		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	//定义filter方法 即$.filter
	//该方法用于筛选出与指定表达式匹配的元素的集合 这个方法用于缩小匹配的范围 用逗号分隔多个表达式
	filter: function( selector ) {//该方法接收一个有效参数 即选择器字串
		//内部调用winnow方法 将调用filter方法的数组对象 传入的选择器字串(如果没有传入那么就是一个为空的数组)
			// 以及指示保存结果为true的布尔值标识符false 作为参数传入
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	//定义not方法 即 $.not
	//该方法用于从匹配的元素集合中删除与指定表达式相匹配的元素
	not: function( selector ) {
		//将调用not方法的对象和传入的选择器字符串(不仅仅是字符串也可以是函数或是节点等)
		//以及用于指示函数删除与指定表达式相匹配的元素布尔值true 传入到winnow中
		//并调用$.pushStack方法将其推入栈中(可用end作为返回)
		//将推入栈中的调用winnow的对象返回
		//该方法与filter方法刚好相反就是因为最后一个参数的不同
		//filter传入的是false 即 保存于传入的表达式相匹配的元素
		//而not传的最后一个参数却是true 即 删除与传入的表达式相匹配的元素
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	//定义is方法 即$.is
	//该方法是根据选择器 DOM元素或jQuery对象来检测匹配元素的集合
	//如果其中至少有一个元素符合这个给定的表达式就返回true
	is: function( selector ) {//该方法接受一个有效参数 可以是选择器字符串 也可以是一个节点
		// 也可以是jQuery对象 或者是一个函数
		//内部调用的是winnow方法 将调用is方法的对象以第一个参数传入
		//并对我们传入的selector进行判定 如果其是一个字符串且是必须要上下文对象的字串 那么就直接调用jQuery核心函数将其解析后传入
			//反之就将字符串传入 如果没有传入字符串那么就传入一个为空的数组
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			//译 : ↑ 如果这是位置/相对选择器，请检查返回的集合中的成员资格
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			//译 : ↑ 所以$（"p：first"）.is（"p：last"）对于具有两个"p"的文档将不会返回true。
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;//并对返回的结果是否有值进行取值判定 如果有值那么就返回true 如果没有值那么就返回false
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
// 译 : ↑对根jQuery（文档）的中央引用
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,//定义正则表达式

	//定义init函数 即jQuery.fn.init 就是jQuery核心函数处理程序
	init = jQuery.fn.init = function( selector, context, root ) {
	//定义jQuery.fn.init函数 该函数需要三个参数 1. 传入的选择器字符串 2.传入的context上下文 3.传入的全局对象
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {//对参数进行判定 如果没有传入参数 则直接返回this即新创建的一个对象 !!! 因为上面调用的时候是new调用的方式 所以这里的this指向的是新生成的实例对象
			return this;//如果没有传参则直接返回一个为空的jQuery实例对象
		}

		// Method init() accepts an alternate rootjQuery 译 : 方法init（）接受一个备用的rootjQuery
		// so migrate can support jQuery.sub (gh-2101) 译 : 所以迁移可以支持jQuery.sub（gh-2101）
		root = root || rootjQuery; //指正root的指向 即root的值为传入的root的值 如果不传就使其指向$(document)

		// Handle HTML strings
		//译 : ↑ 处理HTML字符串
		if ( typeof selector === "string" ) {//对selector进行判定
			if ( selector[ 0 ] === "<" &&//当selector是一个标签体
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				// 译 : 假设用<>开始和结束的字符串是HTML，并跳过正则表达式检查
				match = [ null, selector, null ]; //将selector保存到match[1]中

			} else {//如果selector不是标签体字符串
				//rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
				//用于检测传入的选择器字符串是否是一个标签体字符串的格式
				match = rquickExpr.exec( selector );//就用rquickExpr正则表达式对其进行解析
			}

			// Match html or make sure no context is specified for #id
			// 译 : ↑ 匹配html或确保没有为#id指定上下文
            //对match进行判定 即确保selector是一个标签体或为#id的字符串 context = undefined
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {//match[ 1 ]为true时即使selector为标签体字符串的时候 match[ 1 ] = 字符串
                    //对context进行取值判定 判断它是不是jQuery的实例对象 如果是的话就转为DOM元素 如果不是的话就直接使用
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// 译 : 对于后台兼容，运行脚本的选项是正确的
					// Intentionally let the error be thrown if parseHTML is not present
					// 译 : 如果parseHTML不存在，故意让错误被抛出
                    //执行jQuery.merge(合并两个数组)
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],//选择器字符串
						context && context.nodeType ? context.ownerDocument || context : document,//选择器字符串上下文
						true//布尔值
					) );

					// HANDLE: $(html, props) 传入的是两个参数
					//var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							//译 : ↑ 如果可能的话，上下文的属性被称为方法
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
								//译 : ↑ ...，否则设置为属性
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {//对context进行判定  如果是没传context或者传入的context中有jquery方法
				return ( context || root ).find( selector );//如果没有传入contest那么调用root(如果没有传入root那么root的值就是document)的find方法
				//如果有传入context那么就调用context对象的find方法

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
				//译 : ↑ （这相当于：$（context）.find（expr）
			} else {
				//调用原型上的方法(即jQuery()并将上下文对象作为参数传入 将其转换成jQuery对象之后再调用find方法将选择器字串传入
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {//如果传入的参数是一个节点的话
			this[ 0 ] = selector;//那么就直接将这个节点添加到实例对象的数组中
			this.length = 1;//并设置其长度为1
			return this;//将jQuery实例对象返回

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {//如果传入的参数是一个函数的话
			return root.ready !== undefined ?//对root.ready进行判定
				root.ready( selector ) ://如果其值为undefined 那么就对应的函数传入root.ready中并调用 且将其调用结果返回

				// Execute immediately if ready is not present
				//译 : ↑ 如果就绪不存在立即执行
				selector( jQuery );//如果root.ready已经执行过 那么就立即执行我们传入的函数 并将jQuery作为第一个参数并传入
		}
		//如果都不满足以上的情况 那么就将传入的参数推入实例数组对象中然后返回
		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
// 译 :↑ 给init函数提供jQuery原型，以便以后实例化
init.prototype = jQuery.fn;//将init的原型指向jQuery.fn 即jQuery的原型

// Initialize central reference
rootjQuery = jQuery( document );//rootjQuery指向document


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	//译 : ↑ 保证从一个独特的集合开始，产生一个独特的集合的方法
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {//想jQuery中添加方法
	//添加has方法 即$.has
	//该方法用于保留特定后代的元素 去掉那些不含有指定后代的元素
	//.has方法将会从给定的jQuery对象中重新创建一组匹配的对象 提供的选择器会一一测试原先那些对象的后代 含有匹配的后代的对象得以保留
	has: function( target ) {//该函数接收一个有效参数 即目标字串(或是节点等)
		var targets = jQuery( target, this ),
			//将传入的字串,调用has方法的对象作为上下文对象传入jQuery核心函数中 并将返回的结果数组保存在变量targets中
			l = targets.length;//获取到结果数组的长度

		return this.filter( function() {//在对调用has方法的数组对象调用filter方法 对元素进行筛选
			var i = 0;
			for ( ; i < l; i++ ) {//对结果数组对象进行遍历
				if ( jQuery.contains( this, targets[ i ] ) ) {//对每个元素进行判定 如果调用的对象中的某个元素包含结果数组的对象 那么保存该元素
					return true;
				}
			}
		} );
	},
//添加closest方法 即$.closest
	//该方法用于从元素本身开始 逐级向上级元素匹配 并返回最先匹配的元素
	//closest会首先检查当前的元素是否匹配 如果匹配则直接返回元素本身 如果不匹配则向上查找父元素 一层一层网上找
		//知道找到匹配的元素, 如果一直到最后什么都没找到那么就返回一个空的jQuery对象
	closest: function( selectors, context ) {//该函数接收两个有效参数 1.selectors 选择器字串 2.context 上下文对象
		var cur,//TODO : 待定
			i = 0,
			l = this.length,//获取到调用closest函数的数组对象的长度
			matched = [],
            //对传入的参数进行判定 如果其是一个字符串 那么就将其传入到jQuery核心函数中并将结果数组对象用变量targets保存
			//如果传入的参数不是一个字符串 那么变量targets指向为false
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		//译 : ↑ 位置选择器永远不会匹配，因为没有_selection_上下文
		//注 : 用正则表达式匹配一个数组时 会首先将每个元素转换为字符串然后以,作为连接符做拼串操作
		if ( !rneedsContext.test( selectors ) ) {//对传入的选择器字串进行正则匹配 确保其不是必须上下文对象才能查找到的选择器字串
			for ( ; i < l; i++ ) {//遍历调用该方法的数组对象
				//首先将变量cur指向为每一个调用的数组对象的元素,
				//在其存在且不全等于上下文对象的情况下一只保持循环状态
				//且不断将其指向为其父节点
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					//译 : ↑ 总是跳过文档片段
					//1.如果当前cur指向的节点的nodeType的值小于11 则进入以下逻辑 但是一旦等于11那么便直接跳过 短路且
					//2.如果targwts变量有值 且在该数组对象中不包含了当前的cur节点  那么不进入以下逻辑 短路且
						//如果targets变量的值为false 即传入的是一个节点或是数组
						//那么要求cur指向的调用当前方法的数组对象的某个元素的nodeType的值必须是1
						//且判定当前等级的cur节点是否能被selector选择器字串选中,
						// 如果是数组的话也可以 因为jQuery.find.matchesSelector有做正则匹配 即做了隐式的类型转换
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 ://TODO : 待考擦

						// Don't pass non-elements to Sizzle
							//译 : ↑ 不要将非元素传递给Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {
						//如果进入此判断 则说明找到了对应的节点  那么将该节点推入结果数组matched中 并终止循环
						matched.push( cur );
						break;
					}
				}
			}
		}
		//对结果数组的长度进行判定 如果其内部元素大于1将结果数组去重后推入栈中并返回
		//如果结果数组只有一个那么就直接将该数组推入栈中返回
		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	//译 : ↑ 确定集合内元素的位置
	//在jQuery上添加index方法 即 $.index方法
	//该方法主要用于搜索匹配元素 并返回相应元素的索引值 从0开始计数
	//如果不给.index()方法传递参数 那么返回值就是这个jQuery对象集合中第一个元素相对于其同辈元素的位置
	//如果参数是一个选择器 那么返回值就是原先元素相对于选择器匹配元素中的位置 如果找不到匹配的元素那么就返回-1
	index: function( elem ) {//该方法接受一个有效参数 即要获取元素下标的对应的元素

		// No argument, return index in parent
		//译 : ↑ 没有参数，在父级返回索引
		if ( !elem ) {//如果没有传入对应的元素
			//那么就将返回调用节点在其父节点中的位置
			//而确认当前节点在其父节点中的位置 即获取到该节点在其兄弟节点中的位置
			//prevAll 获取都所有的前面的兄弟节点
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector 译 : 选择器中的索引
		if ( typeof elem === "string" ) {//如果传入的获取参数 是一个字串的话
            //那么就先调用jQuery核心函数将其转换为可使用的dom节点 然后在调用其indexOf方法
			//注 此处是将转换后的字串对应的dom元素作为第一个参数
			//所以 如果传入的是一个选择器字串的话那么返回的是调用该方法的数组对象的第一个元素相对于传入index参数的位置
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		//译 : ↑ 找到所需元素的位置
		//如果以上的情况都不符合当前的需求那么就调用原生的indexOf方法
		//将调用该方法的对象作为第一个参数 将传入index方法的参数作为第二个参数
			//先判定传入index方法中的参数是否是一个jQuery对象 如果是 那么直接取其第一个元素 如果不是那么就将该参数直接传入
		//将indexOf方法调用的结果返回
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			//译 :↑ 如果它收到一个jQuery对象，则使用第一个元素
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	//添加add方法 即$.add
	// 该方法用于向一个jQuery对象中新添加另外的DOM元素 并将添加后的数组进行去重后返回
	add: function( selector, context ) {//该方法接受两个有效参数 1.选择器字串或是节点等等 2.上下文对象
		return this.pushStack(//将其推入栈中用.end可返回
			jQuery.uniqueSort(//调用$.uniqueSort方法对返回数组进行去重
				//$.get方法用于获取到指定下标的元素 如果没有传入参数那么就将调用该方法的数组转换为数组后并返回
				//调用jQuery.merge方法将调用add方法的数组 和通过传入的选择器字串获取到的元素合并
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	//添加addBack方法 即$.addBack
	//该方法用于添加堆栈中元素集合到当前集合 一个选择性过滤的过滤选择器
	addBack: function( selector ) {//该方法接受一个有效参数 即1.选择器字串 可以是选择器字符串也可以是一个节点等等
		//1.首先对传入的选择器字串进行判定 判定其是否有传 如果没有传入 那么就直接将当前栈中的节点添加到调用addBack的数组对象中
		//2.如果有传入参数 那么就对堆栈中的节点调用filter方法 并将选择器字串传入 并将筛选之后的数组对象合并到调用addBack的数组对象中
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

//定义sibling方法
function sibling( cur, dir ) {//该方法可以接受两个有效参数 1.对象节点 2.筛选的标准
	//将变量cur指向为筛选条件的对应元素 且对cur所指向的节点的nodeType进行判定
	//即将cur指向为传入节点的兄弟节点 且对其兄弟节点的类型进行判定要求其必须是一个元素节点
	//如果不是元素节点那么继续循环 如果是元素节点 跳出循环并将该节点返回
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {//调用$.each方法 对传入的对象进行遍历
	parent: function( elem ) {//定义$.parent方法
		//该方法用于 取得一个包含着所有匹配元素的唯一父元素的集合
		var parent = elem.parentNode;//获取到传入节点的父节点
		//判定其是否为fragment文档类型 如果是fragment类型的节点那么返回null
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {//定义$.parents方法 接收一个有效参数 即传入的节点
		//该方法用于取得一个包含着所有匹配元素的祖先元素的元素集合(不包含根元素) 也可以通过一个可选的表达式进行筛选
		//其内部调用dir方法 将外部传入的节点传入, 并将筛选标准设置为parentNode 即父节点
		//改方法返回的是传入节点所有的父节点 会一直到html根标签
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {//定义$.parentsUntil内部调度函数
		//$.parentsUntil用于查找当前元素的所有父辈元素 直到遇到匹配的那个元素为止
		//如果提供的jQuery代表了一组DOM元素 parentsUntil方法也能让我们找遍所有元素的祖先元素 知道遇到了一个跟提供的参数匹配的元素的时候
		//才会停下来 这个返回的jQuery对象里包含了下面所有找到的父辈元素 但不包括那个选择器匹配的元素
		//内部调用的也是dir方法 将外部传入的节点作为第一个参数传入  查找规则为父节点即parentNode 并将终止条件也传入(如果有)
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {//定义$.next内部调度函数
		//$.next方法 用于取得一个包含匹配元素集合的紧靠着当前元素的jQuery对象
		//内部调用的是sibling方法 将当前节点作为第一个参数传入 筛选标准为nextSibling即下一个兄弟节点
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {//定义$.prev内部调度函数
		//$.prev方法用于与next刚好相反 是用于获取上一个兄弟节点
		//其内部调用的是sibling函数 将当前节点作为第一个参数传入 筛选标准为previousSibling 即上一个兄弟节点
		//sibling( elem, "previousSibling" )会返回当前节点的上一个兄弟节点
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {//定义$.nextAll内部调度函数
		//$.nextAll方法用于获取到当前节点后面所有的兄弟节点
		//其内部调用的是dir方法 将当前节点作为第一个参数传入 并将筛选的标准传为nextSibling即 后面的兄弟节点
		//当前获取到的是当前节点后面的所有的兄弟节点
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {//定义$.prevAll内部调度函数
		//其内部调用的是dir方法 将当前节点作为第一个参数传入 并将筛选的标准设置为previousSibling 即 前面的兄弟节点
		//当前返回的是当前节点对应的前面的所有的兄弟节点
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {//定义$.nextUntil方法内部调度函数
		//其内部调用的dir函数 将当前节点作为第一个参数传入 并将筛选标准传入为nextSibling 即后面所有的兄弟节点
		//将终止条件作为第三个参数传入(如果有)
		//当前返回的结果是当前节点的后面所有的节点 直到终止条件处的 如果没有终止条件或者其值为undefined那么就是当前节点后面所有的兄弟节点
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {//定义$.prevUntil方法内部调度函数
		//其内部调用的是dir函数 将当前节点作为第一个参数传入
		//并将其筛选标准设置为previousSibling 即 前面所有的兄弟节点
		//并将终止条件作为第三个参数传入
		//同nextUntil 当前返回的是当前节点前面所有的兄弟节点 从当前节点一直到终止条件的那个节点位置
		// 如果终止条件不存在那就是当前节点前面所有的兄弟节点
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {//定义$.siblings方法内部调度的函数
		//siblings用于返回当前元素所有的兄弟元素
		//其内部调用的是siblings方法
		//将当前节点的父节点的第一个子节点作为第一个参数传入
		//并将当前节点作为第二个参数传入
		//当前返回的是当前节点的所有的兄弟节点(元素节点)
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {//定义$.children内部调度函数
		//$.children函数用于获取一个节点所有的子节点(元素节点)
		//当前返回的是当前节点所有的子节点(元素节点)
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {//定义$.content内部调度函数
		//$.content方法用于查找当前节点的所有子节点(包含子节点)
		//首先判定当前节点是否是iframe标签
		//如果当前的节点是iframe节点 那么就返回当前节点的contentDocument属性
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		//译 : ↑ 支持：仅限IE 9 - 11，仅限iOS 7，仅限Android Browser <= 4.3
        // Treat the template element as a regular one in browsers that
		//译 : ↑ 将模板元素视为浏览器中的常规模板元素
        // don't support it.
		//译 : ↑ 不支持它。
		//判定当前的节点是否是template标签
        if ( nodeName( elem, "template" ) ) {
        	//如果当前的节点是template标签 那么就将elem变量指向为其content属性 如果没有那么就按照常规的标签进行解析
            elem = elem.content || elem;
        }
		//将当前节点的所有的子节点合并到一个数组中并该数组
        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {//对上诉对象中的每个属性执行该函数 并将上述的属性名作为name字段传入 将属性名对应的函数作为fn参数传入到函数中
	//将上述对象中的每个属性的属性名 作为jQuery原型的方法定义 原型上的属性名同上述对象的属性名
	jQuery.fn[ name ] = function( until, selector ) {//定义每个属性对应的函数
        //对调用对应方法的数组对象进行遍历并对每个元素调用对应的函数
		//比如说某个jQuery对象调用.parent方法  那么就对其调用map方法 即遍历该数组对象并对每个元素调用对应的函数
		var matched = jQuery.map( this, fn, until );

		//即如果不是以 ....为止 那么就只保留符合selector中的对应的节点
		if ( name.slice( -5 ) !== "Until" ) {//判定属性名不能以Until结尾 如 nextUntil 等
			//那么就将selector的指向改为until 即 将选择器字串 的值或是内存地址改为until
			//是为了接下来调用filter TODO: 待定
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			//对第二个参数进行判定 判定其如果存在且是一个字符串
			//那么就对结果数组进行过滤 将符合过滤之后的数组重新制定给变量matched
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {//对调用该方法的数组对象的长度 如果其中的元素大于一个
		//那么需要对结果数组进行去重处理
			// Remove duplicates
			//译 : ↑ 删除重复项
			//如果该方法不是children, contents, next, prev 那么就需要对其进行去重处理
			//因为以上的几种方法不可能会有重复的元素 每一个节点的子节点 或是下一个兄弟节点 上一个兄弟节点 应该是不会重复的
			if ( !guaranteedUnique[ name ] ) {
				//调用jQuery.uniqueSort方法对结果数组进行去重处理
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			//译 :↑ 父母*和prev衍生品的反向订单
			// var rparentsprev = /^(?:parents|prev(?:Until|All))/,
			//因为在进行去重时  是按照范围从大到小的进行排序了 所以我们需要将其翻转顺序以达到从近到远
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		//将结果数组对象推入栈中后返回
		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
	//译 : ↑ 将字符串格式的选项转换为对象格式的选项
//定义createOptions方法
function createOptions( options ) {//该方法接受一个有效参数  options 即 目标字符串
	//该方法根据正则表达式将一个字符串通过空格分隔成几个单词 例如hello world 分隔成["hello", "world"]
	var object = {};//声明一个对象
	//对解析之后的字串的数组进行遍历  如果没有解析或是为空串 那么将目标改为一个为空的数组
	//并对每个元素调用函数 _ = 下标 flag = 对应的解析出来的字串
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		//将对象的属性名设置为每个解析出来的数组的元素
		object[ flag ] = true;//并将其值设置为布尔值true
	} );
	return object;//将设置好属性的对象返回
}

/*
 * Create a callback list using the following parameters:
 * 译 : ↑ 使用以下参数创建回调列表：
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *	译 : ↑ options :一个空格分隔选项的可选列表，这将改变回调列表的行为或更传统的选项对象
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 * 译 :↑ 默认情况下，回调列表的行为就像一个事件回调列表，可以多次被“fired”。 fired : 解雇
 *
 * Possible options: 译 : 可选的参数 :
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *	译 : once :将确保回调列表只能被触发一次（如延期）
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *	memory : 译 : ↑ 将跟踪以前的值，并将调用任何回调添加列表后，立即用最新的“memorized”值（如延期）memorized : 记忆
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *	unique : 译 ↑	将确保回调只能添加一次（在列表中不重复）
 *	stopOnFalse:	interrupt callings when a callback returns false
 *	stopOnFalse : 译 : 当回调返回false时中断调用
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );//4844 要求目标字符串必须为一个两位字母以上的标签体格式

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {//定义不能直接创建的标签对象
	//即如果外部传入的是以下的标签的话 就要先创建其父标签

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]//1087
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;//匹配目标字符串中必须有< 或者&xxx;


	//9857 ---- > elems是一个数组(包含选择器字符串) context是一个新创建的document对象 scripts是一个为空的数组
	//selection, ignored为undefined
	//10822
function buildFragment( elems, context, scripts, selection, ignored ) {//定义buildFragment方法
// 选择器字符串 context对象(如果没传就为false) scripts scripts = !keepScripts && []
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),//创建一个新的文档碎片的对象
		nodes = [],//长度为0的数组
		i = 0,//
		l = elems.length;//获取传入选择器的长度

	for ( ; i < l; i++ ) {//遍历传入的选择器数组
		elem = elems[ i ];//保存elem为每个选择器(DOM)

		if ( elem || elem === 0 ) {//

			// Add nodes directly 译 : 直接添加节点
			if ( jQuery.type( elem ) === "object" ) {//判断elem的类型

				// Support: Android <=4.0 only, PhantomJS 1 only 译 : 支持：Android <= 4.0，仅限PhantomJS 1
				// push.apply(_, arraylike) throws on ancient WebKit 译 : push.apply（_，arraylike）扔在古代WebKit上
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );//把elem添加到nodes中
//如果传入的选择器是一个对象(DOM元素) 那么就将其添加到nodes中
			// Convert non-html into a text node 译 : 将非html转换为文本节点
			} else if ( !rhtml.test( elem ) ) {//如果选择器类型不是一个对象 使用正则对其进行匹配
				nodes.push( context.createTextNode( elem ) );//如果选择器字符串中既没有< 也没有&xxxx;的内容
				//就按照文本节点的形式被创建

			// Convert html into DOM nodes 译 : 将html转换为DOM节点
			} else {
				//将tmp指向为在虚拟document中新创建的div标签
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation 译 : 反序列化标准表示
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();//对传入的选择器字符串进行解析并抓取其中的标签名
				//如果标签名不能被正常抓取则使用空串
				wrap = wrapMap[ tag ] || wrapMap._default;//对某些特定格式的标签 比如tr td thead..进行判定
				//因为这些标签不能脱离其父标签单独出现 在创建这些标签之前需要先进行处理 或先创建其父标签
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content 译 : 通过包装器下降到正确的内容
				j = wrap[ 0 ];
				while ( j-- ) {//将tmp正确指向为我们传入的那个DOM元素
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only 译 : 支持：Android <= 4.0，仅限PhantomJS 1
				// push.apply(_, arraylike) throws on ancient WebKit 译 : push.apply（_，arraylike）扔在古代WebKit上
				jQuery.merge( nodes, tmp.childNodes );//将我们传入的选择器元素与nodes数组进行合并

				// Remember the top-level container 译 : 记住顶级容器
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392) 译 : 确保创建的节点是孤立的（＃12392）
				tmp.textContent = "";//清空tmp中的内容
			}
		}
	}

	// Remove wrapper from fragment 译 : 从片段中删除包装
	fragment.textContent = "";//清空文档碎片对象中的内容

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087) 译 : 已经在上下文集合中跳过元素（trac-4087）
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	//匹配目标字符串即不能为<area <br ..... 且要求标签格式必须是自结束类型
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {//定义htmlPrefilter方法
		//主要是对传入的选择器进行筛选 对于指定标签体使用指定内容进行替换
		//且将自结束的标签变成首尾标签
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {//4191
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only 译 : 支持：仅限Safari 8
// In Safari 8 documents created via document.implementation.createHTMLDocument 译: 在Safari 8文档中通过document.implementation.createHTMLDocument创建
// collapse sibling forms: the second one becomes a child of the first one. 译 : 崩溃兄弟形式：第二个变成第一个孩子。
// Because of that, this security measure has to be disabled in Safari 8. 因此，必须在Safari 8中禁用此安全措施。
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();//为了兼容不支持document.implementation.createHTMLDocument方法的浏览器


// Argument "data" should be string of html 译 :  参数data应该是一个标签字符串
// context (optional): If specified, the fragment will be created in this context,
// 译 :↑ context（可选）：如果指定，将在此上下文中创建片段，
// defaults to document  译 : 默认指向document
// keepScripts (optional): If true, will include scripts passed in the html string
// 译 :↑ keepScripts（可选）：如果为true，将包含在HTML字符串中传递的脚本
    jQuery.parseHTML = function( data, context, keepScripts ) {//定义jQuery.parseHTML方法 参数  选择器字符串 选择器字符串 布尔值
	if ( typeof data !== "string" ) {//对data进行判定 如果data传入的不是字符串则直接返回一个为空的数组
		return [];
	}
	//这条判断的意义为如果没传第二个参数即(context)且传入第三个参数即keepScripts,则将context的值指向为false
	if ( typeof context === "boolean" ) {
		keepScripts = context;//
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {//如果没有传入context对象

		// Stop scripts or inline event handlers from being executed immediately 译 :停止脚本或内联事件处理程序立即执行
		// by using document.implementation 译 : 通过使用document.implementation
		if ( support.createHTMLDocument ) {//判断createHTMLDocument是否可用
			//如果可用
			//将context上下文对象指向为一个新创建的document对象
			context = document.implementation.createHTMLDocument( "" );//context指向为新创建的document对象

			// Set the base href for the created document 译 : 设置创建的文档的基本href
			// so any parsed elements with URLs 译 :所以任何解析的元素与URL
			// are based on the document's URL (gh-2965) 译 :是基于文档的URL（gh-2965）
			base = context.createElement( "base" );//创建一个base标签 base标签的作用是为网页中的所有路径类型的href添加一个公用的url地址
			base.href = document.location.href;//指定base标签的href属性 href的指向为本页面的href url
			context.head.appendChild( base );//将新创建的base标签添加到head中
		} else {
			context = document;//如果当前浏览器不支持document.implementation.createHTMLDocument 将context指向为document
		}
	}

	//rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
	parsed = rsingleTag.exec( data );//解析传入的选择器字符串是否为一个单标签 且获取到标签的标签名
	scripts = !keepScripts && [];//根据传入的布尔值给变量scripts赋值  如果传入的布尔值是true则将其指向为false 如果传入的值为false则将其指向为一个为空的数组
	//scripts的取值是依据我们传入的keepScripts来定义  如果传入的布尔值是true则将其指向为false 如果传入的值为false则将其指向为一个为空的数值
		//keepScripts默认值是false 所以scripts的默认取值是一个为空的数组
	// Single tag 译 : 单一标签
	if ( parsed ) {//如果data是一个单标签
		return [ context.createElement( parsed[ 1 ] ) ];//如果是单一的标签就返回jQuery对象 对象中有按照解析的名字新创建的标签
	}

	//如果传入的不是一个单标签体 就将parsed指向为buildFragment()函数的返回值
	parsed = buildFragment( [ data ], context, scripts );//传入的参数为选择器字符串 context对象(如果没传就为false) scripts scripts = !keepScripts && []
// data 为选择器字符串  context指向的是新创建的document对象 script是一个为空的数组
	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );
