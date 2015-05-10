<%@page import="paper.less.bean.Form"%>
<%@page import="paper.less.dao.formDAO"%>
<%
	String formID = request.getParameter("f");
	Form frm = new Form();
	frm = formDAO.fetchForm(formID);
%>

<script>
	jsonArr = <% out.println("'"+frm.getJsonArr()+"'"); %>;
	console.log(jsonArr);
	formOper.createForm(jsonArr);
</script>