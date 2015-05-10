<%
	session.setAttribute("role", "admin");
	session.setAttribute("username", "imixtron");
	session.setAttribute("orgid", "1");
	session.setAttribute("userid", "2");
	session.setAttribute("name", "Imad Ali");

	String p = request.getParameter("q");
 	String header = "/includes/"+session.getAttribute("role").toString()+"/header.jsp?q="+p;
	pageContext.include(header);
%>

  <script type="text/javascript">
	userid = <% out.println(session.getAttribute("userid"));%>
  	org = <% out.println(session.getAttribute("userid"));%>
  </script>
