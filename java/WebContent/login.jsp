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

    <title>Go Paperless</title>

    <!--Core CSS -->
    <link href="css/bootstrap-reset.css" rel="stylesheet">
    <link href="bs3/css/bootstrap.min.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />

    <!-- Custom styles for this template -->
    <link href="css/style.css" rel="stylesheet">
    <link href="css/style-responsive.css" rel="stylesheet" />
    <link href="js/gritter/css/jquery.gritter.css" rel="stylesheet" />

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]>
    <script src="js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <style>
    	.logoim img{
    		width:100%;
    		padding: 15px;
    	}
    	.form-signin {
		  	margin: 20px auto;
		}
    </style>
</head>

  <body class="login-body">

    <div class="container">
      <div class="form-signin" action="return">
		<div class="logoim form-signin-heading">
			<img alt="Go Paperless" src="images/logo2_lg.png"/>			
		</div>
<!--         <h2 class="form-signin-heading">Login to Continue</h2> -->
        <div class="login-wrap">
            <div class="user-login-info">
                <input id="user" type="text" class="form-control" placeholder="User ID" autofocus>
                <input id="password" type="password" class="form-control" placeholder="Password">
            </div>
            <label class="checkbox">
                <span class="pull-right">
                    <a data-toggle="modal" href="#myModal"> Forgot Password?</a>
                </span>
            </label>
            <button onclick="login()" class="btn btn-lg btn-login btn-block">Sign in</button>
        </div>

          <!-- Modal -->
          <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                          <h4 class="modal-title">Forgot Password ?</h4>
                      </div>
                      <div class="modal-body">
                          <p>Enter your e-mail address below to reset your password.</p>
                          <input type="text" id="email" placeholder="Email" autocomplete="off" class="form-control placeholder-no-fix">

                      </div>
                      <div class="modal-footer">
                          <button data-dismiss="modal" class="btn btn-default" type="button">Cancel</button>
                          <button class="btn btn-success" onclick="forgotPass()">Submit</button>
                      </div>
                  </div>
              </div>
          </div>
          <!-- modal -->

      </div>

    </div>



    <!-- Placed js at the end of the document so the pages load faster -->

    <!--Core js-->
    <script src="js/jquery.js"></script>
    <script src="bs3/js/bootstrap.min.js"></script>
    <script src="js/gritter/js/jquery.gritter.min.js"></script>
    <script src="js/custom/auth.js"></script>

  </body>
</html>
