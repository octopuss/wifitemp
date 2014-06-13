package sk.octopuss.wifitemp.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.convert.CustomConversions;

import sk.octopuss.wifitemp.config.converters.BigDecimalToDoubleConverter;
import sk.octopuss.wifitemp.config.converters.DoubleToBigDecimalConverter;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

@Configuration
@PropertySource("classpath:db.properties")
public class MongoConfig extends AbstractMongoConfiguration {

	@Autowired
	Environment env;

	@Override
	protected String getDatabaseName() {
		if (System.getenv("MONGOHQ_URL") != null) {
			return "app24571573";
		} else {
			return env.getProperty("db.name");
		}
	}

	@Override
	public Mongo mongo() throws Exception {
		if (System.getenv("MONGOHQ_URL") != null) {
			return new MongoClient(new MongoClientURI(System.getenv("MONGOHQ_URL")));
		} else {
			return new MongoClient(env.getProperty("db.url"));
		}
	}

	@Bean
	@Override
	public CustomConversions customConversions() {
		List<Converter<?, ?>> converterList = new ArrayList<Converter<?, ?>>();
		converterList.add(new BigDecimalToDoubleConverter());
		converterList.add(new DoubleToBigDecimalConverter());
		return new CustomConversions(converterList);
	}

}
