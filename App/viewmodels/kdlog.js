define(['viewmodels/shell'], function (shell) {

    //properties
    this.linkList = ko.observableArray();
    this.statisticsList = ko.observableArray();
    this.modeData = ko.observableArray();
    this.bandData = ko.observableArray();
    this.refData = ko.observableArray();
    this.isWwffOnly = ko.observable(true);

    this.totalQSO = ko.observable(0);
    this.uniqueCall = ko.observable(0);

    this.callsign = ko.observable('');
    this.didNotWork = ko.observable(false);

    this.israelI = ko.observableArray();
    this.israelS = ko.observableArray();
    this.israelR = ko.observableArray();
    this.israelA = ko.observableArray();
    this.israelE = ko.observableArray();
    this.israelL = ko.observableArray();
    this.israelJ = ko.observableArray();

    var that = this;

    this.GetWokedSections = function () {
        if (callsign() == "") return;
        $.ajax({
            type: "POST",
            url: "./Server/GetLogForCall.php",
            data: { 'info': { 'call': callsign() } }
        }).done(function (data) {
            linkList(data);

            israelI(Enumerable.From(data).Where(function (x) { return x.my_call == "4X70I" }).ToArray());
            israelS(Enumerable.From(data).Where(function (x) { return x.my_call == "4X70S" }).ToArray());
            israelR(Enumerable.From(data).Where(function (x) { return x.my_call == "4X70R" }).ToArray());
            israelA(Enumerable.From(data).Where(function (x) { return x.my_call == "4X70A" }).ToArray());
            israelE(Enumerable.From(data).Where(function (x) { return x.my_call == "4X70E" }).ToArray());
            israelL(Enumerable.From(data).Where(function (x) { return x.my_call == "4X70L" }).ToArray());
            israelJ(Enumerable.From(data).Where(function (x) { return x.my_call == "4X70IARC" }).ToArray());


            didNotWork(false);
        }).error(function (xhr, ajaxOptions, thrownError) {
            //alert(jQuery.parseJSON(xhr.responseText).error);
            linkList([]);
            didNotWork(true);
        });
    }

    this.IsSectionExist = function(section)
    {
        var queryResult = Enumerable.From(linkList).Where(function (x) { return x.section == section }).ToArray();
        return queryResult.length;
    }
    

    this.loadData = function () {

        $.ajax({
            type: "POST",
            url: "./Server/GetAllLog.php",
        }).done(function (data) {
            statisticsList(data);
            drawChart();
        }).error(function (xhr, ajaxOptions, thrownError) {
            //alert(jQuery.parseJSON(xhr.responseText).error);
            statisticsList([]);
        });
    }

    this.drawChart = function () {
        modeData([]);
        bandData([]);
        refData([]);

        whereClause = function (x) { return true };

        totalQSO(Enumerable.From(statisticsList()).Where(whereClause).Count());
        uniqueCall(Enumerable.From(statisticsList()).Where(whereClause).Select("$.call").Distinct().Count());

        //*************************** mode ***************************/
        Enumerable.From(statisticsList()).Where(whereClause).Select("$.mode").Distinct().OrderByDescending().ForEach(function (s, index) {
            modeData.push({ "c": [{ "v": s, "f": null }, { "v": Enumerable.From(statisticsList()).Where(function (x) { return x.mode == s }).Where(whereClause).ToArray().length, "f": null }] });
        })
        var modeDataTable = {
            "cols": [
                  { "id": "", "label": "Mode", "pattern": "", "type": "string" },
                  { "id": "", "label": "QSOs", "pattern": "", "type": "number" }
            ],
            "rows": modeData()
        }
        var modeOptions = {
            width: '100%',
            height: 250,
            colors: ['#00ccff', '#cc33ff', '#ff0066', '#ffcc00', '#66ff33', '#00ccff']
        };
        //*************************** band ***************************/
        Enumerable.From(statisticsList()).Where(whereClause).Select("$.band").Distinct().OrderBy().ForEach(function (s, index) {
            bandData.push({ "c": [{ "v": s, "f": null }, { "v": Enumerable.From(statisticsList()).Where(function (x) { return x.band == s }).Where(whereClause).ToArray().length, "f": null }] });
        })
        var bandDataTable = {
            "cols": [
                  { "id": "", "label": "Band", "pattern": "", "type": "string" },
                  { "id": "", "label": "QSOs", "pattern": "", "type": "number" }
            ],
            "rows": bandData()
        }
        var bandOptions = {
            width: '100%',
            height: 250,
            colors: ['#3366ff', '#cc00cc', '#ff5050', '#cc9900', '#33cc33', '#33cccc', '#6666ff', '#ff9933' ]
        };
        //*************************** ref ***************************/

        refData.push(['Station', 'QSOs']);
        Enumerable.From(statisticsList()).Where(whereClause).Select("$.my_call").OrderBy().Distinct().ForEach(function (s, index) {
            var count = Enumerable.From(statisticsList()).Where(function (x) { return x.my_call == s }).Where(whereClause).ToArray().length;
            if (s == null) s = " "
            refData.push([s, count]);
        })

        var refDataTable = google.visualization.arrayToDataTable(refData());
        var refView = new google.visualization.DataView(refDataTable);
        refView.setColumns([0, 1,
                         {
                             calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation"
                         }]);

        var refOptions = {
            title: "QSOs per Station",
            //width: "100%",
            height: 400,
            bar: { groupWidth: "95%" },
            legend: { position: "none" },
        };
        var refChart = new google.visualization.ColumnChart(document.getElementById("ref_chart"));
        refChart.draw(refView, refOptions);



        // Instantiate and draw our chart, passing in some options.
        var modeChart = new google.visualization.PieChart(document.getElementById('mode_chart'));
        modeChart.draw(new google.visualization.DataTable(modeDataTable), modeOptions);

        // Instantiate and draw our chart, passing in some options.
        var bandChart = new google.visualization.PieChart(document.getElementById('band_chart'));
        bandChart.draw(new google.visualization.DataTable(bandDataTable), bandOptions);

        //var refChart = new google.charts.Bar(document.getElementById('ref_chart'));
        //refChart.draw(refView, refOptions);
        return true;
    }


    var vm = {
        activate: function () {
            //shell.selectedSubMenu('ham');
            // Load the Visualization API and the piechart package.
            google.charts.load('current', { 'packages': ['corechart', 'bar'] });
            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(loadData);
            shell.selectedMainMenu('sections');
        },
        compositionComplete: function () {
            jwerty.key('enter', function () {
                GetWokedSections();
            }, that);
        },
        statisticsList: statisticsList,
        linkList: linkList,
        israelI: israelI,
        israelS: israelS,
        israelR: israelR,
        israelA: israelA,
        israelE: israelE,
        israelL: israelL,
        israelJ: israelJ,
        callsign: callsign,
        didNotWork:didNotWork,
        shell: shell
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return vm;
});