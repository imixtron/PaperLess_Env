<%@page import="paper.less.dao.UserDAO"%>
<%
	String oper = request.getParameter("oper");

	switch(oper){
		case "browse":
				String u = request.getParameter("uid");
				out.println(UserDAO.getUsername(u));
			break;
		case "info":
			break;
		default:
			break;
	}
%>