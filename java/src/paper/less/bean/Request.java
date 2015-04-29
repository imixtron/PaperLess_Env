package paper.less.bean;

import java.sql.Timestamp;

public class Request {
	int userid;
	Timestamp reqTime;
	Boolean isActive;
	String reqDesc;
	
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public Timestamp getReqTime() {
		return reqTime;
	}
	public void setReqTime(Timestamp reqTime) {
		this.reqTime = reqTime;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public String getReqDesc() {
		return reqDesc;
	}
	public void setReqDesc(String reqDesc) {
		this.reqDesc = reqDesc;
	}
}
