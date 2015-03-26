// "use strict";
/*  FormBuilder.js    */
/*  Author: imixtron  */



// Drag N Drop Init:
pprlsInit = function(frmId){
	dragIcon = document.createElement('img');
	dragIcon.src = 'assets/img/icons/appbar.layer.add.png';
	dragIcon.width = 100;
	formID = frmId;
	cP = {};
	divId = "DropZone";
	document.getElementById('pprlsForm').innerHTML = "";
	touchInit();
}

// Drag N Drop Events:
//Touch Init
checkTouchClasses = function(node){
	if ($(node).hasClass('disabled')
	  ||$(node).hasClass('input-group-addon')
	  ||$(node).hasClass('form-control')
	  ||$(node).hasClass('label')
	  ||$(node).hasClass('lead')
	  ||$(node).hasClass('input-group'))
		return true;
		return false;
}

getParentNode = function(node,chkClasses){

	var newItem = node;

	newItem = newItem.parentNode;

	if (chkClasses==true){
		if (checkTouchClasses($(node))){
			if (newItem.dataset.nodeType=="control")
				newItem = newItem.parentNode;}
			return newItem;
	}
	else if (chkClasses==false)
		return newItem;

}

touchInit = function(){

	getPosition('DropZone');
	var obj = $("[draggable]");
	var touch = null, boxMap = null, ex, vy;

	$.each( obj, function( index, item ) {

		item.addEventListener("touchstart", handleStart = function(ev){
			console.log("Tstart");

			draggable = document.getElementById(ev.target.id);
			if (draggable==null)
				draggable = getParentNode(ev.target,true);
	
			draggable.style.position = "absolute";
			draggable.style.zIndex = "99";

		}, false);
		
		item.addEventListener("touchend", handleEnd = function(ev){
			console.log("Tend");

			draggable.style.position = "";
			draggable.style.top = "";
			draggable.style.left = "";
			draggable.style.zIndex = "";

			if(touch_checkDropzone(ex,vy)==true){
				var nodeCopy = draggable.cloneNode(true);
				$(nodeCopy).data('uId', generateId());

				InsertIntoForm(nodeCopy);
				draggable = null;
			}

		}, false);
		
		item.addEventListener("touchcancel", handleCancel = function(ev){
			console.log("Tcncl");
			ev.preventDefault();
		}, false);

		item.addEventListener("touchleave", handleEnd = function(ev){
			console.log("Tleave");
			draggable.style.position = "static";
		}, false);
		
		item.addEventListener("touchmove", handleMove = function(ev){
			console.log("Tmove");
			touch = event.targetTouches[0];

			ex = touch.pageX;
			vy = touch.pageY;

			if(touch_checkDropzone(ex,vy)==true)
				hover_DropZone("DropZone",1)
			else
				hover_DropZone("DropZone",0)


			draggable.style.left = touch.pageX + 'px';
			draggable.style.top = touch.pageY + 'px';
			event.preventDefault();
		}, false);
	});
}
// - - 	GET POSITION
getPosition = function(divId){
	var my_div = document.getElementById(divId);
    var box = { left: 0, top: 0 };
    try {
        box = my_div.getBoundingClientRect();
    } 
    catch(e) 
    {}

    var doc = document,
        docElem = doc.documentElement,
        body = document.body,
        win = window,
        clientTop  = docElem.clientTop  || body.clientTop  || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
        scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
        top  = box.top  + scrollTop  - clientTop,
        left = box.left + scrollLeft - clientLeft;

        return box;
    }

//CREATE:
CRdragStart = function (ev) {
	ev.dataTransfer.effectAllowed = 'copy';
	ev.dataTransfer.setData("Text/html", ev.target.getAttribute('id'));
	ev.dataTransfer.setDragImage(dragIcon ,0,0);

	return true;
}

CRdragEnter = function(ev){
	console.log("EV->Enter:");

	hover_DropZone(ev.target.id,1);

	return true;
}

