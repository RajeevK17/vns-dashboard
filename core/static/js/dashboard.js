/*	 * *******smppcenter******* * */
$(function () {
  $(".dknob")
    .knob({
      format: function (value) {
        return value + "%";
      },
    })
    .change();
  $("#demo-foo-addrow").footable();
  var currentDate = moment(new Date());
  var minDate = moment(new Date()).format("YYYY-MM-DD");
  var maxDate = moment(currentDate).add(2, "years").format("YYYY-MM-DD");
  var minYear = moment(new Date()).format("YYYY");
  var maxYear = moment(currentDate).add(2, "years").format("YYYY");

  var sgc = new userDashboardInfo();
  sgc.userInfoBoxDetails();
  sgc.userMorrisDoNut();
  //loadUsageReport(moment(currentDate).subtract(5, 'days').format("YYYY-MM-DD"), currentDate.format("YYYY-MM-DD"));
  loadUsageReport("", "");
  loadUsageTrend("Today");
  $(".sgcdatetime").daterangepicker({
    opens: "right",
    timePickerSeconds: !0,
    alwaysShowCalendars: !0,
    autoUpdateInput: !1,
    maxDate: moment(),
    locale: {
      format: "MMM DD, YYYY",
    },
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
  }),
    $(".sgcdatetime").on("apply.daterangepicker", function (t, e) {
      0 == e.autoUpdateInput &&
        $(this).val(
          e.startDate.format(e.locale.format) +
            " - " +
            e.endDate.format(e.locale.format)
        );
      var a = $(t.currentTarget);
      void 0 != typeof a.data("auto-submit") &&
        (a.trigger("change"), $(document).trigger("form:submit", [a]));
    });

  $(".usgcdatetime, .sgcdatetime2").daterangepicker({
    opens: "right",
    timePickerSeconds: !0,
    alwaysShowCalendars: !0,
    autoUpdateInput: !1,
    maxDate: moment(),
    locale: {
      format: "MMM DD, YYYY",
    },
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
  }),
    $(".usgcdatetime, .sgcdatetime2").on(
      "apply.daterangepicker",
      function (t, e) {
        0 == e.autoUpdateInput &&
          $(this).val(
            e.startDate.format(e.locale.format) +
              " - " +
              e.endDate.format(e.locale.format)
          );
        var a = $(t.currentTarget);
        void 0 != typeof a.data("auto-submit") &&
          (a.trigger("change"), $(document).trigger("form:submit", [a]));
      }
    );

  function reqMorBarChart(chart, start, end) {
    $.ajax({
      type: "GET",
      url: sgc_user_url + "/dashboard/?action=sentSummary",
      data: { start: start, end: end },
    })
      .done(function (data) {
        chart.setData(data); //JSON.parse(data)
      })
      .fail(function (e) {
        console.log(e);
      });
  }
  var mbChart = Morris.Bar({
    element: "morris-bar-chart",
    data: [0, 0],
    xkey: "y",
    ykeys: ["a", "b", "c", "d"],
    labels: ["Submitted", "Delivered", "Failed", "Others"],
    barColors: ["#fb9678", "#01c0c8", "#DE1F95", "#4f5467"],
    hideHover: "auto",
    gridLineColor: "#eef0f2",
    xLabelAngle: 60,
    resize: true,
  });
  // Request initial data for the past 7 days:
  reqMorBarChart(
    mbChart,
    currentDate.format("YYYY-MM-DD"),
    currentDate.format("YYYY-MM-DD")
  );
  $(".daterange").click(function (e) {
    e.preventDefault();
    var days = $("#datetimeinput").val();
    var datearr = days.split(" - ");
    reqMorBarChart(mbChart, datearr[0], datearr[1]);
  });

  function loadUsageReport(start, end) {
    $.ajax({
      type: "GET",
      url: sgc_user_url + "/dashboard/?action=usageReport",
      data: { start: start, end: end },
    })
      .done(function (data) {
        //console.log(data);
        $("#dbUssgRep").html(data);
        $(".dknob")
          .knob({
            format: function (value) {
              return value + "%";
            },
          })
          .trigger("change");
      })
      .fail(function (e) {
        //console.log(e);
        //swal({title: "Error", text: "Error Code: " + e.status + " \nError Message: " + e.responseText, type: "error", confirmButtonClass: 'btn-danger'});
      });
  }
  //usage report on date click
  $(".daterange1").click(function (e) {
    e.preventDefault();
    var days = $("#datetimeinput1").val();
    var datearr = days.split(" - ");
    console.log(days);
    loadUsageReport(datearr[0], datearr[1]);
  });
  //load usage trend
  function loadUsageTrend(trendData) {
    $.ajax({
      type: "GET",
      url: sgc_user_url + "/dashboard/?action=usageTrend",
      data: { trendData: trendData },
    })
      .done(function (data) {
        $("#usageTrend").html(data);
      })
      .fail(function (e) {
        //console.log(e);
      });
  }
  //usage report on date click
  $(".usgTrend").on("click", ".dropdown-item", function (e) {
    var ut = $(this).html();
    $("#selbtnusgtrd").html(ut);
    loadUsageTrend(ut);
  });
});
/**
 * Get user dashboard details class
 * @return {dashboardInfo}
 */
