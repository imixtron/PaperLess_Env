package paper.less.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import paper.less.bean.Request;
import paper.less.bean.User;
import paper.less.data.Database;

public class HeaderDetails {
	public static int newReqCount;

	public static int RequestCount() {
		return newReqCount;
	}

	public static List<Request> formRequests(String userid) {
		int i = 0;
		newReqCount=0;
		String q = "SELECT * FROM request WHERE userid="+userid;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<Request> ls = new ArrayList<Request>();
		try {
			pstmt = Database.getConnection().prepareStatement(q);
			rs = pstmt.executeQuery();
			while(rs.next()){
				Request r = new Request();
				r.setIsActive(rs.getBoolean("isActive"));
				if(r.getIsActive()==true)
					newReqCount += 1;
				r.setReqDesc(rs.getString("reqdesc"));
				r.setTitle(rs.getString("title"));
				r.setReqTime(rs.getTimestamp("req_time"));
				if(i++<5)
					ls.add(r);
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ls;
	}
}
