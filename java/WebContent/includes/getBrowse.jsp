<%
	String q = request.getParameter("q");
	String header = "/includes/"+session.getAttribute("role").toString()+"/browseForms.jsp?q="+q;
	pageContext.include(header);
%>
