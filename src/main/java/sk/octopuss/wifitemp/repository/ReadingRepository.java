package sk.octopuss.wifitemp.repository;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.mapreduce.MapReduceOptions;
import org.springframework.data.mongodb.core.mapreduce.MapReduceResults;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import sk.octopuss.wifitemp.domain.Reading;
import sk.octopuss.wifitemp.dto.MinMaxAvgDTO;

@Repository
public class ReadingRepository {

	@Autowired
	MongoTemplate mongoTemplate;

	@Value("${db.collection}")
	String collectionName;

	private static final String CREATED_FIELD_NAME = "created";
	private static final String SENSORID_FIELD_NAME = "sensorId";
	private static final String VALUE_DIMENSION_FIELD_NAME = "valueDimension";
	private static final String VALUE_FIELD_NAME = "value";

	public List<Reading> findAllEntries(String queryString) {
		final BasicQuery query = new BasicQuery(queryString);

		return mongoTemplate.find(query, Reading.class, collectionName);
	}

	public Criteria getTimeRangeCriteria(Long fromTime, Long toTime) {
		Criteria timeCriteria = Criteria
				.where(CREATED_FIELD_NAME)
				.exists(true)
				.andOperator(Criteria.where(CREATED_FIELD_NAME).gte(fromTime),
						Criteria.where(CREATED_FIELD_NAME).lt(toTime));
		return timeCriteria;
	}

	public List<Reading> findAllInHour(Criteria criteria) {
		BasicQuery query = new BasicQuery("{}");
		query.addCriteria(criteria);
		query.with(new Sort(Sort.Direction.DESC, CREATED_FIELD_NAME));
		return mongoTemplate.find(query, Reading.class, collectionName);
	}

	public List<String> findDistinct(Criteria criteria, String fieldName) {
		BasicQuery query = new BasicQuery("{}");
		query.addCriteria(criteria);
		return mongoTemplate.getCollection(collectionName).distinct(fieldName, query.getQueryObject());
	}


	public List<Reading> findDayAvgInMonth(Long fromTime, Long toTime) {
		return null;
	}

	public List<Reading> findMonthAvgInYear(Long fromTime, Long toTime) {
		return null;
	}

	public void saveReading(Reading reading) {
		mongoTemplate.insert(reading, collectionName);
	}
	

	private List<MinMaxAvgDTO> getMinMaxAvg(Criteria criteria,String level) {
		AggregationOperation match = Aggregation.match(criteria);
		GroupOperation group = Aggregation.group(level,SENSORID_FIELD_NAME,VALUE_DIMENSION_FIELD_NAME)
				.min(VALUE_FIELD_NAME).as("min").avg(VALUE_FIELD_NAME).as("avg").max(VALUE_FIELD_NAME).as("max")
				.sum(VALUE_FIELD_NAME).as("sum").count().as("count");
		Aggregation agg = newAggregation(match, group);
		AggregationResults<MinMaxAvgDTO> results = mongoTemplate.aggregate(agg, collectionName, MinMaxAvgDTO.class);
		return results.getMappedResults();
	}
	
	public List<MinMaxAvgDTO> getMinMaxAvgDay(Criteria criteria) {
		return getMinMaxAvg(criteria, "hour");
	}

	public List<MinMaxAvgDTO> getMinMaxAvgMonth(Criteria criteria) {
		return getMinMaxAvg(criteria, "day");
	}
	
	public List<MinMaxAvgDTO> getMinMaxAvgYear(Criteria criteria) {
		return getMinMaxAvg(criteria, "month");
	}


	

	public List<Map> findAllReadings(String queryString) {
		final BasicQuery query = new BasicQuery(queryString);
		List<Map> readings = mongoTemplate.find(query, Map.class, collectionName);
		return readings;
	}

}
