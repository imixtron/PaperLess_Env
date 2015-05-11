package paper.less.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import paper.less.bean.Organization;
import paper.less.data.Database;

public class OrganizationDAO {
	public static Organization getOrg(String orguri) {
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM organization WHERE orguri='"+orguri+"'";
		Organization org = new Organization();
		try {
			stmt = Database.getConnection().createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				org.setDesc(rs.getString("description"));
				//org.setExpiration(rs.getString("expiration"));
				org.setExpiration(rs.getDate("expiration"));
				org.setOrgid(rs.getInt("orgid"));
				org.setOrgname(rs.getString("orgName"));
				org.setLogoURI(rs.getString("logouri"));
				org.setWebsite(rs.getString("website"));
				org.setFormCount(rs.getInt("formsCount"));
				org.setPeopleCOunt(rs.getInt("peopleCount"));
				org.setOrguri(rs.getString("orguri"));
				
				
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return org;		
	}
}
