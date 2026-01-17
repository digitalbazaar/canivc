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
      <h3 class="ui header">Implementations</h3>
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
