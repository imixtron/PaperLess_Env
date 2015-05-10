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
	public static Boolean fetchForm(String formID) {
		
		return true;
	}
	public static Boolean publishForm(String Json, String Title, String Organization) {
		List<Controls> controls = initializeControls(Json);
		
		if(true){
			Form frm = new Form();
			
			frm.setUri(getPublicUri());
			createTable(Title, controls);
			frm.setDelete(getQueries("delete",frm.getUri(),controls));
			frm.setinsert(getQueries("insert",frm.getUri(),controls));
			frm.setFormTitle(Title);
			frm.setJsonArr(Json);
			frm.setIsActive(0);
			
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
		String Query = "CREATE TABLE "+title+" (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, ";
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
				Query = "INSERT INTO "+tblName+"("+
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
	public static void getAllForms(String orgid,String role) {
		
	}
}
