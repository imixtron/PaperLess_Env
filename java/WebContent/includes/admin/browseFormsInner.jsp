<%@page import="paper.less.bean.Form"%>
<%@page import="java.util.List"%>
<%@page import="paper.less.dao.formDAO"%>
<%
	List<Form> forms = formDAO.getAllForms(session.getAttribute("orgid").toString(),session.getAttribute("role").toString());
%>
<thead>
	<tr>
	    <td>Title</td>
	    <td>Description</td>
	    <td>Approval</td>
	    <td>Created By</td>
	    <td>Entries (%)</td>
	    <td></td>
	</tr>
</thead>
<tbody>
<% for(Form f : forms){
	String approval = "";
	String apClass = "";
	String labelc = "";
	if(f.getIsActive()){
		approval = "Approved";
		apClass = "info";
	} else {
		approval = "Not Approved";
		apClass = "danger";
	}
	int uid = f.getUserid();
%>
	<tr>
	   <td><a href="Form.jsp?f=<% out.println(f.getUri()); %>"><% out.println(f.getFormTitle()); %></a></td>
	   <td><% out.println(f.getDescription()); %></td>
	   <td><span class="label label-mini label-<% out.println(apClass);%> "><% out.println(approval); %></span></td>
	   <td>
	   	  <a href="users.jsp?u=<% out.print(uid); %>">
	   	  <%
		   	String header = "/includes/getUser.jsp?uid="+uid+"&oper=browse";
		  	pageContext.include(header);
	   	  %>
	   	   </a>
	   <td>
	   	<%
	   		int perc = (f.getEntryCount()/f.getThreshold())*100;
	   	%>
			<div class="progress progress-striped progress-xs">
				<div style="width: <%out.println(perc);%>%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="80" role="progressbar" class="progress-bar progress-bar-success">
	        		<span class="sr-only"><%out.println(perc);%>% Complete (success)</span>
	        	</div>
	        </div>
	    </td>
	</tr>
<% } %>
</tbody>