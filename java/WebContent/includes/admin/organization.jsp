<%@page import="paper.less.dao.OrganizationDAO"%>
<%@page import="paper.less.bean.Organization"%>
<%
	String orguri = request.getParameter("q");
	Organization org = OrganizationDAO.getOrg(orguri);
	String logouri = "assets/"+session.getAttribute("orgid")+"/logo.png";
%>
 <section class="panel">
     <div class="panel-body profile-information">
        <div class="col-md-3">
            <div class="profile-pic text-center">
                <img src="<% out.print(logouri); %>" alt=""/>
            </div>
        </div>
        <div class="col-md-6">
            <div class="profile-desk">
                <h1><% out.print(org.getOrgname()); %></h1>
                <p>
                    <% out.print(org.getDesc()); %>
                </p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="profile-statistics">
                <h1><% out.print(org.getFormCount()); %></h1>
                <p>Forms Built</p>
                <h1><% out.print(org.getPeopleCOunt()); %></h1>
                <p>Users</p>
                <ul>
                    <li>
                        <a href="#">
                            <i class="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li class="active">
                        <a href="#">
                            <i class="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa fa-google-plus"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
     </div>
 </section>
<section class="panel">
   <header class="panel-heading">
       All Forms
   </header>
   <div class="panel-body">
        <table class="table  table-hover general-table">
		<%
			String link = "/includes/getBrowse.jsp?q=org";
			pageContext.include(link); 
		%>
      	</table>
    </div>
</section>