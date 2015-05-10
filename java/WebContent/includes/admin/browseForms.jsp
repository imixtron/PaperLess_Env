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
	if(f.getIsActive()){
		approval = "Approved";
		apClass = "success";
	} else {
		approval = "Not Approved";
		apClass = "info";
	}
	String userid = ""+f.getUserid();
%>
	<tr>
	   <td><a href="Form.jsp?f=<% out.println(f.getUri()); %>"><% out.println(f.getFormTitle()); %></a></td>
	   <td><% out.println(f.getDescription()); %></td>
	   <td><span class="label label-info label-mini"><% out.println(approval); %></span></td>
	   <td>
	   	  <a href="users.jsp?u=<% out.println(userid); %>">
		       <jsp:include page="/includes/getUser.jsp">
		   		<jsp:param value="${userid} " name="userid"/>
		   		<jsp:param value="browse" name="oper"/>
		   	   </jsp:include></td>
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
	    <td>
	    	<%
	    		String appBtn = null;
	    		if(!f.getIsActive())
	    	    	appBtn = "<button class='btn btn-xs btn-success' onclick=\"approveForm('"+f.getUri()+"'\")>Approve</button>";
	    	   	out.println(appBtn);
	    	%>
	    </td>
	</tr>
<% } %>
</tbody>