package sk.octopuss.wifitemp.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import sk.octopuss.wifitemp.domain.Entry;
import sk.octopuss.wifitemp.domain.Reading;
import sk.octopuss.wifitemp.domain.Reading.ReadingType;
import sk.octopuss.wifitemp.repository.EntryRepository;
import sk.octopuss.wifitemp.util.JSONUtils;

@Controller
public class HomeController {

	@Autowired
	EntryRepository entryRepository;

	private String DEFAULT_JSON = "{}";

	SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");

	@RequestMapping(value = "/data", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<Entry> data(@RequestParam(value = "queryString", required = false) String queryString)
			throws IOException {
		if (StringUtils.isEmpty(queryString)) {
			queryString = DEFAULT_JSON;
		}
		if (JSONUtils.isValidJSON(queryString)) {

			return entryRepository.findAllEntries(queryString);
		}
		return null;
	}

	@RequestMapping(value = "/projection", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<Entry> eee(@RequestParam(value = "queryString", required = false) String queryString) {
		return entryRepository.findAllEntries("{},{\"readings\" : { $elemMatch: { \"sensorId\": \"temp#1\" }}}");
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home() {
		ModelAndView mav = new ModelAndView();
		mav.addObject("generatedDate", sdf.format(new Date()));
		mav.setViewName("home");
		return mav;
	}

	@RequestMapping(value = "/save", method = RequestMethod.GET)
	public String save() {
		for (int i = 0; i < 500; i++) {
			entryRepository.saveEntry(randomEntry());
		}
		return "redirect:home";
	}

	private Entry randomEntry() {
		Entry entry = new Entry();
		long offset = Timestamp.valueOf("2014-01-01 00:00:00").getTime();
		long end = Timestamp.valueOf("2015-01-01 00:00:00").getTime();
		long diff = end - offset + 1;
		Timestamp rand = new Timestamp(offset + (long) (Math.random() * diff));
		entry.setCreated(rand);
		entry.setNetworkId("Jungmannova");
		entry.setNodeId("jung1405");
		entry.setNodeName("Jungmannova 1405");
		Reading reading = new Reading();
		reading.setReadingType(ReadingType.TEMPERATURE);
		reading.setValue(randomTemperature("35"));
		reading.setValueDimension("°C");
		reading.setSensorId("temp01");
		entry.getReadings().add(reading);
		Reading reading2 = new Reading();
		reading2.setReadingType(ReadingType.TEMPERATURE);
		reading2.setValue(randomTemperature("35"));
		reading2.setValueDimension("°C");
		reading2.setSensorId("temp02");
		entry.getReadings().add(reading2);
		return entry;

	}

	private BigDecimal randomTemperature(String range) {

		BigDecimal actualRandomDec = new BigDecimal(15 + (Math.random() * (35 - 15)));

		return actualRandomDec.setScale(2, RoundingMode.HALF_DOWN);
	}

}
