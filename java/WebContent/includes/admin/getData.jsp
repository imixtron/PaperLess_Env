<%@page import="java.util.Iterator"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.List"%>
<%@page import="paper.less.dao.FormDataDAO"%>
<%
	String tblName = request.getParameter("tblName");
	List<List<String>> rows = FormDataDAO.fetchData(tblName);
	List<Integer> id = FormDataDAO.id;
	Iterator idIt = id.iterator();
%>

<table class="table table-hover general-table">
<% 
	for(Iterator<List<String>> it = rows.iterator();it.hasNext();) {
	List<String> col = it.next();
	int i = 0;
%>
	<tr>
		<td>
			<button class="btn btn-xs btn-danger" onclick="delEntry(<% out.print(idIt.next()+",'"+tblName+"'"); %>)">
				<i class="fa fa-minus-circle"></i>
			</button>
		</td>
		<%
		System.out.println("lala2");
			for(Iterator<String> it2 = col.iterator();it2.hasNext();) {
				String d = it2.next();
		%>
			<td>
				<% out.print(d); 
				 System.out.print("d"); %>
			</td>
		<%} %>
	</tr>
<%} %>
</table>