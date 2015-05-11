<%
	String q = session.getAttribute("orguri").toString();
	String header = "/includes/"+session.getAttribute("role").toString()+"/organization.jsp?q="+q;
	pageContext.include(header);
%>