define(['viewmodels/shell'], function (shell) {

    //properties
    this.linkList = ko.observableArray();
    this.modeData = ko.observableArray();
    this.bandData = ko.observableArray();
    this.refData = ko.observableArray();
    this.isWwffOnly = ko.observable(false);

    this.totalQSO = ko.observable(0);
    this.uniqueCall = ko.observable(0);
    this.totalRefs = ko.observable(0);

    var that = this;

    this.loadData = function () {
        
        $.ajax({
            type: "POST",
            url: "./Server/GetAllLog.php",
        }).done(function (data) {
            linkList(data);
            drawChart();


        }).error(function (xhr, ajaxOptions, thrownError) {
            //alert(jQuery.parseJSON(xhr.responseText).error);
            linkList([]);
        });

        
    }

    this.drawChart = function ()
    {
        modeData([]);
        bandData([]);
        refData([]);

        var whereClause = function (x) { return x.wwff_ref != null };
        if (!isWwffOnly())
            whereClause = function (x) { return true };

        totalQSO(Enumerable.From(linkList()).Where(whereClause).Count());
        uniqueCall(Enumerable.From(linkList()).Where(whereClause).Select("$.call").Distinct().Count());
        totalRefs(Enumerable.From(linkList()).Where(function (x) { return x.wwff_ref != null }).Select("$.wwff_ref").Distinct().Count());


        //*************************** mode ***************************/
        Enumerable.From(linkList()).Where(whereClause).Select("$.mode").Distinct().OrderByDescending().ForEach(function (s, index) {
            modeData.push({ "c": [{ "v": s, "f": null }, { "v": Enumerable.From(linkList()).Where(function (x) { return x.mode == s }).Where(whereClause).ToArray().length, "f": null }] });
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
            height: 300,
            colors: ['#3366ff', '#ff5050', '#663300', '#33cc33', '#33cccc', '#ff00ff', '#ff6600']
        };
        //*************************** band ***************************/
        Enumerable.From(linkList()).Where(whereClause).Select("$.band").Distinct().OrderBy().ForEach(function (s, index) {
            bandData.push({ "c": [{ "v": s, "f": null }, { "v": Enumerable.From(linkList()).Where(function (x) { return x.band == s }).Where(whereClause).ToArray().length, "f": null }] });
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
            height: 300,            
            colors: ['#000066', '#660066', '#993333', '#663300', '#003300', '#003366', '#6600cc', '#993300', '#339966']
        };
        //*************************** ref ***************************/

        refData.push(['Station', 'QSOs']);
        Enumerable.From(linkList()).Where(whereClause).Select("$.my_call").OrderBy().Distinct().ForEach(function (s, index) {
            var count = Enumerable.From(linkList()).Where(function (x) { return x.my_call == s }).Where(whereClause).ToArray().length;
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
            height: 500,
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
            //$.ajax({
            //    type: "POST",
            //    url: "./Server/GetAllLog.php",
            //}).done(function (data) {
            //    linkList(data);
            //}).error(function (xhr, ajaxOptions, thrownError) {
            //    //alert(jQuery.parseJSON(xhr.responseText).error);
            //    linkList([]);
            //});
            // Load the Visualization API and the piechart package.
            google.charts.load('current', { 'packages': ['corechart', 'bar'] });
            

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(loadData);
        },
        compositionComplete: function () {
            

            
        },
        linkList: linkList,
        shell: shell
    };

    return vm;
});