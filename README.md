[<img src="https://cdn.anychart.com/images/logo-transparent-segoe.png?2" width="234px" alt="AnyChart - Robust JavaScript/HTML5 Chart library any project">](https://anychart.com)

# AnyChart 7.x to 8.x Migration Tool

AnyChart migration tool предназначен для облегчения перехода с AnyChart 7 на AnyChart 8.
Возможно два варианта использования тулзы:
* Web-Server - поднимается Web Server который дает доступ к единственной страницы на которой есть поле для ввода кода AnyChart 7 и вывода кода AnyChart 8.
* Console Utility - можно скормить на вход файл или папку, утилита пройдется по всем указанным файлам, будет искать код эничарта и заменять его на новый.

## Installation
```
npm install anychart-v7-to-v8-migration-tool -g
```

## Running as Web Server
To run web server on port 3000:
```
anychart-v7-to-v8-migration-tool-server -p 3000
```


To show help message
```
anychart-v7-to-v8-migration-tool-server --help
```

## Running as Console Utility
To migrate certain file:
```
anychart-v7-to-v8-migration-tool-cli path_to_file
```

To migrate all files in a directory:
```
anychart-v7-to-v8-migration-tool-cli -r path_to_directory
```

To show help message
```
anychart-v7-to-v8-migration-tool-cli --help
```

## API Changes

### Stacking Settings
Изменен порядок стекирования серий по умолчанию, для того чтобы вернуть обратно нужно написать
```
chart.yScale().stackDirection('reverse');
```

### State Settings
Общий принцип, hoverFill() --> hovered().fill(), selectFill() --> selected().fill()

#### Common API Methods
| Old Version  | New Version  |
| ------------- | ------------- |
| hover/selectFill()    |  hovered/selected().fill()    |
| hover/selectStroke()  |  hovered/selected().stroke()  |
| hover/selectLabels()	|  hovered/selected().labels()  |
| hover/selectMarkers() |  hovered/selected().markers() |

#### Specific API Methods
| Old Version  | New Version  |
| ------------- | ------------- |
|  hover/selectNegativeFill()      |  hovered/selected().negativeFill()       |
|  hover/selectRisingFill()        |  hovered/selected().risingFill()         |
|  hover/selectFallingFill()       |  hovered/selected().fallingFill()        |
|  hover/selectLowStroke()         |  hovered/selected().lowStroke()          |
|  hover/selectHighStroke()        |  hovered/selected().highStroke()         |
|  hover/selectNegativeStroke()    |  hovered/selected().negativeStroke()     |
|  hover/selectRisingStroke()      |  hovered/selected().risingStroke()       |
|  hover/selectFallingStroke()     |  hovered/selected().fallingStroke()      |
|  hover/selectMedianStroke()      |  hovered/selected().medianStroke()       |
|  hover/selectStemStroke()        |  hovered/selected().stemStroke()         |
|  hover/selectWhiskerStroke()     |  hovered/selected().whiskerStroke()      |
|  hover/selectHatchFill()         |  hovered/selected().hatchFill()          |
|  hover/selectNegativeHatchFill() |  hovered/selected().negativeHatchFill()  |
|  hover/selectRisingHatchFill()   |  hovered/selected().risingHatchFill()    |
|  hover/selectFallingHatchFill()  |  hovered/selected().fallingHatchFill()   |
|  hover/selectWhiskerWidth()      |  hovered/selected().whiskerWidth()       |
|  hover/selectType()	           |  hovered/selected().type()               |
|  hover/selectSize()              |  hovered/selected().size()               |
|  hover/selectTrend()             |  hovered/selected().trend()              |
|  hover/selectGrid()              |  hovered/selected().grid()               |
|  hover/selectEmptyFill()         |  hovered/selected().emptyFill()          |
|  hover/selectEmptyHatchFill()    |  hovered/selected().emptyHatchFill()     |
|  hover/selectFontFamily()        |  hovered/selected().fontFamily()         |
|  hover/selectFontStyle()         |  hovered/selected().fontStyle()          |
|  hover/selectFontVariant()       |  hovered/selected().fontVariant()        |
|  hover/selectFontWeight()        |  hovered/selected().fontWeight()         |
|  hover/selectFontSize()          |  hovered/selected().fontSize()           |
|  hover/selectDummyFill()         |  hovered/selected().dummyFill()          |
|  hover/selectDummyStroke()       |  hovered/selected().dummyStroke()        |
|  hover/selectHeaders()	       |  hovered/selected().headers()            |
|  hover/selectLowerLabels()	   |  hovered/selected().lowerLabels()        |
|  hover/selectUpperLabels()	   |  hovered/selected().upperLabels()        |
|  hover/selectOutlierMarkers()	   |  hovered/selected().outlierMarkers()     |

### Grids API
Как создавать:
1. grid заменен на xGrid/yGrid
2. minorGrid заменен на yMinorGrid/xMinorGrid

Как красить:
oddFill/evenFill --> fill, palette


### Context Menu Customization
Раньше были массивы, теперь объекты с ID

#### Old Version Code
```
TODO!
```

#### New Version Code
```
TODO!
```


### Data Mapping API
Improved API of mapAs() method, now it accepts only one parameter instead for four (old version). You don't need to pass `undefined` as first parameter for object based data sets.

#### Old Version Code
```
var dataSet = anychart.data.set([
  {platform: 'Mobile', views: 100},
  {platform: 'Tablet', views: 200},
  {platform: 'Desktop', views: 300}
]);
var mapping = dataSet.mapAs(undefined, {x: 'platform', value: 'views'});
```

#### New Version Code
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

#### Old Version Code
```
chart.legend().itemsLayout(anychart.enums.LegendLayout.HORIZONTAL_EXPANDABLE);
```

#### New Version
```
chart.legend().itemsLayout('horizontal-expandable');
```

### Depricated API Drop

#### Text Formatting
| Old Version  | New Version  |
| ------------- | ------------- |
| anychart.utils.formatDateTime()  | anychart.format.dateTime()  |
| textFormatter()  | format()  |
| itemsTextFormatter()  | itemsFormat()  |
| titleFormatter()  | titleFormat() |
| copyFormatter()  | copyFormat() |
| contentFormatter()  | format() |
| unionTextFormatter()  | unionFormat() |
| getDataValue() | getData() |
| getTokenValue() | getData() |
| getSeriesMeta() | getMeta() |
| getSeriesMeta() | getMeta() |

#### Interactivity Settings
| Old Version  | New Version  |
| ------------- | ------------- |
| allowPointsSelect()  | selectionMode()  |
| isFloating() | positionMode() |
| mouseWheel() | zoomOnMOuseWheel() |

#### Palettes
| Old Version  | New Version  |
| ------------- | ------------- |
| colorAt() | itemAt() |
| colors() | items() |
| markerAt() | itemAt() |
| markers() | items() |


#### Misc
| Old Version  | New Version  |
| ------------- | ------------- |
| anychart.server()  | anychart.exports.server()  |
| getGroupingUnit() | getCurrentDataInterval() |

#### Gantt Data Grid
| Old Version  | New Version  |
| ------------- | ------------- |
| cellFill()  | rowFill()  |
| cellOddFill()  | rowOddFill()  |
| cellEvenFill()  | rowEvenFill()  |
| titleHeight()  | hederHeight()  |


#### Constructors and Standalones 
| Old Version  | New Version  |
| ------------- | ------------- |
| anychart.circularGauge() | anychart.gauges.circular() |
| anychart.ui.background() | anychart.standalones.background() |
| anychart.ui.colorRange() | anychart.standalones.colorRange() |
| anychart.ui.dataGrid() | anychart.standalones.dataGrid() |
| anychart.ui.label() | anychart.standalones.label() |
| anychart.ui.labelsFactory() | anychart.standalones.labelsFactory() |
| anychart.ui.legend() | anychart.standalones.legend() |
| anychart.ui.markersFactory() | anychart.standalones.markersFactory() |
| anychart.ui.scroller() | anychart.standalones.scroller() |
| anychart.ui.table() | anychart.standalones.table() |
| anychart.ui.projectTimeline() | anychart.standalones.projectTimeline() |
| anychart.ui.resourceTimeline() | anychart.standalones.resourceTimeline() |
| anychart.ui.title() | anychart.standalones.title() |
| anychart.axes.linear() | anychart.standalones.axes.linear() |
| anychart.axes.polar() | anychart.standalones.axes.polar() |
| anychart.axes.radar() | anychart.standalones.axes.radar() |
| anychart.axes.radial() | anychart.standalones.axes.radial() |
| anychart.axisMarkers.line() | anychart.standalones.axisMarkers.line() |
| anychart.axisMarkers.range() | anychart.standalones.axisMarkers.range() |
| anychart.axisMarkers.text() | anychart.standalones.axisMarkers.text() |
| anychart.grids.linear() | anychart.standalones.grids.linear() |
| anychart.grids.linear3d() | anychart.standalones.grids.linear3d() |
| anychart.grids.polar() | anychart.standalones.grids.polar() |
| anychart.grids.radar() | anychart.standalones.grids.radar() |
| anychart.ganttToolbar() | anychart.ui.ganttToolbar() |
| anychart.toolbar() | anychart.ui.ganttToolbar() |
| anychart.toolbar() | anychart.ui.ganttToolbar() |


## License
[© AnyChart.com - JavaScript charts](http://www.anychart.com). Released under the [Apache 2.0 License](https://github.com/anychart/anychart-v7-to-v8-migration-tool/blob/master/LICENSE).
