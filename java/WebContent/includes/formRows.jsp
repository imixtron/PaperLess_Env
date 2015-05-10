<%@page import="paper.less.dao.formDAO"%>
<%
	formDAO.getAllForms(session.getAttribute("orgid"),session.getAttribute("rols"));
%>
<tr>
   <td><a href="#">Title</a></td>
   <td>Description</td>
   <td><span class="label label-info label-mini">Approved</span></td>
   <td>
		<div class="progress progress-striped progress-xs">
			<div style="width: 80%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="80" role="progressbar" class="progress-bar progress-bar-success">
        		<span class="sr-only">50% Complete (success)</span>
        	</div>
        </div>
    </td>
</tr>
