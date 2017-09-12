[<img src="https://cdn.anychart.com/images/logo-transparent-segoe.png?2" width="234px" alt="AnyChart - Robust JavaScript/HTML5 Chart library any project">](https://anychart.com)

# AnyChart 7.x to 8.x Migration Tool

AnyChart migration tool is a utility script that helps to migrate JavaScript code of AnyChart 7.14.x to AnyChart 8.x.

*IMPORTANT NOTE 1:*

AnyChart made a number of adjustments moving from version 7 to 8. This migration tool can do a lot but it does not guarantee 100% migration. Some things can not be changes automatically and need manual coding. See the list of such cases in [Manual migration](#manual) section.

*IMPORTANT NOTE 2:*

This migration tool change API methods, enums and parameters of AnyChart API version 7.14.3 to version 8.0. It *may* work on earlier 7.x version but the numer of errors is more likely.

*IMPORTANT NOTE 3:*

We did our best to create this tool but it is not a panacea. If you don't want to change your code automatically, please see the [List of changes](#changes) section and figure out how your code is affected and what needs to be changed.

## Modes

AnyChart migration tool is available in three ways

* Online script at [https://www.anychart.com/migration/7to8/](https://www.anychart.com/migration/7to8/)

* You own Web-Server that does the same as the script above but it is deployed on your side.

* Console Utility script - you can choose a file or a folder, script will look for AnyChart code and replace everything, use with caution.

## Installation

To install migration tool with npm:

```
npm install anychart-v7-to-v8-migration-tool -g
```

## Running as Web Server

To run web server on port 3000 navigate to migration tool folder and run:

```
anychart-v7-to-v8-migration-tool-server -p 3000
```

To show help message  navigate to migration tool folder and run:

```
anychart-v7-to-v8-migration-tool-server --help
```

## Running as Console Utility

To process a file:

```
anychart-v7-to-v8-migration-tool-cli path_to_file
```

To process all files in a folder:

```
anychart-v7-to-v8-migration-tool-cli -r path_to_directory
```

To show help console script help:

```
anychart-v7-to-v8-migration-tool-cli --help
```

## API Changes

### Stacking Settings

The ordering in which the series are stacked is changed and now goes in other direction. To restore the previous behavior *stackDirection()* method has been added. Set *'reverse'* to make the order match 7.x:

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `ADD SAMPLE` 

```
chart.yScale().stackDirection('reverse');
```

### State Settings

The API for select and hover settings has been refactored: methods like hoverFill() are replaced with hovered().fill(), selectFill() - with selected().fill() and so on. The order of the parameters and behaviour is the same.

These changes allow to clone/copy the settings from the state to state easily.

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `ADD SAMPLE` 

See the full list of replaced methods:

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

#### Common API Methods

| 7.x Version  | 8.x Version  |
| ------------- | ------------- |
| hover/selectFill()    |  hovered/selected().fill()    |
| hover/selectStroke()  |  hovered/selected().stroke()  |
| hover/selectLabels()	|  hovered/selected().labels()  |
| hover/selectMarkers() |  hovered/selected().markers() |

#### Specific API Methods

| 7.x Version  | 8.x Version  |
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

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

Grids API has been changed completely and can not be migrated automatically:

1. Single grid() method is replaced with xGrid() and yGrid() methods.
- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `ADD SAMPLE` 
2. Single minorGrid() method is replaced with yMinorGrid() and xMinorGrid() methods.
- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `ADD SAMPLE` 
3. oddFill() and evenFill() methods are replaced with fill() method that now accepts palette()
- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `ADD SAMPLE` 

### Context Menu Customization

Context menu API has been changed completely and can not be migrated automatically. Objects with IDs are now used instead of arrays. Please refer to [Context Menu](https://docs.anychart.com/Common_Settings/UI_Controls/Context_Menu) article to learn how to use the context menu in version 8.x.

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `ADD SAMPLE` 

#### 7.14.3 Version Code

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `ADD SAMPLE` 

#### 8.x Version Code

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `ADD SAMPLE` 

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

#### 8.x.x

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

1. Enums no longer can be set by name, only string values can be used.
2. Enums string values are changed from camel case to dash case.

#### 7.x Version Code

```
chart.legend().itemsLayout(anychart.enums.LegendLayout.HORIZONTAL_EXPANDABLE);
```

#### 8.x Version Code

```
chart.legend().itemsLayout('horizontal-expandable');
```

### Deprecated API Drop

Version 8.x drops a number of deprecated methods. Which means that you may have used these methods and the lirary only showed warnings. With upgrading to version 8.x using these methods is no longer possible.

See the list of dropped methods and their replacement below:

#### Text Formatting

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| 7.x Version  | 8.x Version  |
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

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| Old Version  | New Version  |
| ------------- | ------------- |
| allowPointsSelect()  | selectionMode()  |
| isFloating() | positionMode() |
| mouseWheel() | zoomOnMOuseWheel() |

#### Palettes

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| Old Version  | New Version  |
| ------------- | ------------- |
| colorAt() | itemAt() |
| colors() | items() |
| markerAt() | itemAt() |
| markers() | items() |


#### Misc

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| Old Version  | New Version  |
| ------------- | ------------- |
| anychart.server()  | anychart.exports.server()  |
| getGroupingUnit() | getCurrentDataInterval() |

#### Gantt Data Grid

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| Old Version  | New Version  |
| ------------- | ------------- |
| cellFill()  | rowFill()  |
| cellOddFill()  | rowOddFill()  |
| cellEvenFill()  | rowEvenFill()  |
| titleHeight()  | hederHeight()  |

#### Constructors and Standalones 

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

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
