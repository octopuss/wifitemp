package sk.octopuss.wifitemp.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.stereotype.Repository;

@Repository
public class ReadingRepository {

	@Autowired
	MongoTemplate mongoTemplate;

	@Value("${db.collection}")
	String collectionName;

	public List<Map> findAllReadings() {
		final BasicQuery query = new BasicQuery("{}");
		List<Map> readings = mongoTemplate.find(query, Map.class, collectionName);
		return readings;

		// return mongoTemplate.execute("temperatures", new CollectionCallback<String>() {
		// @Override
		// public String doInCollection(DBCollection collection) throws MongoException, DataAccessException {
		// DBCursor cursor = collection.find();
		// return cursor.next().toString();
		// }
		// });

	}
}
