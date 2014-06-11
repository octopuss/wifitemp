package sk.octopuss.wifitemp.domain;

import java.math.BigDecimal;

public class AggregatedReading extends AbstractReading{
	
	
	private BigDecimal min;
	private BigDecimal max;
	private BigDecimal sum;
	private int count;
	
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
	public BigDecimal getAvg() {
		return avg;
	}
	public void setAvg(BigDecimal avg) {
		this.avg = avg;
	}
	private BigDecimal avg;

}
