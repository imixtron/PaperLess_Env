package paper.less.bean;

import java.sql.Date;

public class Organization {
	int orgid;
	String orgname;
	String desc;
	String logoURI;
	String website;
	int formCount;
	int peopleCOunt;
	Date expiration;
	String orguri;
	
	public int getOrgid() {
		return orgid;
	}
	public void setOrgid(int orgid) {
		this.orgid = orgid;
	}
	public String getOrgname() {
		return orgname;
	}
	public void setOrgname(String orgname) {
		this.orgname = orgname;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getLogoURI() {
		return logoURI;
	}
	public void setLogoURI(String logoURI) {
		this.logoURI = logoURI;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public int getFormCount() {
		return formCount;
	}
	public void setFormCount(int formCount) {
		this.formCount = formCount;
	}
	public int getPeopleCOunt() {
		return peopleCOunt;
	}
	public void setPeopleCOunt(int peopleCOunt) {
		this.peopleCOunt = peopleCOunt;
	}
	public Date getExpiration() {
		return expiration;
	}
	public void setExpiration(Date expiration) {
		this.expiration = expiration;
	}
	public String getOrguri() {
		return orguri;
	}
	public void setOrguri(String orguri) {
		this.orguri = orguri;
	}
	
}