CRdragOver = function(ev){
	console.log("EV->Over:");
	if (ev.preventDefault) {
		ev.preventDefault(); // Necessary. Allows us to drop.
	}

}

CRdragLeave = function(ev){
	console.log("EV->Leave: ");	
	hover_DropZone("DropZone",0);

	return true;
}

CRdragDrop = function(ev) {
	console.log("EV->Drop: ")
	hover_DropZone(ev.target.id,0);

	var nodeID = ev.dataTransfer.getData("Text/html");
	var nodeCopy = document.getElementById(nodeID).cloneNode(true);
	// var uId  = generateId(data);

	InsertIntoForm(nodeCopy);

	ev.stopPropagation();
	return false;
}

InsertIntoForm = function(nodeCopy){
	$(nodeCopy).data('uId', generateId());
 	setProperties(nodeCopy);

	var container = document.getElementById('pprlsForm');
	container.appendChild(nodeCopy);
}

//MOVE:


// Other Functions:
setProperties = function(nodeCopy){
	var nodeID = nodeCopy.id;
	uId = $(nodeCopy).data('uId');

    if (cP[uId]==null) //Init for the new control
    {
	    //Adding our controls properties to the object
	    cP[uId] = {
	    	// order : Object.keys(cP).length, 
	    	_uid : uId,
	    	type : nodeID,
	    	required: false,
	    	singleItem: false,
	    	dataType: null,
	    	label : null,
	    	placeholder : null,
	    	cssClass : "form-group",
	    	width : 6,
	    	values :[]
	    }
	    popProperties(nodeCopy,uId,true);
	    remDataAttribs(nodeCopy,uId);
	    return true;
	}

	popProperties(nodeCopy,uId,false);
	remDataAttribs(nodeCopy,uId);
    return true;

}

popProperties = function(nodeCopy, uId, newRun){
	$("#modal-properties").modal("show");
	var cP_Obj = cP[uId];
	analyzeProperties.uid(cP_Obj._uid);
	analyzeProperties.type(cP_Obj.type);
	analyzeProperties.required(cP_Obj.required);
	analyzeProperties.dataType(cP_Obj.type);
	analyzeProperties.label(cP_Obj.type,cP_Obj.label);
	analyzeProperties.placeholder(cP_Obj.type,cP_Obj.placeholder);
	analyzeProperties.width(cP_Obj.type,cP_Obj.width);
	analyzeProperties.value(cP_Obj.type,cP_Obj._uid);

	if (newRun==false)
		analyzeProperties.displayControl(document.getElementById(uId));
	else
		analyzeProperties.displayControl(null);
}

remDataAttribs = function(nodeCopy, uId){
	var nc = $(nodeCopy);

	nc.removeAttr('draggable');
	nc.removeAttr('ondragstart');
	nc.removeClass('alert');
	nc.removeClass('alert-info');

	nc.removeAttr('position');
	nc.removeAttr('top');
	nc.removeAttr('left');
	nc.removeAttr('z-index');

	nc.addClass('col-xs-'+cP[uId].width);
	nc.addClass('form-group');
	nc.addClass('ui-state-default');
	nc.attr("id", uId);
	nc.attr('onclick', 'setProperties(this)');

	$("#_closeModal").attr('onclick', "saveControl('"+uId+"')");
	$("#_delControl").attr('onclick', "deleteControl('"+uId+"')");
	$("#_svControl").attr('onclick', "saveControl('"+uId+"')");

	return nc;
}

