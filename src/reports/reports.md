---
pagination:
  data: results.all
  size: 1
  alias: report
permalink: "/reports/{{ report.respecConfig.shortName | slugify }}/"
breadcrumbs:
  - href: /reports/
    title: Reports
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
  <div class="column">
    <div class="ui segment">
      <h3 class="ui header">Implementations</h3>
      <ul>
        {%- assign currentSpec = results.specsImplementedBy | where: 'title', matrix.title | first -%}
        {%- for imp in currentSpec.implementations -%}
        <li><a href="/implementations/{{ imp | slugify }}">{{ imp }}</a></li>
        {%- endfor -%}
      </ul>
    </div>
  </div>
</div>
