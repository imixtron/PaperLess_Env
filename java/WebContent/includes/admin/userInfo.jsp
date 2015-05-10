<%@page import="paper.less.dao.HeaderDetails"%>
<%
	String orgid = session.getAttribute("orgid").toString();
	String username = session.getAttribute("username").toString();
%>
<li class="dropdown">
    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
        <img alt="" src="<% out.println("assets/"+orgid+"/"+username+".jpg"); %>">
        <span class="username"><% out.println(username); %></span>
        <b class="caret"></b>
    </a>
    <ul class="dropdown-menu extended logout">
        <li><a href="settings.jsp"><i class=" fa fa-suitcase"></i>Profile</a></li>
        <li><a href="logout.jsp"><i class="fa fa-key"></i> Log Out</a></li>
    </ul>
</li>
