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

<div class="ui right floated card">
  <pre class="content">
    {%- for stat in report.stats %}
    {{ stat }}
    {%- endfor -%}
  </pre>
</div>

<div class="ui bulleted list">
{%- for matrix in report.matrices -%}
  <a class="item" href="suites/{{ matrix.title | slugify }}">{{ matrix.title }}</a>
{%- endfor -%}
</div>
