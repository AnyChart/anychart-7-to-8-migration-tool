[<img src="https://cdn.anychart.com/images/logo-transparent-segoe.png?2" width="234px" alt="AnyChart - Robust JavaScript/HTML5 Chart library for any project">](https://anychart.com)

# AnyChart 7.x to 8.x Migration Tool

AnyChart migration tool предназначен для облегчения перехода с AnyChart 7 на AnyChart 8.
Возможно два варианта использования тулзы:
* Web-Server - поднимается Web Server который дает доступ к единственной страницы на которой есть поле для ввода кода AnyChart 7 и вывода кода AnyChart 8.
* Console Utility - можно скормить на вход файл или папку, утилита пройдется по всем указанным файлам, будет искать код эничарта и заменять его на новый.

## Installation
TODO

## Running as Web Server
TODO

## Running as Console Utility
TODO

## API Changes

### Data Mapping API
Improved API of mapAs() method, now it accepts only one parameter instead for four (old version). You don't need to pass `undefined` as first parameter for object based data sets.

#### 7.x Version Code
```
var dataSet = anychart.data.set([
  {platform: 'Mobile', views: 100},
  {platform: 'Tablet', views: 200},
  {platform: 'Desktop', views: 300}
]);
var mapping = dataSet.mapAs(undefined, {x: 'platform', value: 'views'});
```

#### 8.x Version Code
```
var dataSet = anychart.data.set([
  {platform: 'Mobile', views: 100},
  {platform: 'Tablet', views: 200},
  {platform: 'Desktop', views: 300}
]);
var mapping = dataSet.mapAs({x: 'platform', value: 'views'});
```

### Dropped Enums API
There are two changes in enums API:
1. Больше нельзя задать значение энума как литерал, только как строку 
2. Enums string values reworked from camel case to dash case.

#### 7.x Version Code
```
chart.legend().itemsLayout(anychart.enums.LegendLayout.HORIZONTAL_EXPANDABLE);
```

#### 8.x Version Code
```
chart.legend().itemsLayout('horizontal-expandable');
```

### Depricated API Drop
| Dropped Method  | Method to Use Instead  |
| ------------- | ------------- |
| anychart.server()  | anychart.exports.server()  |
| anychart.utils.formatDateTime()  | anychart.format.dateTime()  |
| allowPointsSelect()  | selectionMode()  |
| cellFill()  | rowFill()  |
| cellOddFill()  | rowOddFill()  |
| cellEvenFill()  | rowEvenFill()  |
| titleHeight()  | hederHeight()  |
| textFormatter()  | format()  |
| itemsTextFormatter()  | itemsFormat()  |
| titleFormatter()  | titleFormat() |
| copyFormatter()  | copyFormat() |
| isFloating() | positionMode() |
| mouseWheel() | zoomOnMOuseWheel() |
| getDataValue() | getData() |
| getTokenValue() | getData() |
| getSeriesMeta() | getMeta() |

## License
[© AnyChart.com - JavaScript charts](http://www.anychart.com). Released under the [Apache 2.0 License](https://github.com/anychart/anychart-v7-to-v8-migration-tool/blob/master/LICENSE).
