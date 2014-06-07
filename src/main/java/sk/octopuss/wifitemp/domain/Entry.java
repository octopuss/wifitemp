package sk.octopuss.wifitemp.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Entry {

	String nodeName;

	String networkId;

	String nodeId;

	Date created = new Date();

	List<Reading> readings;

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getNetworkId() {
		return networkId;
	}

	public void setNetworkId(String networkId) {
		this.networkId = networkId;
	}

	public String getNodeId() {
		return nodeId;
	}

	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	public List<Reading> getReadings() {
		if (readings == null)
			this.readings = new ArrayList<Reading>();
		return readings;
	}

	public void setReadings(List<Reading> readings) {
		this.readings = readings;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

}
