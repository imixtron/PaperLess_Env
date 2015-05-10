<%@page import="paper.less.dao.UserDAO"%>
<%
	String oper = request.getParameter("oper");

	switch(oper){
		case "browse":
				String userid = request.getParameter("userid");
				out.println(UserDAO.getUsername(userid));
			break;
		default:
			break;
	}
%>