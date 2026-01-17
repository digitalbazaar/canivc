---
pagination:
  data: results.all
  size: 1
  alias: report
permalink: "/reports/{{ report.respecConfig.shortName | slugify }}/"
breadcrumbs:
  - href: /reports/
    title: Reports
eleventyComputed:
  title: "{{ report.respecConfig.title }}"
  description: "Test suite results and implementation statistics for {{ report.respecConfig.title }}."
---

{% include "components/ReportDetails.html"
    details: report.respecConfig
    showLinks: true %}

<div class="ui two column stackable grid">
  <div class="column">
    <div class="ui bulleted list">
    {%- for matrix in report.matrices -%}
      <div class="item">
        <a href="suites/{{ matrix.title | slugify }}">{{ matrix.title }}</a>
      </div>
    {%- endfor -%}
    </div>
  </div>

  {%- assign currentSpec = results.specsImplementedBy | where: 'title', report.respecConfig.title | first -%}
  {%- if currentSpec.implementations.length > 0 -%}
  <div class="column">
    <div class="ui segment">
      <div class="ui fitted secondary menu">
        <h3 class="header item">
          Implementations
        </h3>
        <div class="right menu">
          <div class="item">
            <div class="ui icon buttons">
              <button id="sortAlphabeltically" class="ui active button" title="Sort Alphabetically">
                <i class="sort alphabet down icon"></i>
              </button>
              <button id="sortByPassPercentage" class="ui button" title="Sort by Percentage Passed">
                <i class="sort numeric down icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <table class="ui celled table">
        {%- for imp in currentSpec.implementations -%}
        <tr>
          <td class="collapsing">
            <a href="/implementations/{{ imp | slugify }}">{{ imp }}</a>
          </td>
          <td>
            {%- assign stats = results.implementersOfSpecs[imp].specs | find: 'shortName', report.respecConfig.shortName | map: 'stats' | first -%}
            {%- BarRating stats -%}
          </td>
          <td class="collapsing"><span class="passPercentage">{{ stats.passPercentage }}</span>%</td>
        </tr>
        {%- endfor -%}
      </table>
    </div>
  </div>
  {%- endif -%}
</div>

<script>
  document.getElementById('sortAlphabeltically')
    .addEventListener('click', function() {
      sortTable(0);
      this.nextElementSibling.classList.remove('active');
      this.classList.add('active');
    });
  document.getElementById('sortByPassPercentage')
    .addEventListener('click', function() {
      sortTable(2);
      this.previousElementSibling.classList.remove('active');
      this.classList.add('active');
    });

  function sortTable(columnIndex) {
    const table = document.querySelector('.ui.celled.table');
    const rows = Array.from(table.rows);

    rows.sort((a, b) => {
      const aText = a.cells[columnIndex].innerText;
      const bText = b.cells[columnIndex].innerText;

      if (columnIndex === 2) { // Numeric sort for pass percentage
        return parseFloat(bText) - parseFloat(aText);
      } else { // Alphabetic sort
        return aText.localeCompare(bText);
      }
    });

    // Re-append sorted rows to the table
    rows.forEach(row => table.appendChild(row));
  }
</script>
