<%
	session.setAttribute("role", "admin");
	session.setAttribute("username", "imixtron");
	session.setAttribute("userid", "2");
	session.setAttribute("name", "Imad Ali");
	session.setAttribute("orgid", "1");

	String p = request.getParameter("q");
 	String header = "/includes/"+session.getAttribute("role").toString()+"_header.jsp?q="+p;
	pageContext.include(header);
%>
