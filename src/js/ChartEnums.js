var ChartConstants = require('./ChartConstants');
var ChartEnums =[];
ChartEnums[ChartConstants.READING_DIMENSION_CELSIUS]="°C";
ChartEnums[ChartConstants.MOMENT_DATETIME_FORMAT]="DD.MM.YYYY HH:mm";
ChartEnums[ChartConstants.DATEPICKER_DATETIME_FORMAT]="d.m.Y H:i";
ChartEnums[ChartConstants.DATEPICKER_TIME_FORMAT]="H:i";
ChartEnums[ChartConstants.DATEPICKER_DATE_FORMAT]="d.m.Y";
ChartEnums[ChartConstants.DATEPICKER_FIRST_DAY]=1;
ChartEnums[ChartConstants.DATEPICKER_LANGUAGE]='cs';
ChartEnums[ChartConstants.CHART_DATA_URL]="http://wifitemp.quickjob.cz/";
//ChartEnums[ChartConstants.CHART_DATA_URL]="http://private-1bd2b-octopuss.apiary-mock.com";
ChartEnums[ChartConstants.CHART_SENSOR_COUNT]=2;
ChartEnums[ChartConstants.SENSOR_ID]="temp02";

module.exports = ChartEnums;