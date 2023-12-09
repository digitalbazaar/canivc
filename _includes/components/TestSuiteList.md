
<details class="ui accordion">
  <summary class="title">
    <i class="dropdown icon"></i>
    View All Test Suites
  </summary>
  <div class="content">
    <ul>
    {% for report in results %}
      <li>
        <a href="/reports/{{ report.respecConfig.shortName | slugify }}">
          {{ report.respecConfig.subtitle }}
        </a>
      </li>
      <ul>
      {% for matrix in report.matrices %}
        <li>
          <a href="/reports/{{ report.respecConfig.shortName | slugify }}/suites/{{ matrix.title | slugify }}">
            {{ matrix.title }}
          </a>
        </li>
      {% endfor %}
      </ul>
    {% endfor %}
    </ul>
  </div>
</details>