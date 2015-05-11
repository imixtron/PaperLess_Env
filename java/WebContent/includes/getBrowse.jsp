<%
	String q = request.getParameter("q");
	String header;
	if(q=="org"){
		header = "/includes/"+session.getAttribute("role").toString()+"/browseFormsInner.jsp?q="+q;
	}
	else{
		header = "/includes/"+session.getAttribute("role").toString()+"/browseForms.jsp?q="+q;
	}
	pageContext.include(header);
%>