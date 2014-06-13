package sk.octopuss.wifitemp.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import sk.octopuss.wifitemp.domain.QueryResult;
import sk.octopuss.wifitemp.domain.Reading;
import sk.octopuss.wifitemp.domain.Reading.ReadingType;
import sk.octopuss.wifitemp.repository.ReadingRepository;
import sk.octopuss.wifitemp.service.ReadingService;

@Controller
public class HomeController {

	@Autowired
	ReadingService readingService;

	@Autowired
	ReadingRepository readingRepository;

	private String DEFAULT_JSON = "{}";

	private String DEFAULT_DATA_SCOPE = "D";

	SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");

	@RequestMapping(value = "/data", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public QueryResult data(@RequestParam(value = "dataScope", required = false) String dataScope,
			@RequestParam(value = "fromTime", required = false) Long fromTime,
			@RequestParam(value = "toTime", required = false) Long toTime) throws IOException {
		if (StringUtils.isEmpty(dataScope)) {
			dataScope = DEFAULT_DATA_SCOPE;
		}
			return readingService.findAllInScope(fromTime, toTime, dataScope);

	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home() {
		ModelAndView mav = new ModelAndView();
		mav.addObject("generatedDate", sdf.format(new Date()));
		mav.setViewName("home");
		return mav;
	}

	@RequestMapping(value = "/save", method = RequestMethod.GET)
	public String save(@RequestParam(value = "ip", required=false)String sourceIpAddress, @RequestParam(value ="readings", required=false) String readingPairs) {
		String readings[] = readingPairs.split(";");
		for (int i = 0; i < readings.length; i++) {
			Reading reading = new Reading();
			String pair[] = readings[i].split("\\|");
			setDefaults(reading);
			reading.setIpAddress(sourceIpAddress);
			reading.setCreated(new Date());
			reading.setValue(new BigDecimal(pair[1]));
			reading.setSensorId(pair[0]);
			readingRepository.saveReading(reading);
		}
		
//		for (int i = 0; i < 500; i++) {
//			readingRepository.saveReading(randomReading());
//		}
//		return "redirect:home";
		return "home";
	}
	
	private void setDefaults(Reading reading) {
		reading.setNodeId("jung1405");
		reading.setNodeName("Jungmannova 1405");
		reading.setReadingType(ReadingType.TEMPERATURE);
		reading.setValue(randomTemperature("35"));
		reading.setValueDimension("°C");
	}

	private Reading randomReading() {
		Reading reading = new Reading();
		long offset = Timestamp.valueOf("2014-01-01 00:00:00").getTime();
		long end = Timestamp.valueOf("2015-01-01 00:00:00").getTime();
		long diff = end - offset + 1;
		Timestamp rand = new Timestamp(offset + (long) (Math.random() * diff));
		reading.setCreated(rand);
		reading.setNodeId("jung1405");
		reading.setNodeName("Jungmannova 1405");
		reading.setReadingType(ReadingType.TEMPERATURE);
		reading.setValue(randomTemperature("35"));
		reading.setValueDimension("°C");
		reading.setSensorId("temp01");
		return reading;

	}

	private BigDecimal randomTemperature(String range) {

		BigDecimal actualRandomDec = new BigDecimal(15 + (Math.random() * (35 - 15)));

		return actualRandomDec.setScale(2, RoundingMode.HALF_DOWN);
	}

}
