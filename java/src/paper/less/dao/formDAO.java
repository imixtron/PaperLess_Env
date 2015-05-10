package paper.less.dao;

import java.lang.reflect.Type;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import paper.less.bean.Controls;
import paper.less.bean.Form;
import paper.less.data.Database;

public class formDAO {
	public static Form fetchForm(String uri) {
		String Query = "SELECT * FROM forms WHERE publicuri='"+uri+"'";
		System.out.println(Query);
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Form f = new Form();
		try {
			pstmt = Database.getConnection().prepareStatement(Query);
			rs = pstmt.executeQuery();
			while(rs.next()){
				f = createFormOb(rs);
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}

		return f;
	}
	public static Boolean publishForm
		(String Json, String Title, String Desc, int Orgid, int userid, int thr ) {
		List<Controls> controls = initializeControls(Json);
		
		if(true){
			Form frm = new Form();
			
			createTable(frm.getUri(), controls);
			frm.setUri(getPublicUri());
			frm.setDelete(getQueries("delete",frm.getUri(),controls));
			frm.setDescription(Desc);
			frm.setEntryCount(0);
			frm.setFormTitle(Title);
			frm.setinsert(getQueries("insert",frm.getUri(),controls));
			frm.setIsActive(false);
			frm.setJsonArr(Json);
			frm.setOrgid(Orgid);
			frm.setSelect(null);
			frm.setThreshold(thr);
			frm.setUserid(userid);
			
			
			String Query = "INSERT INTO `forms`(`formid`,`title`,`jsonarr`,`insert`,`delete`,`select`,`isActive`,`publicuri`)"+
							"VALUES (null,'"+frm.getFormTitle()+"','"+frm.getJsonArr()+"','"+frm.getinsert()+"','"+frm.getDelete()+"',null,'"+frm.getIsActive()+"','"+frm.getUri()+"');";
			System.out.println(Query);
			PreparedStatement pstmt;
			try {
				pstmt = Database.getConnection().prepareStatement(Query);
				pstmt.executeUpdate();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return true;
	}

	private static boolean createTable(String title, List<Controls> controls) {
		int i = 0;
		String Query = "CREATE TABLE "+title+" (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, ";
		for (Iterator<Controls> iterator = controls.iterator(); iterator.hasNext();) {
			Controls c = (Controls) iterator.next();
			Query += c.get_uid();
			switch(c.getDataType()){
				case "radio":
				case "checkbox":
					Query += " int(1)";
					break;
				case "date":
					Query += " date";
					break;
				case "text":
				case "email":
				case "number":
				case "Default":
					Query += " VARCHAR(250)";
					break;
			}
			if(c.isRequired()){
				Query += " NOT NULL";
			}
			if (iterator.hasNext())
				Query += ", ";
		}
		Query+=")";
		System.out.println(Query);
		
		Statement stmt = null;
		try {
			stmt = Database.formDataConn().createStatement();
			stmt.executeUpdate(Query);
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
					
		return true;
	}

	private static List<Controls> initializeControls(String json) {
		Gson gson = new Gson();
		List<Controls> o = new ArrayList<Controls>();

		Type listOfTestObject = new TypeToken<List<Controls>>(){}.getType();
		o = gson.fromJson(json, listOfTestObject);

		return o;
	}

	private static String getQueries(String oper, String tblName, List<Controls> controls) {
		String Query = "";
		int i = 0;
		switch(oper){
			case "delete":
				Query = "DELETE FROM `paperless_formdata`.`"+tblName+"` WHERE `id` = ?";
				System.out.println(Query);
				break;
			case "insert":
				Query = "INSERT INTO `paperless_formdata`.`"+tblName+"`("+
						"id, ";
				for (Iterator<Controls> iterator = controls.iterator(); iterator.hasNext();) {
					Controls c = (Controls) iterator.next();
					Query += i+c.get_uid();
					if (iterator.hasNext())
						Query += ",";
				}
				Query += ")";
				System.out.println(Query);
				break;
			default:
				break;
		}
		return Query;
	}

	private static String getPublicUri() {
		List<String> uri = exisitingUri();
		return getUniqueUri(generateHash(),uri);
	}

	private static String getUniqueUri(String hash, List<String> uri) {
		for (Iterator<String> it = uri.iterator(); it.hasNext();) {
			String item = (String) it.next();
			if(item == hash){
				hash = getUniqueUri(generateHash(),uri);
				break;
			}
		}
		return hash;
	}

	private static List<String> exisitingUri() {
		List<String> uri = new ArrayList<String>();
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "SELECT publicuri FROM forms;";
		try {
			stmt = Database.getConnection().createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				uri.add(rs.getString(0));
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return uri;
	}

	private static String generateHash() {
		String genItrator = "";
		String possible = "abcdefghijklmnopqrstuvwxyz0123456789";
		int rando = 0;
		for( int i=0; i < 5; i++ ){
			rando = (int)Math.floor(Math.random() * possible.length());
			genItrator += possible.charAt(rando);
		}
		return genItrator;
	}
	public static List<Form> getAllForms(String orgid,String role) {
		List<Form> forms = new ArrayList<Form>();
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM forms";
		try {
			stmt = Database.getConnection().createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				forms.add(createFormOb(rs));
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return forms;		
	}
	private static Form createFormOb(ResultSet rs) throws SQLException {
		Form frm = new Form();
		
		frm.setUri(rs.getString("publicuri"));
		frm.setDelete(rs.getString("delete"));
		frm.setDescription(rs.getString("description"));
		frm.setEntryCount(rs.getInt("threshold"));
		frm.setFormTitle(rs.getString("title"));
		frm.setinsert(rs.getString("insert"));
		frm.setIsActive(rs.getBoolean("isActive"));
		frm.setJsonArr(rs.getString("jsonarr"));
		frm.setOrgid(rs.getInt("orgid"));
		frm.setSelect(rs.getString("select"));
		frm.setThreshold(rs.getInt("threshold"));
		frm.setUserid(rs.getInt("userid"));

		return frm;
	}
	private static int entryCount(String tablename) {
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "SELECT COUNT(*) AS entryCount FROM `paperless_formdata`.`"+tablename+"`;";
		int count = 0;
		try {
			stmt = Database.getConnection().createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				count = rs.getInt("entryCount");
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return count;
	}
}
