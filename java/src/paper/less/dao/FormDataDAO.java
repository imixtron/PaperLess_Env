package paper.less.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import paper.less.bean.Controls;
import paper.less.data.Database;

public class FormDataDAO {

	public static List<String> id = new ArrayList<String>();
	public static List<List<String>> fetchData(String tblName) {
		id = new ArrayList<String>();

		String Query = "SELECT * FROM `paperless_formdata`.`"+tblName+"`";
		PreparedStatement pstmt;
		List<Controls> c = formDAO.getControls(tblName);
		List<List<String>> data = new ArrayList<List<String>>();
		try {
			pstmt = Database.getConnection().prepareStatement(Query);
			ResultSet rs = pstmt.executeQuery();
			int i = 0;
			while (rs.next()) {
				List<String> datum = new ArrayList<String>();
				for(Iterator<Controls> it = c.iterator();it.hasNext();){
					Controls cltr = it.next();
					String d = null;
					if(cltr.getDataType()=="date")
						d = rs.getDate(cltr.get_uid()).toString();
					else
						d = rs.getString(cltr.get_uid());
					datum.add(d);
					if(i<=0){
						id.add(cltr.getLabel());
					}
				}
				i++;
				data.add(datum);
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		getColNames();
		return data;
	}
	public static void getColNames() {
		
	}
	public static Boolean deleteEntry(String id, String tblName) {
		String Query = "DELETE FROM `paperless_formdata`.`"+tblName+"` WHERE id="+id;
		System.out.println(Query);
		PreparedStatement pstmt;
		try {
			pstmt = Database.getConnection().prepareStatement(Query);
			pstmt.executeUpdate();
		} catch (ClassNotFoundException|SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	public static Boolean InsertData(String jsonArr, String formId) {
		String Query = genInsertQuery(jsonArr, formId);
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
		return true;
	}

	private static String genInsertQuery(String jsonArr, String formId) {
		String Insert = "INSERT INTO `paperless_formdata`.`"+formId+"` ( `";
		String Values = "VALUES( '";
		System.out.println(jsonArr);
		Map<String,String> hs = mapData(jsonArr);
		int i = 0;
		for (Map.Entry<String, String> entry : hs.entrySet()) {
			if(i++!=0){
				Insert +=", `";
				Values +=", '";
			}
		    String key = entry.getKey();
		    String value = entry.getValue();
		    Insert += key+"`";
		    Values += value+"'";
		}
		Insert +=")";
		Values +=")";
		return Insert + " " + Values;
	}

	private static Map<String, String> mapData(String jsonArr) {
		// TODO Auto-generated method stub
		Map<String,String> map = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
	 
		try {
	 
			//convert JSON string to Map
			map = mapper.readValue(jsonArr, 
			    new TypeReference<HashMap<String,String>>(){});
	 
			System.out.println(map);
	 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
}
