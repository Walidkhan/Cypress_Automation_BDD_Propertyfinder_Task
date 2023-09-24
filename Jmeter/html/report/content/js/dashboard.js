/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.6470588235294, "KoPercent": 0.35294117647058826};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.732, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.92, 500, 1500, "https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=a935d39d-d2af-4809-9c6a-0f92b4e37a43"], "isController": false}, {"data": [0.96, 500, 1500, "https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=6faef5f2-d32a-4296-8114-7425ff4fd8b1"], "isController": false}, {"data": [0.63, 500, 1500, "https://www.propertyfinder.bh/en/search?c=1&fu=0&ob=mr&page=1&t=35"], "isController": false}, {"data": [0.7433333333333333, 500, 1500, "https://www.propertyfinder.bh/"], "isController": false}, {"data": [0.9, 500, 1500, "https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=b8968936-260b-4cbe-9d03-c2584d4d9572"], "isController": false}, {"data": [0.98, 500, 1500, "https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=aa321fac-b835-485c-9e1a-ea899d71cc6a"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.propertyfinder.bh/en/plp/buy/apartment-for-sale-capital-governorate-bahrain-bay-632583.html"], "isController": false}, {"data": [0.97, 500, 1500, "https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=d2674965-cb2d-446a-8d78-1dbf44e8c581"], "isController": false}, {"data": [0.64, 500, 1500, "https://www.propertyfinder.bh/en/search?c=1&fu=0&l=43&ob=mr&page=1"], "isController": false}, {"data": [0.9, 500, 1500, "https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=30ae4ca8-2a0d-471f-b7bf-8a635183dc34"], "isController": false}, {"data": [1.0, 500, 1500, "https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=8c669eaa-1acf-4d8e-83d0-5e962a480dab"], "isController": false}, {"data": [1.0, 500, 1500, "https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=59bc87af-4eb2-4291-8e8b-e2bcd4d534cb"], "isController": false}, {"data": [0.91, 500, 1500, "https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=e6106361-7d63-404e-97a8-ba8ae0ce8aee"], "isController": false}, {"data": [0.18333333333333332, 500, 1500, "Test"], "isController": true}, {"data": [0.55, 500, 1500, "https://www.propertyfinder.bh/en/search?c=3&fu=0&ob=mr&page=1"], "isController": false}, {"data": [0.75, 500, 1500, "https://www.propertyfinder.bh/en/plp/commercial-buy/office-space-for-sale-capital-governorate-seef-730239.html"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 850, 3, 0.35294117647058826, 533.0776470588236, 58, 8079, 233.0, 1050.0, 2090.699999999998, 5119.97, 6.452543440799811, 1137.66902490919, 3.691708861239951], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=a935d39d-d2af-4809-9c6a-0f92b4e37a43", 50, 3, 6.0, 181.94, 126, 701, 148.0, 196.9, 506.0499999999999, 701.0, 0.9055510278004166, 3.029227366883999, 0.5170484130218237], "isController": false}, {"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=6faef5f2-d32a-4296-8114-7425ff4fd8b1", 50, 0, 0.0, 258.4, 129, 1419, 156.5, 444.5, 839.2999999999995, 1419.0, 0.912275580207269, 3.1270383657495255, 0.5541361434462122], "isController": false}, {"data": ["https://www.propertyfinder.bh/en/search?c=1&fu=0&ob=mr&page=1&t=35", 50, 0, 0.0, 669.7799999999999, 337, 1307, 600.0, 1226.5, 1261.8499999999997, 1307.0, 6.81663258350375, 2654.210335719155, 3.7544734151329244], "isController": false}, {"data": ["https://www.propertyfinder.bh/", 150, 0, 0.0, 673.5666666666663, 58, 2671, 290.0, 2216.4, 2421.4999999999995, 2650.6000000000004, 1.3919175984781702, 426.6831781683524, 0.6810065594116829], "isController": false}, {"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=b8968936-260b-4cbe-9d03-c2584d4d9572", 50, 0, 0.0, 244.80000000000007, 132, 755, 151.0, 588.5, 651.8499999999999, 755.0, 6.474168069403082, 22.19172844102033, 3.9325513077819503], "isController": false}, {"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=aa321fac-b835-485c-9e1a-ea899d71cc6a", 50, 0, 0.0, 171.95999999999998, 129, 510, 138.0, 262.0999999999999, 485.8999999999998, 510.0, 0.9066347531233567, 3.1077031088505684, 0.5507097816823514], "isController": false}, {"data": ["https://www.propertyfinder.bh/en/plp/buy/apartment-for-sale-capital-governorate-bahrain-bay-632583.html", 50, 0, 0.0, 1196.8400000000001, 85, 6115, 204.0, 4921.3, 5617.9, 6115.0, 0.475787189905699, 227.86377796439209, 0.2792461925130128], "isController": false}, {"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=d2674965-cb2d-446a-8d78-1dbf44e8c581", 50, 0, 0.0, 443.96000000000004, 382, 851, 432.0, 481.0, 616.5999999999995, 851.0, 0.4756152082718997, 1.630282598666375, 0.2888990815870328], "isController": false}, {"data": ["https://www.propertyfinder.bh/en/search?c=1&fu=0&l=43&ob=mr&page=1", 50, 0, 0.0, 736.3800000000002, 269, 1925, 621.5, 1408.4999999999995, 1878.5499999999997, 1925.0, 0.47354314451589685, 183.1057045966833, 0.2608186850653963], "isController": false}, {"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=30ae4ca8-2a0d-471f-b7bf-8a635183dc34", 50, 0, 0.0, 250.15999999999985, 125, 658, 145.5, 624.0, 645.35, 658.0, 0.47306822589953923, 1.6215522196361158, 0.2873519887788217], "isController": false}, {"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=8c669eaa-1acf-4d8e-83d0-5e962a480dab", 50, 0, 0.0, 156.76, 130, 282, 144.5, 191.8, 263.04999999999995, 282.0, 7.352941176470588, 25.203929227941178, 4.466337316176471], "isController": false}, {"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=59bc87af-4eb2-4291-8e8b-e2bcd4d534cb", 50, 0, 0.0, 150.84000000000003, 131, 271, 143.0, 176.0, 205.2499999999999, 271.0, 7.380073800738007, 25.296932656826566, 4.482818265682656], "isController": false}, {"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=e6106361-7d63-404e-97a8-ba8ae0ce8aee", 50, 0, 0.0, 272.5800000000001, 130, 673, 191.0, 596.7, 638.5499999999998, 673.0, 0.8946624438599317, 3.066665212840195, 0.543437539141482], "isController": false}, {"data": ["Test", 150, 3, 2.0, 3020.7799999999993, 829, 13107, 1921.5, 6986.8, 7273.799999999998, 12967.770000000002, 1.3743437508589649, 1373.1185538267457, 4.455736968930669], "isController": true}, {"data": ["https://www.propertyfinder.bh/en/search?c=3&fu=0&ob=mr&page=1", 50, 0, 0.0, 1460.7, 306, 7554, 594.0, 4954.2, 5281.549999999998, 7554.0, 0.8959770629871876, 342.8648376601559, 0.48911247872054475], "isController": false}, {"data": ["https://www.propertyfinder.bh/en/plp/commercial-buy/office-space-for-sale-capital-governorate-seef-730239.html", 50, 0, 0.0, 846.5199999999999, 93, 8079, 473.0, 1150.7, 4289.949999999972, 8079.0, 0.907655163650226, 371.49689425930796, 0.5389202534173216], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: fledge.eu.criteo.com:443 failed to respond", 3, 100.0, 0.35294117647058826], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 850, 3, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: fledge.eu.criteo.com:443 failed to respond", 3, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["https://fledge.eu.criteo.com/tagging/advertiser?partnerId=18695&uid=cd8e042c-df90-4def-9859-4a5044347411&requestId=a935d39d-d2af-4809-9c6a-0f92b4e37a43", 50, 3, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: fledge.eu.criteo.com:443 failed to respond", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
