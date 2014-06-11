package sk.octopuss.wifitemp.config.converters;

import java.math.BigDecimal;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class BigDecimalToDoubleConverter implements Converter<BigDecimal, Double> {

	public BigDecimalToDoubleConverter() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public Double convert(BigDecimal source) {
		return source.doubleValue();
	}
}
