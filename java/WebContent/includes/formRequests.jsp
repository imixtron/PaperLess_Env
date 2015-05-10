<%@page import="paper.less.dao.HeaderDetails"%>
<%@page import="paper.less.bean.Request"%>
<%@page import="java.util.List"%>
<%
	String userid = session.getAttribute("userid").toString();
	HeaderDetails req = new HeaderDetails();
	List<Request> formRequests = HeaderDetails.formRequests(userid);
	
%>
<a data-toggle="dropdown" class="dropdown-toggle" href="#">
    <i class="fa fa-tasks"></i>
    <span class="badge bg-success"><% out.println(HeaderDetails.newReqCount); %></span>
</a>
<ul class="dropdown-menu extended tasks-bar">
    <li>
        <p class="">You have <% out.println(HeaderDetails.newReqCount); %> pending tasks</p>
    </li>
    <%
    	for(Request r : formRequests){
	%>
	    <li>
	        <a href="#">
	            <div class="task-info clearfix">
	                <div class="desc pull-left">
	                    <h5><% out.println(r.getTitle()); %></h5>
	                    <p><% out.println(r.getReqDesc()); %></p>
	                </div>
	            </div>
	        </a>
	    </li>
	<%    		
    	}
    %>
    <li class="external">
        <a href="#">See All Tasks</a>
    </li>
</ul>
