approveForm = function(formuri){
	$.ajax({
        type: "POST",
        url: "Approve",//jsp,servlet,struts action
        data: {'formuri': formuri},
        success: function(data,response){
        	console.log(data);
        	location.reload()
        },
        error: function(response){
        	console.log(response.responseText);
        	var err;
        	if(response.responseText)
        		err = response.responseText;
        	else
        		err = response;
        		
        	$.gritter.add({
        		text: err
        	})
        }
	});
}