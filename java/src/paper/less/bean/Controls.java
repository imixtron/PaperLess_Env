package paper.less.bean;

import java.util.List;

/*
cP[uId] = {
		// order : Object.keys(cP).length, 
		_uid : uId,
		type : nodeID,
		required: false,
		singleItem: false,
		dataType: null,
		label : null,
		placeholder : null,
		cssClass : "form-group",
		width : 6,
		values :[]
	}
*/

public class Controls {
	String _uid;
	String type;
	boolean required;
	boolean singleItem;
	String dataType;
	String label;
	String placeholder;
	String cssClass;
	int width;
	List<String> values;
	
	public String get_uid() {
		return _uid;
	}
	public void set_uid(String _uid) {
		this._uid = _uid;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public boolean isRequired() {
		return required;
	}
	public void setRequired(boolean required) {
		this.required = required;
	}
	public boolean isSingleItem() {
		return singleItem;
	}
	public void setSingleItem(boolean singleItem) {
		this.singleItem = singleItem;
	}
	public String getDataType() {
		return dataType;
	}
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getPlaceholder() {
		return placeholder;
	}
	public void setPlaceholder(String placeholder) {
		this.placeholder = placeholder;
	}
	public String getCssClass() {
		return cssClass;
	}
	public void setCssClass(String cssClass) {
		this.cssClass = cssClass;
	}
	public int getWidth() {
		return width;
	}
	public void setWidth(int width) {
		this.width = width;
	}
	public List<String> getValues() {
		return values;
	}
	public void setValues(List<String> values) {
		this.values = values;
	}
}
