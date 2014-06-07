package sk.octopuss.wifitemp.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
	public String home() {
		return "home";
	}

	@RequestMapping(value = "/save", method = RequestMethod.GET)
	public String save() {
		Entry entry = new Entry();
		Reading reading = new Reading();
		reading.setReadingType(ReadingType.TEMPERATURE);
		reading.setValue(new BigDecimal("12.5"));
		reading.setValueDimension("°C");
		entry.getReadings().add(reading);
		entryRepository.saveEntry(entry);
		return "redirect:home";
	}

}
