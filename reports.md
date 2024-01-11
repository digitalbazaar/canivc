---
pagination:
  data: results.all
  size: 1
  alias: report
permalink: "/reports/{{ report.respecConfig.shortName | slugify }}/"
---

## {{ report.title }}

<pre>
{%- for stat in report.stats %}
{{ stat }}
{%- endfor -%}
</pre>

{% for matrix in report.matrices %}
<li><a href="suites/{{ matrix.title | slugify }}">{{ matrix.title }}</a></li>
{% endfor %}
