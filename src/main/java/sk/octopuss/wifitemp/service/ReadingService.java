package sk.octopuss.wifitemp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import sk.octopuss.wifitemp.domain.QueryResult;
import sk.octopuss.wifitemp.domain.Reading;
import sk.octopuss.wifitemp.repository.ReadingRepository;

@Service
public class ReadingService {

	@Autowired
	ReadingRepository readingRepository;

	public QueryResult findAllInScope(Long fromTime, Long toTime, String datascope) {
		Criteria criteria = readingRepository.getTimeRangeCriteria(fromTime, toTime);
		List<Reading> readings = readingRepository.findAllInHour(criteria);
		QueryResult result = new QueryResult();
		result.setReadings(readings);
		result.setNodeIds(readingRepository.findDistinct(criteria, "nodeId"));
		result.setNodeNames(readingRepository.findDistinct(criteria, "nodeName"));
		result.setSensorIds(readingRepository.findDistinct(criteria, "sensorId"));
		if(datascope.equals("H")) {
		result.setMinMaxAvgDTO(readingRepository.getMinMaxAvgHour(criteria));
		}
		if(datascope.equals("D")) {
			result.setMinMaxAvgDTO(readingRepository.getMinMaxAvgDay(criteria));
		}
		if(datascope.equals("M")) {
			result.setMinMaxAvgDTO(readingRepository.getMinMaxAvgMonth(criteria));
		}
		return result;
	}
	
	
}
