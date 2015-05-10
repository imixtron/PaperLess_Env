<%@page import="paper.less.dao.formDAO"%>
<%
	String formID = request.getParameter("q");
	formDAO.fetchForm(formID);
%>