analyzeProperties = {
	displayControl  : function(node){
		console.log(node);
		document.getElementById('controlDisplay').innerHTML = "";
		if (node != null)
		document.getElementById('controlDisplay').appendChild(node.cloneNode(true));
	},
	uid : function(uId){
		setString("_uId",uId);
	},
	type : function(type){
		setString("_type",type);
	},
	required : function(req){
		var temp = document.getElementById('_required');
		temp.childNodes[0].checked = req;
	},
	dataType : function(type){
		var temp = document.getElementById('_dataType');
		var inr;
		switch(type){
			case "TextBoxRight":
			case "TextBoxLeft":
					inr = "<select class='form-control'>"+
								"<option value='text'>Text</option>"+
								"<option value='email'>Email</option>"+
								"<option value='number'>Number</option>"+
								"<option value='date'>Date</option>"+
						   "</select>";
						   break;
			case "RadioButton":
			case "Dropdown":
			case "TextArea":
			case "CheckBox":
			case "Paragraph":
					inr = "<select class='form-control' disabled='disabled'>"+
							"<option>Default</option>"+
						   "</select>";
		}
		temp.innerHTML = inr;
	},
	label : function(type,label){
		var temp = document.getElementById('_label');
		switch(type){
			case "TextBoxRight":
			case "TextBoxLeft":
			case "TextArea":
				if (label==null)
					label = "label";
				temp.querySelector("input").value = label;
			case "CheckBox":
			   break;
			case "Paragraph":
				temp.querySelector("input").disabled = true;
				temp.querySelector("input").value = null;
				break;
		}
	},
	placeholder : function(type,placeholder){
		var temp = document.getElementById('_placeholder');
		switch(type){
			case "TextBoxRight":
			case "TextBoxLeft":
			case "TextArea":
				if (placeholder==null)
					placeholder = "placeholder";
				temp.querySelector("input").value = placeholder;
			case "CheckBox":
			   break;
			case "Paragraph":
				temp.querySelector("input").value = null;
				temp.querySelector("input").disabled = true;
				break;
		}
	},
	width : function(type){
		var temp = document.getElementById('_width');
		switch(type){
			case "TextArea":
			case "Paragraph":
				$("#_width select")[0].selectedIndex = 1;
				$("#_width select")[0].disabled = true;
				break;
			case "RadioButton":
			case "CheckBox":
				$("#_width select")[0].selectedIndex = 0;
				$("#_width select")[0].disabled = true;
				break;
			case "TextBoxRight":
			case "TextBoxLeft":
			case "Dropdown":
			default:
				$("#_width select")[0].selectedIndex = 0;
				$("#_width select")[0].disabled = false;
				break;
		}
	},
	value: function(type,uId){		
		document.getElementById('_value').innerHTML = "";
		switch(type){
			case "Paragraph":
				setString("_valueName","Text");
				break;
			case "RadioButton":
			case "Dropdown":
			case "CheckBox":
				setString("_valueName","Value <br/><small>click to add more checboxes</small>");
				button = "<button onclick='createValTb(\""+uId+"\")' class='pull-right btn btn-xs btn-success'><i class='glyphicon glyphicon-plus-sign'></i></button>";
				setString("_valueName",button,true);
				break;
			case "TextBoxRight":
			case "TextBoxLeft":
			case "TextArea":
				setString("_valueName","Default Value:<br/><small>not required</small>");
				break;
			default:
				break;
		}
		checkVal(uId);
	}
}

// MODAL (ABOUT-TO) HIDE EVENT
// $('#modal-properties').on('hide.bs.modal', function () {
//   if (ikjj>1) {$('#modal-properties').modal('show')};
//   ikjj++;
//   console.log("Modal Closed");
// })

checkVal = function(uId){
	var cP_Obj = cP[uId];

	if (cP_Obj.values.length>0) {
		var lng = cP_Obj.values.length;
		for (var i = 0; i < lng; i++) {
			createValTb(uId,cP_Obj.values[i]);
		};		
	}
	else
		createValTb(uId,undefined);
		 /* iterate through array or object */
}

// <span class="input-group-btn">
// 	<button class="btn btn-default" type="button">Go!</button>
// </span>
delValtb = function(node,uId){
	tempPar = node.parentNode.parentNode;
	var index = substringCust(tempPar.id,"-");
	if (index > 1) {
		cP[uId].values.splice(index-1,1);
		tempPar.remove();		
	}
	else{
		if (document.querySelector(".second")==null)
			document.querySelector("#"+uId+"-1 input").value = "";
		else
			alert("cannot delete first element\n[hint]: delete other elements first");
	}
	console.log(node);
}

