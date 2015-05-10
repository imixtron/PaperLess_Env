package paper.less.bean;

public class Form {
	String formTitle;
	String jsonArr;
	boolean isActive;
	String delete;
	String insert;
	String select;
	String uri;
	int orgid;
	int userid;
	int threshold;
	String description;
	int EntryCount;
	
	public String getFormTitle() {
		return formTitle;
	}
	public void setFormTitle(String formTitle) {
		this.formTitle = formTitle;
	}
	public String getJsonArr() {
		return jsonArr;
	}
	public void setJsonArr(String jsonArr) {
		this.jsonArr = jsonArr;
	}
	public boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}
	public String getUri() {
		return uri;
	}
	public void setUri(String uri) {
		this.uri = uri;
	}
	public String getDelete() {
		return delete;
	}
	public void setDelete(String delete) {
		this.delete = delete;
	}
	public String getinsert() {
		return insert;
	}
	public void setinsert(String insert) {
		this.insert = insert;
	}
	public String getSelect() {
		return select;
	}
	public void setSelect(String select) {
		this.select = select;
	}
	public int getOrgid() {
		return orgid;
	}
	public void setOrgid(int orgid) {
		this.orgid = orgid;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public int getThreshold() {
		return threshold;
	}
	public void setThreshold(int threshold) {
		this.threshold = threshold;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getEntryCount() {
		return EntryCount;
	}
	public void setEntryCount(int entryCount) {
		EntryCount = entryCount;
	}
}
