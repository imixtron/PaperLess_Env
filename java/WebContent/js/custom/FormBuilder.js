// "use strict";
/*  FormBuilder.js    */
/*  Author: imixtron  */



// Drag N Drop Init:
pprlsInit = function(frmId){
	dragIcon = document.createElement('img');
	dragIcon.src = 'images/details_open.png';
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
	  ||$(node).hasClass('input-group')
	  ||$(node).hasClass('p')
	  ||$(node).hasClass('h3'))
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

InsertIntoForm = function(nodeCopy,id,oper){
	if (id===undefined){
		console.log("undefined");
		$(nodeCopy).data('uId', generateId());
	}
	else
		$(nodeCopy).data('uId', id);

 	setProperties(nodeCopy,oper);

 	var container = document.getElementById('pprlsForm');
 	if(nodeCopy.querySelector('div.checkbox')){
 		nodeCopy.querySelector('div.checkbox').id = nodeCopy.id;
 	}
 	else if(nodeCopy.querySelector('div.radio')){
 		nodeCopy.querySelector('div.radio').id = nodeCopy.id;
 	}
 		
 	container.appendChild(nodeCopy);
}

//MOVE:


// Other Functions:
setProperties = function(nodeCopy,oper){
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
	popProperties(nodeCopy,uId,false,oper);
	remDataAttribs(nodeCopy,uId,oper);
    return true;

}

popProperties = function(nodeCopy, uId, newRun,oper){
	modalOper('show',oper);
	var cP_Obj = cP[uId];
	analyzeProperties.uid(cP_Obj._uid);
	analyzeProperties.type(cP_Obj.type);
	analyzeProperties.required(cP_Obj.required);
	analyzeProperties.dataType(cP_Obj.type,cP_Obj.dataType);
	analyzeProperties.label(cP_Obj.type,cP_Obj.label);
	analyzeProperties.placeholder(cP_Obj.type,cP_Obj.placeholder);
	analyzeProperties.width(cP_Obj.type,cP_Obj.width);
	analyzeProperties.value(cP_Obj.type,cP_Obj._uid);

	if (newRun==false)
		analyzeProperties.displayControl(document.getElementById(uId));
	else
		analyzeProperties.displayControl(document.getElementById(null));
		return;
}

remDataAttribs = function(nodeCopy, uId, oper){
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
	if(oper!="create"){
		nc.attr('onclick', 'setProperties(this)');
	
		$("#_close").attr('onclick', "validate('"+uId+"',true)");
		$("#_updateControl").attr('onclick', "saveControl('"+uId+"','update')");
		$("#_delControl").attr('onclick', "deleteControl('"+uId+"')");
		$("#_svControl").attr('onclick', "saveControl('"+uId+"','save')");
	}
	return nc;
}

