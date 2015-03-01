/*  FormBuilder.js    */
/*  Author: imixtron  */

// Drag N Drop Init:
var dragIcon = document.createElement('img');
dragIcon.src = 'assets/img/icons/appbar.app.png';
dragIcon.width = 100;
pprlsrowCount = 0;
formID = "dummy";
ctrlProperties = {};
// Drag N Drop Events:

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
    // console.log(nodeCopy);
    nodeCopy = setProperties(nodeCopy);
   	
    var container = fetchRow($("#pprlsForm"))
    container.appendChild(nodeCopy);
    
    ev.stopPropagation();
    return false;
}

//MOVE:


// Other Functions:
setProperties = function(nodeCopy){
    var data = nodeCopy.id;
    var uId  = generateId(data);

    //Adding our Unique controls properties to an object
    ctrlProperties[uId] = {
    	_uid : uId,
		type : "TextBox",
		dataType : "email",
		label : "Email Address",
		placeholder : "abc@xyz.com",
		cssClass : "form-control",
		width : "col-xs-6",
		values : [{
			name : "dipsy",
			value : "lala"
		},
		{
			name : "po",
			value : "dipsylala"
		}]
    }

    console.log(uId);
    console.log(ctrlProperties[uId]);
    
  //STILL HAVE TO WORK ON SETTING UP PROPERTIES
  //  	$(nodeCopy).attr({
		// ondragenter:'return MVdragEnter(event)',
		// ondrop:'return MVdragDrop(event)',
		// ondragover:'return MVdragOver(event)',
		// ondragleave:'MVdragLeave(event)',
		// ondragstart: 'MVdragStart(event)'
  //  	});

   	// $(nodeCopy).removeAttr('draggable');

   	$(nodeCopy).removeAttr('ondragstart');
   	$(nodeCopy).removeClass('alert');
   	$(nodeCopy).removeClass('alert-info');
   	$(nodeCopy).addClass('form-group col-xs-6');

   	$(nodeCopy).data("uid", uId);

   	// $(nodeCopy).attr('data-uid', generateId(data));
   	$(nodeCopy).attr('id', 'uniqueID');

   	// console.log(data.dataset);

   	return nodeCopy

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
	return genItrator;
}

getUid = function(uId){
	return uId.substr(0, uId.indexOf('-'));
}

hover_DropZone = function(divId,val){
	if (val==1) 
		$("#"+divId).css('border', '2px dashed rgba(0,0,0,0.5)');
	else
		$("#"+divId).css('border', '2px dashed rgba(0,0,0,0.2)');
}