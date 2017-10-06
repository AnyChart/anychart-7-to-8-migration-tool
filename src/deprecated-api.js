exports.normalized = [
    /*Text Formatting*/
    {
        "old": ["anychart\\.utils\\.formatDateTime\\("],
        "new": "anychart.format.dateTime("
    },
    {
        "old": ["textFormatter\\(", "contentFormatter\\("],
        "new": "format("
    },
    {
        "old": ["itemsTextFormatter\\("],
        "new": "itemsFormat("
    },
    {
        "old": ["titleFormatter\\("],
        "new": "titleFormat("
    },
    {
        "old": ["copyFormatter\\("],
        "new": "copyFormat("
    },
    {
        "old": ["unionTextFormatter\\("],
        "new": "unionFormat("
    },
    {
        "old": ["getDataValue\\(", "getTokenValue\\(", "getSeriesMeta\\(", "getSeriesMeta\\("],
        "new": "getMeta("
    },
    /**/

    /*Interactivity Settings*/
    {
        "old": ["allowPointsSelect\\("],
        "new": "selectionMode("
    },
    {
        "old": ["isFloating\\("],
        "new": "positionMode("
    },
    {
        "old": ["mouseWheel\\("],
        "new": "zoomOnMouseWheel("
    },
    /**/

    /*Palettes*/
    {
        "old": ["colorAt\\(", "markerAt\\("],
        "new": "itemAt("
    },
    {
        "old": ["colors\\("],
        "new": "items(",
        "warning": "true",
        "regExp": ".linearColor|.ordinalColor",
        "negative": "items(",
        "positive": "colors("
    },
    /**/

    /*Misc*/
    {
        "old": ["anychart\\.server\\("],
        "new": "anychart.exports.server("
    },
    {
        "old": ["getGroupingUnit\\("],
        "new": "getCurrentDataInterval("
    },
    /**/

    /*Gantt Data Grid*/
    {
        "old": ["cellFill\\("],
        "new": "rowFill(",
        "warning": "true"
    },
    {
        "old": ["cellOddFill\\("],
        "new": "rowOddFill("
    },
    {
        "old": ["cellEvenFill\\("],
        "new": "rowEvenFill("
    },
    {
        "old": ["titleHeight\\("],
        "new": "hederHeight("
    },
    /**/

    /*Constructors and Standalones*/
    {
        "old": ["anychart\\.circularGauge\\("],
        "new": "anychart.gauges.circular("
    },
    {
        "old": ["anychart\\.ui\\.background\\("],
        "new": "anychart.standalones.background("
    },
    {
        "old": ["anychart\\.ui\\.colorRange\\("],
        "new": "anychart.standalones.colorRange("
    },
    {
        "old": ["anychart\\.ui\\.dataGrid\\("],
        "new": "anychart.standalones.dataGrid("
    },
    {
        "old": ["anychart\\.ui\\.label\\("],
        "new": "anychart.standalones.label("
    },
    {
        "old": ["anychart\\.ui\\.labelsFactory\\("],
        "new": "anychart.standalones.labelsFactory("
    },
    {
        "old": ["anychart\\.ui\\.legend\\("],
        "new": "anychart.standalones.legend("
    },
    {
        "old": ["anychart\\.ui\\.markersFactory\\("],
        "new": "anychart.standalones.markersFactory("
    },
    {
        "old": ["anychart\\.ui\\.scroller\\("],
        "new": "anychart.standalones.scroller("
    },
    {
        "old": ["anychart\\.ui\\.table\\("],
        "new": "anychart.standalones.table("
    },
    {
        "old": ["anychart\\.ui\\.projectTimeline\\("],
        "new": "anychart.standalones.projectTimeline("
    },
    {
        "old": ["anychart\\.ui\\.resourceTimeline\\("],
        "new": "anychart.standalones.resourceTimeline("
    },
    {
        "old": ["anychart\\.ui\\.title\\("],
        "new": "anychart.standalones.title("
    },
    {
        "old": ["anychart\\.axes\\.linear\\("],
        "new": "anychart.standalones.axes.linear("
    },
    {
        "old": ["anychart\\.axes\\.polar\\("],
        "new": "anychart.standalones.axes.polar("
    },
    {
        "old": ["anychart\\.axes\\.radar\\("],
        "new": "anychart.standalones.axes.radar("
    },
    {
        "old": ["anychart\\.axes\\.radial\\("],
        "new": "anychart.standalones.axes.radial("
    },
    {
        "old": ["anychart\\.axisMarkers\\.line\\("],
        "new": "anychart.standalones.axisMarkers.line("
    },
    {
        "old": ["anychart\\.axisMarkers\\.range\\("],
        "new": "anychart.standalones.axisMarkers.range("
    },
    {
        "old": ["anychart\\.axisMarkers\\.text\\("],
        "new": "anychart.standalones.axisMarkers.text("
    },
    {
        "old": ["anychart\\.grids\\.linear\\("],
        "new": "anychart.standalones.grids.linear("
    },
    {
        "old": ["anychart\\.grids\\.linear3d\\("],
        "new": "anychart.standalones.grids.linear3d("
    },
    {
        "old": ["anychart\\.grids\\.polar\\("],
        "new": "anychart.standalones.grids.polar("
    },
    {
        "old": ["anychart\\.grids\\.radar\\("],
        "new": "anychart.standalones.grids.radar("
    },
    {
        "old": ["anychart\\.ganttToolbar\\(", "anychart\\.toolbar\\("],
        "new": "anychart.ui.ganttToolbar("
    },
    {
        "old": ["anychart\\.axisMarkers\\.range\\("],
        "new": "anychart.standalones.axisMarkers.range("
    }
    /**/
];