analyzeProperties = {
	displayControl  : function(node){
		document.getElementById('controlDisplay').innerHTML = "";
		if (node == null)
			return;
		document.getElementById('controlDisplay').appendChild( analyzeProperties.refreshNode(node) );
	},
	refreshNode : function(node){
		nodeClone = node.cloneNode(true);
		nodeClone.removeAttribute("onclick");		
		var type = cP[nodeClone.id].type;
		nodeClone.id = "demo-control";
		nodeClone.classList.remove('col-xs-6');
		nodeClone.classList.add('col-xs-12');
		switch(type){
			case "TextBoxLeft":
			case "TextBoxRight":
			case "CheckBox":
			case "RadioButton":
				type = "input";
				break;
			case "TextArea":
				type = "textarea";
				break;
			case "Dropdown":
				type = "select";
				break;
			case "Seperator":
			case "ParagraphHigh":
			case "Paragraph":
			case "Heading":
			default:
				return nodeClone;
				break;
		}
		inputArr = nodeClone.querySelectorAll(type);

		for (var i = 0; i < inputArr.length; i++) {
			inputArr[i].removeAttribute('disabled');
		};
		console.log(nodeClone);
		return nodeClone;
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
	dataType : function(type,selected){
		var temp = document.getElementById('_dataType');
		var inr = "<select class='form-control'>";
		switch(type){
			case "TextBoxRight":
			case "TextBoxLeft":
					inr += 	"<option value='text'>Text</option>"+
							"<option value='email'>Email</option>"+
							"<option value='number'>Number</option>"+
							"<option value='date'>Date</option>";
						   break;
			case "RadioButton":
					inr += "<option>radio</option>";
					break;
			case "CheckBox":
					inr += "<option>checkbox</option>";
					break;
			case "Dropdown":
			case "TextArea":
				inr += "<option value='text'>Text</option>";
				break;
			case "ParagraphHigh":
			case "Paragraph":
			case "Heading":
			case "Seperator":
			default:
					inr += "<option>Default</option>";
					break;
		}
		inr += "</select>";
		temp.innerHTML = inr;
		temp = temp.querySelector("select");
		for (var i = 0; i < temp.options.length; i++) {
			if(temp.options[i].value==selected){
				temp.options[i].selected = true;
			}
		};
	},
	label : function(type,label){
		var temp = document.getElementById('_label');
		switch(type){
			case "TextBoxRight":
			case "TextBoxLeft":
			case "TextArea":
			case "Dropdown":
				temp.querySelector("input").disabled = false;
				if (label==null)
					label = "label";
				temp.querySelector("input").value = label;
				break;
			case "CheckBox":
			case "RadioButton":
				temp.querySelector("input").disabled = false;
				if (label==null)
					label = "label";
				temp.querySelector("input").value = label;
				break;
			case "ParagraphHigh":
			case "Paragraph":
			case "Seperator":
			case "Heading":
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
			case "Dropdown":
				temp.querySelector("input").disabled = false;
				if (placeholder==null)
					placeholder = "placeholder";
				temp.querySelector("input").value = placeholder;
				break;
			case "CheckBox":
			case "RadioButton":
			case "ParagraphHigh":
			case "Paragraph":
			case "Seperator":
			case "Heading":
				temp.querySelector("input").value = null;
				temp.querySelector("input").disabled = true;
				break;
		}
	},
	width : function(type,width){
		var temp = document.getElementById('_width');
		switch(type){
			case "ParagraphHigh":
			case "Paragraph":
			case "Seperator":
			case "Heading":
				$("#_width select")[0].selectedIndex = 1;
				$("#_width select")[0].disabled = true;
				break;
			case "RadioButton":
			case "CheckBox":
				$("#_width select")[0].selectedIndex = 0;
				$("#_width select")[0].disabled = true;
				break;
			case "TextArea":
			case "TextBoxRight":
			case "TextBoxLeft":
			case "Dropdown":
			default:
				temp = temp.querySelector("select");
				for (var i = 0; i < temp.options.length; i++) {
					if(temp.options[i].value==width){
						$("#_width select")[0].selectedIndex = i;
						break;
					}
				};
				$("#_width select")[0].disabled = false;
				break;
		}
	},
	value: function(type,uId){		
		document.getElementById('_value').innerHTML = "";
		switch(type){
			case "ParagraphHigh":
			case "Paragraph":
			case "Heading":
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
			case "Seperator":
				setString("_valueName","");
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
	var tempPar = node.parentNode.parentNode;
	var temp = document.getElementById(uId+"-1");
	var index = substringCust(tempPar.id,"-");
	if (index > 1) {
		cP[uId].values.splice(index-1,1);
		tempPar.remove();		
	}
	else{
		if (document.querySelector(".second")==null)
			temp.querySelector("input").value = "";
		else
			alert("cannot delete first element\n[hint]: delete other elements first");
	}
}

createValTb = function(uId,value){
	if(cP[uId].type == "Seperator")
		return;
	if (value==undefined)
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
	valBtn.className = "btn btn-danger";
	valBtn.type = "button";
	valBtn.addEventListener("click", function(){delValtb(this,uId);}, false);;

	var valBtnContainer = document.createElement("span");
	valBtnContainer.className = "input-group-btn";

	valBtnContainer.appendChild(valBtn);
	valdiv.appendChild(valTb);
	valdiv.appendChild(valBtnContainer);

	temp.appendChild(valdiv);
};

deleteControl = function(uId){

	child   = document.getElementById(uId);
	parent  = getParentNode(child,false);

	parent.removeChild(child);
	delete cP[uId];
	$("#modal-properties").modal("hide");
	resetModal();

};

validate = function(uId,oper){
	if (cP[uId].type == "Paragraph" || cP[uId].type == "ParagraphHigh" || cP[uId].type == "Heading") {
		var valArr = document.getElementsByName(uId+"-val");
		if (valArr[0].value.length <= 0) {
			alert("Error: You Must input value for a textbased control");
			return false;
		}
		else{
			modalOper("hide",oper);
			return true;
		}
	}
	else{
		modalOper("hide",oper);
	}
};
modalOper = function(arg,oper){
	switch(oper){
		case 'close':
		case 'save':
			$("#modal-properties").modal(arg);
			break;
		case 'update':
			if (arg=="hide")
			  	analyzeProperties.displayControl(document.getElementById(uId));
			break;
		case 'create':
			break;
		default:
			$("#modal-properties").modal(arg);
			break;
	}
};
saveControl = function(uId,oper){
	console.log("Opertation."+oper);
	modalOper('show',oper);
	var temp = null;
	var pObj = cP[uId];

	temp = document.querySelector("#_required input");
	pObj.required 		= (temp.checked) ? true : false;

	temp = document.querySelector("#_dataType select");
	pObj.dataType 		= temp.selectedOptions[0].value;

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
		if (valArr[i].value!=""){
			pObj.values[i] = valArr[i].value;
		}
	};
 

	updateControl(pObj._uid,validate(uId,oper));
	modalOper('hide',oper);
};

updateControl = function(uId,closeModal,validation){

	if (validation==false)
		return;

	control = document.getElementById(uId);
	var pObj = cP[uId];
	var width = 0;

	// set label
	if (pObj.type=='CheckBox'||pObj.type=='RadioButton')
		$("#"+uId+" span").html(pObj.label);
	else
		$("#"+uId+" label").html(pObj.label);

	// set Placeholder
	$("#"+uId+" input").attr('type', pObj.dataType);
	// if (pObj.type==="Textarea"||pObj.type==="CheckBox"||pObj.type==="Dropdown")
	// 	$("#"+uId+" textarea").attr('type', pObj.dataType);

	// set Placeholder
	$("#"+uId+" input").attr('placeholder', pObj.placeholder);

	// set width
	for (var i = 0; i < control.classList.length; i++) {
		if(control.classList[i].substring(0,7) == "col-xs-"){
			width = control.classList[i].substring(7);
		}
	}

	if (pObj.width != width) {
		control.classList.remove("col-xs-"+width);
		control.classList.add("col-xs-"+pObj.width);
	}

	console.log("updateControls:");
	// set Values
	switch(pObj.type){
		case "ParagraphHigh":
		case "Paragraph":
			control.querySelector('p').innerHTML = pObj.values[0].replace(/'/g, " ");
			break;
		case "Heading":
			control.querySelector('h3').innerHTML = pObj.values[0];
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
				Val.type = 'radio';
				Val.name = pObj._uid;
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

	// if(closeModal==false)
	// 	analyzeProperties.displayControl(document.getElementById(uId));
	// else
	// 	$("#modal-properties").modal('hide');
};

resetModal = function(){

};

generateId = function(){
	var genItrator = "";
	var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 3; i++ )
		genItrator += possible.charAt(Math.floor(Math.random() * possible.length));
	return Object.keys(cP).length+genItrator;
};

hover_DropZone = function(divId,val){
	if (val==1) 
		$("#"+divId).css('border', '2px dashed rgba(0,0,0,0.5)');
	else
		$("#"+divId).css('border', '2px dashed rgba(0,0,0,0.2)');
};

touch_checkDropzone = function(x,y){
	boxMap = getPosition("DropZone");
	if (x > boxMap.left && x < (boxMap.left+boxMap.width)){
		if (y > boxMap.top && y < (boxMap.top+boxMap.height))
			return true;
	}
	return false;
};
setString = function(id,string,append){
	if (append==true){
		$("#"+id).append(string);
		return;
	}

	$("#"+id).html(escapeStr(string));
};
escapeStr = function(string) {
    return string.replace(/"/g, "'");
};
delChildNodesAll = function(myNode,index){
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
};
substringCust = function(str,sym,pre){
	if (pre==true)
		return str.substring(0,str.indexOf(sym));
	return str.substring(str.indexOf(sym)+1,str.length);
};
getTitle = function(){
	title = document.querySelector("#Title");
	if(title.value==""){
		title.value = prompt("Title cannot be empty. try again");
		if(title.value==null||title.value==""){
			alert("Invalid Title");
			return false;
		}
	}
	else
	if(title.value[0].match(/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/i)){
		title.value = prompt("Title Cannot start with a Number/Special-Char/Space. try again:");
		if(title[0].match(/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/i)){
			alert.error("Invalid Title");
			return false;
		}
	}
	title = title.value;
	
	return title;
};

formOper = {
	Controls : {},
	ControlString : "",
	compile : function(){
		if (formOper.render()==true)
		{
			CO = [];
			for(var key in formOper.Controls){
				CO.push(formOper.Controls[key]);
			}
			formOper.ControlString = JSON.stringify(CO);
			fobj = formOper.ControlString;
			var title = getTitle();
			var Desc = document.querySelector("#Desc").value;
			var Thr = document.querySelector("#Thr").value;
			if(title==false)
				return;

			$.ajax({
		        type: "POST",
		        url: "Form",//jsp,servlet,struts action
		        data: {'JSONarr': fobj, 'Title': title, 'Desc':Desc, 'userid':userid, 'orgid':org, 'Thr':Thr}
			}).success(function(responseText){
				console.log("Success: Form Created");
				console.log(responseText);
			});
		}
		else{
			alert("Compile Failed For Some Reason");
			console.error("Error in Redering");
			console.error(formOper.ControlString);
			console.error(cP);
		}
	},
	render : function(){
		if(Object.keys(cP).length === 0){
			alert("Cannot Create Empty Form");
			return false;
		}
		 pprlsControls = document.querySelectorAll("#pprlsForm > div");
		 pprlsControlIds = [];
			
		var i =0;

		for (i = 0; i < pprlsControls.length; i++) {
			pprlsControlIds.push(pprlsControls[i].id);
		};
		i=0;
		for(var key in cP){
			if (key!=pprlsControlIds[i]){
				var hashId = i+pprlsControlIds[i].substring(1,pprlsControlIds[i].length);
				formOper.Controls[hashId] = cP[pprlsControlIds[i]];
			}
			else
				formOper.Controls[key] = cP[pprlsControlIds[i]];				
			i++;
		}

		if (cP.length===formOper.Controls.length)
			return true;
		console.log("Something Went Wrong");
		return false;
	},
	createForm : function(ControlObj){
		cPr = JSON.parse(ControlObj);
		console.log(cPr);
		for(i=0;i<cPr.length;i++){
			console.log(cPr[i]);
			cP[cPr[i]._uid] = cPr[i];
		}
		for(var key in cP){
			console.log("creating: "+key);
			InsertIntoForm(formOper.fetchNode(cP[key].type),cP[key]._uid,'create');
			saveControl(cP[key]._uid,'create');
		}
		tbx = document.querySelectorAll('#pprlsForm input');
		tar = document.querySelectorAll('#pprlsForm textarea');
		sel = document.querySelectorAll('#pprlsForm select');

		for(i=0;i<tbx.length;i++)
			tbx[i].disabled = false;

		for(i=0;i<tar.length;i++)
			tar[i].disabled = false;

		for(i=0;i<sel.length;i++)
			sel[i].disabled = false;

		$('#modal-properties').modal('hide');
	},
	frmSubmit : function(){
		controls = [];
		temp = document.querySelectorAll("#pprlsForm input");
		for(i=0; i<temp.length; i++){
			controls.push(temp[i]);
		}
		temp = document.querySelectorAll("#pprlsForm textarea");
		for(i=0; i<temp.length; i++){
			controls.push(temp[i]);
		}
		temp = document.querySelectorAll("#pprlsForm select");
		for(i=0; i<temp.length; i++){
			controls.push(temp[i]);
		}
		Data = {};		
		var j = 0;
		for(i=0; i<controls.length; i++){
			var d;
			var uid = controls[i].parentNode.parentNode.id;
			
			switch(cP[uid].type){
				case "RadioButton":
					if(controls[i].checked)
						d = cP[uid].values[j];
					else
						j++;
					break;
				case "CheckBox":
					if(controls[i].checked)
						d += cP[uid].values[j]+"; ";
					else
						j++;
					break;
				case "Dropdown":
				case "TextBoxRight":
				case "TextBoxLeft":
				case "TextArea":
					d = controls[i].value
					break;				
				case "ParagraphHigh":
				case "Paragraph":
				case "Heading":
				case "Seperator":
					default:
			}

			console.log(d);
			Data[uid] = d;
		}
		var dataString = JSON.stringify(Data);
		$.ajax({
	        type: "POST",
	        url: "FormData",//jsp,servlet,struts action
	        data: {'frmData': dataString, 'frmID': formID}
		}).success(function(responseText){
			console.log("Success: Form Created");
			console.log(responseText);
			location.href="formSubmitted.jsp";
		});
		
	},
	bluePrints : {
		TextBoxLeft : function(){
			console.info("TextBoxLeft");
			return '<div id="TextBoxLeft" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">'+
                '<div id="lbl-before" class="input-group">'+
                    '<label class="input-group-addon" data-node-type="control">Label</label>'+
                    '<input class="form-control disabled" type="text" disabled="disabled" placeholder="palaceholder" data-node-type="control">'+
                '</div>'+
            '</div>';
		},
		TextBoxRight : function(){
			console.info("TextBoxRight");
			return '<div id="TextBoxRight" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">'+
                '<div id="lbl-after" class="input-group">'+
                    '<input class="form-control" type="text" disabled="disabled" placeholder="palaceholder" data-node-type="control">'+
                    '<label class="input-group-addon disabled" data-node-type="control">Label</label>'+
                '</div>'+
            '</div>';
		},
		TextArea : function(){
			console.info("Textarea");
			return '<div id="TextArea" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">'+
                '<div>'+
                    '<span class="h5 pull-left" data-node-type="control">Text Area</span>'+
                    '<TextArea class="form-control" placeholder="placeholder" disabled="disabled" data-node-type="control"></TextArea>'+
                '</div>'+
            '</div>';
		},
		Dropdown : function(){
			console.info("Dropdown");
			return '<div id="Dropdown" class="alert alert-info form-inline form-group" draggable="true" ondragstart="CRdragStart(event)">'+
                '<div class="form-group">'+
                    '<label class="label" data-node-type="control">Text Area</label>'+
                    '<select class="form-control" disabled="disabled" data-node-type="control">'+
                        '<option>Value</option>'+
                    '</select>'+ 
                '</div>'+
            '</div>';
		},
		CheckBox : function(){
			console.info("CheckBox");
			return '<div id="CheckBox" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">'+
                '<div class="checkbox">'+
                    '<span class="h5 pull-left" data-node-type="control">Label</span>'+
                    '<label>'+
                        '<input type="checkbox">'+
                        'Checkbox-Item'+
                    '</label>'+
                '</div>'+
            '</div>';
		},
		RadioButton : function(){
			console.info("RadioButton");
            return '<div id="RadioButton" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">'+
                '<div class="radio">'+
                    '<span class="h5 pull-left" data-node-type="control">Label</span>'+
                    '<label>'+
                        '<input type="radio" value="1" disabled="disabled" data-node-type="control">  '+
                        'Radio-Item'+
                    '</label>'+
                '</div>'+
            '</div>';
		},
		ParagraphHigh : function(){
			console.info("ParagraphHigh");
			return '<div id="ParagraphHigh" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">'+
                '<div>'+
                    '<p class="lead" data-node-type="control">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'+
                    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+
                    'quis nostrud exercitation ullamco </p> '+
                '</div>'+
            '</div>';
		},
		Paragraph : function(){
			console.info("Paragraph");
			return '<div id="Paragraph" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">'+
                '<div>'+
                    '<p class="p" data-node-type="control">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'+
                    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+
                    'quis nostrud exercitation ullamco </p>'+
                '</div>'+
            '</div>';
		},
		Heading : function(){
			console.info("Heading");
			return '<div id="Heading" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">'+
                '<div>'+
                    '<h3 data-node-type="control">Heading 101</h3>'+
                '</div>'+
            '</div>';
		},
		Seperator : function(){
			console.info("Heading");
			return '<div id="Seperator" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">'+
	          	      '<hr class="clearfix"/>'+
      			   '</div>';
		}
	},
	fetchNode: function(id){
		idhfj = id;
		temp = document.createElement("div");
			temp.innerHTML = formOper.bluePrints[id]();
		return temp.firstChild;
	}

};

// window.onerror = function(ex) { alert(ex) };
// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })