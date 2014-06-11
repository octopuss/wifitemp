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

	// public List<Entry> findHourAvgInDay(Long fromTime, Long toTime) {
	// Criteria timeCriteria = Criteria
	// .where(CREATED_FIELD_NAME)
	// .exists(true)
	// .andOperator(Criteria.where(CREATED_FIELD_NAME).gte(fromTime),
	// Criteria.where(CREATED_FIELD_NAME).lt(toTime));
	//
	// AggregationOperation match = Aggregation.match(timeCriteria);
	// AggregationOperation group = Aggregation.group("hour").avg("readings[0].value");
	// Aggregation aggregation = newAggregation(match, group);
	// AggregationResults<StoreSummary> result = this.mongoTemplate.aggregate(aggregation, "eft_transactions",
	// StoreSummary.class);
	// }

	public List<Reading> findDayAvgInMonth(Long fromTime, Long toTime) {
		return null;
	}

	public List<Reading> findMonthAvgInYear(Long fromTime, Long toTime) {
		return null;
	}

	public void saveReading(Reading reading) {
		mongoTemplate.insert(reading, collectionName);
	}

	public List<MinMaxAvgDTO> getMinMaxAvg(Criteria criteria) {
		AggregationOperation match = Aggregation.match(criteria);
		GroupOperation group = Aggregation.group(SENSORID_FIELD_NAME).addToSet(VALUE_DIMENSION_FIELD_NAME)
				.as(VALUE_DIMENSION_FIELD_NAME).addToSet(SENSORID_FIELD_NAME).as(SENSORID_FIELD_NAME)
				.min(VALUE_FIELD_NAME).as("min").avg(VALUE_FIELD_NAME).as("avg").max(VALUE_FIELD_NAME).as("max")
				.sum(VALUE_FIELD_NAME).as("sum").count().as("count");
		Aggregation agg = newAggregation(match, group);
		AggregationResults<MinMaxAvgDTO> results = mongoTemplate.aggregate(agg, collectionName, MinMaxAvgDTO.class);
		return results.getMappedResults();
	}

	public List<MinMaxAvgDTO> reduceMinMaxAvg(Criteria criteria) {
		String mapFunction = "function () { "
				+ "emit(this.sensorId, {sensorId:this.sensorId,min: parseFloat(this.value), max: parseFloat(this.value), avg: parseFloat(this.value), sum:parseFloat(this.value), count:1} )}";
		String reduceFunction = "function (key, values) {"
				+ " var result = {avg: 0.0, sum: 0, count: 0.0, min: values[0].min, max: values[0].max, sensorId:values[0].sensorId};"
				+ " values.forEach(function(value){ " + " result.count += value.count; " + "result.sum += value.sum; "
				+ "if (value.max > result.max) { result.max = value.max }; "
				+ "if (value.min < result.min) { result.min = value.min }; " + "}); "
				+ " result.avg = result.sum / result.count; " + " return result; " + " }";
		BasicQuery query = new BasicQuery("{}");
		List<MinMaxAvgDTO> result = new ArrayList<MinMaxAvgDTO>();
		query.addCriteria(criteria);
		MapReduceResults<MinMaxAvgDTO> mrr = mongoTemplate.mapReduce(query, collectionName, mapFunction,
				reduceFunction, MapReduceOptions.options().outputTypeInline(), MinMaxAvgDTO.class);
		return null;
		// return mrr.getRawResults().get("results");
	}

	public List<Map> findAllReadings(String queryString) {
		final BasicQuery query = new BasicQuery(queryString);
		List<Map> readings = mongoTemplate.find(query, Map.class, collectionName);
		return readings;
	}

}
