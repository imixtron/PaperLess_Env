<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="ThemeBucket">
  <link rel="shortcut icon" href="images/favicon.png">

  <title> Create Form </title>

  <!--Core CSS -->
  <link href="css/bootstrap-reset.css" rel="stylesheet">
  <link href="bs3/css/bootstrap.min.css" rel="stylesheet">
  <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />

  <!-- Custom styles for this template -->
  <link href="css/style.css" rel="stylesheet">
  <link href="css/style-responsive.css" rel="stylesheet" />
  <link href="css/pprls.css" rel="stylesheet" type="text/css">

  <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]>
    <script src="js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <script type="text/javascript">
	userid = <% session.getAttribute("userid");%>
  	org = <% session.getAttribute("userid");%>
  </script>

  <body class="full-width" onload="pprlsInit()">

    <section id="container" class="hr-menu">
      <!--header start-->
      <header class="header fixed-top">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle hr-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="fa fa-bars"></span>
          </button>

          <!--logo start-->
          <!--logo start-->
          <div class="brand ">
            <a href="index.html" class="logo">
              <img src="images/logo.png" alt="">
            </a>
          </div>
          <!--logo end-->
          <!--logo end-->
          <div class="horizontal-menu navbar-collapse collapse ">
            <ul class="nav navbar-nav">
              <li><a href="index.jsp">Back</a></li>
              <li class="active"><a href="#" onclick="formOper.compile()">Publish</a></li>
              <li class="active"><a href="#" onclick="confirm('are you sure',false) ? pprlsInit() : console.log('')"><i class="glyphicon glyphicon-repeat"></i>&nbsp; &nbsp;Revert</a></li>
              <li class="form form-inline">
              	<input id="Title" type="text" class="form-control" placeholder="Title"/>
              	<input id="Desc" type="text" class="form-control" placeholder="Description"/>
              	<input id="Thr" style="width:70px" type="number" class="form-control" placeholder="Target"/>
              </li>
            </ul>

          </div>
          <div class="top-nav hr-top-nav">
            <ul class="nav pull-right top-menu">
              <li>
                <input type="text" class="form-control search" placeholder=" Search">
              </li>
              <!-- user login dropdown start-->
              <li class="dropdown">
                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                  <img alt="" src="images/avatar1_small.jpg">
                  <span class="username">John Doe</span>
                  <b class="caret"></b>
                </a>
                <ul class="dropdown-menu extended logout">
                  <li><a href="#"><i class=" fa fa-suitcase"></i>Profile</a></li>
                  <li><a href="#"><i class="fa fa-cog"></i> Settings</a></li>
                  <li><a href="#"><i class="fa fa-bell-o"></i> Notification</a></li>
                  <li><a href="login.html"><i class="fa fa-key"></i> Log Out</a></li>
                </ul>
              </li>
              <!-- user login dropdown end -->
            </ul>
          </div>

        </div>

      </header>
      <!--header end-->
      <!--sidebar start-->

      <!--sidebar end-->
      <!--main content start-->
      <section id="main-content">
        <section class="wrapper">
          <!-- page start-->
          <div class="col-xs-12">
            <div class="col-xs-4 controls well">
              <div id="controlContainer" class="row">
                <br/>
                <legend>TextBoxes</legend>
                <div id="TextBoxLeft" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">
                  <div id="lbl-before" class="input-group">
                    <label class="input-group-addon" data-node-type="control">Label</label>
                    <input class="form-control disabled" type="text" disabled="disabled" placeholder="palaceholder" data-node-type="control">
                  </div>
                </div>
                <div id="TextBoxRight" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">
                  <div id="lbl-after" class="input-group">
                    <input class="form-control" type="text" disabled="disabled" placeholder="palaceholder" data-node-type="control">
                    <label class="input-group-addon disabled" data-node-type="control">Label</label>
                  </div>
                </div>
                <div id="TextArea" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">
                  <div>
                    <label class="h5 pull-left" data-node-type="control">Text Area</label>
                    <TextArea class="form-control" placeholder="placeholder" disabled="disabled" data-node-type="control"></TextArea>                            
                  </div>
                </div>
                <div id="Dropdown" class="alert alert-info form-inline form-group" draggable="true" ondragstart="CRdragStart(event)">
                  <div class="form-group">
                    <label class="h5 pull-left" data-node-type="control">Dropdown</label>&nbsp;
                    <select class="form-control" disabled="disabled" data-node-type="control">
                      <option>Value</option>
                    </select>                    
                  </div>
                </div>
                <legend>CheckBox & Radio</legend>
                <div id="CheckBox" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">
                  <span class="h5" data-node-type="control">Label</span><br/>
                  <div class="checkbox">
                    <label>
                      <input type="checkbox">
                      Checkbox-Item
                    </label>
                  </div>
                </div>
                <div id="RadioButton" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">
                  <span class="h5" data-node-type="control">Label</span><br/>
                  <div class="radio">
                    <label>
                      <input type="radio" value="1" disabled="disabled" data-node-type="control">
                      Checkbox-Item
                    </label>
                  </div>
                </div>
                <div id="Seperator" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">
                  	<hr class="clearfix"/>
                </div>
                <legend>TextBased</legend>
                  <div id="ParagraphHigh" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">
                    <div>
                      <p class="lead" data-node-type="control">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco </p> 
                    </div>
                  </div>
                  <div id="Paragraph" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">
                    <div>
                      <p class="p" data-node-type="control">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco </p>                            
                    </div>
                  </div>
                  <div id="Heading" class="alert alert-info" draggable="true" ondragstart="CRdragStart(event)">
                    <div>
                      <h3 data-node-type="control">Heading 101</h3>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
                <div class="col-sm-8">
                  <div class="well">
                      <div id="DropZone" class="panel panel-default" ondragenter='return CRdragEnter(event)' ondrop='return CRdragDrop(event)' ondragover='return CRdragOver(event)' ondragleave='CRdragLeave(event)'>

                      </div>
                      <div id="pprlsForm" >
                      </div>
                      <div class="clearfix"></div>
                  </div>
                </div>

                <div class="modal fade" id="modal-properties" data-backdrop="static" data-keyboard="false" >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button id="_close" type="button" class="close">&times;</button>
                        <h4 class="modal-title"><small>Properties:</small></h4>
                      </div>
                      <div class="modal-body" id="pprlsProperties">
                        <div id="controlDisplay">

                        </div>
                        <table class="table table-hover">
                          <tbody>
                            <tr>
                              <td>Control ID: </td>
                              <td id="_uId">NO ID ASSIGNED</td>
                            </tr>
                            <tr>
                              <td>Control Type: </td>
                              <td id="_type">type</td>
                            </tr>
                            <tr>
                              <td>Required: </td>
                              <td id="_required"><input type="checkbox"> <label>Required</label></td>
                            </tr>
                            <tr>
                              <td>Data Type: </td>
                              <td id="_dataType">
                                404: Something Went terribly Wrong
                              </td>
                            </tr>
                            <tr>
                              <td>Label: </td>
                              <td id="_label">
                                <input class="form-control" value="label">
                              </td>
                            </tr>
                            <tr>
                              <td>Placeholder: </td>
                              <td id="_placeholder">
                                <input class="form-control" value="placeholder">
                              </td>
                            </tr>
                            <tr>
                              <td>Control width: </td>
                              <td id="_width">
                                <select id="wid" class="form-control">
                                  <option value="6">Half</option>
                                  <option value="12">Full</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td id="_valueName">Default Value(s): </td>
                              <td id="_value">
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="modal-footer">
                        <button id="_delControl" type="button" class="btn btn-danger">Delete</button>
                        <button id="_updateControl"  type="button" class="btn btn-primary">Update</button>
                        <button id="_svControl" type="button" class="btn btn-success">Save</button>
                      </div>
                    </div><!-- /.modal-content -->
                  </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
              </div>
            </div>
            <!-- page end-->
          </section>
        </section>
        <!--main content end-->
        <!--footer start-->
        <footer class="footer-section">
          <div class="text-center">
            2014 &copy; BucketAdmin by ThemeBucket
            <a href="#" class="go-top">
              <i class="fa fa-angle-up"></i>
            </a>
          </div>
        </footer>
        <!--footer end-->
      </section>

      <!-- Placed js at the end of the document so the pages load faster -->

      <!--Core js-->
      <script src="js/jquery.js"></script>
      <script type="text/javascript" src="js/jquery-ui-1.9.2.custom.min.js"></script>
      <script src="bs3/js/bootstrap.min.js"></script>
      <script type="text/javascript" src="js/hover-dropdown.js"></script>
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

      <script type="text/javascript" src="js/custom/FormBuilder.js"></script>
      <script>
        $(function() {
          $( "#pprlsForm" ).sortable();
          $( "#pprlsForm" ).disableSelection();
        });
      </script>

      <!--common script init for all pages-->
      <script src="js/scripts.js"></script>

    </body>
    </html>