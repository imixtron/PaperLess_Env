/*  FormBuilder.js    */
/*  Author: imixtron  */



// Drag N Drop Init:
var dragIcon = document.createElement('img');
dragIcon.src = 'assets/img/icons/appbar.app.png';
dragIcon.width = 100;
pprlsrowCount = 0;
formID = "dummy";
controlProperties = {};
divId = "DropZone";

// Drag N Drop Events:
//Touch Init
touchInit = function(){

	getPosition('DropZone');
	var obj = $("[draggable]");
	var touch = null, boxMap = null, ex, vy;

	$.each( obj, function( index, item ) {
		item.addEventListener("touchstart", handleStart = function(ev){
			console.log("Tstart")
			console.log(ev);
			var draggable = document.getElementById(ev.target.id);

			draggable.style.position = "absolute";
			draggable.style.zIndex = "99";
		}, false);
		
		item.addEventListener("touchend", handleEnd = function(ev){
			console.log("Tend");
			console.log(ev);

			ev.target.style.position = "";
			ev.target.style.top = "";
			ev.target.style.left = "";
			ev.target.style.zIndex = "";

			if(touch_checkDropzone(ex,vy)==true){
				var nodeCopy = document.getElementById(ev.target.id).cloneNode(true);
				console.log(nodeCopy);

				InsertIntoForm(nodeCopy);
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
			// console.log("Tmove");
			touch = event.targetTouches[0];

			ex = touch.pageX;
			vy = touch.pageY;

			if(touch_checkDropzone(ex,vy)==true)
				hover_DropZone("DropZone",1)
			else
				hover_DropZone("DropZone",0)


			event.target.style.left = touch.pageX + 'px';
			event.target.style.top = touch.pageY + 'px';
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
	console.log(ev.dataTransfer.getData("Text/html"));

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

	var data = ev.dataTransfer.getData("Text/html");
	var nodeCopy = document.getElementById(data).cloneNode(true);

	// var uId  = generateId(data);
	$(nodeCopy).data('uId', generateId(data.id));
	console.log($(nodeCopy).data('uId'));

	InsertIntoForm(nodeCopy);

	ev.stopPropagation();
	return false;
}

InsertIntoForm = function(nodeCopy){
	setProperties(nodeCopy);

	var container = fetchRow($("#pprlsForm"))
	container.appendChild(nodeCopy);
}

//MOVE:


// Other Functions:
setProperties = function(nodeCopy){
	var data = nodeCopy.id;
	uId = $(nodeCopy).data('uId')
    if (controlProperties[uId]==null) //Init for the new control
    {
	    //Adding our controls properties to the object
	    controlProperties[uId] = {
	    	_uid : uId,
	    	type : data,
	    	dataType: null,
	    	label : null,
	    	placeholder : null,
	    	cssClass : "form-group",
	    	width : "col-xs-6",
	    	values :[{
	    		name: uId,
	    		value: "value11"
	    	}]
	    }
	    popProperties(nodeCopy,uId);
	    return remDataAttribs(nodeCopy,uId);
	}

	popProperties(nodeCopy,uId);
	return remDataAttribs(nodeCopy,uId);

}

popProperties = function(nodeCopy, uId){
	$("#modal-properties").modal("show");
	console.log(controlProperties[uId]);
	var pObj = controlProperties[uId];

	var tblInner = 
	"<tr>"+
		"<td>Control ID: </td>"+
		"<td>"+
			pObj._uid+
		"</td>"+
	"</tr>"+
	"<tr>"+
		"<td>Control Type: </td>"+
		"<td>"+
			analyzeProperties.type(pObj.type)+
		"</td>"+
	"</tr>"+
	"<tr>"+
		"<td>Data Type: </td>"+
		"<td>"+
			analyzeProperties.dataType(pObj.type,pObj.dataType)+
		"</td>"+
	"</tr>"+
	"<tr>"+
		"<td>Label: </td>"+
		"<td>"+
			analyzeProperties.label(pObj.type,pObj.label)+
		"</td>"+
	"</tr>"+
	"<tr>"+
		"<td>Placeholder: </td>"+
		"<td>"+
			analyzeProperties.placeholder(pObj.type,pObj.placeholder)+
		"</td>"+
	"</tr>"+
	"<tr>"+
		"<td>Control width: </td>"+
		"<td>"+
			analyzeProperties.width(pObj.type,pObj.width)+
		"</td>"+
	"</tr>"+
	"<tr>"+
		"<td>Values: </td>"+
		"<td id='multiVal'>"+
			analyzeProperties.value(pObj.type,pObj.values.length,pObj._uid)+
		"</td>"+
	"</tr>";


	// $("#modal-properties #pprlsProperties").html(tempHtml);
	$("#modal-properties table").html(tblInner);
	checkVal(uId);
}

analyzeProperties = {
	type : function(type){
		return "type";
	},
	dataType : function(type,dataType){
		var temp;
		switch(type){
			case "TextBoxRight":
			case "TextBoxLeft":
					temp = "<select class='form-control'>"+
								"<option>Select one</option>"+
								"<option value='1'>Text</option>"+
								"<option value='2'>Email</option>"+
								"<option value='3'>Number</option>"+
								"<option value='4'>Date</option>"+
						   "</select>";
						   break;
			case "TextArea":
			case "CheckBox":
			case "Paragraph":
		}
		return temp;
	},
	label : function(type,label){
		if (label==null)
			label = "label";
		return "<input id='pprlPropLabel' class='form-control' value='"+label+"'/>";
	},
	placeholder : function(type,placeholder){
		if (placeholder==null)
			placeholder = "placeholder";
		return "<input id='pprlPropPlaceholder' class='form-control' value='"+placeholder+"'/>";
	},
	width : function(type,width){
		temp = "<select class='form-control'>"+
					"<option>Select one</option>"+
					"<option value='0.25'>Quarter</option>"+
					"<option value='0.5'>Half</option>"+
					"<option value='1'>Full</option>"+
			   "</select>";
		return temp;
	},
	value: function(type,length,uId){
		console.log(type);
		switch(type){
			case "TextBoxRight":
			case "TextBoxLeft":
			case "TextArea":
			case "Paragraph":
				break;
			case "RadioButton":
			case "Dropdown":
			case "CheckBox":
				button = "<button onclick=\"addValTb('"+uId+"',null)\" class='pull-right btn btn-xs btn-success'><i class='glyphicon glyphicon-plus-sign'></i></button>";
				return button;
				break;
			default:
				break;
		}
	}
}
checkVal = function(uId){
	var dataObj = controlProperties[uId];
	var valHtml = null;
	console.log(dataObj.values.length);
	
	for (var i = 0; i < dataObj.values.length; i++) {
		addValTb(uId,dataObj.values[i].value);
	};
		 /* iterate through array or object */
}

addValTb = function(uId,value){
	valTb = document.createElement("input");

	valTb.setAttribute("class", "form-control");
	valTb.setAttribute("type", "text");
	valTb.setAttribute("name", uId);
	valTb.setAttribute("placeholder", "Text for "+uId);
	valTb.setAttribute("value", value);

	$("#multiVal").append(valTb);
}

remDataAttribs = function(nodeCopy, uId){
	var nc = $(nodeCopy);

	nc.data("uid", uId);
	nc.removeAttr('draggable');
	nc.removeAttr('ondragstart');
	nc.removeClass('alert');
	nc.removeClass('alert-info');

	nc.removeAttr('position');
	nc.removeAttr('top');
	nc.removeAttr('left');
	nc.removeAttr('z-index');

	nc.addClass('form-group col-xs-6');
	nc.attr('onclick', 'setProperties(this)');

	return nc;
}

fetchRow = function(formObj){ // Fetches The Last Row to input 

	if(formObj[0].childElementCount>0){
		var rowObj = formObj.children()[formObj[0].childElementCount-1]

		pprlsrowCount = formObj[0].childElementCount; //Double Check Row Count In Case Deleted
		
		if (isRowFull(rowObj))
			return rowObj;
		else
			return createRow(formObj);
		
	}
	else if (formObj[0].childElementCount==0)
		return createRow(formObj);	
}

isRowFull = function(rowObj){ // Checks if the row has more the 2 elements [requires row (jquery) obj]
	if($(rowObj)[0].childElementCount>=2)
		return false;
	return true;
}

createRow = function(formObj){ // If the row is not available or is full Create Row function is called
	pprlsrowCount++;
	var rowHTML = "<div id='pprls_Row"+pprlsrowCount+"'></div>";

	formObj.append(rowHTML);
	return fetchRow(formObj);
}

generateId = function(dataObj){
	var genItrator = "";
	var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 3; i++ )
		genItrator += possible.charAt(Math.floor(Math.random() * possible.length));
	console.log("Generated: "+genItrator);
	return genItrator;
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
window.onerror = function(ex) { alert(ex) };