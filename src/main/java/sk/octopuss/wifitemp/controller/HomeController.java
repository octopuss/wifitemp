package sk.octopuss.wifitemp.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sk.octopuss.wifitemp.repository.ReadingRepository;

@Controller
public class HomeController {

	@Autowired
	ReadingRepository readingRepository;

	@RequestMapping(value = "/data", produces = "application/json")
	@ResponseBody
	public List<Map> data() throws IOException {
		return readingRepository.findAllReadings();
	}

}
