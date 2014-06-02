package sk.octopuss.wifitemp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoURI;

@Configuration
@PropertySource("classpath:db.properties")
public class MongoConfig {

	@Autowired
	Environment env;

	public @Bean
	MongoDbFactory mongoDbFactory() throws Exception {
		if (System.getenv("MONGOHQ_URL") != null) {
			return new SimpleMongoDbFactory(new MongoURI(System.getenv("MONGOHQ_URL")));
		} else {
			return new SimpleMongoDbFactory(new MongoClient(env.getProperty("db.url")), env.getProperty("db.name"));
		}
	}

	public @Bean
	MongoTemplate mongoTemplate() throws Exception {

		MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory());
		return mongoTemplate;
	}

}
