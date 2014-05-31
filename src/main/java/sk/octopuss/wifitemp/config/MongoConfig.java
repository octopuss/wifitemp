package sk.octopuss.wifitemp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoURI;

@Configuration
public class MongoConfig {

	@Value("${db.url}")
	String dbUrl;
	@Value("${db.name}")
	String dbName;

	public @Bean
	MongoDbFactory mongoDbFactory() throws Exception {
		if (System.getenv("MONGOHQ_URL") != null) {
			return new SimpleMongoDbFactory(new MongoURI(System.getenv("MONGOHQ_URL")));
		} else {
			return new SimpleMongoDbFactory(new MongoClient(dbUrl), dbName);
		}
	}

	public @Bean
	MongoTemplate mongoTemplate() throws Exception {

		MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory());
		return mongoTemplate;
	}

}
