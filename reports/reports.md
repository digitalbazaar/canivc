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

{% assign meta = report.respecConfig %}

<div class="ui header">
  {{ report.title }}
  <div class="ui sub header">
    {{ meta.subtitle }}
  </div>
</div>

<a class="ui small labeled icon button" href="{{ meta.github }}">
  <i class="github icon"></i>
  {{ meta.github }}
</a>

<a class="ui small labeled icon button" href="{{ meta.edDraftURI }}">
  <i class="clipboard outline icon"></i>
  {{ meta.edDraftURI }}
</a>

<pre>
{%- for stat in report.stats %}
{{ stat }}
{%- endfor -%}
</pre>

{% for matrix in report.matrices %}
<li><a href="suites/{{ matrix.title | slugify }}">{{ matrix.title }}</a></li>
{% endfor %}
