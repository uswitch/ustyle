// Table sorter
// ============

(function ($) {
  
  $.fn.tableSort = function(options) {

    var settings = $.extend({
      autosort: true,
      th_class_prefix:   'us-table-head',
      td_class_prefix:   'us-table-cell',
      sorted_th_class:   'us-table-head-sorted',
      sorted_td_class:   'us-table-cell-sorted',
      sort_button_class: 'us-table-sort-button',
      body_row_class:    'us-table-body-row',
    }, options);

    return this.each(function() {
      var $self  = $(this);
      // Structure for the sort keys
      var sort_keys = [];
      // This will hold the pure data relevant to the 
      // sort, together with the row indexes:
      var values  = [];
      // The index for reordering the rows
      var index   = [];

      function setSort(sort_string) {
        sort_keys = $.map(sort_string.split(/,\s*/), function(field) {
          var field_converted = field.split(/\:/);
          field_converted[1] = field_converted[1] == 'desc' ? -1 : 1;
          return [field_converted];
        });
        values  = [];
        index   = [];
      }

      // scroll to top (only if further down the page)
      function scrollToTop() {
        var tableTop = $self.offset().top;
        var currentTop = $(window).scrollTop();
        if ( tableTop < currentTop ) {
          $('body,html').animate({
            scrollTop: $self.offset().top
          }, 500);
        }
      }

      function reorder() {
        scrollToTop();
        collectValues();
        createIndex();
        rebuildTable();
      }

      // Collecting values for the sort into an array
      function collectValues() {
        $self.find('tr.' + settings.body_row_class).each(function(index) {
          values[index] = [index];
          for (fi = 0, l = sort_keys.length; fi < l; fi++) {
            // We are dealing with ascending / descending order at this point
            values[index].push( $(this).data(sort_keys[fi][0]) * sort_keys[fi][1] );
          }
        });
      }

      function createIndex() {
        index = values.sort(function(a, b) {
          for (var i = 1, l = a.length; i < l; i++) {
            var diff = a[i] - b[i];
            if (diff !== 0) return diff;
          }
          return 0;
        });
        index = $.map(index, function(v) {
          return v[0];
        });
      }

      function rebuildTable() {
        var detachedRows = [];
        var assembled_rows = [];

        // HIGLIGHTING the PRIMARY HEADER
        $self.find('> thead .' + settings.sorted_th_class).removeClass(settings.sorted_th_class);
        $self.find('> thead .' + settings.th_class_prefix + '-' + sort_keys[0][0]).addClass(settings.sorted_th_class);

        // DETACHING the CURRENT ROWS
        $self.find('> tbody > tr').each(function(index, main_row) {
          detachedRows[index] = [ $(main_row).detach() ];
        });

        // ATTACHING THE ROWS BACK in the right order
        // ------------------------------------------
        for(var i = 0, l = index.length; i < l; i++) {
          var rowToAttach = detachedRows[ index[i] ];
          // Highlighting the primary column
          rowToAttach[0].find('td.' + settings.sorted_td_class).removeClass(settings.sorted_td_class);
          rowToAttach[0].find('td.' + settings.td_class_prefix + '-' + sort_keys[0][0]).addClass(settings.sorted_td_class);
          // Attaching in memory
          assembled_rows = assembled_rows.concat( rowToAttach );
        }
        
        // Attaching from memory to the DOM
        $self.find('tbody').append(assembled_rows);
      }

      function getSortParam() {
        var param_match = location.search.match(/sort=([^&]+)(?:&|$)/);
        return param_match ? decodeURIComponent(param_match[1]) : null;
      }

      // EVENTS
      // ------

      // Click on sort buttons
      $self.on('click', '.' + settings.sort_button_class, function(e) {
        e.preventDefault();
        setSort( $(this).data('sort') );
        reorder();
      });

      // SORT by the 'sort' URL parameter
      // --------------------------------
      var sort_param = getSortParam();
      if (sort_param) {
        setSort(sort_param);
        reorder();

      // AUTOSORT
      // --------
      } else if (settings.autosort) {
        var primary_button = $self.find('thead .' + settings.sorted_th_class + ' .' + settings.sort_button_class);
        console.log(primary_button);
        setSort( primary_button.data('sort') );
        reorder();
      }

    });

  };

}(jQuery));