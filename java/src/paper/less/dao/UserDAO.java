package paper.less.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import paper.less.data.Database;

public class UserDAO {
	public static String getUsername(String userid) {
		System.out.println("usrid:"+userid);
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "SELECT username FROM user WHERE userid="+userid;
		String username = "UNKNOWN";
		try {
			stmt = Database.getConnection().createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				username = rs.getString("username");
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return username;
	}
}
