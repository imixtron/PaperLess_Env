package paper.less.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import paper.less.data.Database;

public class Authenticate {
	public static String auth(String U, String P){
		String Query = "SELECT * FROM USER";
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = Database.getConnection().createStatement();
			rs = stmt.executeQuery(Query);
			while (rs.next()) {
				String user = rs.getString("username").toUpperCase();
				String pass = rs.getString("password").toUpperCase();
				if (user.equals(U)) {
					if (pass.equals(P)) {
						return "Authenticated";
					} else {
						return "Incorrect Password";
					}
				} else {
					return "User Not Found";
				}
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}		
		return null;
	}
}
