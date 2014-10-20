var keyMirror = require('react/lib/keyMirror'); // makes enumeration from provided field in format below ... e.g. ChartContstants.CHART_UPDATE_PLOT

var ChartConstants = keyMirror({
    CHART_UPDATE_PLOT: null,
    CHART_UPDATE_DATETIME:null,
    CHART_TYPE_HOUR:null,
    CHART_TYPE_DAY:null,
    CHART_TYPE_MONTH:null,
    CHART_TYPE_YEAR:null,
    CHART_DATA_URL:null,
    CHART_SENSOR_COUNT:null,
    READING_TYPE_MIN:null,
    READING_TYPE_MAX:null,
    READING_TYPE_AVG:null,
    READING_TYPE_ACTUAL:null,
    READING_DIMENSION_CELSIUS:null,
    READING_DIMENSION_PERCENT:null,
    DATEPICKER_TIME_FORMAT:null,
    DATEPICKER_FIRST_DAY:null,
    DATEPICKER_LANGUAGE:null,
    MOMENT_DATETIME_FORMAT:null,
    SENSOR_ID:null
});

module.exports = ChartConstants;

