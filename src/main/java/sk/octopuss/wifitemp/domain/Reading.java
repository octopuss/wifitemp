package sk.octopuss.wifitemp.domain;

import java.math.BigDecimal;

public class Reading {
	String valueDimension;

	BigDecimal value;

	ReadingType readingType;

	String sensorId;

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
