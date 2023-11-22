	/*         * *******smppcenter******* * */
	/**
	 * Common call for various events and methods
	 * 
	 */

	$(function () {
		sandboxGenerateOTP();
		sandboxVerifyOTP();
		$(".pace").addClass('displaynone');
		$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').click(function () {
			$('#back-to-top').tooltip('hide');
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		$('textarea').sgcAutoGrow();
		$(".txtarea").css({'min-height': '410px', 'max-height': '450px', 'overflow': 'auto'});
		$(".txtarea200").css({'min-height': '200px', 'max-height': '200px', 'overflow-y': 'auto'});
		$(".txtarea100").css({'min-height': '100px', 'max-height': '100px', 'overflow-y': 'auto'});
		$(".deleteSgcdata").click(function () {
			var t = $(this).data("text"),
				a = $(this).data("formname"),
				i = confirm(t);
			return i ? void document.forms[a].submit() : !1
		});
		$('[data-rel="popover"],[data-toggle="popover"]').popover();
		$("body").tooltip({selector: '[data-toggle="tooltip"]'});
		if (pageSgcLoader == 1) {
			$("#loading").delay(1500).fadeOut(500);
		}

		if (themeType == 'admin' && typeof sgc_admin_url !== 'undefined') {
			sgc_ajax_response(sgc_admin_url + '/settings/?action=topBarNotifications', '', 'topbarnotifyid');
		}
		if (themeType == 'user' && typeof sgc_user_url !== 'undefined') {
			sgc_ajax_response(sgc_user_url + '/ajax_global/?action=topBarNotifications', '', 'usertopbarnotifyid');
		}

		$("div.sgc-tab-menu>div.list-group>a").click(function (e) {
			e.preventDefault();
			$(this).siblings('a.active').removeClass("active");
			$(this).addClass("active");
			var index = $(this).index();
			$("div.sgc-tab>div.sgc-tab-content").removeClass("active");
			$("div.sgc-tab>div.sgc-tab-content").eq(index).addClass("active");
		});
		if (0 < window.location.href.indexOf("/admin/") || 0 < window.location.href.indexOf("/user/")) {
			var isAdmin = 0, isUser = 0;
			0 < window.location.href.indexOf("/admin/") && (isAdmin = 1), 0 < window.location.href.indexOf("/user/") && (isUser = 1);
			var isSessionExpired = "false";
			function isSessionActive() {
				$.ajax({url: sgc_base_url + "/check_session/", method: "POST", data: {admin: isAdmin, user: isUser}, success: function (i) {
						"1" === i.id && ($(location).attr("href", i.url), isSessionExpired = "true")
					}})
			}
			var intervalCount = setInterval(function () {
				isSessionActive(), "true" === isSessionExpired && clearInterval(intervalCount)
			}, 3e5)
		}
//		$('.sgcC2C').on('click', function (e) {
//			e.preventDefault();
//			var copyText = $(this).attr('data-copy-text');
//			var textarea = document.createElement("textarea");
//			textarea.textContent = copyText;
//			textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
//			document.body.appendChild(textarea);
//			textarea.select();
//			document.execCommand("copy");
//			document.body.removeChild(textarea);
//			//$(this).text("Copied!").show().fadeOut(1200);
//		})
	});

	function psmDisplayPassword() {
		var e = document.getElementById("showpassword"),
			t = document.getElementById("showpass");
		"password" == e.type ? (e.type = "text", t.innerHTML = "Hide") : (e.type = "password", t.innerHTML = "Show")
	}

	//function sgcC2C(element) {
	//var $temp = $("<input>");
	//$("body").append($temp);
	//$temp.val($(element).text()).select();
	//document.execCommand("copy");
	//$("#c2cid").text("Copied!").show().fadeOut(1200);
	//$temp.remove();
	//}

	/**
	 * Copy to clipboard inout
	 * @param {element} e
	 * @return {undefined}
	 */
	function copyToClipboardCommon(e) {
		var o = $("<input>").select();
		$("body").append(o), o.val($(e).val()).select(), document.execCommand("copy"), o.remove(), swal({title: sgc_lang_613, text: '', type: "success", confirmButtonClass: 'btn-success'});
	}
	/**
	 * confirm delete
	 * @return {Boolean}
	 */
	function confirmDelete() {
		var e = confirm(sgc_lang_614);
		return e ? !0 : !1
	}

	/**
	 * Delete function with sweet alert notifications
	 */
	$('a.swalDelRecord').click(function (e) {
		e.preventDefault(); // Prevent the href from redirecting directly
		var linkURL = $(this).attr("href");
		warnBeforeRedirect(linkURL);
	});

	/**
	 * Warn Before Redirect
	 * @param {type} linkURL
	 * @return {undefined}
	 */
	function warnBeforeRedirect(linkURL) {
		swal({
			title: sgc_lang_200,
			text: sgc_lang_615,
			type: "error",
			confirmButtonClass: 'btn-danger',
			showCancelButton: true,
			showLoaderOnConfirm: true
		}, function () {
			// Redirect the user
			window.location.href = linkURL;
		});
	}

	$('a.swalSgcConfirmAlert').click(function (e) {
		e.preventDefault(); // Prevent the href from redirecting directly
		var linkURL = $(this).attr("href");
		var text = $(this).attr("data-sgc-text");
		var title = $(this).attr("data-sgc-title");
		confirmBeforeRedirect(linkURL, title, text);
	});

	function confirmBeforeRedirect(linkURL, title, text) {
		swal({
			title: title,
			text: text,
			type: "warning",
			confirmButtonClass: 'btn-warning',
			showCancelButton: true,
			showLoaderOnConfirm: true
		}, function () {
			// Redirect the user
			window.location.href = linkURL;
		});
	}

	/**
	 * if site language enabled for google then show google translate api
	 * @type {type}
	 */
	if (sgc_set_site_language == 'google') {
		function googleTranslateElementInit() {
			new google.translate.TranslateElement({
				pageLanguage: 'en',
				layout: google.translate.TranslateElement.InlineLayout.SIMPLE
			}, 'sgc_translate_element');
		}
	}

	/**
	 * auto grow text area plugin method
	 * @type {type}
	 */
	jQuery.fn.extend({
		sgcAutoGrow: function () {
			function sgcAutoGrow_(element) {
				return jQuery(element)
					.css({'min-height': '70px', 'height': 'auto', 'overflow-y': 'hidden'})
					.height(element.scrollHeight);
			}
			return this.each(function () {
				sgcAutoGrow_(this).on('input', function () {
					sgcAutoGrow_(this);
				});
			});
		}
	});

	/**
	 * Hide/show 
	 * @param {type} element
	 * @param {type} divclass
	 * @param {type} hideDivClass
	 */
	function sgcBulkDelete(element, divclass, hideDivClass) {
		$(element).on('click', function () {
			var status = this.checked;
			$(divclass).each(function () {
				$(this).prop("checked", status);
			});
			if (status) {
				$(hideDivClass).show();
			} else {
				$(hideDivClass).hide();
			}
		});
	}

	/**
	 * Toggle div
	 * @param {type} element
	 * @param {type} divclass
	 */
	function sgcToggleButton(element, divclass) {
		if ($(element + ':checked').length > 0) {
			$("#bulkDelete").prop("checked", false);
			$(divclass).show();
		} else {
			$(divclass).hide();
		}
	}

	/**
	 * Common Ajax Delete function
	 * @param {type} text
	 * @param {type} sgcUrl
	 * @param {type} id
	 */
	function sgcAjaxDelete(text, sgcUrl, id, reload = false, dtreload = true, timeseconds = 0) {
		swal({
			title: sgc_lang_200,
			text: text,
			type: "error",
			confirmButtonClass: 'btn-danger',
			showCancelButton: true,
			closeOnConfirm: false,
			showLoaderOnConfirm: true
		}, function () {
			setTimeout(function () {
				$.ajax({
					url: sgcUrl,
					method: "POST",
					data: {
						id: id
					},
					success: function (data) {
						swal({title: sgc_lang_204, text: data, type: "success", confirmButtonClass: 'btn-success'});
						if (reload) {
							setTimeout(function () {
								location.reload();
							}, timeseconds);
						}
						if (dtreload) {
							var sgcDT = $("#sgcdataTableId").DataTable();
							sgcDT.ajax.reload(null, false);
							$(".multiDelete").hide();
							$(".multiView").hide();
							$("#bulkDelete").prop("checked", false);
						}
						if (themeType == 'admin' && typeof sgc_admin_url !== 'undefined' && sgc_refresh_count === 1) {
							sgc_ajax_response(sgc_admin_url + '/settings/?action=topBarNotifications', '', 'topbarnotifyid');
						}
					},
					error: function (result) {
						//console.log(result);
						$(".deleteRowId").prop('checked', false);
						$(".multiDelete").hide();
						swal({title: sgc_lang_332, text: result.responseText, type: "error", confirmButtonClass: 'btn-danger'});
					}
				});
			}, 2000);
		});
	}

	/**
	 * Common Ajax Refresh function
	 * @param {string} text
	 * @param {string} sgcUrl
	 * @param {int} id
	 */
	function sgcAjaxRefresh(text, sgcUrl) {
		swal({
			title: sgc_lang_200,
			text: text,
			type: "error",
			confirmButtonClass: 'btn-danger',
			showCancelButton: true,
			closeOnConfirm: false,
			showLoaderOnConfirm: true
		}, function () {
			setTimeout(function () {
				$.ajax({
					url: sgcUrl,
					method: "POST",
					success: function (data) {
						swal({title: sgc_lang_204, text: data, type: "success", confirmButtonClass: 'btn-success'});
					},
					error: function (result) {
						//console.log(result);
						$(".multiDelete").hide();
						swal({title: sgc_lang_332, text: result.responseText, type: "error", confirmButtonClass: 'btn-danger'});
					}
				});
			}, 2000);
		});
	}

	/**
	 * Ajax Reponse
	 * @param {type} sgcUrl
	 * @param {type} data
	 * @param {type} divid
	 * @return {undefined}
	 */
	function sgc_ajax_response(sgcUrl, data, divid) {
		$.ajax({
			url: sgcUrl,
			method: "POST",
			data: {
				data
			},
			success: function (data) {
				$("#" + divid).html(data);
			},
			error: function (data) {
				console.log(data);
			}
		});
	}

	/**
	 * Edit button for datatable
	 * @param {type} data
	 * @param {type} type
	 * @param {type} full
	 * @return {String}
	 */
	function actionlinks2(data, type, full) {
		return "<a style=\'margin-right:10px\' data-toggle=\'modal\' class=\'btn btn-primary btn-xs\' data-target=\'#sgcFormModal2\'><span class=\'fa fa-edit\' aria-hidden=\'true\'><\/span><\/a>";
	}

	/**
	 * Delete button for datatable
	 * @param {type} data
	 * @param {type} type
	 * @param {type} full
	 * @return {String}
	 */
	function actionlinks1(data, type, full) {
		return "<button type=\'button\' name=\'delete\' class=\'btn btn-danger btn-xs delete\'><span class=\'fa fa-times\' aria-hidden=\'true\'><\/span><\/button>";
	}

	/**
	 * Edit and Delete buttons for datatable
	 * @param {type} data
	 * @param {type} type
	 * @param {type} full
	 * @return {String}
	 */
	function actionlinks(data, type, full) {
		var fin = '';
		if (isUpdateRolePermission !== 'true') {
			fin += "<a style=\'margin-right:10px\' data-toggle=\'modal\' class=\'btn btn-primary btn-xs sgcEdit\' data-target=\'#sgcFormModal2\'><span class=\'fa fa-edit\' aria-hidden=\'true\'><\/span><\/a> ";
		}
		if (isDeleteRolePermission !== 'true') {
			fin += "<button type=\'button\' name=\'delete\' class=\'btn btn-danger btn-xs delete\'><span class=\'fa fa-times\' aria-hidden=\'true\'><\/span><\/button>";
		}
		return fin;
	}

	/**
	 * Datatable property
	 * @param {type} fetchurl - url to fetch data
	 * @param {type} serverProcessing - true/false
	 * @param {type} colDef - get object array to disable searching and sorting
	 * @param {type} colData - table rows data
	 * @param {type} orderColumn - default column to be sorted
	 * @param {type} actionlinks - row's delete/edit buttons
	 * @param {type} btnDelMulti - show/hide multi delete button
	 * @param {type} sgcCreatedRow - datatable createdRow array elements
	 * @param {type} orderBy - default desc - sort by
	 * @param {type} searching - default true - show search input or not
	 * @param {type} pagelength - default true - show pagination or not
	 * @param {type} info - default true - show pagination info or not
	 * @param {type} incExport - default true - include export button or not
	 * @return {sgcTable}
	 */

	function sgcTable() {
		this.getDatatable = function (fetchurl, serverProcessing = true, colDef, colData, orderColumn, actionlinks, btnDelMulti = true, sgcCreatedRow = '', orderBy = 'desc', searching = true, pagelength = true, info = true, incExport = true, showHideCols = false, sgcCreatedRowBgClr = '') {
			if (actionlinks !== '') {
				var colData1 = [{
						mData: null,
						className: "modal-pointer align-middle text-center minwidth100", //btn-group-vertical 
						"orderable": false,
						"searchable": false,
						"mRender": actionlinks
					}];
				var newColData = colData.concat(colData1);
			} else {
				var newColData = colData;
			}

			var sgcButtons = [
				{
					text: '<i class="fa fa-refresh text-white"></i> Reload',
					className: "btn btn-xs btn-warning pull-right text-white",
					action: function () {
						sgcTable.ajax.reload(null, false);
					}
				},
				{
					text: '<i class="fa fa-trash"></i> ' + sgc_lang_617,
					className: "btn btn-danger btn-xs btn-flat pull-right text-white margr10 margl10 displaynone multiDelete",
					action: function (e, dt, node, conf) {
						if ($('.deleteRowId:checked').length > 0) {
							var ids = [];
							$('.deleteRowId').each(function () {
								if ($(this).is(':checked')) {
									ids.push($(this).val());
								}
							});
							var sgcids = ids.toString();
							var multitext = sgc_lang_201;
							sgcAjaxDelete(multitext, sgcDeleteUrl, sgcids);
						} else {
							swal({title: sgc_lang_332, text: sgc_lang_616, type: "warning", confirmButtonClass: 'btn-warning'});
						}
					}
				}];
			if (incExport) {
				var expCsv = [{
						extend: 'csv',
						className: "btn btn-xs btn-success margr10 hidden-xs hidden-sm",
						text: '<i class="fa fa-download text-white"></i>',
						titleAttr: sgc_lang_618
					}];
				var finalSgcButtons = sgcButtons.concat(expCsv);
			} else {
				var finalSgcButtons = sgcButtons;
			}
			//if(!$.isEmptyObject(actionlinks)){
			//        //var finalcolData = [];
			//        var mrender = [{ "mRender": actionlinks}];
			//        colData1 = mrender.push(mrender);
			//}
			////individual column search
			//$('#sgcdataTableId tfoot th').each(function () {
			//        var title = $(this).text();
			//        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
			//});

			var sgcTable = $("#sgcdataTableId").DataTable({
				////individual column dropdown search
				//initComplete: function () {
				//        this.api().columns().every(function () {
				//                var column = this;
				//                var select = $('<select><option value=""></option></select>')
				//                        .appendTo($(column.footer()).empty())
				//                        .on('change', function () {
				//                                var val = $.fn.dataTable.util.escapeRegex(
				//                                        $(this).val()
				//                                );
				//                                column
				//                                        .search(val ? '^' + val + '$' : '', true, false)
				//                                        .draw();
				//                        });
				//                column.data().unique().sort().each(function (d, j) {
				//                        select.append('<option value="' + d + '">' + d + '</option>')
				//                });
				//        });
				//},
				"processing": serverProcessing,
				"serverSide": serverProcessing,
				"language": {
					'loadingRecords': '&nbsp;',
					processing: "<div class=\'overlay\'><i class=\'fa fa-refresh fa-spin\'></i></div>"
				},
				"ajax": {
					url: fetchurl,
					type: "POST",
					beforeSend: function () {
						// Here, manually add the loading message.
						$('#sgcdataTableId > tbody').html(
							'<tr class="odd">' +
							'<td valign="top" colspan="20" class="dataTables_empty text-black"> ' + dataTableLoader + '' +
							'</tr>'
							);
					},
					error: function (jqXHR, textStatus, errorThrown) {
						$('#resultTable_processing').hide();
						//console.log(textStatus, errorThrown);
						$('.dataTables_empty').html('<span class="text-red"><i class="fa fa-exclamation-triangle"></i> ' + sgc_lang_619 + '</span>');
					}
				},
				createdRow: function (row, data, dataIndex) {
					var i;
					for (i = 0; i < sgcCreatedRow.length; ++i) {
						//$(row).attr("data-" + sgcCreatedRow[i], data[sgcCreatedRow[i]]);
						$(row).addClass('sgcselected').attr("data-" + sgcCreatedRow[i], data[sgcCreatedRow[i]]);
					}
					if (sgcCreatedRowBgClr !== '' && data[sgcCreatedRowBgClr] == 0) {
						$(row).addClass('bg-gray3');

					}
				},
				"columnDefs": [
					{
						"searchable": false, "orderable": false, "targets": colDef
					}
				],
				"aoColumns": newColData,
				"order": [
					[orderColumn, orderBy]
				],
				"fixedHeader": true,
				"caseInsensitive": true,
				"pageLength": sgc_paginated_items,
				"aLengthMenu": [sgc_paginated_items, 100, 500, 1000],
				"select": false,
				"paging": pagelength,
				"lengthChange": true,
				"searching": searching,
				"ordering": true,
				"info": info,
				"autoWidth": false,
				"dom": "Blfrtip",
				"sPaginationType": "full_numbers",
				"buttons": finalSgcButtons,
				initComplete: function () {
					var input = $('.dataTables_filter input').unbind(),
						self = this.api(),
						$searchButton = $('<button class="btn btn-sm btn-primary">')
						.html('<i class="fa fa-search"></i> ' + sgc_lang_125)
						.click(function () {
							self.search(input.val()).draw();
						}),
						$clearButton = $('<button class="btn btn-sm btn-default">')
						.html('<i class="fa fa-refresh"></i> ' + sgc_lang_620)
						.click(function () {
							input.val('');
							$searchButton.click();
						})
					$('.dataTables_filter').append($searchButton, $clearButton);
					$('div.loading').remove();
					$('.overlay').hide();
					//$('#sgcdataTableId_wrapper').append(finalSgcButtons);
					sgcTable.buttons().container().appendTo('#sgcdataTableId_wrapper .col-md-6:eq(0)');
					$('[data-toggle="popover"]').popover();
				},
				drawCallback: function () {
					$('[data-toggle="popover"]').popover();
					$('[data-toggle="tooltip"], [data-toggle="sgctooltip"]').tooltip();
				}
			});
			////individual column search
			//sgcTable.columns().every(function () {
			//        var that = this;
			//        $('input', this.footer()).on('keyup change', function () {
			//                if (that.search() !== this.value) {
			//                        that
			//                                .search(this.value)
			//                                .draw();
			//                }
			//        });
			//});

			var rowCount = $('#sgcdataTableId tbody tr').length;
			if (rowCount < 1) {
				$(".multiDelete").hide();
			}
			if (btnDelMulti === true) {
				$("#sgcdataTableId_wrapper > .dt-buttons > .multiDelete").html("<i class=\'fa fa-trash\''></i> " + sgc_lang_617);
			}
			$("#sgcdataTableId_wrapper > .dataTables_filter").addClass("pull-left");
			$("#sgcdataTableId_wrapper > .dt-buttons").addClass("btn-group pull-right");
			//$("#sgcdataTableId_wrapper > .dt-buttons > .dt-button").html("<i class=\'fa fa-refresh\''></i> " + sgc_lang_83);
			//return this;
			if (showHideCols) {
				$('a.sgcToggleTableColData').on('click', function (e) {
					e.preventDefault();
					var column = sgcTable.column($(this).attr('data-column'));
					column.visible(!column.visible());
				});
		}
		}
	}

	$(document).ajaxComplete(function () {
		// Required for Bootstrap tooltips in DataTables
		$('[data-toggle="tooltip"], [data-toggle="sgctooltip"]').tooltip({
			"html": true,
			"delay": {"show": 1000, "hide": 0},
		});
	});

	$(document).on("click", ".dtswalSgcConfirmAlert", function (e) {
		e.preventDefault(); // Prevent the href from redirecting directly
		var linkURL = $(this).attr("href");
		var text = $(this).attr("data-sgc-text");
		var title = $(this).attr("data-sgc-title");
		confirmBeforeRedirect(linkURL, title, text);
	});

	/**
	 * Floating Notifications function to alert users
	 * @param {array} options
	 * @return {undefined}
	 */
	function Notify(options) {
		$.notify({
			title: options.title,
			message: options.text
		},
			{
				// settings
				element: 'body',
				autoHideDelay: 5000,
				position: 'fixed',
				type: options.type,
				allow_dismiss: true,
				newest_on_top: false,
				showProgressbar: false,
				placement: {
					from: "top",
					align: "right"
				},
				offset: 20,
				spacing: 10,
				z_index: 91031,
				delay: 3000,
				timer: 1000,
				//url_target: '_blank',
				mouse_over: null,
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
				onShow: null,
				onShown: null,
				onClose: null,
				onClosed: null,
				icon_type: 'class',
				template: options.template
			});
	}

	/**
	 * Common Ajax Moderatte Stattus function
	 * @param {string} text
	 * @param {string} sgcUrl
	 * @param {int} id
	 */
	function smppCenterModerateStatus(text, sgcUrl, status, id) {
		swal({
			title: "Are you sure?",
			text: text,
			type: "error",
			confirmButtonClass: 'btn-danger',
			showCancelButton: true,
			closeOnConfirm: false,
			showLoaderOnConfirm: true
		}, function () {
			setTimeout(function () {
				$.ajax({
					url: sgcUrl,
					method: "POST",
					data: {
						moderateStatus: '1',
						status: status,
						id: id
					},
					success: function (data) {
						swal({title: "Success", text: data, type: "success", confirmButtonClass: 'btn-success'});
						var sgcDT = $("#sgcdataTableId").DataTable();
						sgcDT.ajax.reload();
						if (themeType == 'admin' && typeof sgc_admin_url !== 'undefined') {
							sgc_ajax_response(sgc_admin_url + '/settings/?action=topBarNotifications', '', 'topbarnotifyid');
						}
					},
					error: function (result) {
						//console.log(result);
						swal({title: "Error", text: result.responseText, type: "error", confirmButtonClass: 'btn-danger'});
					}
				});
			}, 2000);
		});
	}

	$(document).on("click", ".dnldotpapicls", function () {
		loadDownloadableOtpClsLib();
	});

	function loadDownloadableOtpClsLib() {
		$.ajax({
			type: "POST",
			url: sgc_user_url + "/ajax_global/?action=otpClsLib",
			data: {otplib: 'otpappicls'},
		}).done(function (data) {
			//console.log(data);
			window.location = sgc_user_url + "/ajax_global/?action=otpClsLib"
		}).fail(function (e) {
			//console.log(e);
		});
	}

	function sgcNumToWords(number, type = '') {
		var digit = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
		var elevenSeries = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
		var countingByTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
		var shortScale = ['', 'thousand', 'million', 'billion', 'trillion'];
		number = number.toString();
		number = number.replace(/[\, ]/g, '');
		if (number != parseFloat(number))
			return 'Not a Number';
		var x = number.indexOf('.');
		if (x == -1)
			x = number.length;
		if (x > 15)
			return 'Too Big';
		var n = number.split('');
		var str = '';
		var sk = 0;
		for (var i = 0; i < x; i++) {
			if ((x - i) % 3 == 2) {
				if (n[i] == '1') {
					str += elevenSeries[Number(n[i + 1])] + ' ';
					i++;
					sk = 1;
				} else if (n[i] != 0) {
					str += countingByTens[n[i] - 2] + ' ';
					sk = 1;
				}
			} else if (n[i] != 0) {
				str += digit[n[i]] + ' ';
				if ((x - i) % 3 == 0)
					str += 'hundred ';
				sk = 1;
			}
			if ((x - i) % 3 == 1) {
				if (sk)
					str += shortScale[(x - i - 1) / 3] + ' ';
				sk = 0;
			}
		}
		if (x != number.length) {
			var y = number.length;
			str += 'point ';
			for (var i = x + 1; i < y; i++)
				str += digit[n[i]] + ' ';
		}
		str = str.replace(/\number+/g, ' ');
		return "You are " + capitalize_Words(type) + "ing <span class='text-red'>" + capitalize_Words(str.trim() + "</span> Units .");
	}

	//capitalize_Words 
	function capitalize_Words(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
	if (themeType == 'admin' && typeof sgc_admin_url !== 'undefined') {
		var sgcChangeThemeUrl = sgc_admin_url + "/globalAjax/?action=changeTheme";
		$(document).on("click", "#switchAdminLightThemeDemo", function () {
			smppCenterModerateStatus('Should I change to Light Theme?', sgcChangeThemeUrl, 'default', 1);
		});
		$(document).on("click", "#switchAdminDarkThemeDemo", function () {
			smppCenterModerateStatus('Should I change to Dark Theme?', sgcChangeThemeUrl, 'corona', 1);
		});
	}
	$('button').tooltip({
		trigger: 'click',
		placement: 'top'
	});

	function setTooltip(btn, message) {
		$(btn).tooltip('hide')
			.attr('data-original-title', message)
			.tooltip('show');
	}
	function hideTooltip(btn) {
		setTimeout(function () {
			$(btn).tooltip('hide');
		}, 1000);
	}
	$(document).on("click", ".sgcC2C", function (e) {
		value = $(this).data('clipboard-text');
		$(this).text(' Copied!').delay(1000).fadeOut('slow', function () {
			$(this).delay(1).fadeIn().html('<i class="fa fa-clone text-blue modal-pointer"></i>');
		});
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(value).select();
		document.execCommand("copy");
		$temp.remove();
	});

	(function ($) {
		function scrollToTop() {
			var $scrollUp = $('#scroll-top'),
				$lastScrollTop = 0,
				$window = $(window);

			$window.on('scroll', function () {
				var st = $(this).scrollTop();
				if (st > $lastScrollTop) {
					$scrollUp.removeClass('show');
				} else {
					if ($window.scrollTop() > 200) {
						$scrollUp.addClass('show');
					} else {
						$scrollUp.removeClass('show');
					}
				}
				$lastScrollTop = st;
			});

			$scrollUp.on('click', function (evt) {
				$('html, body').animate({scrollTop: 0}, 600);
				evt.preventDefault();
			});
		}
		scrollToTop();
	})(jQuery);

	function sandboxGenerateOTP() {
		$('#sgc-btn-progress-sandbox,#resendSandboxOtp').click(function (e) {
			e.preventDefault();
			$('#sgc-btn-progress-sandbox').hide();
			$('#sgc-progress-indicator-sandbox').show();
			$('#sbOtpRemTime').hide();
			var uSandboxcsrfToken = $('#uSandboxcsrfToken').val();
			var formattedSandboxPhone = $('#formattedSandboxPhone').val();
			var mno = $('#sandboxMobileNo').val();
			$("#resendSandboxOtp").css({"pointer-events": "none", color: "#adb5bd", "text-decoration": "none"});
			$.ajax({
				type: 'POST',
				url: sgc_user_url + '/sandboxOtp/?action=generate',
				data: {'ajaxsgcprocesssandboxform': 1, uSandboxcsrfToken: uSandboxcsrfToken, mno: mno, fmno: formattedSandboxPhone},
				dataType: 'json',
				success: function (response) {
					//console.log("Response received:", response);
					if (response === 'success' || response === '"success"') {
						Notify({
							'type': "success",
							'text': 'An OTP has been sent to your mobile number; please verify by entering the OTP.',
							'element': ""
						});
						$('#sgc-progress-indicator-sandbox').hide();
						$('#sgc-btn-progress-sandbox').hide();
						$('.mno').hide();
						$('#sgc-btn-progress-sandbox-verfy-otp').show();
						$('.otpdiv').show();
						$('#sgc-btn-progress-sandbox').prop('disabled', true);
						var rtme = otpr * 1000;
						setTimeout(function () {
							$('#sgc-btn-progress-sandbox').prop('disabled', false);
						}, rtme);
						var counter = otpr;
						var interval = setInterval(function () {
							counter--;
							if (counter <= 0) {
								clearInterval(interval);
								$("#resendSandboxOtp");
								$('#resendSandboxOtp').show().removeClass('disabled text-gray').css({"pointer-events": "", "cursor": "pointer", color: "", "text-decoration": "underline"}).addClass('text-blue');
								$('#sbOtpRemTime').hide();
							} else {
								$('#resendSandboxOtp').show().addClass('disabled text-gray').css({"pointer-events": "none", "cursor": "", color: "#adb5bd", "text-decoration": "none"}).removeClass("text-blue");
								$('#sbOtpRemTime').show().text('Your OTP is on its way! If you don\'t receive it, you can request a new one in ' + counter + ' seconds');
							}
						}, 1000);

					} else {
						$('#sgc-progress-indicator-sandbox').hide();
						$('#sgc-btn-progress-sandbox').show();
						$('#sgc-btn-progress-sandbox-verfy-otp').hide();
						$('.otpdiv').hide();
						$('#sbOtpRemTime').hide();
						Notify({
							'type': "error",
							'text': 'Oops, something didn\'t go as planned!',
							'element': ""
						});
					}
				},
				error: function (data) {
					$('#sgc-progress-indicator-sandbox').hide();
					$('#sgc-btn-progress-sandbox').show();
					$('#sgc-btn-progress-sandbox-verfy-otp').hide();
					$('.otpdiv').hide();
					$('#sbOtpRemTime').hide();
					Notify({
						'type': "error",
						'text': data.responseText,
						'element': ""
					});
					if (data.responseText === 'You have exceeded the maximum attempts for generating OTPs!') {
						setTimeout(function () {
							location.reload();
						}, 3000);

					}
				}
			});
		});
	}

	function sandboxVerifyOTP() {
		$('#sgc-btn-progress-sandbox-verfy-otp').click(function (e) {
			e.preventDefault();
			$('#sgc-btn-progress-sandbox-verfy-otp').hide();
			$('#sgc-btn-progress-sandbox').hide();
			$('#sgc-progress-indicator-sandbox').show();
			$('#sbOtpRemTime').hide();
			var sbOtpRemTime = $("#sbOtpRemTime").text();
			var uSandboxcsrfToken = $('#uSandboxcsrfToken').val();
			var sandboxOtp = $('#sandboxOtp').val();
			var formattedSandboxPhone = $('#formattedSandboxPhone').val();
			$.ajax({
				type: 'POST',
				url: sgc_user_url + '/sandboxOtp/?action=verify',
				data: {'ajaxsgcprocesssandboxform': 1, uSandboxcsrfToken: uSandboxcsrfToken, otp: sandboxOtp},
				dataType: 'json',
				success: function (response) {
					//console.log("Response received:", response);
					if (response === 'success' || response === '"success"') {
						Notify({
							'type': "success",
							'text': 'Your OTP has been successfully verified, and the number ' + formattedSandboxPhone + ' has been successfully whitelisted.',
							'element': ""
						});
						$('#sgc-progress-indicator-sandbox').hide();
						$('#sgc-btn-progress-sandbox').hide();
						$('.mno').hide();
						$('#sgc-btn-progress-sandbox-verfy-otp').show();
						$('.otpdiv').show();
						$('#sgc-btn-progress-sandbox').prop('disabled', true);
						location.reload();
					} else {
						$('#sgc-progress-indicator-sandbox').hide();
						$('#sgc-btn-progress-sandbox').hide();
						$('#sgc-btn-progress-sandbox-verfy-otp').hide();
						$('.otpdiv').show();
						if (sbOtpRemTime === 'Please wait 1 seconds') {
							$('#sbOtpRemTime').hide();
						} else {
							$('#sbOtpRemTime').show();
						}
						$('#sgc-btn-progress-sandbox-verfy-otp').show();
						Notify({
							'type': "error",
							'text': 'Oops, something didn\'t go as planned!',
							'element': ""
						});
					}
				},
				error: function (data) {
					$('#sgc-progress-indicator-sandbox').hide();
					$('#sgc-btn-progress-sandbox').hide();
					$('#sgc-btn-progress-sandbox-verfy-otp').hide();
					$('.otpdiv').show();
					if (sbOtpRemTime === 'Please wait 1 seconds') {
						$('#sbOtpRemTime').hide();
					} else {
						$('#sbOtpRemTime').show();
					}
					$('#sgc-btn-progress-sandbox-verfy-otp').show();
					Notify({
						'type': "error",
						'text': data.responseText,
						'element': ""
					});
				}
			});
		});
	}

	if (typeof intlTelInput === 'undefined') {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = sgc_base_url + '/assets/js/plugins/intl-tel-input/css/intlTelInput.min.css'; // Adjust the path as needed.
		document.head.appendChild(link);
	}