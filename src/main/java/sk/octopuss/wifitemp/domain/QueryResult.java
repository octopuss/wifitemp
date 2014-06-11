package sk.octopuss.wifitemp.domain;

import java.util.List;

import sk.octopuss.wifitemp.dto.MinMaxAvgDTO;

public class QueryResult {

	private List<String> nodeNames;
	private List<String> nodeIds;
	private List<String> sensorIds;

	private List<MinMaxAvgDTO> minMaxAvgDTO;

	private List<Reading> readings;

	public List<String> getNodeNames() {
		return nodeNames;
	}

	public void setNodeNames(List<String> nodeNames) {
		this.nodeNames = nodeNames;
	}

	public List<String> getNodeIds() {
		return nodeIds;
	}

	public void setNodeIds(List<String> nodeIds) {
		this.nodeIds = nodeIds;
	}

	public List<String> getSensorIds() {
		return sensorIds;
	}

	public void setSensorIds(List<String> sensorIds) {
		this.sensorIds = sensorIds;
	}

	public List<Reading> getReadings() {
		return readings;
	}

	public void setReadings(List<Reading> readings) {
		this.readings = readings;
	}

	/**
	 * @return the minMaxAvgDTO
	 */
	public List<MinMaxAvgDTO> getMinMaxAvgDTO() {
		return minMaxAvgDTO;
	}

	/**
	 * @param list the minMaxAvgDTO to set
	 */
	public void setMinMaxAvgDTO(List<MinMaxAvgDTO> list) {
		this.minMaxAvgDTO = list;
	}

}
