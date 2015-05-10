login = function(){
	var user = document.getElementById("user").value;
	var pass = document.getElementById("password").value;
	$.ajax({
        type: "POST",
        url: "Login",//jsp,servlet,struts action
        data: {'user': user, 'password': pass, 'oper': 'login'},
        success: function(data,response){
        	console.log(data);
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
logout = function(){
	$.ajax({
        type: "POST",
        url: "Login",//jsp,servlet,struts action
        data: {'oper': 'logout'}
	}).success(function(responseText){
		window.location("index.html");
	});
}

forgotPass = function(){
	var email = document.getElementById("email").value;

	$.ajax({
        type: "POST",
        url: "Login",//jsp,servlet,struts action
        data: {'email': email, 'oper': 'forgot'}
	}).success(function(data,response){
		
	});
}