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

<div class="ui bulleted list">
{%- for matrix in report.matrices -%}
  <div class="item">
    <a href="suites/{{ matrix.title | slugify }}">{{ matrix.title }}</a>
  </div>
{%- endfor -%}
</div>
