package sk.octopuss.wifitemp.domain;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

public class Reading{
	
	private String valueDimension;

	private BigDecimal value;

	private ReadingType readingType;

	private String sensorId;

	private String nodeName;

	private String nodeId;
	
	private String ipAddress;
	
	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	private int day;
	private int month;
	private int year;
	private int hour;
	private int minute;
	private int second;
	

	private Long created = getTimestamp(new Date());

	

	public String getNodeName() {
		return nodeName;
	}

	private Long getTimestamp(Date date) {
		return date.getTime();
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getNodeId() {
		return nodeId;
	}

	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	public Long getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(created);
		second = cal.get(Calendar.SECOND);
		minute = cal.get(Calendar.MINUTE);
		hour = cal.get(Calendar.HOUR_OF_DAY);
		day = cal.get(Calendar.DAY_OF_MONTH);
		month = cal.get(Calendar.MONTH) + 1;
		year = cal.get(Calendar.YEAR);

		this.created = getTimestamp(created);
	}

	public void setCreated(Long created) {
		this.created = created;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getHour() {
		return hour;
	}

	public void setHour(int hour) {
		this.hour = hour;
	}

	public int getMinute() {
		return minute;
	}

	public void setMinute(int minute) {
		this.minute = minute;
	}

	public int getSecond() {
		return second;
	}

	public void setSecond(int second) {
		this.second = second;
	}

	public static enum ReadingType {
		TEMPERATURE
	}

	public String getValueDimension() {
		return valueDimension;
	}

	public void setValueDimension(String valueDimension) {
		this.valueDimension = valueDimension;
	}

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	public ReadingType getReadingType() {
		return readingType;
	}

	public void setReadingType(ReadingType readingType) {
		this.readingType = readingType;
	}

	public String getSensorId() {
		return sensorId;
	}

	public void setSensorId(String sensorId) {
		this.sensorId = sensorId;
	}

	

}
