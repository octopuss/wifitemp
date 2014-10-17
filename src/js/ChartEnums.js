var ChartConstants = require('./ChartConstants');
var ChartEnums =[];
ChartEnums[ChartConstants.READING_DIMENSION_CELSIUS]="°C";
ChartEnums[ChartConstants.MOMENT_DATETIME_FORMAT]="DD.MM.YYYY HH:mm";
ChartEnums[ChartConstants.DATEPICKER_TIME_FORMAT]="HH:mm";
ChartEnums[ChartConstants.DATEPICKER_FIRST_DAY]=1;
ChartEnums[ChartConstants.DATEPICKER_LANGUAGE]='cs';
//ChartEnums[ChartConstants.CHART_DATA_URL]="http://wifitemp.quickjob.cz/";
ChartEnums[ChartConstants.CHART_DATA_URL]="http://private-1bd2b-octopuss.apiary-mock.com";
ChartEnums[ChartConstants.CHART_SENSOR_COUNT]=2;

module.exports = ChartEnums;