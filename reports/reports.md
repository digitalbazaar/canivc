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

{% for matrix in report.matrices %}
<li><a href="suites/{{ matrix.title | slugify }}">{{ matrix.title }}</a></li>
{% endfor %}
