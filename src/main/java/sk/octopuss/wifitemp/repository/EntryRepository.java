package sk.octopuss.wifitemp.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.stereotype.Repository;

import sk.octopuss.wifitemp.domain.Entry;

@Repository
public class EntryRepository {

	@Autowired
	MongoTemplate mongoTemplate;

	@Value("${db.collection}")
	String collectionName;

	public List<Entry> findAllEntries(String queryString) {
		final BasicQuery query = new BasicQuery(queryString);

		return mongoTemplate.find(query, Entry.class, collectionName);
	}

	public void saveEntry(Entry entry) {
		mongoTemplate.insert(entry, collectionName);
	}

	public List<Map> findAllReadings(String queryString) {
		final BasicQuery query = new BasicQuery(queryString);
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