createValTb = function(uId,value){
	if (!value)
		cP[uId].values.push('');

	var iterator = cP[uId].values.length;

	var temp = document.getElementById('_value');
	var valdiv = document.createElement("div");
	valdiv.className = (iterator>1) ? "input-group second" : "input-group";
	valdiv.id = uId+"-"+iterator;
	
	var valTb = document.createElement("input");
	valTb.className = "form-control";
	valTb.type = "text";
	valTb.name = uId+'-val';
	valTb.placeholder = "insert value here";
	valTb.value = (value==undefined) ? null : value;
	// if (value=="")

	valBtn = document.createElement("button");
	valBtn.innerHTML = "&times;";
	valBtn.className = "btn btn-danger"
	valBtn.type = "button";
	valBtn.addEventListener("click", function(){delValtb(this,uId);}, false);;

	var valBtnContainer = document.createElement("span");
	valBtnContainer.className = "input-group-btn";

	valBtnContainer.appendChild(valBtn);
	valdiv.appendChild(valTb);
	valdiv.appendChild(valBtnContainer);

	temp.appendChild(valdiv);
}

deleteControl = function(uId){

	child   = document.getElementById(uId);
	parent  = getParentNode(child,false);

	parent.removeChild(child);
	delete cP[uId];
	$("#modal-properties").modal("hide");
	resetModal();

}

validate = function(uId){
	if (cP[uId].type == "Paragraph") {
		var valArr = document.getElementsByName(uId+"-val");
		console.log(valArr[0]);
		if(valArr[0].value.length == 0){
			alert("Error: You Must input some value for Paragraph");
			return;
		}
	}
	else
		$("#modal-properties").modal("hide");
}

saveControl = function(uId){

	$("#modal-properties").modal("show");
	var temp = null;
	var pObj = cP[uId];

	temp = document.querySelector("#_required input");
	pObj.required 		= (temp.checked) ? true : false;

	temp = document.querySelector("#_dataType select");
	pObj.dataType 		= temp.value;

	temp = document.querySelector("#_label input");
	pObj.label 			= temp.value;

	temp = document.querySelector("#_placeholder input");
	pObj.placeholder 	= temp.value;

	temp = document.querySelector("#_width select");
	pObj.width 			= $("#_width select")[0].value;
	// Saves Value(s)
	var valArr = document.getElementsByName(uId+"-val");
	pObj.values = [];
	for (var i = 0; i < valArr.length; i++) {
		if (valArr[i].value!="")
		pObj.values[i] = valArr[i].value;
	};

	validate(uId);
	updateControl(pObj._uid);
}

