<%@page import="paper.less.bean.Form"%>
<%@page import="paper.less.dao.formDAO"%>
<%
	String formID = request.getParameter("f");
	Form frm = new Form();
	frm = formDAO.fetchForm(formID);
%>
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

    <link href="css/pprls.css" rel="stylesheet">
<script>
	pprlsInit(<% out.print("'"+formID+"'"); %>);
	jsonArr = <% out.println("'"+frm.getJsonArr()+"'"); %>;
	console.log(jsonArr);
	formOper.createForm(jsonArr);
	document.getElementById("frmTitle").innerHTML = <% out.print("'"+frm.getFormTitle()+"'");%>;
	document.getElementById("frmSub").onclick = 
		function(){
			formOper.frmSubmit();
		}
</script>