function userDashboardInfo() {
  var sgcRootUrl = sgc_user_url + "/dashboard/";
  var call = new sgcAjaxCall();
  //get info box
  this.userInfoBoxDetails = function () {
    var sgcUrl = sgcRootUrl + "?action=infoBoxDetails";
    var data = {};
    call.send(data, sgcUrl, "post", function (data) {
      //console.log(data);
      $(".firstBoxCount").html(data.firstBoxCount);
      //                        $(".firstBoxCount").easy_number_animate({
      //                                start_value: 0,
      //                                end_value: data.firstBoxCount,
      //                                duration: 1000,
      //                                delimiter: ",",
      //                                before: null,
      //                                after: null
      //                        });
      $(".creditBalance").html(data.balance);
      //                        $(".creditBalance").easy_number_animate({
      //                                start_value: 0,
      //                                end_value: data.balance,
      //                                duration: 2500,
      //                                delimiter: ",",
      //                                before: null,
      //                                after: null
      //                        });
      $(".lastPurchase").html(data.lastPurchaseAmount);
      //                        $(".lastPurchase").easy_number_animate({
      //                                start_value: 0,
      //                                end_value: data.lastPurchaseAmount,
      //                                duration: 3000,
      //                                delimiter: ",",
      //                                before: null,
      //                                after: null
      //                        });
      $(".lastPurchaseDate").html(data.lastPurchaseDate);
      $(".totalGroups").easy_number_animate({
        start_value: 0,
        end_value: data.groups,
        duration: 4000,
        delimiter: ",",
        before: null,
        after: null,
      });
      $(".totalContacts").easy_number_animate({
        start_value: 0,
        end_value: data.contacts,
        duration: 4500,
        delimiter: ",",
        before: null,
        after: null,
      });
    });
  };
  this.userMorrisDoNut = function () {
    var sgcUrl = sgcRootUrl + "?action=doNutInfo";
    var data = {};
    call.send(data, sgcUrl, "post", function (data) {
      Morris.Donut({
        element: "morris-donut-chart",
        data: data,
        resize: true,
        colors: ["#fb9678", "#01c0c8", "#DE1F95", "#0B62A4", "#4f5467"],
      });
      //$('.submittedCls').html(data[0].value);
      $(".deliveredCls").html(data[1].value);
      $(".failedCls").html(data[2].value);
      $(".pendingCls").html(data[3].value);
      $(".rejectedCls").html(data[4].value);
    });
  };

  this.userUsageReportTable = function (start, end, currentDate = "") {
    $("#dashboardUsageReport").DataTable({
      processing: true,
      serverSide: true,
      ajax: {
        url:
          sgc_user_url +
          "/dashboard/?action=usageReport&start=" +
          start +
          "&end=" +
          end,
        type: "POST",
      },
      columns: [
        { data: "Date" },
        { data: "Submitted" },
        { data: "Delivered" },
        { data: "Delivered_Percentage" },
      ],
      pageLength: 25,
      aLengthMenu: [25, 100, 500, 1000],
      paging: false,
      searching: false,
      ordering: false,
    });
    $(".daterange1").on("keyup click change", function (e) {
      e.preventDefault();
      var i = $(this).attr("id");
      var v = $("#datetimeinput1").val();
      dataTable.columns(i).search(v).draw();
    });
  };
}

/**
 * Instantiate the ajax call
 * @return {sgcAjaxCall}
 */
function sgcAjaxCall() {
  this.send = function (data, url, method, success, type) {
    type = type || "json";
    var successRes = function (data) {
      success(data);
    };
    var errorRes = function (e) {
      //console.log(e);
      swal({
        title: "Error",
        text: "Error Code: " + e.status + " \nError Message: " + e.responseText,
        type: "error",
        confirmButtonClass: "btn-danger",
      });
    };
    $.ajax({
      url: url,
      type: method,
      data: data,
      success: successRes,
      error: errorRes,
      dataType: type,
      timeout: 60000,
    });
  };
}
