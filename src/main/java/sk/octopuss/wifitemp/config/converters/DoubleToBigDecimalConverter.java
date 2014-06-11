package sk.octopuss.wifitemp.config.converters;

import java.math.BigDecimal;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class DoubleToBigDecimalConverter implements Converter<Double, BigDecimal> {

	public DoubleToBigDecimalConverter() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public BigDecimal convert(Double source) {
		return new BigDecimal(source);
	}
}
