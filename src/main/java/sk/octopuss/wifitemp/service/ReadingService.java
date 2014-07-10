package sk.octopuss.wifitemp.service;

import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.TimeZone;

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
		
		result.setNodeIds(readingRepository.findDistinct(criteria, "nodeId"));
		result.setNodeNames(readingRepository.findDistinct(criteria, "nodeName"));
		result.setSensorIds(readingRepository.findDistinct(criteria, "sensorId"));
		if(datascope.equals("H")) {
		result.setReadings(readings);
		result.setMinMaxAvgDTO(readingRepository.getMinMaxAvgHour(criteria));
		}
		if(datascope.equals("D")) {
			result.setMinMaxAvgDTO(readingRepository.getMinMaxAvgDay(criteria));
			result.setReadings(readings);
		}
		if(datascope.equals("M")) {
			result.setMinMaxAvgDTO(readingRepository.getMinMaxAvgMonth(criteria));
		}
		if(datascope.equals("Y")) {
			result.setMinMaxAvgDTO(readingRepository.getMinMaxAvgYear(criteria));
		}
		return result;
	}

	public void retimeAll() {
		List<Reading> readings = readingRepository.findAll();

		for (Reading reading : readings) {
			reading.setCreated(new Date(reading.getCreated()));
			readingRepository.update(reading);
			
		}
		
	}
	
	
}