updateControl = function(uId){
	control = document.getElementById(uId);
	var pObj = cP[uId];
	var width = 0;

	// set label
	if (pObj.type!="CheckBox"){
	if (pObj.type!="RadioButton"){
		console.log(pObj.type)
		$("#"+uId+" label").html(pObj.label);
	}}

	// set Placeholder
	$("#"+uId+" input").attr('placeholder', pObj.placeholder);

	// set width
	for (var i = 0; i < control.classList.length; i++) {
		if(control.classList[i].substring(0,7) == "col-xs-"){
			width = control.classList[i].substring(7);
			console.log("width: " + width);
		}
	}

	if (pObj.width != width) {
		control.classList.remove("col-xs-"+width);
		control.classList.add("col-xs-"+pObj.width);
	}

	// set Values
	switch(pObj.type){
		case "Paragraph":
			setString(control.id+" p",pObj.values[0]);
			break;
		case "Dropdown":
			var selectItems = control.querySelector("select");
			if(pObj.values.length>0)
				delChildNodesAll(selectItems);

			for (var i = 0; i < pObj.values.length; i++) {
				var val = document.createElement("option");
				val.text = pObj.values[i];
				val.value = pObj.values[i];
				selectItems.options.add(val,i);
			};
			break;
		case "RadioButton":
			var radioItems = control.querySelector('div');
			if(pObj.values.length>0)
			delChildNodesAll(radioItems);

			for (var i = 0; i < pObj.values.length; i++) {
				var Val = document.createElement('input');
				var lbl = document.createElement('label');
				Val.type = 'checkbox';
				Val.disabled = 'disabled';

				lbl.appendChild(Val)
				lbl.innerHTML += pObj.values[i];

				radioItems.appendChild(lbl);
			};
			break;
		case "CheckBox":
			var checkItems = control.querySelector('div');
			if(pObj.values.length>0)
			delChildNodesAll(checkItems);

			for (var i = 0; i < pObj.values.length; i++) {
				var Val = document.createElement('input');
				var lbl = document.createElement('label');
				Val.type = 'checkbox';
				Val.disabled = 'disabled';

				lbl.appendChild(Val)
				lbl.innerHTML += pObj.values[i];

				checkItems.appendChild(lbl);
			};
			break;
		case "TextBoxRight":
		case "TextBoxLeft":
			control.querySelector('input').value = pObj.values[0]==undefined?"":pObj.values[0];
			break;
		case "TextArea":
			control.querySelector('textarea').value = pObj.values[0]==undefined?"":pObj.values[0];
			break;
		default:
			break;
	}

}

resetModal = function(){

}

// tbCheck = 0;
// insertSeprator = function(type){ // Fetches The Last Row to input 

// 	var formObj = document.getElementById('pprlsForm');
// 	var seprator = document.createElement('div');
// 	seprator.className = "clearfix";

// 	switch(type){
// 		case "TextBoxLeft":
// 		case "TextBoxRight":
// 		case "Dropdown":
// 			tbCheck++;
// 			if (tbCheck>2) {
// 				console.log(tbCheck);
// 				formObj.appendChild(seprator);
// 				tbCheck = 0;
// 			}
// 			return 'pprlsForm';
// 			break;
// 		case "TextArea":
// 		default:
// 			formObj.appendChild(seprator);
// 			tbCheck = 2;
// 			return 'pprlsForm';
// 			break;
// 	}
// }

// isRowFull = function(rowObj){ // Checks if the row has more the 2 elements [requires row (jquery) obj]
// 	if(rowObj.childElementCount>=2)
// 		return true;
// 	return false;
// }

// createRow = function(){ // If the row is not available or is full Create Row function is called
// 	var formObj = document.getElementById('pprlsForm');
// 	pprlsrowCount++;
// 	var rowHTML = document.createElement('div');
// 	rowHTML.id = 'pprls_Row'+pprlsrowCount;

// 	formObj.appendChild(rowHTML);

// 	var rowObj = formObj.children[formObj.childElementCount];

// 	return rowHTML.id;
// }

generateId = function(){
	var genItrator = "";
	var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 3; i++ )
		genItrator += possible.charAt(Math.floor(Math.random() * possible.length));
	return Object.keys(cP).length+"-"+genItrator;
}

hover_DropZone = function(divId,val){
	if (val==1) 
		$("#"+divId).css('border', '2px dashed rgba(0,0,0,0.5)');
	else
		$("#"+divId).css('border', '2px dashed rgba(0,0,0,0.2)');
}

touch_checkDropzone = function(x,y){
	boxMap = getPosition("DropZone");
	if (x > boxMap.left && x < (boxMap.left+boxMap.width)){
		if (y > boxMap.top && y < (boxMap.top+boxMap.height))
			return true;
	}
	return false;
}
setString = function(id,string,append){
	if (append==true){
		$("#"+id).append(string);
		return;
	}

	$("#"+id).html(string);
}
delChildNodesAll = function(myNode){
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
}
substringCust = function(str,sym){
	return str.substring(str.indexOf(sym)+1,str.length);
}
window.onerror = function(ex) { alert(ex) };
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})