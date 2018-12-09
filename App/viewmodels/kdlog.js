define(['viewmodels/shell'], function (shell) {

    //properties
    this.linkList = ko.observableArray();
    this.statisticsList = ko.observableArray();
    this.modeData = ko.observableArray();
    this.bandData = ko.observableArray();
    this.refData = ko.observableArray();
    this.unsordetStations = ko.observableArray([]);
    this.isWwffOnly = ko.observable(true);

    this.totalQSO = ko.observable(0);
    this.uniqueCall = ko.observable(0);

    this.callsign = ko.observable('');
    this.didNotWork = ko.observable(false);

    this.Capernaum = ko.observableArray();
    this.Caesarea = ko.observableArray();
    this.Jerusalem = ko.observableArray();
    this.Latrun = ko.observableArray();
    this.Massada = ko.observableArray();

    this.CapernaumOp = ko.observableArray();
    this.CaesareaOp = ko.observableArray();
    this.JerusalemOp = ko.observableArray();
    this.LatrunOp = ko.observableArray();
    this.MassadaOp = ko.observableArray();

    this.entitled = ko.observableArray();

    this.isEligable = ko.observable(false);
    this.Endorsment3 = ko.observable(false);
    this.Endorsment6 = ko.observable(false);

    var that = this;

    this.GetWorkedSections = function () {
        if (callsign() == "") return;
        $.ajax({
            type: "POST",
            url: "./Server/GetLogForCall.php",
            data: { 'info': { 'call': callsign() } }
        }).done(function (data) {

            if (data.data == "")
            {
                linkList([]);
                Capernaum([]);
                Caesarea([]);
                Jerusalem([]);
                Latrun([]);
                Massada([]);

                didNotWork(true);
                isEligable(false);
                return;
            }
            linkList(data.data);

            Capernaum(Enumerable.From(data.data).Where(function (x) { return x.station == "Capernaum" }).ToArray());
            Caesarea(Enumerable.From(data.data).Where(function (x) { return x.station == "Caesarea" }).ToArray());
            Jerusalem(Enumerable.From(data.data).Where(function (x) { return x.station == "Jerusalem" }).ToArray());
            Latrun(Enumerable.From(data.data).Where(function (x) { return x.station == "Latrun" }).ToArray());
            Massada(Enumerable.From(data.data).Where(function (x) { return x.station == "Massada" }).ToArray());
            

            Endorsment3(data.eligability.num_of_stations >= 3);
            Endorsment6(data.eligability.num_of_stations >= 6);

            isEligable(Endorsment3() || Endorsment6());

            didNotWork(false);
        }).error(function (xhr, ajaxOptions, thrownError) {
            //alert(jQuery.parseJSON(xhr.responseText).error);
            linkList([]);
            didNotWork(true);
            isEligable(false);
        });
    }
    
    this.GetOperators = function () {
        $.ajax({
            type: "POST",
            url: "./Server/GetOperators.php"
        }).done(function (data) {

            if (data == "") {
                return;
            }
            CapernaumOp(Enumerable.From(data).Where(function (x) { return x.station == "Capernaum" }).ToArray());
            CaesareaOp(Enumerable.From(data).Where(function (x) { return x.station == "Caesarea" }).ToArray());
            JerusalemOp(Enumerable.From(data).Where(function (x) { return x.station == "Jerusalem" }).ToArray());
            LatrunOp(Enumerable.From(data).Where(function (x) { return x.station == "Latrun" }).ToArray());
            MassadaOp(Enumerable.From(data).Where(function (x) { return x.station == "Massada" }).ToArray());

        }).error(function (xhr, ajaxOptions, thrownError) {

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

    this.loadEntitled = function () {

        $.ajax({
            type: "POST",
            url: "./Server/GetEntitled.php",
        }).done(function (data) {
            entitled(data);
        }).error(function (xhr, ajaxOptions, thrownError) {
            //alert(jQuery.parseJSON(xhr.responseText).error);
            entitled([]);
        });
    }

    this.drawChart = function () {
        modeData([]);
        bandData([]);
        refData([]);

        whereClause = function (x) { return true };

        totalQSO(Enumerable.From(statisticsList()).Where(whereClause).Count());
        uniqueCall(Enumerable.From(statisticsList()).Where(whereClause).Select("$.callsign").Distinct().Count());

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
            height: 320,
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
            height: 320,
            colors: ['#3366ff', '#cc00cc', '#ff5050', '#cc9900', '#33cc33', '#33cccc', '#6666ff', '#ff9933' ]
        };
        //*************************** ref ***************************/
        this.unsordetStations = ko.observableArray([]);
        refData.push(['Station', 'QSOs']);
        Enumerable.From(statisticsList()).Where(whereClause).Select("$.station").OrderBy().Distinct().ForEach(function (s, index) {
            var count = Enumerable.From(statisticsList()).Where(function (x) { return x.station == s }).Where(whereClause).ToArray().length;
            if (s == null) s = " "
            unsordetStations.push([s, count]);
            //refData.push([s, count]);
        })

        Capernaum(Enumerable.From(data.data).Where(function (x) { return x.station == "Capernaum" }).ToArray());
        Caesarea(Enumerable.From(data.data).Where(function (x) { return x.station == "Caesarea" }).ToArray());
        Jerusalem(Enumerable.From(data.data).Where(function (x) { return x.station == "Jerusalem" }).ToArray());
        Latrun(Enumerable.From(data.data).Where(function (x) { return x.station == "Latrun" }).ToArray());
        Massada(Enumerable.From(data.data).Where(function (x) { return x.station == "Massada" }).ToArray());

        Enumerable.From(unsordetStations()).Where(function (x) { return x[0] == "Capernaum" }).ForEach(function (s) { refData.push(s); });
        Enumerable.From(unsordetStations()).Where(function (x) { return x[0] == "Caesarea" }).ForEach(function (s) { refData.push(s); });
        Enumerable.From(unsordetStations()).Where(function (x) { return x[0] == "Jerusalem" }).ForEach(function (s) { refData.push(s); });
        Enumerable.From(unsordetStations()).Where(function (x) { return x[0] == "Latrun Maris" }).ForEach(function (s) { refData.push(s); });
        Enumerable.From(unsordetStations()).Where(function (x) { return x[0] == "Massada" }).ForEach(function (s) { refData.push(s); });
        
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
            height: 440,
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
            loadEntitled();
            GetOperators();
            shell.selectedMainMenu('sections');
        },
        compositionComplete: function () {
            jwerty.key('enter', function () {
                GetWorkedSections();
                
            }, that);
        },
        statisticsList: statisticsList,
        linkList: linkList,
        Capernaum: Capernaum,
        Caesarea: Caesarea,
        Jerusalem: Jerusalem,
        Latrun: Latrun,
        Massada: Massada,
        CapernaumOp: CapernaumOp,
        CaesareaOp: CaesareaOp,
        JerusalemOp: JerusalemOp,
        LatrunOp: LatrunOp,
        MassadaOp: MassadaOp,
        callsign: callsign,
        isEligable: isEligable,
        Endorsment3: Endorsment3,
        Endorsment6: Endorsment6,
        didNotWork: didNotWork,
        entitled: entitled,
        shell: shell
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return vm;
});