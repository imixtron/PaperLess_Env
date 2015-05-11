<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<jsp:include page="/includes/getHeader.jsp">
	<jsp:param value="Form" name="q"/>
</jsp:include>

    <!--main content start-->
    <section id="main-content">
        <section class="wrapper">
        <!-- page start-->

        <div class="row">
            <div class="col-sm-12">
                <section class="panel">
                    <header class="panel-heading" id="Title">
                    	
                    </header>
                    <div class="panel-body">
                    	<%
                    		String tblName = request.getParameter("q"), 
                    		link = "/includes/"+session.getAttribute("role").toString()+"/getData.jsp?tblName="+tblName;
                    		pageContext.include(link);
                    	%>
                    </div>
                </section>
            </div>
        </div>
        <!-- page end-->
        </section>
    </section>
    <!--main content end-->
</section>

<!-- Placed js at the end of the document so the pages load faster -->

<!--Core js-->
<script src="js/jquery.js"></script>
<script src="bs3/js/bootstrap.min.js"></script>
<script class="include" type="text/javascript" src="js/jquery.dcjqaccordion.2.7.js"></script>
<script src="js/jquery.scrollTo.min.js"></script>
<script src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.js"></script>
<script src="js/jquery.nicescroll.js"></script>
<!--Easy Pie Chart-->
<script src="js/easypiechart/jquery.easypiechart.js"></script>
<!--Sparkline Chart-->
<script src="js/sparkline/jquery.sparkline.js"></script>
<!--jQuery Flot Chart-->
<script src="js/flot-chart/jquery.flot.js"></script>
<script src="js/flot-chart/jquery.flot.tooltip.min.js"></script>
<script src="js/flot-chart/jquery.flot.resize.js"></script>
<script src="js/flot-chart/jquery.flot.pie.resize.js"></script>


<!--common script init for all pages-->
<script src="js/scripts.js"></script>
<script src="js/custom/auth.js"></script>
<script src="js/custom/FormBuilder.js"></script>
<script>
delEntry = function(id,t){
	$.ajax({
        type: "POST",
        url: "DataOper",//jsp,servlet,struts action
        data: {'id': id,'tblname':t},
        success: function(data,response){
        	console.log(data);
        },
	});
	location.reload();
}
</script>
</body>
</html>
