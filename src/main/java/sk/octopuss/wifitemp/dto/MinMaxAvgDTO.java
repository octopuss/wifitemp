package sk.octopuss.wifitemp.dto;

import java.math.BigDecimal;

public class MinMaxAvgDTO {
	private BigDecimal min;
	private BigDecimal max;
	private BigDecimal sum;
	private int count;
	private BigDecimal avg;
	private int hour;
	private int day;
	private int month;
	private String valueDimension;
	
	
	public int getHour() {
		return hour;
	}

	public void setHour(int hour) {
		this.hour = hour;
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


	private String sensorId;

	public BigDecimal getMin() {
		return min;
	}

	public void setMin(BigDecimal min) {
		this.min = min;
	}

	public BigDecimal getMax() {
		return max;
	}

	public void setMax(BigDecimal max) {
		this.max = max;
	}

	/**
	 * @return the sensorId
	 */
	public String getSensorId() {
		return sensorId;
	}

	/**
	 * @param sensorId the sensorId to set
	 */
	public void setSensorId(String sensorId) {
		this.sensorId = sensorId;
	}

	public BigDecimal getSum() {
		return sum;
	}

	public void setSum(BigDecimal sum) {
		this.sum = sum;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	/**
	 * @param avg the avg to set
	 */
	public void setAvg(BigDecimal avg) {
		this.avg = avg;
	}

	public BigDecimal getAvg() {
		return avg;
	}

	public String getValueDimension() {
		return valueDimension;
	}

	public void setValueDimension(String valueDimension) {
		this.valueDimension = valueDimension;
	}
}
