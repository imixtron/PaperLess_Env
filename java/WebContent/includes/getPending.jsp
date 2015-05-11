<%
	String q = request.getParameter("q");
	String header = "/includes/"+session.getAttribute("role").toString()+"/pending.jsp?q="+q;
	pageContext.include(header);
%>