package paper.less.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import com.mysql.jdbc.EscapeTokenizer;

import paper.less.data.Database;

public class FormDataDAO {
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
