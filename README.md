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

* Online script at [https://migration.anychart.com/](https://migration.anychart.com/)

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
anychart-v7-to-v8-migration-tool-cli path_to_directory -r
```

To show help console script help:

```
anychart-v7-to-v8-migration-tool-cli --help
```

## API Changes

### Stacking Settings

The ordering in which the series are stacked is changed and now goes in other direction. To restore the previous behavior [stackDirection()](https://api.anychart.com/anychart.scales.Linear#stackDirection) method has been added. Set *'reverse'* to make the order match 7.x:

| 7.x Version  | 8.x Version  |
| ------------- | ------------- |
| chart.yScale()  |  [chart.yScale().stackDirection('reverse')](https://api.anychart.com/8.0.1/anychart.scales.Linear#stackDirection) |

### State Settings

The API for select and hover settings has been refactored: methods like [hoverFill()](https://api.anychart.com/7.14.4/?entry=hoverFill) are replaced with [hovered().fill()](https://api.anychart.com/anychart.core.StateSettings), [selectFill()](https://api.anychart.com/7.14.4/?entry=selectFill) - with [selected().fill()](https://api.anychart.com/anychart.core.StateSettings) and so on. The order of the parameters and behaviour is the same.

These changes allow to clone/copy the settings from the state to state easily.

See the [full list](https://api.anychart.com/8.0.1/anychart.core.StateSettings) of replaced methods:

#### Common API Methods

| 7.x Version  | 8.x Version  |
| ------------- | ------------- |
| [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#hoverFill)/[selectFill()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#selectFill)    |  [hovered](https://api.anychart.com/anychart.core.StateSettings#fill)/[selected().fill()](https://api.anychart.com/anychart.core.StateSettings#fill)    |
| [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#hoverStroke)/[selectStroke()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#selectStroke)  |  [hovered](https://api.anychart.com/anychart.core.StateSettings#stroke)/[selected().stroke()](https://api.anychart.com/anychart.core.StateSettings#stroke)  |
| [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#selectLabels)/[selectLabels()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#selectLabels)	|  [hovered](https://api.anychart.com/anychart.core.StateSettings#labels)/[selected().labels()](https://api.anychart.com/anychart.core.StateSettings#labels)  |
| [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#selectMarkers)/[selectMarkers()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#selectMarkers) |  [hovered](https://api.anychart.com/anychart.core.StateSettings#markers)/[selected().markers()](https://api.anychart.com/anychart.core.StateSettings#markers) |

#### Specific API Methods

| 7.x Version  | 8.x Version  |
| ------------- | ------------- |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bubble#hoverNegativeFill)/[selectNegativeFill()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bubble#selectNegativeFill)      |  [hovered](https://api.anychart.com/anychart.core.StateSettings#negativeFill)/[selected().negativeFill()](https://api.anychart.com/anychart.core.StateSettings#negativeFill)       |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#hoverRisingFill)/[selectRisingFill()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#selectRisingFill)        |  [hovered](https://api.anychart.com/anychart.core.StateSettings#risingFill)/[selected().risingFill()](https://api.anychart.com/anychart.core.StateSettings#risingFill)         |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#hoverFallingFill)/[selectFallingFill()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#selectFallingFill)       |  [hovered](https://api.anychart.com/anychart.core.StateSettings#fallingFill)/[selected().fallingFill()](https://api.anychart.com/anychart.core.StateSettings#fallingFill)        |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.RangeArea#hoverLowStroke)/[selectLowStroke()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.RangeArea#selectLowStroke)         |  [hovered](https://api.anychart.com/anychart.core.StateSettings#lowStroke)/[selected().lowStroke()](https://api.anychart.com/anychart.core.StateSettings#lowStroke)          |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.RangeArea#hoverHighStroke)/[selectHighStroke()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.RangeArea#selectHighStroke)        |  [hovered](https://api.anychart.com/anychart.core.StateSettings#highStroke)/[selected().highStroke()](https://api.anychart.com/anychart.core.StateSettings#highStroke)         |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bubble#hoverNegativeStroke)/[selectNegativeStroke()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bubble#selectNegativeStroke)    |  [hovered](https://api.anychart.com/anychart.core.StateSettings#negativeStroke)/[selected().negativeStroke()](https://api.anychart.com/anychart.core.StateSettings#negativeStroke)     |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#hoverRisingStroke)/[selectRisingStroke()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#selectRisingStroke)      |  [hovered](https://api.anychart.com/anychart.core.StateSettings#risingStroke)/[selected().risingStroke()](https://api.anychart.com/anychart.core.StateSettings#risingStroke)       |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#hoverFallingStroke)/[selectFallingStroke()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#selectFallingStroke)     |  [hovered](https://api.anychart.com/anychart.core.StateSettings#fallingStroke)/[selected().fallingStroke()](https://api.anychart.com/anychart.core.StateSettings#fallingStroke)      |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#hoverMedianStroke)/[selectMedianStroke()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#selectMedianStroke)      |  [hovered](https://api.anychart.com/anychart.core.StateSettings#medianStroke)/[selected().medianStroke()](https://api.anychart.com/anychart.core.StateSettings#medianStroke)       |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#hoverStemStroke)/[selectStemStroke()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#selectStemStroke)        |  [hovered](https://api.anychart.com/anychart.core.StateSettings#stemStroke)/[selected().stemStroke()](https://api.anychart.com/anychart.core.StateSettings#stemStroke)         |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#hoverWhiskerStroke)/[selectWhiskerStroke()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#selectWhiskerStroke)     |  [hovered](https://api.anychart.com/anychart.core.StateSettings#whiskerStroke)/[selected().whiskerStroke()](https://api.anychart.com/anychart.core.StateSettings#whiskerStroke)      |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#hoverHatchFill)/[selectHatchFill()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bar#selectHatchFill)         |  [hovered](https://api.anychart.com/anychart.core.StateSettings#hatchFill)/[selected().hatchFill()](https://api.anychart.com/anychart.core.StateSettings#hatchFill)          |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bubble#hoverNegativeHatchFill)/[selectNegativeHatchFill()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Bubble#selectNegativeHatchFill) |  [hovered](https://api.anychart.com/anychart.core.StateSettings#negativeHatchFill)/[selected().negativeHatchFill()](https://api.anychart.com/anychart.core.StateSettings#negativeHatchFill)  |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#hoverRisingHatchFill)/[selectRisingHatchFill()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#selectRisingHatchFill)   |  [hovered](https://api.anychart.com/anychart.core.StateSettings#risingHatchFill)/[selected().risingHatchFill()](https://api.anychart.com/anychart.core.StateSettings#risingHatchFill)    |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#hoverFallingHatchFill)/[selectFallingHatchFill()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Candlestick#selectFallingHatchFill)  |  [hovered](https://api.anychart.com/anychart.core.StateSettings#fallingHatchFill)/[selected().fallingHatchFill()](https://api.anychart.com/anychart.core.StateSettings#fallingHatchFill)   |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#hoverWhiskerWidth)/[selectWhiskerWidth()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#selectWhiskerWidth)      |  [hovered](https://api.anychart.com/anychart.core.StateSettings#whiskerWidth)/[selected().whiskerWidth()](https://api.anychart.com/anychart.core.StateSettings#whiskerWidth)       |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Marker#hoverType)/[selectType()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Marker#selectType)	           |  [hovered](https://api.anychart.com/anychart.core.StateSettings#type)/[selected().type()](https://api.anychart.com/anychart.core.StateSettings#type)               |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.annotations.Marker#hoverSize)/[selectSize()](https://api.anychart.com/7.14.4/anychart.core.annotations.Marker#selectSize)              |  [hovered](https://api.anychart.com/anychart.core.StateSettings#size)/[selected().size()](https://api.anychart.com/anychart.core.StateSettings#size)               |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.annotations.FibonacciFan#hoverTrend)/[selectTrend()](https://api.anychart.com/7.14.4/anychart.core.annotations.FibonacciFan#selectTrend)             |  [hovered](https://api.anychart.com/anychart.core.StateSettings#trend)/[selected().trend()](https://api.anychart.com/anychart.core.StateSettings#trend)              |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.annotations.FibonacciFan#hoverGrid)/[selectGrid()](https://api.anychart.com/7.14.4/anychart.core.annotations.FibonacciFan#selectGrid)              |  [hovered](https://api.anychart.com/anychart.core.StateSettings#grid)/[selected().grid()](https://api.anychart.com/anychart.core.StateSettings#grid)               |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.linearGauge.pointers.Tank#hoverEmptyFill)/[selectEmptyFill()](https://api.anychart.com/7.14.4/anychart.core.linearGauge.pointers.Tank#selectEmptyFill)         |  [hovered](https://api.anychart.com/anychart.core.StateSettings#emptyFill)/[selected().emptyFill()](https://api.anychart.com/anychart.core.StateSettings#emptyFill)          |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.linearGauge.pointers.Tank#selectEmptyHatchFill)/[selectEmptyHatchFill()](https://api.anychart.com/7.14.4/anychart.core.linearGauge.pointers.Tank#selectEmptyHatchFill)    |  [hovered](https://api.anychart.com/anychart.core.StateSettings#emptyHatchFill)/[selected().emptyHatchFill()](https://api.anychart.com/anychart.core.StateSettings#emptyHatchFill)     |
|  hover/selectFontFamily()        |  [hovered](https://api.anychart.com/anychart.core.StateSettings#fontFamily)/[selected().fontFamily()](https://api.anychart.com/anychart.core.StateSettings#fontFamily)         |
|  hover/selectFontStyle()         |  [hovered](https://api.anychart.com/anychart.core.StateSettings#fontStyle)/[selected().fontStyle()](https://api.anychart.com/anychart.core.StateSettings#fontStyle)          |
|  hover/selectFontVariant()       |  [hovered](https://api.anychart.com/anychart.core.StateSettings#fontVariant)/[selected().fontVariant()](https://api.anychart.com/anychart.core.StateSettings#fontVariant)        |
|  hover/selectFontWeight()        |  [hovered](https://api.anychart.com/anychart.core.StateSettings#fontWeight)/[selected().fontWeight()](https://api.anychart.com/anychart.core.StateSettings#fontWeight)         |
|  hover/selectFontSize()          |  [hovered](https://api.anychart.com/anychart.core.StateSettings#fontSize)/[selected().fontSize()](https://api.anychart.com/anychart.core.StateSettings#fontSize)           |
|  hover/selectDummyFill()         |  [hovered](https://api.anychart.com/anychart.core.StateSettings#dummyFill)/[selected().dummyFill()](https://api.anychart.com/anychart.core.StateSettings#dummyFill)          |
|  hover/selectDummyStroke()       |  [hovered](https://api.anychart.com/anychart.core.StateSettings#dummyStroke)/[selected().dummyStroke()](https://api.anychart.com/anychart.core.StateSettings#dummyStroke)        |
|  hover/selectHeaders()	       |  [hovered](https://api.anychart.com/anychart.core.StateSettings#headers)/[selected().headers()](https://api.anychart.com/anychart.core.StateSettings#headers)            |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.pert.Tasks#hoverLowerLabels)/[selectLowerLabels()](https://api.anychart.com/7.14.4/anychart.core.pert.Tasks#selectLowerLabels)	   |  [hovered](https://api.anychart.com/anychart.core.StateSettings#lowerLabels)/[selected().lowerLabels()](https://api.anychart.com/anychart.core.StateSettings#lowerLabels)        |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.pert.Tasks#hoverUpperLabels)/[selectUpperLabels()](https://api.anychart.com/7.14.4/anychart.core.pert.Tasks#selectUpperLabels)	   |  [hovered](https://api.anychart.com/anychart.core.StateSettings#upperLabels)/[selected().upperLabels()](https://api.anychart.com/anychart.core.StateSettings#upperLabels)        |
|  [hover](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#hoverOutlierMarkers)/[selectOutlierMarkers()](https://api.anychart.com/7.14.4/anychart.core.cartesian.series.Box#selectOutlierMarkers)	   |  [hovered](https://api.anychart.com/anychart.core.StateSettings#outlierMarkers)/[selected().outlierMarkers()](https://api.anychart.com/anychart.core.StateSettings#outlierMarkers)     |

### Grids API

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

Grids API has been changed completely and can not be migrated automatically:

1. Single [grid()](https://api.anychart.com/7.14.4/anychart.charts.Cartesian#grid) method is replaced with [xGrid()](https://api.anychart.com/anychart.charts.Cartesian#xGrid) and [yGrid()](https://api.anychart.com/anychart.charts.Cartesian#yGrid) methods.
- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `ADD SAMPLE`

#### 7.x Version Code

```
chart.grid(0).stroke("#9E9E9E", 2, "5 2 5");
chart.grid(1).layout('vertical').stroke("#9E9E9E", 1, "5 1 5");
```

#### 8.x.x

```
chart.xGrid().stroke("#9E9E9E", 2, "5 2 5");
chart.yGrid().stroke("#9E9E9E", 1, "5 1 5");
```

2. Single [minorGrid()](https://api.anychart.com/7.14.4/anychart.charts.Cartesian#minorGrid) method is replaced with [yMinorGrid()](https://api.anychart.com/anychart.charts.Cartesian#yMinorGrid) and [xMinorGrid()](https://api.anychart.com/anychart.charts.Cartesian#xMinorGrid) methods.

#### 7.x Version Code

```
chart.minorGrid(0).stroke("#9E9E9E", 2, "5 2 5");
chart.minorGrid(1).layout('vertical').stroke("#9E9E9E", 1, "5 1 5");
```

#### 8.x.x

```
chart.xMinorGrid().stroke("#9E9E9E", 2, "5 2 5");
chart.yMinorGrid().stroke("#9E9E9E", 1, "5 1 5");
```

3. [oddFill()](https://api.anychart.com/7.14.4/anychart.core.grids.Linear#oddFill) and [evenFill()](https://api.anychart.com/7.14.4/anychart.core.grids.Linear#evenFill) methods are replaced with [fill()](https://api.anychart.com/anychart.core.grids.Linear#fill) method that now accepts [palette()](https://api.anychart.com/anychart.core.grids.Linear#palette)

#### 7.x Version Code

```
var chart = anychart.polar();
chart.grid()
        // coloring odd cells of the grid
        .evenFill('white 0.9')
        // coloring even cells of the grid
        .oddFill('lightgray 0.3')
        // set layout type
        .layout('curcuit')
        .stroke('white');
```

#### 8.x.x

```
var chart = anychart.polar();
chart.yGrid().palette(['lightgray 0.3', 'white 0.9']);
```


### Context Menu Customization

Context menu API has been changed completely and can not be migrated automatically. Objects with IDs are now used instead of arrays. Please refer to [Context Menu](https://docs.anychart.com/Common_Settings/UI_Controls/Context_Menu) article to learn how to use the context menu in version 8.x.

#### 7.14.3 Version Code

```
chart.contextMenu().itemsFormatter(function () {
    // Adding custom item to the top of context menu.
    this.unshift({
        text: "My custom item"
    });

    return this;
});
```

#### 8.x Version Code

```
chart.contextMenu().itemsFormatter(function (items) {
    // Adding custom item to the top of context menu.
    items["my-custom-item"] = {
        index: 0,
        text: "Show help info",
        href: "https://docs.anychart.com/"
    };

    return this;
});
```

### Data Mapping API

Improved API of [mapAs()](https://api.anychart.com/anychart.data.Set#mapAs) method, now it accepts only one parameter instead for four [old version](https://api.anychart.com/7.14.3/anychart.data.Set#mapAs). You don't need to pass `undefined` as first parameter for object based data sets.

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
| [anychart.utils.formatDateTime()]()  | [anychart.format.dateTime()](https://api.anychart.com/8.0.1/anychart.format#dateTime)  |
| [textFormatter()](https://api.anychart.com/7.13.0/anychart.standalones.LabelsFactory#textFormatter)/[contentFormatter()]()  | [format()](https://api.anychart.com/8.0.1/anychart.core.ui.LabelsFactory#format)  |
| [itemsTextFormatter()](https://api.anychart.com/7.13.0/anychart.standalones.Legend#itemsTextFormatter)  | [itemsFormat()](https://api.anychart.com/8.0.1/anychart.standalones.Legend#itemsFormat)  |
| [titleFormatter()](https://api.anychart.com/7.13.0/anychart.core.ui.Tooltip#titleFormatter)  | [titleFormat()](https://api.anychart.com/8.0.1/anychart.core.ui.Tooltip#titleFormat) |
| [copyFormatter()](https://api.anychart.com/7.13.0/anychart.core.utils.MapInteractivity#copyFormatter)  | [copyFormat()](https://api.anychart.com/8.0.1/anychart.core.utils.MapInteractivity#copyFormat) |
| [unionTextFormatter()](https://api.anychart.com/7.13.0/anychart.core.ui.Tooltip#unionTextFormatter)  | unionFormat() |
| [getDataValue() | [getData()](https://api.anychart.com/8.0.1/anychart.format.Context#getData) |
| [getTokenValue() | [getData()](https://api.anychart.com/8.0.1/anychart.format.Context#getData) |
| [getSeriesMeta() | [getMeta()](https://api.anychart.com/8.0.1/anychart.format.Context#getMeta) |

#### Interactivity Settings

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| Old Version  | New Version  |
| ------------- | ------------- |
| [allowPointsSelect()](https://api.anychart.com/7.12.0/anychart.core.map.series.Choropleth#allowPointsSelect)  | [selectionMode()](https://api.anychart.com/8.0.1/anychart.core.SeriesBase#selectionMode)  |
| [isFloating()](https://api.anychart.com/7.6.0/anychart.core.ui.Tooltip#isFloating) | [positionMode()](https://api.anychart.com/8.0.1/anychart.core.ui.Tooltip#positionMode) |
| [mouseWheel()](https://api.anychart.com/7.10.1/anychart.core.utils.MapInteractivity#mouseWheel) | [zoomOnMOuseWheel()](https://api.anychart.com/8.0.1/anychart.core.utils.StockInteractivity#zoomOnMouseWheel) |

#### Palettes

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| Old Version  | New Version  |
| ------------- | ------------- |
| [colorAt()](https://api.anychart.com/7.6.0/anychart.palettes.RangeColors#colorAt) | [itemAt()](https://api.anychart.com/8.0.1/anychart.palettes.RangeColors#itemAt) |
| [colors()](https://api.anychart.com/7.6.0/anychart.palettes.RangeColors#colors) | [items()](https://api.anychart.com/8.0.1/anychart.palettes.RangeColors#items) |
| [markerAt()](https://api.anychart.com/7.6.0/anychart.palettes.Markers#markerAt) | [itemAt()](https://api.anychart.com/8.0.1/anychart.palettes.Markers#itemAt) |
| [markers()](https://api.anychart.com/7.6.0/anychart.palettes.Markers#markers) | [items()](https://api.anychart.com/8.0.1/anychart.palettes.Markers#items) |

#### Sparkline API

| Old Version  | New Version  |
| ------------- | ------------- |
| [chart.type()](https://api.anychart.com/7.14.3/anychart.charts.Sparkline#type)  | [chart.seriesType()](https://api.anychart.com/8.0.0/anychart.charts.Sparkline#seriesType)  |

#### Misc

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| Old Version  | New Version  |
| ------------- | ------------- |
| [anychart.server()](https://api.anychart.com/7.14.4/anychart.exports#server)  | [anychart.exports.server()](https://api.anychart.com/8.0.1/anychart.exports#server)  |
| [getGroupingUnit()](https://api.anychart.com/7.9.1/anychart.scales.StockScatterDateTime#getGroupingUnit) | [getCurrentDataInterval()](https://api.anychart.com/8.0.1/anychart.core.stock.Grouping#getCurrentDataInterval) |

#### Gantt Data Grid

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| Old Version  | New Version  |
| ------------- | ------------- |
| cellFill()  | [rowFill()](https://api.anychart.com/8.0.1/anychart.core.ui.DataGrid#rowFill)  |
| cellOddFill()  | [rowOddFill()](https://api.anychart.com/8.0.1/anychart.core.ui.DataGrid#rowOddFill)  |
| cellEvenFill()  | [rowEvenFill()](https://api.anychart.com/8.0.1/anychart.core.ui.DataGrid#rowEvenFill)  |
| [titleHeight()](https://api.anychart.com/7.7.0/anychart.core.ui.DataGrid#titleHeight)  | [headerHeight()](https://api.anychart.com/8.0.1/anychart.standalones.DataGrid#headerHeight)  |

#### Constructors and Standalones 

- ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `LINK TO API` 

| Old Version  | New Version  |
| ------------- | ------------- |
| [anychart.circularGauge()](https://api.anychart.com/7.10.1/anychart#circularGauge) | [anychart.gauges.circular()](https://api.anychart.com/8.0.1/anychart.gauges#circular) |
| [anychart.ui.background()](https://api.anychart.com/7.11.1/anychart.ui#background) | [anychart.standalones.background()](https://api.anychart.com/8.0.1/anychart.standalones#background) |
| [anychart.ui.colorRange()](https://api.anychart.com/7.11.1/anychart.core.ui.ColorRange) | [anychart.standalones.colorRange()](https://api.anychart.com/8.0.1/anychart.standalones#colorRange) |
| [anychart.ui.dataGrid()](https://api.anychart.com/7.11.1/anychart.ui#dataGrid) | [anychart.standalones.dataGrid()](https://api.anychart.com/8.0.1/anychart.standalones#dataGrid) |
| [anychart.ui.label()](https://api.anychart.com/7.11.1/anychart.ui#label) | [anychart.standalones.label()](https://api.anychart.com/8.0.1/anychart.standalones#label) |
| [anychart.ui.labelsFactory()](https://api.anychart.com/7.11.1/anychart.ui#labelsFactory) | [anychart.standalones.labelsFactory()](https://api.anychart.com/8.0.1/anychart.standalones#labelsFactory) |
| [anychart.ui.legend()](https://api.anychart.com/7.11.1/anychart.ui#legend) | [anychart.standalones.legend()](https://api.anychart.com/8.0.1/anychart.standalones#legend) |
| [anychart.ui.markersFactory()](https://api.anychart.com/7.11.1/anychart.ui#markersFactory) | [anychart.standalones.markersFactory()](https://api.anychart.com/8.0.1/anychart.standalones#markersFactory) |
| [anychart.ui.scroller()](https://api.anychart.com/7.11.1/anychart.ui#scroller) | [anychart.standalones.scroller()](https://api.anychart.com/8.0.1/anychart.standalones#scroller) |
| [anychart.ui.table()](https://api.anychart.com/7.11.1/anychart.ui.Table) | [anychart.standalones.table()](https://api.anychart.com/8.0.1/anychart.standalones.Table) |
| [anychart.ui.projectTimeline()](https://api.anychart.com/7.11.1/anychart.ui#projectTimeline) | [anychart.standalones.projectTimeline()](https://api.anychart.com/8.0.1/anychart.standalones#projectTimeline) |
| [anychart.ui.resourceTimeline()](https://api.anychart.com/7.11.1/anychart.ui#resourceTimeline) | [anychart.standalones.resourceTimeline()](https://api.anychart.com/8.0.1/anychart.standalones#resourceTimeline) |
| [anychart.ui.title()](https://api.anychart.com/7.11.1/anychart.ui#title) | [anychart.standalones.title()](https://api.anychart.com/8.0.1/anychart.standalones#title) |
| [anychart.axes.linear()](https://api.anychart.com/7.11.1/anychart.axes#linear) | [anychart.standalones.axes.linear()](https://api.anychart.com/8.0.1/anychart.standalones.axes#linear) |
| [anychart.axes.polar()](https://api.anychart.com/7.11.1/anychart.axes#polar) | [anychart.standalones.axes.polar()](https://api.anychart.com/8.0.1/anychart.standalones.axes#polar) |
| [anychart.axes.radar()](https://api.anychart.com/7.11.1/anychart.axes#radar) | [anychart.standalones.axes.radar()](https://api.anychart.com/8.0.1/anychart.standalones.axes#radar) |
| [anychart.axes.radial()](https://api.anychart.com/7.11.1/anychart.axes#radial) | [anychart.standalones.axes.radial()](https://api.anychart.com/8.0.1/anychart.standalones.axes#radial) |
| [anychart.axisMarkers.line()](https://api.anychart.com/7.11.1/anychart.axisMarkers#line) | [anychart.standalones.axisMarkers.line()](https://api.anychart.com/8.0.1/anychart.standalones.axisMarkers.Line) |
| [anychart.axisMarkers.range()](https://api.anychart.com/7.11.1/anychart.axisMarkers#range) | [anychart.standalones.axisMarkers.range()](https://api.anychart.com/8.0.1/anychart.standalones.axisMarkers.Range) |
| [anychart.axisMarkers.text()](https://api.anychart.com/7.11.1/anychart.axisMarkers#text) | [anychart.standalones.axisMarkers.text()](https://api.anychart.com/8.0.1/anychart.standalones.axisMarkers#text) |
| [anychart.grids.linear()](https://api.anychart.com/7.11.1/anychart.grids#linear) | [anychart.standalones.grids.linear()](https://api.anychart.com/8.0.1/anychart.standalones.grids.Linear) |
| [anychart.grids.polar()](https://api.anychart.com/7.11.1/anychart.grids#polar) | [anychart.standalones.grids.polar()](https://api.anychart.com/8.0.1/anychart.standalones.grids.Polar) |
| [anychart.grids.radar()](https://api.anychart.com/7.11.1/anychart.grids#radar) | [anychart.standalones.grids.radar()](https://api.anychart.com/8.0.1/anychart.standalones.grids.Radar) |
| [anychart.ganttToolbar()](https://api.anychart.com/7.11.1/anychart#ganttToolbar) | [anychart.ui.ganttToolbar()](https://api.anychart.com/8.0.1/anychart.ui#ganttToolbar) |
| [anychart.toolbar()](https://api.anychart.com/7.11.0/anychart#toolbar) | [anychart.ui.ganttToolbar()](https://api.anychart.com/8.0.1/anychart.ui#ganttToolbar) |

## License
[© AnyChart.com - JavaScript charts](http://www.anychart.com). Released under the [Apache 2.0 License](https://github.com/anychart/anychart-v7-to-v8-migration-tool/blob/master/LICENSE).
